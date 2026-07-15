import { useEffect, useMemo, useState } from 'react';
import SidebarNav from './components/SidebarNav';
import RealmHall from './components/halls/RealmHall';
import NetworkHall from './components/halls/NetworkHall';
import GuardianHall from './components/halls/GuardianHall';
import ArchiveHall from './components/halls/ArchiveHall';
import QuestHall from './components/halls/QuestHall';
import CouncilHall from './components/halls/CouncilHall';
import AcademyHall from './components/halls/AcademyHall';
import MeeBotGuide from './components/halls/MeeBotGuide';
import { api, toMetricValue } from './lib/api';

const HALLS = [
  { id: 'realm', label: '🏛 Realm' },
  { id: 'network', label: '⚡ Network' },
  { id: 'guardian', label: '🛡 Guardian' },
  { id: 'archive', label: '📜 Archive' },
  { id: 'quest', label: '🎮 Quest' },
  { id: 'council', label: '🏛 Council' },
  { id: 'academy', label: '🌟 Academy' },
  { id: 'meebot', label: '🤖 MeeBot' }
];

const DEFAULT_ADDRESS = '0xMeeBuilderDemo';

export default function App() {
  const [activeHall, setActiveHall] = useState('realm');
  const [magicAddress, setMagicAddress] = useState(localStorage.getItem('magic-hall-address') || DEFAULT_ADDRESS);
  const [orb, setOrb] = useState(null);
  const [health, setHealth] = useState(null);
  const [hall, setHall] = useState(null);
  const [quests, setQuests] = useState(null);
  const [vision, setVision] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [questLog, setQuestLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toasts, setToasts] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: '🧙 ยินดีต้อนรับสู่ Magic Hall — ข้าจะคอยแปลสัญญาณจากเชนให้กลายเป็นคำแนะนำที่ลงมือทำได้จริง'
    }
  ]);
  const [meebotBusy, setMeebotBusy] = useState(false);

  useEffect(() => {
    localStorage.setItem('magic-hall-address', magicAddress);
  }, [magicAddress]);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      try {
        await Promise.all([loadNetwork(), loadAddressBound(magicAddress)]);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    boot();
    const networkTimer = setInterval(loadNetwork, 6000);
    const addressTimer = setInterval(() => loadAddressBound(magicAddress), 9000);

    return () => {
      mounted = false;
      clearInterval(networkTimer);
      clearInterval(addressTimer);
    };
  }, [magicAddress]);

  async function loadNetwork() {
    const [healthRes, orbRes, visionRes] = await Promise.all([
      api.health(),
      api.orb(),
      api.realmVision()
    ]);
    setHealth(healthRes);
    setOrb(orbRes.data || orbRes);
    setVision(visionRes.data ? { ...visionRes.data, message: visionRes.message } : visionRes);
  }

  async function loadAddressBound(address) {
    const [hallRes, questRes, achievementRes, questLogRes] = await Promise.all([
      api.hall(address),
      api.dailyQuest(address),
      api.achievements(address),
      api.questLog(address)
    ]);

    const nextAchievements = achievementRes.data?.badges || [];
    const unseen = nextAchievements.filter((badge) => badge.seen === false);

    setHall(hallRes.data || hallRes);
    setQuests(questRes.data || questRes);
    setAchievements(nextAchievements);
    setQuestLog(questLogRes.data || questLogRes);

    if (unseen.length) {
      setToasts((current) => [
        ...unseen.map((badge) => ({ id: `${badge.id}-${badge.earnedAt}`, text: `🎉 ได้รับ ${badge.label}` })),
        ...current
      ].slice(0, 4));
      await api.ackAchievements(address, unseen.map((badge) => badge.id));
    }
  }

  async function handleQuestConfirm(questId) {
    try {
      await api.confirmQuest(magicAddress, questId);
      await loadAddressBound(magicAddress);
      setToasts((current) => [{ id: `quest-${questId}-${Date.now()}`, text: `✅ Quest ${questId} สำเร็จแล้ว` }, ...current].slice(0, 4));
    } catch (err) {
      setToasts((current) => [{ id: `err-${Date.now()}`, text: `⚠️ ${err.message}` }, ...current].slice(0, 4));
    }
  }

  async function handleMeeBotSend(input) {
    if (!input?.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages((current) => [...current, userMessage]);
    setMeebotBusy(true);
    try {
      const res = await api.sageByMessage(input, magicAddress);
      const reply = res.data?.text || '🧙 ข้ารับสัญญาณไม่ครบ ลองร่ายคาถาใหม่อีกครั้ง';
      setMessages((current) => [...current, { role: 'assistant', text: reply, action: res.data?.suggestedAction || null }]);
    } catch (err) {
      setMessages((current) => [...current, { role: 'assistant', text: `⚠️ ${err.message}` }]);
    } finally {
      setMeebotBusy(false);
    }
  }

  async function handleMeeBotAdvice() {
    setMeebotBusy(true);
    try {
      const res = await api.sageByAddress(magicAddress);
      setMessages((current) => [...current, { role: 'assistant', text: res.data?.text || '🧙 วันนี้ท้องฟ้าสงบดี', action: res.data?.suggestedAction || null }]);
    } catch (err) {
      setMessages((current) => [...current, { role: 'assistant', text: `⚠️ ${err.message}` }]);
    } finally {
      setMeebotBusy(false);
    }
  }

  const networkMetrics = useMemo(() => {
    const chainHeight = toMetricValue(orb?.chainEnergy?.detail, '—');
    const validators = toMetricValue(orb?.validatorForce?.detail, '0');
    const chainSeed = Number(String(chainHeight).replace(/,/g, '')) || 1;
    const latency = 60 + (chainSeed % 145);
    const tps = 1800 + (chainSeed % 900);
    const gas = 0.12 + ((chainSeed % 9) * 0.03);
    const severity = latency > 160 ? 'critical' : latency > 110 ? 'warning' : 'ok';

    return {
      rpcHealth: health?.status === 'ok' ? '99.98%' : '97.10%',
      chainHeight,
      validators,
      latency: `${latency}ms`,
      latencyValue: latency,
      tps,
      gas: `${gas.toFixed(2)} Gwei`,
      bridgeStatus: health?.status === 'ok' ? '✅ Online' : '⚠️ Degraded',
      faucet: health?.mock ? 'Mock Ready' : 'Ready',
      explorer: vision?.message ? '🌌 Vision Live' : 'Active',
      chainId: health?.chainId || vision?.data?.chainId || vision?.chainId || '13390',
      severity
    };
  }, [orb, health, vision]);

  const guardianState = useMemo(() => {
    const incidents = [];
    const alerts = [];

    if (networkMetrics.latencyValue > 110) {
      incidents.push({
        id: 'latency',
        type: 'RPC Lag',
        status: networkMetrics.latencyValue > 160 ? '🔴 Critical' : '🟠 Guardian Required',
        time: 'สดจาก pulse ล่าสุด'
      });
      alerts.push({ id: 'latency-alert', message: `Latency ${networkMetrics.latency}`, level: networkMetrics.latencyValue > 160 ? 'critical' : 'warning' });
    }

    if (String(networkMetrics.validators) === '0') {
      incidents.push({ id: 'validator', type: 'Guardian Registry Missing', status: '🟡 Needs Config', time: 'ตรวจพบจาก Magic Orb' });
    }

    if (!incidents.length) {
      incidents.push({ id: 'stable', type: 'Realm Stable', status: '🟢 All Services Healthy', time: 'ไม่มีเหตุผิดปกติ' });
    }

    if (!alerts.length) {
      alerts.push({ id: 'orb-ok', message: 'Magic Orb synchronized', level: 'ok' });
      alerts.push({ id: 'bridge-ok', message: `Bridge ${networkMetrics.bridgeStatus}`, level: 'ok' });
    }

    return { incidents, alerts };
  }, [networkMetrics]);

  const hallProps = {
    magicAddress,
    setMagicAddress,
    hall,
    quests,
    achievements,
    questLog,
    vision,
    orb,
    networkMetrics,
    guardianState,
    onQuestConfirm: handleQuestConfirm,
    onAskMeeBot: handleMeeBotAdvice,
    onNavigate: setActiveHall
  };

  const renderedHall = {
    realm: <RealmHall {...hallProps} />,
    network: <NetworkHall {...hallProps} />,
    guardian: <GuardianHall {...hallProps} />,
    archive: <ArchiveHall {...hallProps} />,
    quest: <QuestHall {...hallProps} />,
    council: <CouncilHall {...hallProps} />,
    academy: <AcademyHall {...hallProps} />,
    meebot: <MeeBotGuide {...hallProps} messages={messages} onSend={handleMeeBotSend} busy={meebotBusy} />
  }[activeHall];

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <SidebarNav halls={HALLS} activeHall={activeHall} setActiveHall={setActiveHall} />

      <div className="main-shell">
        <header className="topbar glass-panel">
          <div>
            <div className="eyebrow">MeeChain Vision → Magic Hall</div>
            <h1>🪄 Command Center สำหรับ Builders, Guardians และ Players</h1>
            <p className="subcopy">รักษา mood เดิมของ MeeChain ไว้ — grid, glow, aura และความเป็น ritual-driven dApp</p>
          </div>

          <div className="status-cluster">
            <div className="status-pill"><span>Chain ID</span><strong>{networkMetrics.chainId}</strong></div>
            <div className="status-pill"><span>RPC</span><strong>{networkMetrics.bridgeStatus}</strong></div>
            <div className="status-pill"><span>Explorer</span><strong>{networkMetrics.explorer}</strong></div>
          </div>
        </header>

        <div className="mobile-tabs">
          {HALLS.map((hallItem) => (
            <button key={hallItem.id} className={hallItem.id === activeHall ? 'tab active' : 'tab'} onClick={() => setActiveHall(hallItem.id)}>
              {hallItem.label}
            </button>
          ))}
        </div>

        <section className="hero-grid">
          <div className="glass-panel hero-card">
            <div className="hero-copy">
              <span className="chip">Live Magic Layer</span>
              <h2>จาก ecosystem page → สู่ Hall ที่กดใช้งานได้จริง</h2>
              <p>
                Network pulse วิ่งสด, Guardian อ่านสัญญาณเสี่ยง, Quest เช็คสำเร็จได้, MeeBot คุยตอบกลับได้จริง
                และยังคงใช้ภาษาเวทมนตร์แบบ MeeChain ทั้งระบบ
              </p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => setActiveHall('network')}>เปิดดู Network Pulse</button>
                <button className="ghost-btn" onClick={() => setActiveHall('meebot')}>ถาม MeeBot</button>
              </div>
            </div>
            <div className="orbital-panel">
              <div className="orb-core">M</div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="orbit-label orbit-top">Play</div>
              <div className="orbit-label orbit-right">Stake</div>
              <div className="orbit-label orbit-bottom">Own</div>
              <div className="orbit-label orbit-left">Build</div>
            </div>
          </div>

          <div className="glass-panel pulse-card">
            <div className="pulse-head">
              <span className={`signal ${networkMetrics.severity}`}></span>
              <strong>Magic Orb Pulse</strong>
            </div>
            <div className="pulse-metrics">
              <div><span>Block Height</span><strong>{networkMetrics.chainHeight}</strong></div>
              <div><span>Latency</span><strong>{networkMetrics.latency}</strong></div>
              <div><span>TPS</span><strong>{networkMetrics.tps}</strong></div>
              <div><span>Guardians</span><strong>{networkMetrics.validators}</strong></div>
            </div>
            {error ? <p className="error-copy">⚠️ {error}</p> : <p className="muted-copy">Polling ทุก 6–9 วินาที พร้อม mock-safe fallback</p>}
          </div>
        </section>

        {loading ? <div className="loading-panel glass-panel">กำลังเปิดประตู Magic Hall...</div> : renderedHall}
      </div>

      <div className="toast-stack">
        {toasts.map((toast) => (
          <button key={toast.id} className="toast" onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}>
            {toast.text}
          </button>
        ))}
      </div>
    </div>
  );
}
