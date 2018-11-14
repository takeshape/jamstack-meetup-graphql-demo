import React from 'react';
import reactLogo from './react-logo.svg';
import graphqlLogo from './graphql-logo.svg';
import './App.css';

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
const TO_WATCH_FRAGMENT = gql`
  fragment MovieInfo on ToWatch {
    watched
    movieTitle
  }
`;

const WATCH_LIST_QUERY = gql`
  query {
    movies: getToWatchList {
      ...MovieInfo
    }
  }
  ${TO_WATCH_FRAGMENT}
`;

const ADD_MOVIE_MUTATION = gql`
  mutation add($title: String!) {
    movies: addMovieToWatch(title: $title) {
      ...MovieInfo
    }
  }
  ${TO_WATCH_FRAGMENT}
`;

const REMOVE_MOVIE_MUTATION = gql`
  mutation remove($title: String!) {
    movies: removeMovieToWatch(title: $title) {
      ...MovieInfo
    }
  }
  ${TO_WATCH_FRAGMENT}
`;

const MARK_MOVIE_MUTATION = gql`
  mutation mark($title: String! $watched: Boolean!) {
    movies: markMovieWatched(title: $title watched: $watched) {
      ...MovieInfo
    }
  }
  ${TO_WATCH_FRAGMENT}
`;



function updateWatchList(cache, { data: { movies } }) {
  cache.writeQuery({
    query: WATCH_LIST_QUERY,
    data: { movies }
  });
}

function AddMovie() {
  let input;

  return (
    <Mutation mutation={ADD_MOVIE_MUTATION} update={updateWatchList}>
      {addTodo => (
        <form
          className="AddMovie"
          onSubmit={e => {
            e.preventDefault();
            addTodo({ variables: { title: input.value } });
            input.value = "";
          }}
        >
          <input
            className="AddMovie-input"
            ref={node => {
              input = node;
            }}
          />
          <button className="AddMovie-submit" type="submit">Add Movie</button>
        </form>
      )}
    </Mutation>
  );
}

function WatchedCheckbox({title, watched}) {
  return (
    <Mutation mutation={MARK_MOVIE_MUTATION} update={updateWatchList}>
      {markMovieWatched => (
        <input
          type="checkbox"
          defaultChecked={watched}
          onClick={() => {
            markMovieWatched({ variables: { title, watched: !watched } });
          }}
        />
      )}
    </Mutation>
  );
}

function RemoveButton({title}) {
  return (
    <Mutation mutation={REMOVE_MOVIE_MUTATION} update={updateWatchList}>
      {removeMovieToWatch => (
        <button
          className="RemoveButton"
          type="checkbox"
          onClick={() => {
            removeMovieToWatch({ variables: { title } });
          }}
        >
          X
        </button>
      )}
    </Mutation>
  );
}

function Movie({movieTitle, watched}) {
  return (
    <div className="Movie">
      <WatchedCheckbox title={movieTitle} watched={watched}/>
      <div className="Movie-info">
        <h3>{movieTitle}</h3>
      </div>
      <RemoveButton title={movieTitle}/>
    </div>
  )
}

function WatchList() {
  return (
    <Query query={WATCH_LIST_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        const list = data.movies.slice().reverse();
        return (
          <ul>
            {list.map(item => (
              <li key={item.movieTitle}>
                <Movie {...item}/>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

function AppHeader() {
  return (
    <header className="AppHeader">
      <div className="AppHeader-logos">
        <img src={reactLogo} className="AppHeader-react-logo" alt="logo" />
        <div className="AppHeader-plus">+</div>
        <img src={graphqlLogo} className="AppHeader-graphql-logo" alt="logo" />
      </div>
      <h1>To Watch List</h1>
    </header>
  )
}

export default function App() {
  return (
    <div className="App">
      <AppHeader/>
      <AddMovie/>
      <WatchList/>
    </div>
  );
}
