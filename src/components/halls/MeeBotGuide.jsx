import { useState } from 'react';

export default function MeeBotGuide({ messages, onSend, busy }) {
  const [input, setInput] = useState('');

  function submit(event) {
    event.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  }

  return (
    <section className="glass-panel hall-section meebot-section">
      <div className="section-head">
        <div>
          <span className="chip chip-emerald">🤖 MeeBot</span>
          <h2>Magic Guide Console</h2>
        </div>
        <div className="mini-status">intent engine live</div>
      </div>

      <div className="chat-log">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={message.role === 'assistant' ? 'chat-bubble assistant' : 'chat-bubble user'}>
            <strong>{message.role === 'assistant' ? 'MeeBot' : 'You'}</strong>
            <p>{message.text}</p>
            {message.action ? <span className="tiny-chip gold">suggested: {message.action}</span> : null}
          </div>
        ))}
        {busy ? <div className="chat-bubble assistant"><strong>MeeBot</strong><p>กำลังตีความสัญญาณจากอาณาจักร...</p></div> : null}
      </div>

      <form className="chat-form" onSubmit={submit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="เช่น อยาก stake, อยาก mint relic, เช็ค quest วันนี้" />
        <button className="primary-btn" type="submit">ส่งคาถา</button>
      </form>
    </section>
  );
}
