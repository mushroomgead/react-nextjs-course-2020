import { observable, action } from 'mobx'
import { convertSecondsToMinutes } from './utilities'
import { shuffle } from 'lodash'
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

  @observable.struct
  queue = {
    original: [],
    list: [],
  }

  @observable
  shuffle = {
    isShuffle: false,
  }

  @action
  playPrevNext(num) {
    const currentI = this.queue.list.findIndex(
      v => v.id === this.nowPlaying.currentSong,
    )
    const prevI = currentI + num
    this.play(this.queue.list[prevI])
  }

  @action
  setQueueList(list) {
    this.queue.original.push(list)
    this.queue.list = this.queue.original
    if (this.shuffle.isShuffle) {
      this.setShuffleList()
    }
  }

  @action
  setShuffleList() {
    this.shuffle.isShuffle = !this.shuffle.isShuffle
    // shuffle(this.queue.list)
    if (!this.shuffle.isShuffle) {
      this.queue.list = this.queue.original
    }
    this.queue.list
      .sort(function() {
        return Math.round(Math.random()) - 0.5
      })
      .slice()
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
    const { id, previewUrl, name, artist, image } = track

    this.nowPlaying.currentSong = id
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
