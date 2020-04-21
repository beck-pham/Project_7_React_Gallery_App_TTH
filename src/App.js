import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';

//import components to App
import PhotoList from './Components/PhotoList';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import NotFound from './Components/NotFound';
import apiKey from './config';

//write class App to render the photo application
export default class App extends Component {
  
  constructor() {
    super(); // using super to able to use the keyword this inside constructor within the context of the App class rather than the parent component class extending from React
    this.state = { 
      photos: [],
      dogs: [],
      videogames: [],
      sports: [],
      query: '',
      loading: true
    };
  } 
  //import ComponentDidmount and fetching photo data from Flickr API
  componentDidMount() {
    this.performSearch('dogs');
    this.performSearch('videogames');
    this.performSearch('sports');
  }

  performSearch = (query) => {
    this.setState({ loading: true });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => {
        if (query === 'dogs') {
          this.setState({ dogs: response.data.photos.photo });
        } else if (query === 'videogames') {
          this.setState({ videogames: response.data.photos.photo });
        } else if (query === 'sports') {
          this.setState({ sports: response.data.photos.photo });
        } else {
          this.setState({ photos: response.data.photos.photo });
        }
        this.setState({ loading: false });
        this.setState({ query: query });
    })
   .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  }

  render() {
    return(
      <BrowserRouter>
        <div className="main-container">
          <h1 className="main-title">A Simple Gallery App</h1>
          <SearchForm onSearch={this.performSearch}/>
          <Nav />
          {/** if / else statement using ternary operator for loading state */}
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <Switch>
                <Route exact path="/" render={ () => <Redirect to="/dogs"/> } /> 
                <Route path="/dogs" render={ () => <PhotoList data={this.state.dogs} query="dogs"/>} />
                <Route path="/games" render={ () => <PhotoList data={this.state.videogames} query="videogames"/>} />
                <Route path="/sports" render={ () => <PhotoList data={this.state.sports} query="sports"/>} />
                <Route path="/search:query" render={ () => <PhotoList data={this.state.photos} query={this.state.query}/>} />
                <Route component={NotFound} />
              </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}
