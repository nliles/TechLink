import React, { Component } from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/authActions';

function mapStateToProps(state) {
  return {
  	isAuthenticated: state.isAuthenticated,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentUser,
}, dispatch);

class RegisterForm extends Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	    	redirectToNewPage: false,
	    };
	  }

  createUser(e) {
    const email = this.email.value;
    const password = this.password.value;
    const { setCurrentUser } = this.props;

    fetch('/users', {
			  method: 'POST',
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ user: { email, password } }),
    })
      .then(response => response.json(), this.setState({ redirectToNewPage: true }))
      .then((token) => {
		      localStorage.setItem('token', token.auth_token);
		      localStorage.setItem('user_id', token.id);
			  const user = window.localStorage.getItem('user_id');
			  setCurrentUser(user);
      })
      .catch(err => console.log(err));
  }

  render() {
	   if (this.state.redirectToNewPage) {
	     return (
  <Redirect to="/" />
	     );
	   }
    return (
      <form className="form" className="centerForm" onSubmit={e => this.createUser(e)}>
        <h2>Sign Up</h2><br />
        <input ref={input => this.email = input} type="text" name="email" className="input" placeholder="Email" /><br /><br />
        <input ref={input => this.password = input} type="password" name="password" className="input" placeholder="Password" /><br /><br />
        <button type="submit" className="button">Register → </button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm);

