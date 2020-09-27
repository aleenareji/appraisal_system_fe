import React from 'react';
import { NavLink } from 'react-router-dom';

const navMenu = [
  { path: '/dashboard/questions', name: 'Questions', icon: 'question-circle' },
  {path: '/dashboard/send-notification', name:' Send Notification',icon:'envelope'},
];
const Navigation = ({ className = null }) => {
  return (
    <ul className={className ? className : ''}>
      <NavLink to="/dashboard" exact={true} activeClassName="active">
        <li>
          <i className="la la-home"></i>
          <p>Home</p>
        </li>
      </NavLink>
      {navMenu.map((i, index) => (
        <NavLink to={`${i.path}`} activeClassName="active" key={index}>
          <li>
            <i className={`la la-${i.icon}`}></i>
            <p>{i.name}</p>
          </li>
        </NavLink>
      ))}
    </ul>
  );
};

function NavigationBar(props) {
  return (
    <aside>
      <div className="side-nav-container">
        <div className="company-logo">
          <h3>AS</h3>
        </div>
        <div className="side-navigation">
          <Navigation />
        </div>
      </div>
    </aside>
  );
}
export default NavigationBar;
