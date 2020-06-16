import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  asdf: {
    width: '50%',
    height: '30%'
  },
})

class App extends Component {
  //Render :componentWillMount() -> render() -> componentDidMount()
  //Update :componentWillReceivProps() ->shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidMount()
  

  state = {}

  componentDidMount() {

    this._getMovies();

  }

  _renderMovies = () => {
    const {classes} = this.props
    const movies = this.state.movies.map((movie) => {
      
      return <Movie className={classes.asdf}
        title={movie.title_english}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis ={movie.synopsis}

      />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=dawnload_count')
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className={this.state.movies? "App":"App--Loading"}>

        {this.state.movies ? this._renderMovies() : 'Loading...'}
      </div>
    );
  }
}

export default withStyles(styles)(App);
