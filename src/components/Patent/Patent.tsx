import {
  Text,
  List,
  ListItem,
  Heading,
  Box,
  Link,
  Button,
} from '@chakra-ui/react'
import { RiDownloadFill } from 'react-icons/ri'

import { ExpendableText } from '../ExpendableText/ExpendableText'
import type { IPatent } from '~/utils/types'

export const Patent = ({ patent }: { patent: IPatent }) => {
  const {
    inventionTitle = '',
    patentApplicationNumber = '',
    filingDate = '',
    publicationDate = '',
    publicationDocumentIdentifier = '',
    inventorNameArrayText = [],
    abstractText = [],
    filelocationURI = '',
    descriptionText = [],
    claimText = [],
  } = patent

  return (
    <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg">
      <Heading as="h2" size="lg" marginBottom="4">
        {inventionTitle &&
          inventionTitle.charAt(0).toUpperCase() +
            inventionTitle.slice(1).toLowerCase()}
      </Heading>
      <Text mb="2">
        <strong>Patent Application Number:</strong>{' '}
        {patentApplicationNumber || 'N/A'}
      </Text>
      <Text mb="2">
        <strong>Filing Date:</strong> {filingDate || 'N/A'}
      </Text>
      <Text mb="2">
        <strong>Publication Date:</strong> {publicationDate || 'N/A'}
      </Text>
      <Text mb="2">
        <strong>Publication Identifier:</strong>{' '}
        {publicationDocumentIdentifier || 'N/A'}
      </Text>

      <Heading as="h3" size="lg" my="4">
        Inventor(s)
      </Heading>
      <List spacing={1}>
        {inventorNameArrayText &&
          inventorNameArrayText.map((inventor) => (
            <ListItem key={inventor}>{inventor}</ListItem>
          ))}
      </List>

      <ExpendableText title="Abstract" text={abstractText?.[0] || 'N/A'} />
      <ExpendableText
        title="Description"
        text={descriptionText?.[0] || 'N/A'}
      />
      <ExpendableText title="Claim" text={claimText?.[0] || 'N/A'} />

      {filelocationURI ? (
        <Link href={filelocationURI} isExternal color="blue.500">
          <Button mt="4" leftIcon={<RiDownloadFill />}>
            Download
          </Button>
        </Link>
      ) : null}
    </Box>
  )
}
