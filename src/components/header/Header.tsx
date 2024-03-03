import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { NavItem } from './HeadertType';

const headerNav: NavItem[] = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'History',
    path: '/history'
  }
];

const Header = () => {
  const { pathname } = useLocation();
  const active: number = headerNav.findIndex((e: NavItem) => e.path === pathname);

  return (
    <header>
      <nav className='header__nav'>
      <ul className='header__ul'>
          {
            headerNav.map((e, i) => (
              <li key={i}>
                <Link to={e.path} className={i === active ? 'active' : ''}>
                  {e.display}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
