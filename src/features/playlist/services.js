import * as API from './repository'

export async function getPlaylistById(id, { token }) {
  const result = await API.getPlaylistById(id, { token })
  const tracks = result.tracks.items.map(v => {
    return {
      name: v.track.name,
      artist: v.track.artists[0].name,
      album: v.track.name,
      previewUrl: v.track.preview_url,
      durationMs: v.track.duration_ms,
      image: v.track.album.images[0].url,
    }
  })

  return {
    image: result.images[0].url,
    title: result.name,
    subTitle: result.name,
    tracks: tracks,
  }
}

export function getMyPlaylist({ token }) {
  return API.getMyPlaylist({ token })
}
