import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './meter-hq.module.css';

// Remote entry for the Hammy Cam donation meter. This page is not linked
// anywhere on the site and is marked noindex. Submitting drops the entry
// into a small Apps Script mailbox; the counter on the streaming laptop
// polls that mailbox and adds new entries to the stream's donation bar.
const ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbwCFQNw3MKH8u2UIEzFT_6J7AY_lwrvhhbnvQVOPhesKvaXxFa-bhBFRkjpp02H0mkC/exec';

const CHANNELS = ['Givebutter', 'PayPal', 'Venmo', 'Cash App', 'Facebook', 'Check', 'Cash', 'Other'];
const STORE_KEY = 'meterHqSentV1';

export default function MeterHq() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [sent, setSent] = useState([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) setSent(JSON.parse(raw));
    } catch (e) {}
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const amount = (data.get('amount') || '').toString().trim();
    const channel = (data.get('channel') || 'Other').toString();
    const note = (data.get('note') || '').toString().trim();
    if (!amount || !(parseFloat(amount) > 0)) return;

    const body = new URLSearchParams();
    body.set('amount', amount);
    body.set('channel', channel);
    body.set('note', note);

    setStatus('sending');
    try {
      await fetch(ENDPOINT_URL, {method: 'POST', mode: 'no-cors', body});
      setStatus('done');
      const entry = {
        amount,
        channel,
        note,
        when: new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}),
      };
      setSent((prev) => {
        const next = [entry, ...prev].slice(0, 20);
        try {
          window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
        } catch (e2) {}
        return next;
      });
      form.reset();
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <Layout title="Meter HQ" description="Remote entry for the HALT donation meter.">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>Donation Meter: Remote Entry</h1>
          <p>
            Add a gift here and it lands on the stream's donation bar within
            about 15 seconds, wherever you are. PayPal adds itself, so this
            page is for everything else.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.field}>
              <span>Amount $</span>
              <input type="number" name="amount" step="0.01" min="0" required inputMode="decimal" />
            </label>
            <label className={styles.field}>
              <span>Channel</span>
              <select name="channel" defaultValue="Venmo">
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Note (optional)</span>
              <input type="text" name="note" maxLength={80} />
            </label>
            <button type="submit" className={styles.button} disabled={status === 'sending'}>
              {status === 'sending' ? 'Adding...' : 'Add to the meter'}
            </button>
          </form>

          {status === 'done' && (
            <p className={styles.done}>Added! Watch the bar, it should move within about 15 seconds.</p>
          )}
          {status === 'error' && (
            <p className={styles.error}>
              Something went wrong sending that. Check your connection and try once more.
            </p>
          )}

          {sent.length > 0 && (
            <div className={styles.sentBox}>
              <h2>Sent from this device</h2>
              <ul>
                {sent.map((s, i) => (
                  <li key={i}>
                    ${s.amount} via {s.channel}
                    {s.note ? ` (${s.note})` : ''} at {s.when}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
