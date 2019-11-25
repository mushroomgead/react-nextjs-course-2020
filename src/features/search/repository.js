import { fetchAPI } from '@lib/api'

export function getSearchResult(keyword, { token }) {
  return fetchAPI({
    path: `/search?q=${keyword}&type=album,playlist`,
    token,
  })
}
