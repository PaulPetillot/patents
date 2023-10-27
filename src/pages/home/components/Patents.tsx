import { Box } from '@chakra-ui/react'
import { FixedSizeList as List } from 'react-window'

import { PatentSkeleton } from '~/components/Skeletons/PatentSkeleton'
import { Patent } from '~/pages/home/components/Patent'
import type { IPatent } from '~/utils/types'

const Row = ({
  index,
  style,
  patents,
}: {
  index: number
  style: React.CSSProperties | undefined
  patents: IPatent[]
}) => (
  <Box style={style}>
    <Patent patent={patents[index]} />
  </Box>
)

export const Patents = ({
  patents,
  loadMore,
  hasMore,
  loading,
}: {
  patents: IPatent[]
  loadMore: () => void
  hasMore: boolean
  loading: boolean
}) => {
  const itemSize = 860

  // Using react-window to dynamically render patents to have only a few of them rendered at all time.
  return loading ? (
    <PatentSkeleton />
  ) : (
    <List
      height={860}
      itemCount={patents.length}
      itemSize={itemSize}
      width="100%"
      onItemsRendered={({ visibleStopIndex }) => {
        if (hasMore && visibleStopIndex === patents.length - 1) {
          loadMore()
        }
      }}
    >
      {({ style, index }) => (
        <Row style={style} index={index} patents={patents} />
      )}
    </List>
  )
}
