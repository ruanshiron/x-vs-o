import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import indexSearch from '../algoliasearch';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function useSearch() {
  const PAGESIZE = 5
  const [result, setResult] = useState()
  const [nbHits, setNbHits] = useState()
  const [page, setPage] = useState()
  let query = useQuery()
  let location = useLocation()
  let history = useHistory()

  const onChangePage = (page) => {
    history.push(`/search/?q=${query.get('q')}&p=${page}`)
  }

  useEffect(() => {
    const page = query.get('p') ? query.get('p') - 1 : 0
    
    indexSearch
      .search(query.get('q'), {
        hitsPerPage: PAGESIZE,
        page: page
      })
      .then(res => {
        console.log(res.nbHits)
        console.log(res.page)
        
        setPage(res.page)
        setNbHits(res.nbHits)
        setResult(res.hits)
      })
    
  }, [location])

  return {
    result,
    nbHits,
    page,
    onChangePage,
    PAGESIZE
  }
}