// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Helping All Little Things',
  tagline: 'Finding loving homes for small animals.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AlannaBurke', // Usually your GitHub org/user name.
  projectName: 'haltrescue', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Helping All Little Things',
        logo: {
          alt: 'Helping All Little Things Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          {to: '/blog', label: 'Blog', position: 'left'},
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Rescue',
            items: [
              {
                label: 'Adoption/Foster Application',
                href: 'https://bit.ly/halt-adoption',
              },
              {
                label: 'Surrender a Pet',
                href: 'https://bit.ly/halt-surrender',
              },
              {
                label: 'Petfinder',
                href: 'https://www.petfinder.com/member/us/nh/deerfield/helping-all-little-pipsqueaks-nj654/',
              },
            ],
          },
          {
            title: 'Follow Us',
            items: [
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/HALPRescue/',
              }, 
              {
                label: 'Twitter',
                href: 'https://twitter.com/halfrescue',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/halfrescue/',
              },
              {
                label: 'Mastodon',
                href: 'https://mstdn.social/@haltrescue',
              },
            ],
          },
          {
            title: 'Donate',
            items: [
              {
                label: 'PayPal',
                href: 'https://www.paypal.com/ncp/payment/8SJFNZQVMQ452',
              },
              {
                label: 'Venmo',
                href: 'https://account.venmo.com/u/haltrescue',
              },
              {
                label: 'CashApp',
                href: 'https://cash.app/$Haltrescue',
              },
              {
                label: 'Amazon Wish List',
                href: 'https://bit.ly/halt-piggies',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Helping All Little Things.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
