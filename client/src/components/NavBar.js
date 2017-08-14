import React, { Component } from 'react';
import { render } from 'react-dom';
import { Modal } from 'react-bootstrap';







class NavBar extends Component {
	render() {
		return(
		<nav className="navbar navbar-inverse">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <a className="navbar-brand" href="#">TechLink</a>
		    </div>
		    <ul className="nav navbar-nav">
		      <li className="active"><a href="/">Jobs</a></li>
		    </ul>
		    <ul className="nav navbar-nav navbar-right">
		      <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
		      <li><a href="#"><span className="glyphicon glyphicon-log-in"></span>Login</a></li>
		    </ul>
		  </div>
		</nav>
      ) 
	}
}

export default NavBar;
