export const API_URL = {
  videos: ({ perpage = 9, offset = 0 }) => `/videobyprofilecat/username/tabdealplatform/perpage/${perpage}/curoffset/${offset}`,
  search: value => `/video/video/search/text/${value}`,
  profile: '/profile/username/tabdealplatform',
  videoById: id => `/video/videohash/${id}`
}
// https://www.aparat.com/api/fa/v1/video/video/search/text/%D8%B3%D9%88%D8%AF+%DB%B1%DB%B0%DB%B0?channel=tabdealplatform&search=%D8%B3%D9%88%D8%AF+%DB%B1%DB%B0%DB%B0
