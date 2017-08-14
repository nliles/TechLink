import React, { Component } from 'react';
import { render } from 'react-dom';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
		user: {}
    };
  }

	addUser(e) {
		var email = this.state.email; 
		var password = this.state.password;

		fetch('/users/sign_up', {  
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ user: {email, password} })
		})
		.then(function(token) {
	      localStorage.setItem("token", token.auth_token)
	      localStorage.setItem("user_id", token.id)		
		}).catch(function(err) {
		    console.log('Error ocurred', err);
		});
	}

	render() {
		return(
	      <form className="form" onSubmit={(e) => this.addUser(e)}> 
	        <h2>Login</h2><br/>
	        <input type="text" name="email" className="input" placeholder="Email" /><br/><br/>
	        <input type="text" name="password" className="input" placeholder="Password"/><br/><br/>
	        <button type="submit" className="button">Login → </button>
	      </form>
      ) 
	}
}

export default LoginForm;
