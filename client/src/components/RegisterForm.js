import React, { Component } from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom'

class RegisterForm extends Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	    	redirectToNewPage: false
	    };
	  }

	createUser(e) {
		e.preventDefault()
		var email = this.email.value; 
		var password = this.password.value;
		var passwordConfirmation = this.passwordConfirmation.value;
		
		fetch('/users', {  
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({user: { email, password }})
		})
       .then(response => response.json(), this.setState({ redirectToNewPage: true }))
       .then(json => console.log(json))
	      // localStorage.setItem("token", token.auth_token)
	      // localStorage.setItem("user_id", token.id)		
       .catch((err) => console.log(err))
	}

	render() {
	   if (this.state.redirectToNewPage) {
	     return (
	     <Redirect to="/"/>
	     )
	   }
		return(
	      <form className="form" className="centerForm" onSubmit={(e) => this.createUser(e)}> 
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

