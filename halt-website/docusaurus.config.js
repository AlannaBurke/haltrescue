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
  url: 'https://helpingalllittlethings.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alannaburke', // Usually your GitHub org/user name.
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
         // editUrl:
         //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        //  editUrl:
       //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      image: 'img/social_card.png',
      navbar: {
        title: 'Helping All Little Things',
        logo: {
          alt: 'Helping All Little Things Logo',
          src: 'img/logo-transparent.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Resources',
          },
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
                href: 'https://www.facebook.com/HALTRescue/',
              }, 
              {
                label: 'Twitter',
                href: 'https://twitter.com/HALT__rescue',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/helpingalllittlethings/',
              },
              {
                label: 'Mastodon',
                href: 'https://mstdn.social/@haltrescue',
              },
              {
                label: 'BlueSky',
                href: 'https://bsky.app/profile/haltrescue.bsky.social',
              },
              {
                label: 'Sign up for our Newsletter',
                href: 'https://subscribepage.io/halt',
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
              {
                label: 'Chewy Wish List',
                href: 'https://www.chewy.com/g/helping-all-little-things_b129784992',
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
