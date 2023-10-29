// The Jukebox class is central hub for interactions between components of the system, or between the
// system and user
class JukeBox {
  constructor(cdPlayer, user, cdCollection = new Set(), songSelector) {
    this.cdPlayer = cdPlayer;
    this.user = user;
    this.cdCollection = cdCollection;
    this.songSelector = songSelector;
  }
  getCurrentSong() {
    return this.songSelector.getCurrentSong();
  }
  setUser(u) {
    this.user = u;
  }
}

// Just as in real life, a CD Player can only play one CD at a time. The rest are stored in the Juke Box.
class CDPlayer {
  constructor(cd, playlist) {
    this.playlist = playlist;
    this.cd = cd;
  }
  getPlaylist() {
    return this.playlist;
  }
  setPlaylist(p) {
    this.playlist = p;
  }
  getCD() {
    return this.cd;
  }
  setCD(c) {
    this.cd = c;
  }
  playSong(s) {}
}

// We will implement a Playlist with a queue.
class Playlist {
  constructor(song, queue) {
    this.song = song;
    this.queue = queue;
  }
  getNextSongToPlay() {
    return this.queue.peek();
  }
  queueUpSong(s) {
    this.queue.add(s);
  }
}

class CD {
  // Album name, artist name, etc
}

class Song {
  // title, length, etc
}

class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getID() {
    return this.id;
  }
  setID(iD) {
    this.id = iD;
  }
  getUser() {
    return this;
  }
  static addUser(name, id) {
    return new User(name, id);
  }
}

class SongSelector {
  constructor(s) {
    this.currentSong = s;
  }
  setSong(s) {
    this.currentSong = s;
  }
  getCurrentSong() {
    return this.currentSong;
  }
}

mocha.setup("bdd");
const { assert } = chai;

const cd = new CD();
const playlist = new Playlist(null, new Queue());
const cdPlayer = new CDPlayer(cd, playlist);
const user = new User("John Doe", 12345);
const songSelector = new SongSelector(null);
const song1 = new Song();
const song2 = new Song();
const song3 = new Song();
const jukeBox = new JukeBox(cdPlayer, user, new Set([cd]), songSelector);

describe("Jukebox", () => {
  it("User interaction works as expected", () => {
    const newUser = User.addUser("Jane Smith", 67890);
    jukeBox.setUser(newUser);
    assert.equal(jukeBox.user.getName(), "Jane Smith");
    assert.equal(jukeBox.user.getID(), 67890);

    jukeBox.user.setName("Alice Johnson");
    jukeBox.user.setID(54321);
    assert.equal(jukeBox.user.getName(), "Alice Johnson");
    assert.equal(jukeBox.user.getID(), 54321);
  });

  it("getCurrentSong() works as expected", () => {
    assert.equal(jukeBox.getCurrentSong(), null);
    songSelector.setSong(song3);
    assert.equal(jukeBox.getCurrentSong(), song3);
  });
});

describe("CDPlayer", () => {
  it("getCD() works as expected", () => {
    assert.equal(cdPlayer.getCD(), cd);
  });
  it("getPlaylist() works as expected", () => {
    assert.equal(cdPlayer.getPlaylist(), playlist);
  });
});

describe("PlayList", () => {
  it("Queue within playlist works as expected", () => {
    const playlist = cdPlayer.getPlaylist();
    assert.equal(playlist.getNextSongToPlay(), null);
    playlist.queueUpSong(song1);
    playlist.queueUpSong(song2);
    assert.equal(playlist.getNextSongToPlay(), song1);
  });
});

mocha.run();
