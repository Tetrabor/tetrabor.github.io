import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const organizationName = "Tetrabor";
const projectName = "tetrabor.github.io";



const config: Config = {
  title: 'Michael Sheleman',
  tagline: 'Senior Technical Writer | SaaS | APIs | AI Ready',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://msheleman.com',
  baseUrl: '/',


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Tetrabor', // Usually your GitHub org/user name.
  projectName: 'msheleman.github.io', // Usually your repo name.
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
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/${organizationName}/${projectName}/tree/main/',
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
            'https://github.com/${organizationName}/${projectName}/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    metadata: [
      {name: 'keywords', content: 'Michael Sheleman, sheleman, resume, portolfio'},
    ],
    headTags: [
      // Declare some json-ld structured data
      {
        tagName: 'script',
        attributes: {
          type: 'application/ld+json',
        },
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'ProfilePage',
          name: "Michael Sheleman's Resume and Portfolio",
          url: 'https://msheleman.com/',
        }),
      },
    ],
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: "Michael Sheleman's Portfolio",
      logo: {
        alt: 'My Site Logo',
        src: 'img/michaelShelemanBig.png',
      },
      items: [
        {to: '/docs/Resume', label: 'Resume', position: 'left'},
        {to: '/docs/Portfolio', label: 'Portfolio', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/docs/Contact', label: 'Contact', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Tetrabor',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Michael Sheleman, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;