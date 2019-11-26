import React, { useState, useEffect } from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import SearchResults from './SearchResults'
import * as SearchService from '@features/search/services'
import { get } from 'lodash'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  useEffect(() => {
    setSearchValue(router.query.id)
    SearchService.getSearchResult(router.query.id, {
      token,
    }).then(result => setKeyword(result))
  }, [])

  if (token === null) {
    return null
  }

  const findWord = async e => {
    if (e.target.value) {
      router.push(`/search/[id]`, `/search/${e.target.value}`, {
        shallow: true,
      })
      setSearchValue(e.target.value)
      let result = await SearchService.getSearchResult(e.target.value, {
        token,
      })
      setKeyword(result)
    } else {
      router.push('/search')
    }
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <input
          type="text"
          autoFocus
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

export default withPage({ restricted: true })(SearchPage)
