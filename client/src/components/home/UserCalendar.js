import React from 'react'
import { Dropdown, Table } from 'semantic-ui-react'

let stateOptions = [ 
        { key: '12h', value: '12h', text: '12 hours' },
        { key: '24h', value: '24h', text: '24 hours' },
        { key: '7d', value: '7d', text: '7 days' }
    ];

const UserCalendar = () => (
    <div>
        <Dropdown placeholder='State' search selection options={stateOptions} />
        <Table singleLine>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>PIC </Table.HeaderCell>
                <Table.HeaderCell>FO </Table.HeaderCell>
                <Table.HeaderCell>OPS employee</Table.HeaderCell>                
            </Table.Row>
            </Table.Header>

            <Table.Body>
            <Table.Row>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>John Lilki</Table.Cell>
                
            </Table.Row>
            <Table.Row>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>John Lilki</Table.Cell>
                
            </Table.Row>
            <Table.Row>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>John Lilki</Table.Cell>                
            </Table.Row>
            </Table.Body>
        </Table>
  </div>
)

export default UserCalendar



