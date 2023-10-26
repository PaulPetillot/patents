import { Patent } from '~/components/Patent/Patent'
import type { IPatent } from '~/utils/types'

const Patents = ({ patents }: { patents: IPatent[] }) => {
  return (
    <>
      {patents.map(({ ...patentProps }) => (
        <Patent
          key={`${patentProps.publicationDocumentIdentifier}-${patentProps.inventionTitle}`}
          {...patentProps}
        />
      ))}
    </>
  )
}

export default Patents
