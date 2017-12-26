import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/authActions';
import validateField from "./helpers/formValidation"

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentUser,
}, dispatch);

class RegisterForm extends Component {

  // static propTypes = {
  //   isAuthenticated: PropTypes.bool.isRequired
  // }
  
  constructor(props) {
    super(props);
    this.state = {
      redirectToNewPage: false,
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      showErrors: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
    () => { validateField(name, value, this.state, this.handleChange) });
  }

  handleChange = (arg) => {
        this.setState(arg);
        this.validateForm();
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  handleInvalidSubmit(e) {
    e.preventDefault();
    this.setState({showErrors: true});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const { setCurrentUser } = this.props;
    console.log("handle submit")

    fetch('/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then(response => response.json())
      .then((token) => {
        if (token.errors) {
          console.log(token.errors)
          // Add general error message here
        } else {
          localStorage.setItem('user_id', token.id);
          const user = window.localStorage.getItem('user_id');
          setCurrentUser(user);
          user ? this.setState({ redirectToNewPage: true }) : "";
        }
      })
  }

  render() {
    let redirect = this.state.redirectToNewPage ? <Redirect to='/' /> : ""
    let submitHandler = this.state.formValid ? this.handleSubmit : this.handleInvalidSubmit
    let passwordError = this.state.showErrors && !this.state.passwordValid ? "errorBorder" : "";
    let emailError = this.state.showErrors && !this.state.emailValid ? "errorBorder" : "";
    return (
      <div>
        <form className="userFrom" className="centerForm" onSubmit={submitHandler}>
          <h2>Sign Up</h2><br />

          <input type="text" name="email" placeholder="Email" className={`${emailError} + input`}
           onChange={(e) => this.handleUserInput(e)}  value={this.state.email}/><br /><br />

          <input type="password" name="password" className={`${passwordError} + input`} placeholder="Password" 
           onChange={(e) => this.handleUserInput(e)} value={this.state.password}/><br /><br />

          <button type="submit" className="button">Register → </button>
          {redirect}
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm);

