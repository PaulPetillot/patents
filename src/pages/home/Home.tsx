import { Text, Grid, Skeleton } from '@chakra-ui/react'

import { SearchBar } from '~/components/SearchBar/SearchBar'
import { usePatents } from '~/utils/hooks/usePatents'

import { Header } from './components/Header'
import { Patents } from './components/Patents'

export const Home = () => {
  const { patents, loading, loadMore, hasMore, recordAmount, searchParams } =
    usePatents()

  return (
    <Grid gap={10}>
      <Header />
      {searchParams.searchTerm && (
        <Skeleton w={40} isLoaded={!loading}>
          <Text>{recordAmount} results</Text>
        </Skeleton>
      )}
      <SearchBar loading={loading} />
      {patents.length || loading ? (
        <Patents
          loading={loading}
          loadMore={loadMore}
          hasMore={hasMore}
          patents={patents}
        />
      ) : null}
    </Grid>
  )
}
