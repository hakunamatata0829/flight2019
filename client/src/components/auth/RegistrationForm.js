import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
                                                                                                                                                                                                                                                                                                                                    
import config from '../../app.config';
import { Segment, Button,Form , Grid} from 'semantic-ui-react'
import classNames from 'classnames';
import _ from 'lodash';
import {validateEmail} from '../../helpers/email';
import {validatePassword} from '../../helpers/password';

export default withAuth(
  class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);     
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword:'',
        sessionToken: null,
        errors:{
          email: null,
          password: null,
          firstName:null,
          lastName:null,
          confirmPassword:null,
        }
      };
      this.oktaAuth = new OktaAuth({ url: config.url });
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
      this._formValidation = this._formValidation.bind(this);
    }

    async checkAuthentication() {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    handleFirstNameChange(e) {
      this.setState({ firstName: e.target.value });
    }
    handleLastNameChange(e) {
      this.setState({ lastName: e.target.value });
    }
    handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }

    handleConfirmPasswordChange(e){
      this.setState({confirmPassword: e.target.value});
    }

    handleSubmit(e) {
      e.preventDefault();

      const fieldNeedToValidate = ['email','firstName', 'lastName', 'password', 'confirmPassword'];

      this._formValidation(fieldNeedToValidate, (isValid) =>{

          console.log("Form is validated? ", isValid);

          if(isValid){
            // do send this data to backend here
            fetch('/api/users', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state)
            })
              .then(user => {
                this.oktaAuth
                  .signIn({
                    username: this.state.email,
                    password: this.state.password
                  })
                  .then(res =>
                    this.setState({
                      sessionToken: res.sessionToken
                    })
                  );
              })
              .catch(err => console.log);
          }
      });
    }
      _formValidation(fieldsToValidate = [], callback = () => {}){
      

        const allFields = 
          {
            email: {
              message: "Email is not correct",
              doValidate: () => {
                const value = _.trim(this.state.email);
  
                console.log("hey Email ", value);
                if(value.length > 0 && validateEmail(value)){
                  return true;
                }
                return false;
              }
            },
            firstName: {
              message: "Your firstName is required",
              doValidate: () => {
                const value = _.trim(this.state.firstName);
  
                console.log("hey fistName ", value);
                if(value.length > 0){
                  return true;
                }
                return false;
              }
            },
            lastName: {
              message: "Your lastName is required",
              doValidate: () => {
                const value = _.trim(this.state.lastName);
  
                console.log("hey lastName ", value);
                if(value.length > 0){
                  return true;
                }
                return false;
              }
            },
            password:{
              message: "Your password should more 8 characters.",
              doValidate: () => {
                const value = _.trim(this.state.password);
  
                if(validatePassword(value) && value.length > 7){
                  return true;
                }
                return false;
              }
            },
            confirmPassword:{
              message: "Your confirm password is required",
              doValidate: () => {
                const passwordValue = this.state.password;
                const value = _.trim(this.state.confirmPassword);
                console.log("confirm password ", value);
                if(value === passwordValue && value.length > 7){
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
  
    render() {
      const {errors} = this.state;
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }
      
      return (
        <Grid style={{width: '100%', maxWidth: 360, textAlign:'center', margin:'0 auto'}}>
         
         
          <Form onSubmit={this.handleSubmit}>
          
            <Form.Field className={classNames('add', {'error': _.get(errors,'email')})}>
              <label>Email:</label>
                <input
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
            </Form.Field>
            <Form.Field className={classNames('add', {'error': _.get(errors,'firstName')})}>
              <label>First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                />
            </Form.Field>
            <Form.Field className={classNames('add', {'error': _.get(errors,'lastName')})}>
              <label>Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                />
            </Form.Field>
            <Form.Field className={classNames('add', {'error': _.get(errors,'password')})}>
              <label>Password:</label>
                <input
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password must contains minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
                />
                <label>Password must contains minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.</label>
            </Form.Field>
            <Form.Field className={classNames('add', {'error': _.get(errors,'confirmPassword')})}>
              <label>Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleConfirmPasswordChange}
                />
            </Form.Field>
            <Grid.Row >
              <Segment basic textAlign='center'>
              
                <Button type='submit' id="submit" color='teal'icon='user' labelPosition='left' content="Register"></Button>                
              
              </Segment>
              
            </Grid.Row>
            
          </Form>          
          
        </Grid>
      );
    }
  }
);