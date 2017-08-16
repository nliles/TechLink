import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'


class NavBar extends Component {
	logout() {
		const { removeJob } = this.props;
		fetch(`/auth`, {
		  method: 'DELETE',
		  credentials: 'same-origin',
            mode: 'cors',
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			    'Access-Control-Allow-Origin': '*'
			  }
			})       
		   .then(response => console.log(response))		
           .catch(err => console.log(err))
	}



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
		      <li><Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
		      <li><a onClick={e => this.logout(e)} href="#"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
		    </ul>
		  </div>
		</nav>
      ) 
	}
}

export default NavBar;
