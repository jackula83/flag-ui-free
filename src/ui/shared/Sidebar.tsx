import React, {useState, useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";
import { NavItem } from 'reactstrap';
import { FlagListRoute, SegmentRoute } from 'pages/routes';

const Sidebar = () => {

  const location = useLocation();

  const createNavLink = (title: string, icon: string, path: string) => {
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

  const createNavLinks = () => {
    return [
      createNavLink('Dashboard', 'mdi-home', '/'),
      createNavLink('Feature Flags', 'mdi-flag-variant', `${FlagListRoute}`),
      createNavLink('Segments', 'mdi-chart-pie', SegmentRoute)
    ];
  }

  useEffect(() => {
    setLinks(createNavLinks())
  }, [location.pathname])

  const [links, setLinks] = useState<JSX.Element[]>(createNavLinks());

  return (
    <>
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <ul className='nav fixed-top'>
          {links}
        </ul>
      </nav>
    </>
  )
}

export default Sidebar