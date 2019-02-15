import _ from 'lodash';
import React from 'react';
import { withAuth } from '@okta/okta-react';
import { Table } from 'semantic-ui-react';

const tableData = [
  
  { image: '/crew/c1.jpg', status: 'leg', upmovement: 5 },
  { image: '/crew/c2.jpg', status: 'positioning', upmovement: 4},
  { image: '/crew/c3.jpg', status: 'on ground', upmovement: 6 },
  { image: '/crew/c4.jpg', status: 'maintenance', upmovement: 2 },
  { image: '/crew/c5.jpg', status: 'leg', upmovement: 5},
];

export default withAuth(
  class CrewPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { user: null ,
                      column: null,
                      data: tableData,
                      direction: null,
                    };
      this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    handleSort = clickedColumn => () => {
      const { column, data, direction } = this.state;
      console.log('ddddddd', clickedColumn)

      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          data: _.sortBy(data, [clickedColumn]),
          direction: 'ascending',
        });
  
        return
      }
  
      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }

    async getCurrentUser() {
      this.props.auth.getUser().then(user => this.setState({ user }));
    }

    componentDidMount() {
      this.getCurrentUser();
    }

    render() {
      if (!this.state.user) return null;

      const { column, data, direction } = this.state;
      console.log(this.state.data)
      return (
          <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'image' ? direction : null}
                onClick={this.handleSort('image')}
              >
                Crew image
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'status' ? direction : null}
                onClick={this.handleSort('status')}
              >
                Current status
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'upmovement' ? direction : null}
                onClick={this.handleSort('upmovement')}
              >
                Upcoming Movement
              </Table.HeaderCell>
              
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ image, status, upmovement, hours }) => (
              <Table.Row key={image}>
                <Table.Cell><img src={image} width='100' /></Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>{upmovement}</Table.Cell>                
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      );
    }
  }
);