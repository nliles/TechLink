import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'


class NavBar extends Component {
	render() {
		return(
		<nav className="navbar navbar-inverse">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <a className="navbar-brand" href="/">TechLink</a>
		    </div>
		    <ul className="nav navbar-nav">
		      <li className="active"><a href="/">Jobs</a></li>
		    </ul>
		    <ul className="nav navbar-nav navbar-right">
		      <li><Link to={'/users/new'}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
		      <li><Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span>Login</Link></li>
		    </ul>
		  </div>
		</nav>
      ) 
	}
}

export default NavBar;
