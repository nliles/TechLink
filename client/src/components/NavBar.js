import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'


class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: window.localStorage.getItem("user_id")
		};
	}

	logout(e) {
		e.preventDefault();
		fetch(`/users/sign_out.json`, {
			method: 'DELETE',
			credentials: 'same-origin',
			mode: 'cors'
		})       
		.then(response => console.log(response),
			 window.localStorage.removeItem("user_id"),
			 window.localStorage.removeItem("token"),
			 this.setState({ user: null })
		)		
	}
//Nav bar login logic works and displays correctly but only works dynamically for logout. I was planning on using 
//redux to solve this issue for login/sign up

	render() {
		let logInNav
			if (this.state.user == null) {
				logInNav = 
				    <ul className="nav navbar-nav navbar-right">
				      <li><Link to={'/users/new'}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
				      <li><Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span>Login</Link></li>
				    </ul> 
			} else {
			    logInNav = 
				    <ul className="nav navbar-nav navbar-right">
				      <li><a onClick={e => this.logout(e)} href=""><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
				    </ul>
			}
		return(
			<nav className="navbar navbar-inverse">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <a className="navbar-brand" href="/">TechLink</a>
			    </div>
			    <ul className="nav navbar-nav">
			      <li className="active"><a href="/">Jobs</a></li>
			    </ul>
			    {logInNav}
			  </div>
			</nav>
      ) 
	}
}

export default NavBar;
