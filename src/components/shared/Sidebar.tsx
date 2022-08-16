import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

const SideBar: React.FC<any> = () => {
  return (
    <>
        <nav className='sidebar sidebar-offcanvas' id='sidebar'>
          <ul className='nav'>
            <NavItem className='active'>
              <NavLink href='#'>
                <span className='menu-title'>Dashboard</span>
                <i className='mdi mdi-home menu-icon'></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#'>
                <span className='menu-title'>Feature Flags</span>
                <i className='mdi mdi-flag-variant menu-icon'></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#'>
                <span className='menu-title'>Segments</span>
                <i className='mdi mdi-chart-pie menu-icon'></i>
              </NavLink>
            </NavItem>
          </ul>
        </nav>
    </>
  )
}

export default SideBar