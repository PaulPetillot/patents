import { Text, Grid } from '@chakra-ui/react'
import { useState, lazy, Suspense } from 'react'

import { SearchBar } from '~/components/SearchBar/SearchBar'
import { useSearch } from '~/utils/hooks/useSearch'

import { Header } from './components/Header'

const Patents = lazy(() => import('./components/Patents'))

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [{ fromDate, toDate }, setFilters] = useState({
    fromDate: '',
    toDate: '',
  })

  const { patents, loading, loadMore, hasMore, recordAmount, initialLoad } =
    useSearch({
      searchTerm,
      fromDate,
      toDate,
    })

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

  return (
    <Grid gap={10}>
      <Header />
      {searchTerm && <Text>{recordAmount} results</Text>}
      <SearchBar handleSubmit={handleSubmit} loading={loading} />
      <Suspense fallback={<div key={1}>Loading...</div>}>
        {patents.length ? (
          <Patents
            loadMore={loadMore}
            hasMore={hasMore}
            initialLoad={initialLoad}
            patents={patents}
          />
        ) : null}
      </Suspense>
    </Grid>
  )
}
