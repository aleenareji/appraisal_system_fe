import React,{useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../../common/history';

const navMenu = [
  { path: '/dashboard/questions', name: 'Questions', icon: 'question-circle' },
  {path: '/dashboard/send-notification', name:' Send Notification',icon:'envelope'},
  // {path: '/dashboard/answers', name:'Add Answers',icon:'reply'}
];

const employeeNavMenu = [
  // { path: '/dashboard/questions', name: 'Questions', icon: 'question-circle' },
  // {path: '/dashboard/send-notification', name:' Send Notification',icon:'envelope'},
  {path: '/dashboard/answers', name:'Add Answers',icon:'reply'}
];
const Navigation = ({ className = null }) => {

  const [role,setRole] = useState("");
  console.log(role,'role in sidebar');

  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
  },[])

  return (
    <ul className={className ? className : ''}>
      <NavLink to="/dashboard" exact={true} activeClassName="active">
        <li>
          <i className="la la-home"></i>
          <p>Home</p>
        </li>
      </NavLink>
      { role ==='hr' ? 
      (navMenu.map((i, index) => (
       <NavLink to={`${i.path}`} activeClassName="active" key={index}>
           <li>
             <i className={`la la-${i.icon}`}></i>
             <p>{i.name}</p>
           </li>
         </NavLink>
       )))
      
      : (employeeNavMenu.map((i, index) => (
        <NavLink to={`${i.path}`} activeClassName="active" key={index}>
            <li>
              <i className={`la la-${i.icon}`}></i>
              <p>{i.name}</p>
            </li>
          </NavLink>
        )))

      }
    </ul>
  );
};

function NavigationBar(props) {
  const onSignout = () => {
    localStorage.removeItem("myToken");
    localStorage.removeItem("userRole");
    history.push('/login');
   }
  return (
    <aside>
      <div className="side-nav-container">
        <div className="company-logo">
          <h3>AS</h3>
        </div>
        <div className="side-navigation">
          <Navigation />
          <div>
            <ExitToAppIcon className="logout" onClick={onSignout}/>
            <p className="logout-text">Logout</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
export default NavigationBar;
