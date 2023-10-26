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

//  inventionSubjectMatterCategory: string
//   patentApplicationNumber: string
//   filingDate: string
//   mainCPCSymbolText: string | null
//   furtherCPCSymbolArrayText: string | null
//   inventorNameArrayText: string[]
//   abstractText: string[]
//   assigneeEntityName: string
//   assigneePostalAddressText: string
//   inventionTitle: string
//   filelocationURI: string
//   archiveURI: string
//   claimText: string[]
//   descriptionText: string[]
//   publicationDate: string
//   publicationDocumentIdentifier: string

export const Patent = (patent: IPatent) => {
  const {
    inventionTitle,
    patentApplicationNumber,
    filingDate,
    publicationDate,
    publicationDocumentIdentifier,
    inventorNameArrayText,
    abstractText,
    filelocationURI,
    descriptionText,
    claimText,
  } = patent

  return (
    <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg">
      <Heading as="h2" size="lg" marginBottom="4">
        {inventionTitle.charAt(0).toUpperCase() +
          inventionTitle.slice(1).toLowerCase()}
      </Heading>

      <Text mb="2">
        <strong>Patent Application Number:</strong> {patentApplicationNumber}
      </Text>
      <Text mb="2">
        <strong>Filing Date:</strong> {filingDate}
      </Text>
      <Text mb="2">
        <strong>Publication Date:</strong> {publicationDate}
      </Text>
      <Text mb="2">
        <strong>Publication Identifier:</strong> {publicationDocumentIdentifier}
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
      <ExpendableText title="Abstract" text={abstractText[0]} />
      <ExpendableText title="Description" text={descriptionText[0]} />
      <ExpendableText title="Claim" text={claimText[0]} />

      <Link href={filelocationURI} isExternal color="blue.500">
        <Button mt="4" leftIcon={<RiDownloadFill />}>
          Download
        </Button>
      </Link>
    </Box>
  )
}
