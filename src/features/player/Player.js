import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { inject } from '@lib/store'

export default inject('playerStore')(Player)

function Player({ playerStore }) {
  const { url, playing } = playerStore.nowPlaying
  const playerInst = useRef(null)
  // console.log(playerInst.current, 'playerInst')

  // playerInst.seekTo(10)

  useEffect(() => {
    if (playerStore.seek.isSeeking) {
      playerInst.current.seekTo(playerStore.seek.seekVal)
      playerStore.onSeeking(false)
    }
  }, [playerStore.seek.isSeeking])

  return (
    <ReactPlayer
      ref={playerInst}
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={detail => playerStore.progress(detail)}
      onEnded={() => {
        playerStore.pause()
      }}
    />
  )
}
