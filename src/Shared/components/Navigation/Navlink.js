import { NavLink } from "react-router-dom";
import classes from './Navlink.module.css'
import{useContext} from 'react'
import authContext from '../../context/context'
import Button from "../FormElements/Button";

const NavigationLinks = (props) => {
  const Ctx=useContext(authContext)
  
  return (
    <ul className={classes['nav-links']}>
      <li>
      <NavLink to='/' exact> All Users</NavLink>
    </li>
    {Ctx.isAuth&&<li>
      <NavLink to={`/${Ctx.userId}/places`} exact> My Places</NavLink>
    </li>}
    {Ctx.isAuth&&<li>
      <NavLink to='/places/new' exact> Add Places</NavLink>
    </li>}
   {!Ctx.isAuth&&<li>
      <NavLink to='/Authenticate' exact> Authenticate</NavLink>
    </li>}
     {Ctx.isAuth&&<li><Button onClick={Ctx.isLoggedout}>Logout</Button></li>}
    </ul>
  );
};

export default NavigationLinks
