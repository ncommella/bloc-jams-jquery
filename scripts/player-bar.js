{
  $('button#play-pause').on('click', function() {
    player.playPause();
    $(this).attr('playState', player.playState);
  });

  $('button#next').on('click', function() {
    if (player.playState !== 'playing') {return;}

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex >= album.songs.length) {return;}

    const nextSong = album.songs[nextSongIndex];
    player.playPause(nextSong);

  });

  $('button#previous').on('click', function() {
    //check to see if song is playing
    if (player.playState !== 'playing') {return;}

    //get currentSongIndex and check to see if current song is the first song
    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    if ( currentSongIndex === 0) {return;}

    //get previous song index and play previous song
    const previousSongIndex = currentSongIndex - 1;
    const previousSong = album.songs[previousSongIndex];
    player.playPause(previousSong);
  });

  $('#time-control input').on('input', function(event) {
    player.skipTo(event.target.value);
  });

  $('#volume-control input').on('input', function(event) {
    player.setVolume(event.target.value);
  });

  setInterval( () => {
    if (player.playState !== 'playing') {return;}
    const currentTime = player.getTime();
    const duration = player.getDuration();
    const percent = (currentTime / duration) * 100;
    $('#time-control .current-time').text(player.prettyTime(currentTime));
    $('#time-control .total-time').text(player.prettyTime(duration));
    $('#time-control input').val(percent);
  }, 1000);
}
