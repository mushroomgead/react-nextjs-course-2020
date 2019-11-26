import * as API from './repository'

export function getNewReleases({ token, limit }) {
  return API.getNewReleases({ token, limit })
}

export async function getAlbumById(id, { token }) {
  const result = await API.getAlbumById(id, { token })
  const tracks = result.tracks.items.map(v => {
    return {
      id: v.id,
      name: v.name,
      artist: v.artists[0].name,
      album: v.name,
      previewUrl: v.preview_url,
      durationMs: v.duration_ms,
      image: result.images[0].url,
    }
  })
  return {
    image: result.images[0].url,
    title: result.name,
    subTitle: result.name,
    bottomLine: `${result.release_date.split('-')[0]} • ${tracks.length} SONG`,
    tracks,
  }
}
