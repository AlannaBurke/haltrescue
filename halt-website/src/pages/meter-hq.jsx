import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './meter-hq.module.css';

// Remote entry for the Hammy Cam donation meter. This page is not linked
// anywhere on the site and is marked noindex. Submitting drops the entry
// into a small Apps Script mailbox; the counter on the streaming laptop
// polls that mailbox and adds new entries to the stream's donation bar.
const ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbwCFQNw3MKH8u2UIEzFT_6J7AY_lwrvhhbnvQVOPhesKvaXxFa-bhBFRkjpp02H0mkC/exec';

const CHANNELS = ['PayPal', 'Venmo', 'Cash App', 'Facebook', 'Check', 'Cash', 'Other'];
const STORE_KEY = 'meterHqSentV1';
const MATCH_STORE_KEY = 'meterHqMatchV1';

export default function MeterHq() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [sent, setSent] = useState([]);
  const [matchStatus, setMatchStatus] = useState('idle'); // idle | sending | done | error
  const [lastMatch, setLastMatch] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) setSent(JSON.parse(raw));
    } catch (e) {}
    try {
      const rawMatch = window.localStorage.getItem(MATCH_STORE_KEY);
      if (rawMatch) setLastMatch(JSON.parse(rawMatch));
    } catch (e) {}
  }, []);

  async function postToMeter(fields) {
    const body = new URLSearchParams();
    Object.keys(fields).forEach((k) => body.set(k, fields[k]));
    await fetch(ENDPOINT_URL, {method: 'POST', mode: 'no-cors', body});
  }

  function rememberMatch(rec) {
    setLastMatch(rec);
    try {
      window.localStorage.setItem(MATCH_STORE_KEY, JSON.stringify(rec));
    } catch (e) {}
  }

  async function handleMatchSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const amount = (data.get('matchamount') || '').toString().trim();
    if (!amount || !(parseFloat(amount) > 0)) return;
    setMatchStatus('sending');
    try {
      await postToMeter({amount, channel: 'MatchCap', note: 'Match pool'});
      setMatchStatus('done');
      rememberMatch({
        amount,
        when: new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}),
      });
      form.reset();
    } catch (err) {
      setMatchStatus('error');
    }
  }

  async function handleMatchOff() {
    setMatchStatus('sending');
    try {
      await postToMeter({amount: '1', channel: 'MatchOff', note: 'Match off'});
      setMatchStatus('done');
      rememberMatch({
        off: true,
        when: new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}),
      });
    } catch (err) {
      setMatchStatus('error');
    }
  }

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
            about 15 seconds, wherever you are. PayPal and Givebutter add
            themselves, so this page is for everything else.
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

          <div className={styles.sentBox}>
            <h2>Matchers line on the stream</h2>
            <p>
              Set the amount donations are matched up to, and the stream frame
              will say: We are still looking for "matchers"! Donations are
              currently matched up to $X. It updates within about 15 seconds.
              This is not a donation and never adds to the total.
            </p>
            <form onSubmit={handleMatchSubmit} className={styles.form}>
              <label className={styles.field}>
                <span>Matched up to $</span>
                <input type="number" name="matchamount" step="1" min="1" required inputMode="numeric" />
              </label>
              <button type="submit" className={styles.button} disabled={matchStatus === 'sending'}>
                {matchStatus === 'sending' ? 'Setting...' : 'Set the match amount'}
              </button>
            </form>
            <button type="button" className={styles.button} onClick={handleMatchOff} disabled={matchStatus === 'sending'}>
              Hide the matchers line
            </button>
            {matchStatus === 'done' && (
              <p className={styles.done}>Sent! Watch the frame, it should update within about 15 seconds.</p>
            )}
            {matchStatus === 'error' && (
              <p className={styles.error}>
                Something went wrong sending that. Check your connection and try once more.
              </p>
            )}
            {lastMatch && (
              <p>
                {lastMatch.off
                  ? `Matchers line hidden from this device at ${lastMatch.when}.`
                  : `Last set from this device: $${lastMatch.amount} at ${lastMatch.when}.`}
              </p>
            )}
          </div>

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
