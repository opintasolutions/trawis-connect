import Link from 'next/link';
const Nav = () => (
  <nav>
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
    <style jsx>{`
      nav {
        display: flex;
        justify-content: flex-start;
        padding: 8px;
        background: #19305A;
      }
      li {
        list-style: none;
        font-size: 15px;
        margin: 0 10px;
      }
      nav a {
        text-decoration: none;
        color: white;
      }
    `}</style>
  </nav>
);
export default Nav;
