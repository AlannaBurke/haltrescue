import React, {useState} from 'react';
import Layout from '@theme/Layout';
import styles from './signup.module.css';

// Public Apps Script endpoint for the HALT signup system (same Sheet,
// Sender sync, and welcome text as the Google Form used). Filled in at
// build time from the "HALT Website Signup Endpoint v1" deployment.
const ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbzwYhfb_x6jF1gnLCNut355sBv01dCeAvgOm-O21jqTuGCRx8lyD3LpNetN-Fucisy9/exec';

export default function Signup() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const form = e.target;
    const data = new FormData(form);

    const emailNewsletter = data.get('emailNewsletter') === 'on';
    const infoTexts = data.get('infoTexts') === 'on';
    const promoTexts = data.get('promoTexts') === 'on';
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();

    if (!emailNewsletter && !infoTexts && !promoTexts) {
      setError('Please tick at least one box so we know what to send you.');
      return;
    }
    if (emailNewsletter && !email) {
      setError('You ticked Email Newsletter, so please add your email address.');
      return;
    }
    if ((infoTexts || promoTexts) && !phone) {
      setError('You ticked text updates, so please add your mobile phone number.');
      return;
    }

    const body = new URLSearchParams();
    body.set('firstName', (data.get('firstName') || '').toString().trim());
    body.set('lastName', (data.get('lastName') || '').toString().trim());
    body.set('email', email);
    body.set('phone', phone);
    if (emailNewsletter) body.set('emailNewsletter', 'on');
    if (infoTexts) body.set('infoTexts', 'on');
    if (promoTexts) body.set('promoTexts', 'on');
    body.set('agreement', data.get('agreement') === 'on' ? 'on' : '');
    body.set('website', (data.get('website') || '').toString());

    setStatus('sending');
    try {
      await fetch(ENDPOINT_URL, {method: 'POST', mode: 'no-cors', body});
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError('Something went wrong sending the form. Please try again, or email us at hello@helpingalllittlethings.org and we will add you.');
    }
  }

  return (
    <Layout
      title="Sign Up for Updates"
      description="Sign up for updates from Helping All Little Things. Choose email, texts, or both. We send rescue news, sanctuary stories, care tips, and the occasional fundraiser or auction alert.">
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>Stay Connected with the Rescue</h1>
          <p>
            Sign up for updates from Helping All Little Things. Choose email,
            texts, or both. We send rescue news, sanctuary stories, care tips,
            and the occasional fundraiser or auction alert.
          </p>

          {status === 'done' ? (
            <div className={styles.success}>
              <h2>You're signed up!</h2>
              <p>
                Thank you for joining us. If you signed up for texts, a welcome
                text will confirm your subscription. Email friends, watch your
                inbox for the next newsletter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} action={ENDPOINT_URL} method="post" className={styles.form}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>First Name *</span>
                  <input type="text" name="firstName" required autoComplete="given-name" />
                </label>
                <label className={styles.field}>
                  <span>Last Name *</span>
                  <input type="text" name="lastName" required autoComplete="family-name" />
                </label>
              </div>

              <label className={styles.field}>
                <span>Email Address</span>
                <input type="email" name="email" autoComplete="email" />
              </label>

              <label className={styles.field}>
                <span>Mobile Phone Number</span>
                <input type="tel" name="phone" autoComplete="tel" />
              </label>

              <fieldset className={styles.choices}>
                <legend>What would you like to receive?</legend>
                <label className={styles.check}>
                  <input type="checkbox" name="emailNewsletter" />
                  <span><strong>Email Newsletter</strong>, rescue news and stories by email.</span>
                </label>
                <label className={styles.check}>
                  <input type="checkbox" name="infoTexts" />
                  <span><strong>Informational Text Updates</strong>, rescue and sanctuary updates by text.</span>
                </label>
                <label className={styles.check}>
                  <input type="checkbox" name="promoTexts" />
                  <span><strong>Promotional &amp; Fundraising Text Updates</strong>, fundraiser, auction, and shop alerts by text.</span>
                </label>
              </fieldset>

              <p className={styles.disclosure}>
                By ticking a text updates box and submitting this form, you agree
                to receive informational and/or promotional text messages from
                Helping All Little Things Rescue at the mobile number you
                provided. Message frequency varies, up to 4 msgs/month. Msg &amp;
                data rates may apply. Reply HELP for help, STOP to cancel.
                Consent is not a condition of any purchase or donation.
              </p>

              <label className={styles.check}>
                <input type="checkbox" name="agreement" required />
                <span>
                  I agree to the <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a> and{' '}
                  <a href="/terms-of-service" target="_blank" rel="noreferrer">Terms of Service</a>. *
                </span>
              </label>

              {/* Honeypot: real people leave this empty. */}
              <div className={styles.honeypot} aria-hidden="true">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {error ? <p className={styles.error}>{error}</p> : null}

              <button type="submit" className="button button--primary button--lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Signing you up...' : 'Sign Up'}
              </button>
            </form>
          )}
        </div>
      </main>
    </Layout>
  );
}
