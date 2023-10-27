import { Box } from '@chakra-ui/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { FixedSizeList as List } from 'react-window'

import { Patent } from '~/components/Patent/Patent'
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
}: {
  patents: IPatent[]
  loadMore: () => void
  hasMore: boolean
}) => {
  const itemSize = 860

  // Using react-window to dynamically show and hide patents that are offscreen to keep a high performance page and avoid thousands of them to be on the DOM
  return (
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
