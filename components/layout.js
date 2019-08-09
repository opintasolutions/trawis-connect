import Head from 'next/head';
import Link from 'next/link';

const Layout = ({children, title}) => (
  <>
    <Head>
      <title>{title ? `${title} |` : ''} Trawis Connect</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <a>Sign Up</a>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </li>
      </ul>
    </nav>
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
