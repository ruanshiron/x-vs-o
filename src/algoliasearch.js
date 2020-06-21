import algoliasearch from 'algoliasearch'

const ALGOLIA_APP_ID = 'GCWBGA8IAS'
const ALGOLIA_SEARCH_KEY = 'f3a99a2b5c7cd4100255d8f7fb5d09c6'
const ALGOLIA_API_KEY = '2af9590f443a517321a71ed88a2c9fc8'

var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const indexSearch = client.initIndex('Users_dev')
export default indexSearch