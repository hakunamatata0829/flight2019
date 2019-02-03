import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { Segment, Button, Form , Grid} from 'semantic-ui-react'
import classNames from 'classnames';
import _ from 'lodash';
import {validateEmail} from '../../helpers/email';
import '../../index.css';

export default withAuth(
  class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        error: null,
        username: '',
        password: '',
        confirmPassword:'',  

        errors:{
          email: null,
          password: null,
        }
      };

      this.oktaAuth = new OktaAuth({ url: props.baseUrl });
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this._formValidation = this._formValidation.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();

      const fieldNeedToValidate = ['email','password'];

      this._formValidation(fieldNeedToValidate, (isValid) =>{

          console.log("Form is validated? ", isValid);

          if(isValid){
            // do send this data to backend here
            this.oktaAuth
            .signIn({
              username: this.state.username,
              password: this.state.password
            })
            .then(res =>
              this.setState({
                sessionToken: res.sessionToken
              })
            )
            .catch(err => {
              //this.setState({ error: err.message });
              this.setState({ error: "Your username or password is wrong." });
              console.log(err.statusCode + 'error', err);
            });
          }
      });

      
    }

    _formValidation(fieldsToValidate = [], callback = () => {}){
      

      const allFields = 
        {
          email: {
            message: "Email is not correct",
            doValidate: () => {
              const value = _.trim(this.state.username);

              console.log("hey value", value);
              if(value.length > 0 && validateEmail(value)){
                return true;
              }
              return false;
            }
          },
          password:{
            message: "Your password should more 8 characters.",
            doValidate: () => {
              const value = _.trim(this.state.password);

              if(value && value.length > 7){
                return true;
              }
              return false;
            }
          }
        };

      let errors = this.state.errors;

      _.each(fieldsToValidate, (field) => {

          const fieldValidate = _.get(allFields, field);
          if(fieldValidate){
            errors[field] = null;
            const isFieldValid = fieldValidate.doValidate();
            if(isFieldValid === false){
              errors[field] = _.get(fieldValidate, 'message');
            }

          }
      })

      this.setState({
        errors: errors,  
      }, () => {

        console.log("After processed validation the form errors " , errors);
      
        let isValid = true;

        _.each(errors, (err) => {
          if(err){
            isValid = false;
          }
        })
        callback(isValid);
      })
      
    }

    handleUsernameChange(e) {
      this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }

    render() {
      const {errors} = this.state;
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      const errorMessage = this.state.error ? (
        <span className="error-message error">{this.state.error}</span>
      ) : null;

      return (
      
        <Grid columns='three' >
          <Grid.Column></Grid.Column>
          <Grid.Column style={{width: '100%', maxWidth: 360, textAlign:'center', margin:'0 auto'}}>
          <Segment placeholder>
            <Form onSubmit={this.handleSubmit}>
              {errorMessage}
              <Form.Field className={classNames('add', {'error': _.get(errors,'email')})} >
                <label>Username</label>
                <input
                  id="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
              </Form.Field>
              <Form.Field className={classNames('add', {'error': _.get(errors,'password')})}>
              <label>Password:</label>
                <input
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password length is more than 8 characters."
                />
              </Form.Field>
              <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                      <Button type='submit' primary>Login</Button>
                </Grid.Column>
                <Grid.Column>
                </Grid.Column>              
              </Grid>
            </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column></Grid.Column>
       </Grid>       
      );
    }
  }
);