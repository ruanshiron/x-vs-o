import algoliasearch from 'algoliasearch'

const ALGOLIA_APP_ID = 'GCWBGA8IAS'
const ALGOLIA_SEARCH_KEY = 'f3a99a2b5c7cd4100255d8f7fb5d09c6'

var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const indexSearch = client.initIndex('Users_dev')
export default indexSearch