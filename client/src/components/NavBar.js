import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/authActions';

function mapStateToProps(state) {
  return {
  	auth: state.auth,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentUser,
}, dispatch);


class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  logout(e) {
    e.preventDefault();
    const { setCurrentUser } = this.props;
    fetch('/users/sign_out.json', {
      method: 'DELETE',
      credentials: 'same-origin',
      mode: 'cors',
    })
      .then(
        response => console.log(response),
			 window.localStorage.removeItem('user_id'),
			 window.localStorage.removeItem('token'),
			 setCurrentUser(undefined),
      );
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const logOutNav =
      (<ul className="nav navbar-nav navbar-right">
        <li><a onClick={e => this.logout(e)} href=""><span className="glyphicon glyphicon-log-out" /> Logout</a></li>
      </ul>);
			    const logInNav =
  (<ul className="nav navbar-nav navbar-right">
    <li><Link to="/users/new"><span className="glyphicon glyphicon-user" /> Sign Up</Link></li>
    <li><Link to="/login"><span className="glyphicon glyphicon-log-in" />Login</Link></li>
   </ul>);
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">TechLink</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><a href="/">Jobs</a></li>
          </ul>
          {isAuthenticated ? logOutNav : logInNav}
        </div>
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
