import React, { Component } from 'react';
import { render } from 'react-dom';


class LoginForm extends Component {

	addUser(e) {
		var email = this.email.value; 
		var password = this.password.value;

		fetch('/auth/sign_in', {  
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ session: { email, password } })
		})
	       .then(response => response.json())
	       .then(json => console.log(json))
		      // localStorage.setItem("token", token.auth_token)
		      // localStorage.setItem("user_id", token.id)		
	      .catch((err) => console.log(err))
	}

	render() {
		return(
		<div>
	      <form className="form" onSubmit={(e) => this.addUser(e)}> 
	        <h2>Login</h2><br/>
	        <input ref={(input) => this.email=input}  type="text" name="email" className="input" placeholder="Email" /><br/><br/>
	        <input ref={(input) => this.password=input} type="password" name="password" className="input" placeholder="Password"/><br/><br/>
	        <button type="submit" className="button">Login → </button>
	      </form>
	    </div>
      ) 
	}
}

export default LoginForm;
