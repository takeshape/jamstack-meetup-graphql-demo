const WatchList = require('./WatchList');
const fetch = require('node-fetch');

async function fetchMovieInfo(title) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`);

  if (res.ok) {
    return  await res.json();
  }
  return {};
}



module.exports =  {
  ToWatch: {
    async movie(toWatch) {
      const info = await fetchMovieInfo(toWatch.movieTitle);
      return info ? {
        title: info.Title,
        rating: info.imdbRating,
        poster: info.Poster,
        year: info.Year,
        actors: info.Actors,
        director: info.Director
      } : null

    }
  },

  Query: {
    getToWatchList: () => {
      return WatchList.list();
    }
  },

  Mutation: {
    addMovieToWatch(_, {title}) {
      return WatchList.add(title);
    },

    removeMovieToWatch(_, {title}) {
      return WatchList.remove(title);
    },

    markMovieWatched(_, {title, watched}) {
      return WatchList.markWatched(title, watched);
    }
  }
};
