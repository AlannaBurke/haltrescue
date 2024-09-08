import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/haltrescue/blog',
    component: ComponentCreator('/haltrescue/blog', 'a4a'),
    exact: true
  },
  {
    path: '/haltrescue/blog/announce',
    component: ComponentCreator('/haltrescue/blog/announce', 'fce'),
    exact: true
  },
  {
    path: '/haltrescue/blog/archive',
    component: ComponentCreator('/haltrescue/blog/archive', '6cb'),
    exact: true
  },
  {
    path: '/haltrescue/blog/authors',
    component: ComponentCreator('/haltrescue/blog/authors', 'f2f'),
    exact: true
  },
  {
    path: '/haltrescue/blog/authors/aburke',
    component: ComponentCreator('/haltrescue/blog/authors/aburke', '21d'),
    exact: true
  },
  {
    path: '/haltrescue/blog/tags',
    component: ComponentCreator('/haltrescue/blog/tags', '3c3'),
    exact: true
  },
  {
    path: '/haltrescue/blog/tags/news',
    component: ComponentCreator('/haltrescue/blog/tags/news', '197'),
    exact: true
  },
  {
    path: '/haltrescue/markdown-page',
    component: ComponentCreator('/haltrescue/markdown-page', '28d'),
    exact: true
  },
  {
    path: '/haltrescue/docs',
    component: ComponentCreator('/haltrescue/docs', 'cff'),
    routes: [
      {
        path: '/haltrescue/docs',
        component: ComponentCreator('/haltrescue/docs', '0a7'),
        routes: [
          {
            path: '/haltrescue/docs',
            component: ComponentCreator('/haltrescue/docs', '0df'),
            routes: [
              {
                path: '/haltrescue/docs/category/tutorial---basics',
                component: ComponentCreator('/haltrescue/docs/category/tutorial---basics', 'ac3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/category/tutorial---extras',
                component: ComponentCreator('/haltrescue/docs/category/tutorial---extras', '1e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/intro',
                component: ComponentCreator('/haltrescue/docs/intro', 'abe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/haltrescue/docs/tutorial-basics/congratulations', 'bf9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/haltrescue/docs/tutorial-basics/create-a-blog-post', 'b5c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/haltrescue/docs/tutorial-basics/create-a-document', '56b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/haltrescue/docs/tutorial-basics/create-a-page', '981'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/haltrescue/docs/tutorial-basics/deploy-your-site', '3a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/haltrescue/docs/tutorial-basics/markdown-features', '28b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/haltrescue/docs/tutorial-extras/manage-docs-versions', 'd21'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/haltrescue/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/haltrescue/docs/tutorial-extras/translate-your-site', 'f18'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/haltrescue/',
    component: ComponentCreator('/haltrescue/', '0f3'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
