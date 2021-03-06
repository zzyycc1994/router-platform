'use strict';

const React = require('react');
const { Component } = require('react');
const { render } = require('react-dom');
const { browserHistory, Router, Route, IndexRoute, Link } = require('react-router');

const UserActions = require('../actions/UserActions');
const md5 = require('md5');
const request = require('../utils/http');
const ListStore = require('../stores/ListStore');

class Login extends Component {
  constructor() {
    super();

    this.submitHandle = this.submitHandle.bind(this);
    this.resetClass = this.resetClass.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }

  submitHandle(event) {
    event.preventDefault();
    this.userLogin();
  }

  resetClass(event) {
    let component = event.target;
    component.parentNode.classList.remove("has-error");
    component.setAttribute("placeholder", component.parentNode.parentNode.firstChild.innerHTML);
  }

  userLogin() {
    let data = {
      password: md5(this.refs.password.value),
      email: this.refs.email.value,
      remember: this.refs.remember.checked ? "true" : "false",
    }
    request.get(`/api/login`, data).then((res) => {
      UserActions.login(res);
      browserHistory.push('/');
    }, (err) => {
      this.refs.password.parentNode.classList.add("has-error");
      this.refs.password.value = "";
      this.refs.password.setAttribute("placeholder", "password error.");
    });
  }

  render() {
    return (
      <div id="login">
        <h3 style={{ "margin-top": 0 }} className="blockTitle">Login</h3>
        <form action="/api/user" method="post" className="form-horizontal ng-pristine ng-valid" encType="application/x-www-form-urlencoded" onSubmit={this.submitHandle}>

          <div className="form-group">
            <label for="inputPassword" className="col-lg-2 control-label">Email</label>
            <div className="col-lg-10">
              <input ref="email" name="email" type="email" className="form-control" id="inputEmail" onChange={this.resetClass} placeholder="Email" />
            </div>
          </div>

          <div className="form-group">
            <label for="inputPassword" className="col-lg-2 control-label">Password</label>
            <div className="col-lg-10">
              <input ref="password" name="password" type="password" className="form-control" id="inputPassword" onChange={this.resetClass} placeholder="Password" />
            </div>
          </div>

          <div className="form-group">
            <label for="inputPassword" className="col-lg-2 control-label"></label>
            <div className="col-lg-10">
              <div className="checkbox">
                <label>
                  <input ref="remember" type="checkbox" />Remember me
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="reset" className="btn btn-default">Cancel</button>
              &nbsp;
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

module.exports = Login;