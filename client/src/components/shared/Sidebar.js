import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'

export default class SideBar extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) =>{ 
      
    this.setState({ activeItem: name });
    this.props.onClickSideMenu(name);          
    console.log('SideBar - ', name);
   
  }

  render() {
    const { activeItem } = this.state

    return (
      <Grid>       
          <Menu fluid vertical tabular>
            <Menu.Item name='Aircraft' active={activeItem === 'Aircraft'}  onClick={this.handleItemClick} />
            <Menu.Item name='Crew' active={activeItem === 'Crew'}  onClick={this.handleItemClick} />
            <Menu.Item
              name='Maintenance'
              active={activeItem === 'Maintenance'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Sales'
              active={activeItem === 'Sales'}
              onClick={this.handleItemClick}
            />
    
            <Menu.Item
              name='Movements'
              active={activeItem === 'Movements'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='E-learning'
              active={activeItem === 'E-learning'}
              onClick={this.handleItemClick}
            />
          </Menu>
        
      </Grid>
    )
  }
}
