import { observable, action } from 'mobx'

export default class PlayerStore {
  @observable
  nowPlaying = {
    playing: false,
  }

  @action
  play(track) {
    const { previewUrl, name, artist, image } = track

    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
  }

  @action
  pause() {
    this.nowPlaying.playing = false
  }
}
