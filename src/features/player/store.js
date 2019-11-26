import { observable, action } from 'mobx'
import { convertSecondsToMinutes } from './utilities'

export default class PlayerStore {
  @observable
  nowPlaying = {
    playing: false,
  }

  @observable
  progressBar = {
    timeElapsed: '0:00',
    progress: 0,
    duration: '0:30',
  }

  @observable
  volume = {
    muted: false,
    level: 0.1,
  }

  @observable
  seek = {
    seekVal: 0,
    isSeeking: false,
  }

  @action
  setSeekVal(detail) {
    const { value, isSeeking } = detail
    this.seek.seekVal = value
    this.seek.isSeeking = isSeeking
  }

  @action
  adjustVolume(value) {
    this.volume.level = value
  }

  @action
  toggleMute() {
    this.volume.muted = !this.volume.muted
  }

  @action
  progress(detail) {
    const { played, playedSeconds } = detail
    this.progressBar.timeElapsed = convertSecondsToMinutes(playedSeconds)
    this.progressBar.progress = played
    this.progressBar.duration = '0:30'
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
