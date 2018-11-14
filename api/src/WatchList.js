let watchList = [
  {
    movieTitle: 'Top Gun',
    watched: true

  },
  {
    movieTitle: 'Big Trouble In Little China',
    watched: true
  },
  {
    movieTitle: 'The Princess Bride',
    watched: true
  },
  {
    movieTitle: 'Taxi Driver',
    watched: false
  }
];

module.exports = {
  list() {
    return watchList;
  },
  add(title) {
    watchList.push({movieTitle: title, watched: false});
    return watchList;
  },
  remove(title) {
    watchList = watchList.filter(movie => movie.movieTitle !== title);
    return watchList;
  },
  markWatched(title, watched) {
    watchList.forEach(toWatch => {
      if (toWatch.movieTitle === title) {
        toWatch.watched = watched;
      }
    });
    return watchList;
  }
};
