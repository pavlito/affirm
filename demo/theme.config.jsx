import { ThemeSwitch } from './src/components/ThemeSwitch';

export default {
  logo: <span style={{ fontWeight: 800, fontSize: 18 }}>affirm</span>,
  project: {
    link: 'https://github.com/pavlito/affirm',
  },
  docsRepositoryBase: 'https://github.com/pavlito/affirm/tree/main/demo',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – affirm',
    };
  },
  search: {
    component: () => null,
  },
  themeSwitch: {
    component: null,
  },
  navbar: {
    extraContent: <ThemeSwitch />,
  },
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} © affirm
      </span>
    ),
  },
  head: () => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="A beautiful confirm dialog for React. One function call, type-safe, and fully customizable." />
      <meta property="og:title" content="affirm" />
      <meta property="og:description" content="A beautiful confirm dialog for React. One function call, type-safe, and fully customizable." />
      <meta property="og:image" content="https://pavlito.github.io/affirm/og.png" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="affirm" />
      <meta name="twitter:description" content="A beautiful confirm dialog for React." />
      <meta name="twitter:image" content="https://pavlito.github.io/affirm/og.png" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/affirm/favicon.ico" />
    </>
  ),
};
