const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

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
