import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocaleConfig} from '@docusaurus/theme-common';

const LOCALE_CODES = {
  en: 'EN',
  'zh-Hans': 'ZH',
  fr: 'FR',
  es: 'ES',
  de: 'DE',
  pl: 'PL',
  'pt-BR': 'PT',
  nl: 'NL',
  ru: 'RU',
  cs: 'CS',
  ja: 'JP',
};

function buildLocalizedPath(pathname, targetLocale, defaultLocale, locales) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const segments = cleanPath.split('/').filter(Boolean);
  const localePrefix = segments[0];

  const pathWithoutLocale = locales.includes(localePrefix)
    ? segments.slice(1)
    : segments;

  const tail = pathWithoutLocale.length > 0 ? `/${pathWithoutLocale.join('/')}` : '/';
  return targetLocale === defaultLocale ? tail : `/${targetLocale}${tail}`;
}

export default function LocaleDropdownNavbarItem() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const {locale, locales, localeConfigs} = useLocaleConfig();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const currentCode = LOCALE_CODES[locale] || locale.toUpperCase();
  const currentLabel = localeConfigs[locale]?.label || locale;

  const handleLocaleChange = (nextLocale) => {
    const nextPath = buildLocalizedPath(
      location.pathname,
      nextLocale,
      siteConfig.i18n.defaultLocale,
      locales,
    );

    const targetUrl = `${nextPath}${location.search}${location.hash}`;
    window.location.assign(targetUrl);
  };

  return (
    <div ref={menuRef} className="navbar__item navbar__locale-dropdown">
      <button
        type="button"
        className="navbar__link navbar__locale-button"
        aria-label={`Select language. Current language: ${currentLabel}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          className="navbar__locale-globe"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="navbar__locale-current">{currentCode}</span>
        <svg
          className="navbar__locale-caret"
          viewBox="0 0 12 12"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M2 4.5L6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="navbar__locale-menu" role="menu" aria-label="Language selector">
          {locales.map((item) => {
            const itemLabel = localeConfigs[item]?.label || item;
            const isSelected = item === locale;

            return (
              <li key={item} className="navbar__locale-menu-item" role="none">
                <button
                  type="button"
                  className={`navbar__locale-menu-button${isSelected ? ' navbar__locale-menu-button--active' : ''}`}
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onClick={() => {
                    setOpen(false);
                    handleLocaleChange(item);
                  }}
                >
                  <span className="navbar__locale-menu-code">{LOCALE_CODES[item] || item.toUpperCase()}</span>
                  <span className="navbar__locale-menu-name">{itemLabel}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
