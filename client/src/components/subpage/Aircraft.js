import _ from 'lodash';
import React from 'react';
import { withAuth } from '@okta/okta-react';
import { Table, Button } from 'semantic-ui-react';
import AircraftEdit from './AircraftEdit';

const tableData = [
  
  { image: '/aircraft/a1.jpg', status: 'leg', upmovement: 5, hours: 7 },
  { image: '/aircraft/a2.jpg', status: 'positioning', upmovement: 4, hours: 7 },
  { image: '/aircraft/a3.jpg', status: 'on ground', upmovement: 6, hours: 9 },
  { image: '/aircraft/a4.jpg', status: 'maintenance', upmovement: 2, hours: 8 },
  { image: '/aircraft/a5.jpg', status: 'leg', upmovement: 5, hours: 3 },
];

export default withAuth(
  class AircraftPage extends React.Component {
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
          <div>
            <Button href="/aircraftcreate" class='btn primary'>Create</Button>
            <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'image' ? direction : null}
                  onClick={this.handleSort('image')}
                >
                  Aircraft image
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
                <Table.HeaderCell
                  sorted={column === 'hours' ? direction : null}
                  onClick={this.handleSort('hours')}
                >
                  Hours until service
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ image, status, upmovement, hours }) => (//image: '../img/aircraft/a1.jpg', status: 'leg', upmovement: 5, hours: 9 },
                <Table.Row key={image}>
                  <Table.Cell><img src={image} width='100' /></Table.Cell>
                  <Table.Cell>{status}</Table.Cell>
                  <Table.Cell>{upmovement}</Table.Cell>
                  <Table.Cell>{hours}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
    }
  }
);