import Head from 'next/head';
import Nav from './nav';

const Layout = ({children, title}) => (
  <>
    <Head>
      <title>{title ? `${title} |` : ''} Trawis Connect</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <Nav />
    <div>{children}</div>
    <style jsx global>{`
      @import url('https://rsms.me/inter/inter.css');
      body {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
      }
      button {
        border: none;
        margin: 10px;
        background: #cdd;
        border-radius: 4px;
        cursor: pointer;
        padding: 10px;
      }
    `}</style>
  </>
);

export default Layout;
