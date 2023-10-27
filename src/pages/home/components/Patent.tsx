import {
  Text,
  List,
  ListItem,
  Heading,
  Link,
  Button,
  Flex,
  useColorMode,
} from '@chakra-ui/react'
import { RiDownloadFill } from 'react-icons/ri'
import { Link as ReactRouterLink } from 'react-router-dom'

import { TruncatedParagraph } from '../../../components/Text/TruncatedParagraph'
import type { IPatent } from '~/utils/types'

export const Patent = ({ patent }: { patent: IPatent }) => {
  const { colorMode } = useColorMode()
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
    archiveURI = '',
  } = patent

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-around"
      height="800px"
      borderWidth="1px"
      borderRadius="lg"
      padding="6"
      boxShadow="lg"
      _hover={{
        backgroundColor: colorMode === 'light' ? 'gray.100' : 'gray.700',
        cursor: 'pointer',
      }}
    >
      <Link
        _hover={{
          textDecoration: 'none',
        }}
        preventScrollReset
        textDecoration="none"
        as={ReactRouterLink}
        to={`/patent/${patentApplicationNumber}`}
        state={{ patent }}
      >
        <Heading noOfLines={3} as="h2" size="lg" marginBottom="4">
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
        <>
          <Heading as="h3" size="lg" my="4">
            Inventor(s)
          </Heading>
          {inventorNameArrayText && inventorNameArrayText.length ? (
            <List
              spacing={1}
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={4}
            >
              {inventorNameArrayText &&
                inventorNameArrayText
                  .slice(0, 4)
                  .map((inventor) => (
                    <ListItem key={inventor}>{inventor}</ListItem>
                  ))}
              {inventorNameArrayText.length > 4 ? <Text>& more...</Text> : ''}
            </List>
          ) : (
            'N/A'
          )}
        </>

        <TruncatedParagraph
          title="Abstract"
          text={abstractText?.[0] || 'N/A'}
        />
        <TruncatedParagraph
          title="Description"
          text={descriptionText?.[0] || 'N/A'}
        />
        <TruncatedParagraph title="Claim" text={claimText?.[0] || 'N/A'} />
      </Link>
      <Flex>
        {filelocationURI ? (
          <Link href={filelocationURI} isExternal color="blue.500">
            <Button mr="2" mt="4" leftIcon={<RiDownloadFill />}>
              Download Patent Application
            </Button>
          </Link>
        ) : null}
        {archiveURI ? (
          <Link href={archiveURI} isExternal color="blue.500">
            <Button mt="4" leftIcon={<RiDownloadFill />}>
              Download Archive
            </Button>
          </Link>
        ) : null}
      </Flex>
    </Flex>
  )
}
