const WatchList = require('./WatchList');

module.exports =  {
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
