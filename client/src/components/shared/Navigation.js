import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Menu } from 'semantic-ui-react';

export default withAuth(
  class Navigation extends React.Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
    }

    handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
      
      if(name === "sign-in"){
        this.props.auth.login();
      }
      if(name === "sign-up"){
        window.location.href = '/register';;
      }
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    render() {
      const { activeItem } = this.state;
      if (this.state.authenticated === null) return null;
      const authNav = this.state.authenticated ? (
        <Menu.Menu position='right'>

          <Menu.Item name='profile' as="a" active={activeItem === 'profile'} href="/profile">
            Profile
          </Menu.Item>

          <Menu.Item as="a"  href="javascript:void(0)"
          onClick={() => this.props.auth.logout()}>
            Logout
          </Menu.Item>
          
        </Menu.Menu>        
      ) : (
        <Menu.Menu position='right'>
          
          <Menu.Item             
            name='sign-up'
            active={activeItem === 'sign-up'}
            href="/register"
            onClick={this.handleItemClick}>
            Sign Up
          </Menu.Item>
          
          <Menu.Item name='sign-in' active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
            Sign-in
          </Menu.Item>

        </Menu.Menu>        
      );
      return (
        <Menu size='large' style={{width:'100%'}}>

          <Menu.Item>
            <img src='https://react.semantic-ui.com/logo.png' alt="Logo"/>
          </Menu.Item>
        
          <Menu.Item name='home' active={activeItem === 'home'} as="a" href="/" onClick={this.handleItemClick} />
         
          {authNav}
          
        </Menu>
      );
    }
  }
);