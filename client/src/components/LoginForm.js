import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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


class LoginForm extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    	redirectToNewPage: false,
    };
  }

  createSession(e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const { setCurrentUser } = this.props;
    fetch('/sessions', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session: { email, password } }),
    })
	       .then(response => response.json())
	       .then((token) => {
			  localStorage.setItem('token', token.auth_token);
			  localStorage.setItem('user_id', token.id);
			  const user = window.localStorage.getItem('user_id');
			  setCurrentUser(user);
      });
	      this.setState({ redirectToNewPage: true });
  }

  render() {
    if (this.state.redirectToNewPage) {
		 return (
  <Redirect to="/" />
		 );
    }
    return (
      <div>
        <form className="form" className="centerForm" onSubmit={e => this.createSession(e)}>
          <h2>Login</h2><br />
          <input ref={input => this.email = input} type="text" name="email" className="input" placeholder="Email" /><br /><br />
          <input ref={input => this.password = input} type="password" name="password" className="input" placeholder="Password" /><br /><br />
          <button type="submit" className="button">Login → </button>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
