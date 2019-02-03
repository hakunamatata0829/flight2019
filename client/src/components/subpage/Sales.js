import React from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class SalesPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { user: null };
      this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    async getCurrentUser() {
      this.props.auth.getUser().then(user => this.setState({ user }));
    }

    componentDidMount() {
      this.getCurrentUser();
    }

    render() {
      if (!this.state.user) return null;
      return (
        <section className="user-profile">
          <h1>Sales Page</h1>
          <div>
            
          </div>
        </section>
      );
    }
  }
);