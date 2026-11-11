// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  future: {
    experimental_faster: true,
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
  },
  title: 'Helping All Little Things',
  tagline: 'Finding loving homes for small animals.',
  favicon: 'img/favicon.ico',
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'facebook-domain-verification',
        content: 'rtjdkbevsuqbzw61b6ncw62sjf3vww',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'impact-site-verification',
        value: '3984e056-6d0a-4afb-8d7a-49b433245524',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'impact-site-verification',
        value: '78631883-dc71-4c0b-a3c2-3787efb83b99',
      },
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._bq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1504653878382201');
        fbq('track', 'PageView');
      `,
    },
  ],
  url: 'https://helpingalllittlethings.org',
  baseUrl: '/',
  organizationName: 'alannaburke',
  projectName: 'haltrescue',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  clientModules: [
    require.resolve('./src/clientModules/sidebarAccordion.js'),
  ],
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        docsRouteBasePath: '/docs',
        searchBarPosition: 'right',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sanctuary',
        path: 'sanctuary',
        routeBasePath: 'sanctuary',
        sidebarPath: require.resolve('./sidebars.js'),
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'case-studies',
        path: 'case-studies',
        routeBasePath: 'case-studies',
        sidebarPath: require.resolve('./sidebars.js'),
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        pages: {},
        gtag: {
          trackingID: 'G-HQ72J4FN3J',
          anonymizeIP: true,
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
      image: 'img/social_card.png',
      navbar: {
        title: 'Helping All Little Things',
        logo: {
          alt: 'Helping All Little Things Logo',
          src: 'img/logo-square.png',
        },
        items: [
          {to: '/adoptables', label: 'Adopt', position: 'left'},
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Resources & Education',
          },
          {
            type: 'dropdown',
            label: 'Stories, Blogs & Updates',
            position: 'left',
            items: [
              {to: '/blog', label: 'Blog'},
              {to: '/success-stories', label: 'Success Stories'},
              {
                type: 'docSidebar',
                sidebarId: 'sanctuarySidebar',
                docsPluginId: 'sanctuary',
                label: 'Sanctuary',
              },
              {
                type: 'docSidebar',
                sidebarId: 'caseStudiesSidebar',
                docsPluginId: 'case-studies',
                label: 'Case Studies',
              },
            ],
          },
          {to: '/about', label: 'About', position: 'left'},
          {type: 'custom-shop-donate', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Rescue',
            items: [
              {label: 'Adoption/Foster Application', href: 'https://bit.ly/halt-adoption'},
              {label: 'Surrender a Pet', href: 'https://bit.ly/halt-surrender'},
              {label: 'Adoptable Animals', to: '/adoptables'},
              {label: 'Petfinder', href: 'https://www.petfinder.com/member/us/nh/deerfield/helping-all-little-pipsqueaks-nj654/'},
              {label: 'Success Stories', to: '/success-stories'},
            ],
          },
          {
            title: 'Follow Us',
            items: [
              {label: 'Facebook', href: 'https://www.facebook.com/HALTRescue/'},
              {label: 'Instagram', href: 'https://www.instagram.com/helpingalllittlethings/'},
              {label: 'Mastodon', href: 'https://mstdn.social/@haltrescue'},
              {label: 'BlueSky', href: 'https://bsky.app/profile/haltrescue.bsky.social'},
              {label: 'Threads', href: 'https://www.threads.com/@helpingalllittlethings'},
              {label: 'TikTok', href: 'https://www.tiktok.com/@helpingalllittlethings'},
              {label: 'YouTube', href: 'https://www.youtube.com/@HelpingAllLittleThings'},
              {label: 'Sign up for our Newsletter', href: 'https://helpingalllittlethings.org/signup'},
            ],
          },
          {
            title: 'Donate',
            items: [
              {label: 'PayPal', href: 'https://www.paypal.com/ncp/payment/8SJFNZQVMQ452'},
              {label: 'Venmo', href: 'https://account.venmo.com/u/haltrescue'},
              {label: 'CashApp', href: 'https://cash.app/$Haltrescue'},
              {label: 'Amazon Wish List', href: 'https://bit.ly/halt-piggies'},
              {label: 'Chewy Wish List', href: 'https://www.chewy.com/g/helping-all-little-things_b129784992'},
              {label: 'Gift Card for Veggies', href: 'https://giftcards.shopmarketbasket.com/products/mb-gift-card-fresh-produce'},
              {label: 'Patreon', href: 'https://www.patreon.com/cw/helpingalllittlethingsrescue'},
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
