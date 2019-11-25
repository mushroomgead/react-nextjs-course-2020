import React, { useState } from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import SearchResults from './SearchResults'
import * as SearchService from '@features/search/services'
import { get } from 'lodash'

SearchPage.defaultProps = {
  data: {
    albums: [
      {
        id: '2Pz8VAMiGc9UW1rrbBRDuO',
        name: 'KILL THIS LOVE',
        images: [
          {
            url:
              'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
          },
        ],
      },
    ],
    playlists: [
      {
        id: '37i9dQZF1DX8kP0ioXjxIA',
        name: 'This Is BLACKPINK',
        images: [
          {
            url:
              'https://pl.scdn.co/images/pl/default/af1eb22fbb48deecfde3b244ffd683a81696a18d',
          },
        ],
      },
    ],
  },
}

function SearchPage() {
  const { token } = useMember()
  const [value, setSearchValue] = useState('')
  const [keyword, setKeyword] = useState([])

  if (token === null) {
    return null
  }

  const findWord = async e => {
    setSearchValue(e.target.value)
    let result = await SearchService.getSearchResult(e.target.value, { token })
    setKeyword(result)
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <input
          type="text"
          value={value}
          placeholder="Search for artists, albums or playlists..."
          css={{
            padding: '15px 20px',
            borderRadius: '40px',
            border: 'none',
            width: '500px',
          }}
          onChange={e => findWord(e)}
        />
      </Box>

      <SearchResults
        title="Albums"
        data={get(keyword, 'albums.items', [])}
        route="album-detail"
      />
      <SearchResults
        title="Playlists"
        data={get(keyword, 'playlists.items', [])}
        route="playlist-detail"
      />
    </Flex>
  )
}

SearchPage.getInitialProps = async context => {
  console.log(context, 'context')
  return {}
}

export default withPage({ restricted: true })(SearchPage)
