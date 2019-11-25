import * as API from './repository'

export async function getSearchResult(keyword, { token }) {
  const result = await API.getSearchResult(keyword, { token })

  return result
}
