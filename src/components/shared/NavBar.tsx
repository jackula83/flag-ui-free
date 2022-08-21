import React from 'react';
import LogoMini from '../../assets/images/logo-mini.svg'

const NavBar: React.FC<any> = () => {
  return (
    <>
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 d-flex flex-row fixed-top">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="#">
            <img src={LogoMini} alt="logo" />
            FlagCar
          </a>
          <a className="navbar-brand brand-logo-mini" href="#">
            <img src={LogoMini} alt="logo" />
          </a>
        </div>
      </nav>
    </>
  )
}

export default NavBar;