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
    this.dogsSearch();
    this.gamesSearch();
    this.sportsSearch();
  }

  performSearch = (query) => {
    this.setState({ loading: true });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          query: query,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  dogsSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => {
        this.setState({
          dogs: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  gamesSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=video%games&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => {
        this.setState({
          videogames: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  sportsSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sports&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => {
        this.setState({
          sports: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
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
                <Route path="/dogs" render={ () => <PhotoList data={this.state.dogs} />} />
                <Route path="/games" render={ () => <PhotoList data={this.state.videogames} />} />
                <Route path="/sports" render={ () => <PhotoList data={this.state.sports} />} />
                <Route path="/search/:query" render={ () => <PhotoList data={this.state.photos} />} />
                <Route component={NotFound} />
              </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}
