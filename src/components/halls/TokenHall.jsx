const MEE_TOKEN_ADDRESS = import.meta.env.VITE_MEE_TOKEN_ADDRESS || '0x68B1D87F95878fE05B998F19b66F4baba5De1aed';

function Field({ label, value }) {
  return (
    <div className="token-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function TokenHall({ tokenData, wallet, onConnectWallet, onDisconnectWallet }) {
  const formattedSupply = Number(tokenData.totalSupply || 0).toLocaleString(undefined, {
    maximumFractionDigits: 2
  });

  return (
    <section className="glass-panel hall-section token-hall">
      <div className="section-head">
        <div>
          <span className="chip chip-gold">💰 Token</span>
          <h2>Production Token Hall</h2>
        </div>
        {wallet.connected ? (
          <button className="ghost-btn" onClick={onDisconnectWallet}>Disconnect {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</button>
        ) : (
          <button className="primary-btn" onClick={onConnectWallet}>Connect Wallet</button>
        )}
      </div>

      <div className="metric-grid four-col">
        <div className="metric-card elevated"><span>Total Supply</span><strong>{tokenData.loading ? '...' : `${formattedSupply} ${tokenData.symbol}`}</strong><small>Live ERC-20 metadata where RPC is available</small></div>
        <div className="metric-card elevated"><span>Your Balance</span><strong>{tokenData.loading ? '...' : `${tokenData.balance} ${tokenData.symbol}`}</strong><small>{wallet.connected ? 'Connected wallet balance' : 'Connect wallet to read balance'}</small></div>
        <div className="metric-card elevated"><span>RPC Latency</span><strong>{tokenData.rpcLatency ? `${tokenData.rpcLatency}ms` : '—'}</strong><small>MeeChain endpoint response time</small></div>
        <div className="metric-card elevated"><span>Status</span><strong>{tokenData.error ? 'Fallback' : 'Live Ready'}</strong><small>{tokenData.error || 'Token hall is operational'}</small></div>
      </div>

      <div className="dual-grid">
        <div className="inner-panel">
          <h3>Token Metadata</h3>
          <div className="token-field-grid">
            <Field label="Token Name" value={tokenData.loading ? '...' : tokenData.name} />
            <Field label="Symbol" value={tokenData.loading ? '...' : tokenData.symbol} />
            <Field label="Contract" value={MEE_TOKEN_ADDRESS} />
            <Field label="Chain" value="MeeChain (13390)" />
          </div>
        </div>

        <div className="inner-panel">
          <h3>Production Launch Notes</h3>
          <div className="stack-list">
            <div className="list-row"><div><strong>Multiple Halls</strong><small>Token, Quest, Monitoring, Guardian, Archive and MeeBot are reachable from one dashboard.</small></div><span className="tiny-chip gold">ready</span></div>
            <div className="list-row"><div><strong>Live Contract Data</strong><small>Uses ERC-20 calls against the configured MeeChain RPC and token address.</small></div><span className="tiny-chip">rpc</span></div>
            <div className="list-row"><div><strong>Mobile Responsive</strong><small>Wallet actions and hall navigation collapse cleanly on small screens.</small></div><span className="tiny-chip">ui</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
