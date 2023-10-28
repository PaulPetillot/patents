import {
  Text,
  List,
  ListItem,
  Heading,
  Link,
  Button,
  Flex,
} from '@chakra-ui/react'
import { RiArrowGoBackFill, RiDownloadFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import { ExpendableText } from '~/components/Text/ExpendableText'
import type { IPatent } from '~/utils/types'

export const FullPatent = ({ patent }: { patent: IPatent }) => {
  const navigate = useNavigate()

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
    inventionSubjectMatterCategory = '',
    mainCPCSymbolText = '',
    assigneeEntityName = '',
    assigneePostalAddressText = '',
    archiveURI = '',
  } = patent

  return (
    <>
      <Button
        backgroundColor="transparent"
        w="80px"
        mb={2}
        leftIcon={<RiArrowGoBackFill />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Flex
        flexDirection="column"
        justifyContent="space-around"
        borderWidth={['0px', '1px']}
        borderRadius="lg"
        padding="6"
        boxShadow={['none', 'lg']}
      >
        <Heading as="h2" size="lg" marginBottom="4">
          {inventionTitle &&
            inventionTitle.charAt(0).toUpperCase() +
              inventionTitle.slice(1).toLowerCase()}
        </Heading>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          mt={[4, 0]}
          mb="4"
        >
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
        </Flex>
        <Flex flexDirection="column" justifyContent="space-around">
          <Text mb="2">
            <strong>Invention Subject Matter Category:</strong>{' '}
            {inventionSubjectMatterCategory || 'N/A'}
          </Text>
          <Text mb="2">
            <strong>Main CPC Symbol:</strong> {mainCPCSymbolText || 'N/A'}
          </Text>
          <Text mb="2">
            <strong>Assignee Entity Name:</strong> {assigneeEntityName || 'N/A'}
          </Text>
          <Text mb="2">
            <strong>Assignee Postal Address:</strong>{' '}
            {assigneePostalAddressText || 'N/A'}
          </Text>
        </Flex>
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
                inventorNameArrayText.map((inventor) => (
                  <ListItem key={inventor}>{inventor}</ListItem>
                ))}
            </List>
          ) : (
            'N/A'
          )}
        </>

        <ExpendableText title="Abstract" text={abstractText?.[0] || 'N/A'} />
        <ExpendableText
          title="Description"
          text={descriptionText?.[0] || 'N/A'}
        />
        <ExpendableText title="Claim" text={claimText?.[0] || 'N/A'} />
        {filelocationURI ? (
          <Link
            mx="auto"
            w={['full', 'sm']}
            href={filelocationURI}
            isExternal
            color="blue.500"
          >
            <Button w={['full', 'sm']} mt="4" leftIcon={<RiDownloadFill />}>
              Download Patent Application
            </Button>
          </Link>
        ) : null}
        {archiveURI ? (
          <Link
            mx="auto"
            w={['full', 'sm']}
            href={archiveURI}
            isExternal
            color="blue.500"
          >
            <Button w={['full', 'sm']} mt="4" leftIcon={<RiDownloadFill />}>
              Download Archive
            </Button>
          </Link>
        ) : null}
      </Flex>
    </>
  )
}
