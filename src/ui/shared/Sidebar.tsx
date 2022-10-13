import React, {useState, useEffect} from 'react';
import { Link, useLocation } from "react-router-dom";
import { NavItem } from 'reactstrap';
import { FlagListRoute, SegmentRoute } from 'pages/routes';
import { IconStyle } from 'ui/common/icons';
import { Icon } from 'ui/Icon';

const Sidebar = () => {

  const location = useLocation();

  const createNavLink = (title: string, icon: IconStyle, path: string) => {
    const isActive = location.pathname === path;
    return (
      <NavItem className={isActive ? 'active' : ''} key={title}>
        <Link to={path} className="nav-link">
          <span className='menu-title'>{title}</span>
          <Icon icon={icon} isMenuIcon={true} />
        </Link>
      </NavItem>
    );
  }

  const createNavLinks = () => {
    return [
      createNavLink('Dashboard', IconStyle.Home, '/'),
      createNavLink('Feature Flags', IconStyle.Flag, `${FlagListRoute}`),
      createNavLink('Segments', IconStyle.PieChart, SegmentRoute)
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