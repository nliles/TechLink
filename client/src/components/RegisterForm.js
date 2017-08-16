import React, { Component } from 'react';
import { render } from 'react-dom';

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
		user: {}
    };
  }

	addUser(e) {
		e.preventDefault()
		var email = this.email.value; 
		var password = this.password.value;
		var passwordConfirmation = this.passwordConfirmation.value;
		
		fetch('/auth', {  
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ email, password, passwordConfirmation})
		})
      .then(token => console.log(token))
	      // localStorage.setItem("token", token.auth_token)
	      // localStorage.setItem("user_id", token.id)		
      .catch((err) => console.log(err))
	}

	render() {
		return(
	      <form className="form" onSubmit={(e) => this.addUser(e)}> 
	        <h2>Sign Up</h2><br/>
	        <input ref={(input) => this.email=input} type="text" name="email" className="input" placeholder="Email" /><br/><br/>
	        <input ref={(input) => this.password=input} type="password" name="password" className="input" placeholder="Password"/><br/><br/>
	        <input ref={(input) => this.passwordConfirmation=input} type="password" name="passwordConfirmation" className="input" placeholder="Password"/><br/><br/>	
	        <button type="submit" className="button">Register → </button>
	      </form>
      ) 
	}
}

export default RegisterForm;

