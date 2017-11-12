import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/authActions';

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
    () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'You must provide a valid email';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'Password must be at least 6 characters.';
        break;
      default:
        break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  passwordValid: passwordValid
                }, this.validateForm);
}

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  handleInvalidSubmit(e) {
    e.preventDefault();
    this.setState({showErrors: true});
  }

  handleSubmit(e) {
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
      .then(response => response.json(), 
      this.setState({ redirectToNewPage: true }))
      .then((token) => {
        localStorage.setItem('token', token.auth_token);
        localStorage.setItem('user_id', token.id);
        const user = window.localStorage.getItem('user_id');
        setCurrentUser(user);
      })
      .catch(err => console.log(err));
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
        
        <input ref={input => this.email = input} type="text" name="email" placeholder="Email" 
         className={`${emailError} + input`}
         onChange={(e) => this.handleUserInput(e)}  value={this.state.email}/><br /><br />


        <input ref={input => this.password = input} type="password" name="password"
        className={`${passwordError} + input`} placeholder="Password" 
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

