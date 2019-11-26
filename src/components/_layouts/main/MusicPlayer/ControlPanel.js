import React from 'react'
import { Flex, Box } from '@grid'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import colors from '@features/_ui/colors'
import { inject } from '@lib/store'

function ButtonControl({ icon, circle = false, active = false, onClick }) {
  const css = {
    background: 'transparent',
    padding: '7px 8px 11px 10px',
    margin: '0 10px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    ...(circle === true
      ? { border: `1px solid ${colors.link}`, borderRadius: '50%' }
      : { border: 'none' }),
  }

  return (
    <button onClick={onClick} css={css}>
      <Icon
        icon={icon}
        css={{
          color: active ? 'green' : colors.link,
          width: '10px',
        }}
      />
    </button>
  )
}

export default inject('playerStore')(ControlPanel)

function ControlPanel({ playerStore }) {
  const {
    playing,
    title: name,
    subTitle: artist,
    image,
    url: previewUrl,
  } = playerStore.nowPlaying

  const onplay = () => {
    if (playerStore.nowPlaying.playing) {
      playerStore.pause()
    } else {
      playerStore.play({
        previewUrl,
        name,
        artist,
        image,
        playing,
      })
    }
  }

  return (
    <Flex>
      <Box>
        <ButtonControl
          icon="random"
          active={playerStore.shuffle.isShuffle}
          onClick={() => playerStore.setShuffleList()}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-backward"
          onClick={() => {
            playerStore.playPrevNext(-1)
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon={playerStore.nowPlaying.playing ? 'pause' : 'play'}
          circle={true}
          onClick={onplay}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-forward"
          onClick={() => {
            playerStore.playPrevNext(+1)
          }}
        />
      </Box>
      <Box>
        <ButtonControl icon="redo-alt" active={false} onClick={() => {}} />
      </Box>
    </Flex>
  )
}
