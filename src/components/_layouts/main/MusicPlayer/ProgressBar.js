import React, { useState } from 'react'
import { Flex, Box } from '@grid'
import { inject } from '@lib/store'

// ProgressBar.defaultProps = {
//   timeElapsed: '0:00',
//   progress: 0.2,
//   duration: '0:30',
// }
export default inject('playerStore')(ProgressBar)

function ProgressBar({ playerStore }) {
  const { timeElapsed, progress, duration } = playerStore.progressBar
  const [seeking, setSeeking] = useState(false)

  const handleSeekMouseDown = e => {
    // console.log('handleSeekMouseDown')
  }

  const handleSeekChange = e => {
    // playerStore.setSeekVal(e.target.value)
    // playerStore.onSeeking(true)
  }

  const handleSeekMouseUp = e => {
    playerStore.setSeekVal({ value: e.target.value, isSeeking: true })
    // playerStore.onSeeking(true)
  }

  return (
    <Flex
      justifyContent="space-between"
      css={{
        background: 'transparent',
        height: '20px',
        alignItems: 'center',
      }}>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{timeElapsed}</Box>
      <Box
        css={{
          flex: 1,
          height: '4px',
          '&:hover input[type="range"]::-webkit-slider-thumb': {
            visibility: 'visible',
          },
        }}>
        <div css={{ position: 'relative' }}>
          <progress
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              zIndex: '-1',
              '&::-webkit-progress-bar': {
                borderRadius: '5px',
              },
              '&::-webkit-progress-value': {
                borderRadius: '5px',
              },
            }}
            value={progress}
            max={1}
          />
          <input
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              outline: 'none',
              background: 'transparent',
              '&::-webkit-slider-thumb': {
                visibility: 'hidden',
              },
            }}
            type="range"
            min={0}
            max={1}
            step="any"
            value={progress}
            onClick={e =>
              playerStore.setSeekVal({
                value: e.target.value,
                isSeeking: true,
              })
            }
            onMouseDown={e =>
              playerStore.setSeekVal({ value: e.target.value, isSeeking: true })
            }
            onChange={e =>
              playerStore.setSeekVal({ value: e.target.value, isSeeking: true })
            }
            onMouseUp={e =>
              playerStore.setSeekVal({ value: e.target.value, isSeeking: true })
            }
          />
        </div>
      </Box>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{duration}</Box>
    </Flex>
  )
}
