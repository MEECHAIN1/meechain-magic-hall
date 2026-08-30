const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const MEECHAIN_RPC_URL = import.meta.env.VITE_MEECHAIN_RPC_URL || 'https://rpc.meechain.live';
const MEE_TOKEN_ADDRESS = import.meta.env.VITE_MEE_TOKEN_ADDRESS || '0x68B1D87F95878fE05B998F19b66F4baba5De1aed';
const FALLBACK_TOKEN = {
  name: 'MeeChain Token',
  symbol: 'MEE',
  totalSupply: '1000000000',
  balance: '0',
  rpcLatency: 0,
  loading: false,
  error: ''
};

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(json.error || `Request failed: ${response.status}`);
  }

  return json;
}

async function rpc(method, params = []) {
  const response = await fetch(MEECHAIN_RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params })
  });
  const json = await response.json();
  if (json.error) throw new Error(json.error.message || 'RPC request failed');
  return json.result;
}

function decodeString(hex) {
  const clean = hex.replace(/^0x/, '');
  if (!clean) return '';
  const offset = Number.parseInt(clean.slice(0, 64), 16) * 2;
  const length = Number.parseInt(clean.slice(offset, offset + 64), 16) * 2;
  const bytes = clean.slice(offset + 64, offset + 64 + length);
  return bytes.match(/.{1,2}/g)?.map((byte) => String.fromCharCode(Number.parseInt(byte, 16))).join('') || '';
}

function decodeUint(hex) {
  return BigInt(hex || '0x0');
}

function encodeBalanceOf(address) {
  const clean = address.replace(/^0x/, '').padStart(64, '0');
  return `0x70a08231${clean}`;
}

function formatUnits(value, decimals) {
  const divisor = 10n ** BigInt(decimals);
  const whole = value / divisor;
  const fraction = value % divisor;
  if (fraction === 0n) return whole.toString();
  return `${whole}.${fraction.toString().padStart(decimals, '0').replace(/0+$/, '')}`;
}

async function token(address = '') {
  const start = Date.now();
  try {
    const calls = [
      rpc('eth_call', [{ to: MEE_TOKEN_ADDRESS, data: '0x06fdde03' }, 'latest']),
      rpc('eth_call', [{ to: MEE_TOKEN_ADDRESS, data: '0x95d89b41' }, 'latest']),
      rpc('eth_call', [{ to: MEE_TOKEN_ADDRESS, data: '0x18160ddd' }, 'latest']),
      rpc('eth_call', [{ to: MEE_TOKEN_ADDRESS, data: '0x313ce567' }, 'latest'])
    ];

    if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
      calls.push(rpc('eth_call', [{ to: MEE_TOKEN_ADDRESS, data: encodeBalanceOf(address) }, 'latest']));
    }

    const [nameHex, symbolHex, supplyHex, decimalsHex, balanceHex] = await Promise.all(calls);
    const decimals = Number(decodeUint(decimalsHex));

    return {
      name: decodeString(nameHex) || FALLBACK_TOKEN.name,
      symbol: decodeString(symbolHex) || FALLBACK_TOKEN.symbol,
      totalSupply: formatUnits(decodeUint(supplyHex), decimals),
      balance: balanceHex ? formatUnits(decodeUint(balanceHex), decimals) : '0',
      rpcLatency: Date.now() - start,
      loading: false,
      error: ''
    };
  } catch (err) {
    return {
      ...FALLBACK_TOKEN,
      loading: false,
      error: err.message
    };
  }
}

export const api = {
  health: () => request('/health'),
  orb: () => request('/api/magic/orb'),
  hall: (address) => request(`/api/magic/hall/${address}`),
  achievements: (address) => request(`/api/magic/achievements/${address}`),
  ackAchievements: (address, badgeIds) => request('/api/magic/achievements/ack', {
    method: 'POST',
    body: JSON.stringify({ address, badgeIds })
  }),
  dailyQuest: (address) => request(`/api/magic/daily-quest/${address}`),
  confirmQuest: (address, questId) => request('/api/magic/daily-quest/confirm', {
    method: 'POST',
    body: JSON.stringify({ address, questId })
  }),
  questLog: (address) => request(`/api/magic/quest-log/${address}`),
  realmVision: () => request('/api/magic/realm-vision'),
  token,
  sageByMessage: (message, address) => request('/api/magic/sage', {
    method: 'POST',
    body: JSON.stringify({ message, address })
  }),
  sageByAddress: (address) => request('/api/magic/sage', {
    method: 'POST',
    body: JSON.stringify({ address })
  })
};

export function toMetricValue(detail, fallback = '—') {
  if (!detail) return fallback;
  const blockMatch = detail.match(/#([\d,]+)/);
  if (blockMatch) return blockMatch[1];
  const numberMatch = detail.match(/([\d,.]+)/);
  return numberMatch ? numberMatch[1] : detail;
}
