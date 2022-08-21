import React, {useState, useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";
import { NavItem } from 'reactstrap';

export const FlagPath = '/flags'
export const SegmentPath = '/segments'

const SideBar: React.FC<any> = () => {

  const location = useLocation();

  const LinkItem = (title: string, icon: string, path: string) => {
    const isActive = location.pathname === path;
    return (
      <NavItem className={isActive ? 'active' : ''} key={title}>
        <Link to={path} className="nav-link">
          <span className='menu-title'>{title}</span>
          <i className={`mdi menu-icon ${icon}`}></i>
        </Link>
      </NavItem>
    );
  }

  const createLinks = () => {
    return [
      LinkItem('Dashboard', 'mdi-home', '/'),
      LinkItem('Feature Flags', 'mdi-flag-variant', FlagPath),
      LinkItem('Segments', 'mdi-chart-pie', SegmentPath)
    ];
  }

  useEffect(() => {
    setLinks(createLinks())
  }, [location.pathname])

  const [links, setLinks] = useState<JSX.Element[]>(createLinks());

  return (
    <>
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <ul className='nav'>
          {links}
        </ul>
      </nav>
    </>
  )
}

export default SideBar