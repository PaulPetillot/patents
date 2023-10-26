import { Text, Grid } from '@chakra-ui/react'
import { useState, useRef, useCallback, useEffect } from 'react'

import { SearchBar } from '~/components/SearchBar/SearchBar'
import { useSearch } from '~/utils/hooks/useSearch'

import { Header } from './components/Header'
import Patents from './components/Patents'

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [{ fromDate, toDate }, setFilters] = useState({
    fromDate: '',
    toDate: '',
  })
  const { patents, loading, recordAmount, loadMore, hasMore } = useSearch({
    searchTerm,
    fromDate,
    toDate,
  })
  const loader = useRef(null)

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    searchValue: string,
    fromDateFilter: string,
    toDateFilter: string
  ) => {
    event.preventDefault()
    setSearchTerm(searchValue)
    setFilters({
      fromDate: fromDateFilter,
      toDate: toDateFilter,
    })
  }

  // eslint-disable-next-line no-console
  console.log(patents)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]

      if (target.isIntersecting && hasMore) {
        loadMore()
      }
    },
    [loadMore, hasMore]
  )

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserver, option)

    if (loader.current) observer.observe(loader.current)
  }, [handleObserver])

  return (
    <Grid gap={10}>
      <Header />
      {searchTerm && <Text>{recordAmount} results</Text>}
      <SearchBar handleSubmit={handleSubmit} loading={loading} />
      {patents.length ? <Patents patents={patents} /> : null}
      <div ref={loader} />
    </Grid>
  )
}
