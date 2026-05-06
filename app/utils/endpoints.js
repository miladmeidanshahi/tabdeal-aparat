export const API_URL = {
  videos: ({ perpage = 9, offset = 0 }) => `/etc/api/videobyprofilecat/username/tabdealplatform/perpage/${perpage}/curoffset/${offset}`,
  search: value => `/api/fa/v1/video/video/search/text/${value}`,
  profile: '/etc/api/profile/username/tabdealplatform',
  videoById: id => `/etc/api/video/videohash/${id}`
}
