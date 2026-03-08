import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

/**
 * InfographicShare — a row of social sharing buttons for infographics.
 *
 * Props:
 *   imageSrc  — absolute path to the infographic image (e.g. "/img/guinea-pigs/dental-causes.png")
 *               Used as the Pinterest media URL. Falls back to the page's OG image.
 *   title     — optional custom share title. Defaults to the page <title>.
 *
 * Usage in .mdx files (no import needed — globally registered):
 *
 *   <InfographicShare imageSrc="/img/guinea-pigs/dental-causes.png" />
 */

const SITE_URL = 'https://helpingalllittlethings.org';

function getAbsoluteImageUrl(imageSrc) {
  if (!imageSrc) return '';
  if (imageSrc.startsWith('http')) return imageSrc;
  return `${SITE_URL}${imageSrc}`;
}

function ShareButton({ href, label, icon, color, onClick }) {
  const handleClick = useCallback((e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }
    e.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer,width=600,height=500');
  }, [href, onClick]);

  return (
    <a
      href={href || '#'}
      className={styles.shareBtn}
      style={{ '--btn-color': color }}
      onClick={handleClick}
      aria-label={`Share on ${label}`}
      title={`Share on ${label}`}
      rel="noopener noreferrer"
    >
      <span className={styles.shareBtnIcon} dangerouslySetInnerHTML={{ __html: icon }} />
      <span className={styles.shareBtnLabel}>{label}</span>
    </a>
  );
}

export default function InfographicShare({ imageSrc, title: customTitle }) {
  const [copied, setCopied] = useState(false);

  // Build share URLs client-side so we always get the current page URL
  const pageUrl = typeof window !== 'undefined' ? window.location.href : SITE_URL;
  const pageTitle = customTitle || (typeof document !== 'undefined' ? document.title : 'Helping All Little Things');
  const imageUrl = getAbsoluteImageUrl(imageSrc);

  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(pageTitle)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle + ' via @HelpingAllLittleThings')}`;
  const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(pageTitle)}`;

  const handleCopyLink = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(pageUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [pageUrl]);

  // SVG icons (inline to avoid extra asset deps)
  const icons = {
    pinterest: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    reddit: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>`,
  };

  return (
    <div className={styles.wrapper} aria-label="Share this infographic">
      <span className={styles.label}>Share this infographic:</span>
      <div className={styles.buttons}>
        <ShareButton
          href={pinterestUrl}
          label="Pinterest"
          icon={icons.pinterest}
          color="#E60023"
        />
        <ShareButton
          href={facebookUrl}
          label="Facebook"
          icon={icons.facebook}
          color="#1877F2"
        />
        <ShareButton
          href={twitterUrl}
          label="X / Twitter"
          icon={icons.twitter}
          color="#000000"
        />
        <ShareButton
          href={redditUrl}
          label="Reddit"
          icon={icons.reddit}
          color="#FF4500"
        />
        <ShareButton
          href="#"
          label={copied ? 'Copied!' : 'Copy Link'}
          icon={copied ? icons.check : icons.copy}
          color={copied ? '#00A878' : '#6B7280'}
          onClick={handleCopyLink}
        />
      </div>
    </div>
  );
}
