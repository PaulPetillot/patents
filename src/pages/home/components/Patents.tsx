import { Box } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller'

import { Patent } from '~/components/Patent/Patent'
import type { IPatent } from '~/utils/types'

const Patents = ({
  patents,
  initialLoad,
  loadMore,
  hasMore,
}: {
  patents: IPatent[]
  initialLoad: boolean
  loadMore: () => void
  hasMore: boolean
}) => {
  return (
    <InfiniteScroll
      initialLoad={initialLoad}
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<div key={0}>Loading...</div>}
    >
      {patents.map(({ ...patentProps }, i) => (
        <Box
          // eslint-disable-next-line react/no-array-index-key
          key={`${patentProps.inventionTitle}-${i}`}
          mt={4}
          maxW={[350, 800]}
        >
          <Patent patent={patentProps} />
        </Box>
      ))}
    </InfiniteScroll>
  )
}

export default Patents
