export interface IPatent {
  inventionSubjectMatterCategory: string
  patentApplicationNumber: string
  filingDate: string
  mainCPCSymbolText: string | null
  furtherCPCSymbolArrayText: string | null
  inventorNameArrayText: string[]
  abstractText: string[]
  assigneeEntityName: string
  assigneePostalAddressText: string
  inventionTitle: string
  filelocationURI: string
  archiveURI: string
  claimText: string[]
  descriptionText: string[]
  publicationDate: string
  publicationDocumentIdentifier: string
}

export interface IUseSearch {
  searchTerm: string
  fromDate?: string
  toDate?: string
}
