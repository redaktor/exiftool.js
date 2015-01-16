exports.info = { FormatID: '1281',
  FormatName: 'Microsoft Office Encrypted Document',
  FormatVersion: '2007 Onwards',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Presentation, Spreadsheet, Word Processor',
  FormatDisclosure: '',
  FormatDescription: 'A Microsoft Office - Word, Excel, or PowerPoint document, that has been encrypted. The encrypted document conforms to the MS-OFFCRYPTO specification, as found here: http://msdn.microsoft.com/en-us/library/cc313071(v=office.12).aspx The document is an OLE2 compound that contains a number of files: EncryptionInfo - This file contains information used by the Office-compatible application to decrypt the encrypted package. There are multiple variants of this file, as described in 2.3.4.5, and 2.3.4.6 of the format specification. EncryptedPackage - This file contains the whole of the encrypted document. DataSpaces folder (and sub-files) - This structure associates protected content with data space definitions. The data space definition, in turn, describes the series of transforms that must be applied to that protected content to restore it to its original form. Since the method of identifying and distinguishing specific types of OOXML documents relies on seeking and analysing specific elements within the document, and in the case of encryption this information is obfuscated, it does not currently seem possible to determine with any specificity whether an encrypted file is either an Excel, Word, or PowerPoint document, apart from the file extension.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '26 Feb 2013',
  ProvenanceDescription: 'This format can be identified via a container signature in DROID version 6 or later. The PRONOM database cannot currently represent container signatures.',
  LastUpdatedDate: '26 Feb 2013',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/494', IdentifierType: 'PUID' },
  Developers: 
   { DeveloperID: '93',
     DeveloperName: '',
     OrganisationName: 'Microsoft Corporation',
     DeveloperCompoundName: 'Microsoft Corporation' },
  Support: 
   { SupportID: '93',
     SupportName: '',
     OrganisationName: 'Microsoft Corporation',
     SupportCompoundName: 'Microsoft Corporation' },
  ExternalSignature: 
   [ { ExternalSignatureID: '1305',
       Signature: 'xslx',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1306',
       Signature: 'pptx',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1307',
       Signature: 'docx',
       SignatureType: 'File extension' } ] }