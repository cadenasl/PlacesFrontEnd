import MainHeader from './MainHeader'
import {Link} from 'react-router-dom'
import classes from './MainNavigation.module.css'
import NavigationLinks from './Navlink'
import SideDrawer from './SideDrawer'
import React from 'react'
import BackDrop from '../UI Element/Backdrop'
import { useState } from 'react/cjs/react.development'



const MainNavigation=props=>{

    const[sideDrawer,setSideDrawer]=useState(false)

    const openSideDrawerHandler=()=>{
        setSideDrawer(true)
    }

    const closeSideDrawerHandler=()=>{
        setSideDrawer(false)
    }
    return<React.Fragment>
    {sideDrawer&&<BackDrop onClose={closeSideDrawerHandler}/>}
    {sideDrawer&&<SideDrawer onClick={closeSideDrawerHandler} show={sideDrawer}><nav className={classes['main-navigation__drawer-nav']}><NavigationLinks/></nav></SideDrawer>}
<MainHeader>
<button onClick={openSideDrawerHandler} className={classes['main-navigation__menu-btn']}>
    <span/>
    <span/>
    <span/>
</button>
<h1 className={classes["main-navigation__title"]}>
  <Link to='/'>Your Places</Link>  
</h1>
<nav className={classes['main-navigation__header-nav']}>
   <NavigationLinks/>
</nav>

 </MainHeader>   
 </React.Fragment>
}


export default MainNavigation