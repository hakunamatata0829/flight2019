import React from 'react';
import { Grid, Label, Segment, Icon, Search, Button } from 'semantic-ui-react';
import Clock from 'react-live-clock';
import _ from 'lodash';
import SideBar from '../shared/Sidebar';
import UserCalendar from '../home/UserCalendar';
import  ChatDiv  from '../shared/Chat';
import AircraftPage from '../subpage/Aircraft';
import CrewPage from '../subpage/Crew';
import MaintenancePage from '../subpage/Maintenance';
import SalesPage from '../subpage/Sales';
import MovementsPage from '../subpage/Movements';
import ElearningPage from '../subpage/Elearning';

const source = _.times(5, () => ({
  title: '',
  description: '',
  image: '',
  price: '',
}))

export default class HomePage extends React.Component{
  constructor(props, context) {
    super(props, context);        
  }

  state = { 
            activeSideMenuItem: '' ,
            subMainItem:<UserCalendar />
          };

  componentWillMount() {
    this.resetComponent();  
  }

  handleItemClicked = ( name) =>{ 
      
    this.setState({ activeSideMenuItem: name });
    if(name === 'Aircraft'){
      this.setState({subMainItem: <AircraftPage />});
    }
    if(name === 'Crew'){
      this.setState({subMainItem: <CrewPage />});
    }
    if(name === 'Maintenance'){
      this.setState({subMainItem: (<MaintenancePage />)});
    }
    if(name === 'Sales'){
      this.setState({subMainItem: (<SalesPage />)});
    }
    if(name === 'Movements'){
      this.setState({subMainItem: (<MovementsPage />)});
    }
    if(name === 'E-learning'){
      this.setState({subMainItem: (<ElearningPage />)});
    }
    console.log(this.state.subMainItem)
    console.log(this.props);

  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });
  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)  }

  
  render() {
     const { isLoading, value, results } = this.state;
     let divstyle = {float:'right'};     
 
    return (
      <Grid style={{margin:15,}}>
         <Grid.Row>
          <Grid.Column floated='left' width={8}>
              <Label  color={'blue'}>
                  <Icon circular name='clock outline' />Zulu Time
              </Label>
              <Label  color={'grey'}>
                  <h4><Clock format={'HH:mm:ss'} ticking={true} timezone={'UTC'} /> </h4>
              </Label>   
              
              <Label  color={'teal'}>
                  <Icon circular  name='clock outline' />Local Time
              </Label>  
              <Label  color={'grey'}>
                  <h4><Clock format={'HH:mm:ss'} ticking={true} timezone={''} />  </h4>
              </Label>              
          </Grid.Column>
          <Grid.Column  width={8}>
              <div style={divstyle}>
                <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
              />
              </div>
              
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>         
              <Grid.Column width={2}>
                    <SideBar onClickSideMenu={this.handleItemClicked}/>
              </Grid.Column>
              <Grid.Column width={10}>
                  
                  {this.state.subMainItem}  

              </Grid.Column>
              <Grid.Column width={4}>
                    <ChatDiv />

                    <Segment attached='top'>
                        Company chat and 24/7 help chat
                    </Segment>
                    <Button
                        attached='bottom'
                        content='Go'
                        onClick={this.handleClick}
                        onKeyPress={this.handleKeyPress}
                    />
              </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}