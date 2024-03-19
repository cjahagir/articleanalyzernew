import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#F0F0F0', padding: '20px', borderRadius: '10px' }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <b>{props.title}</b>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                {props.about}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/connectus">
                {props.connectus}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  connectus: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: 'Set title here',
  about: 'Set about here',
  connectus: 'Set connect here'
};

export default Navbar;
