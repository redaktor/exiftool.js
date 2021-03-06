exports.info = { FormatID: '780',
  FormatName: 'OpenDocument Spreadsheet',
  FormatVersion: '1.0',
  FormatAliases: 'ODF Spreadsheet (1.0)',
  FormatFamilies: '',
  FormatTypes: 'Spreadsheet',
  FormatDisclosure: 'Full',
  FormatDescription: 'OpenDocument (ODF) format is a generic format for office documents, such as text, spreadsheets, presentations, drawings, and databases. It was developed by OASIS, based on the original OpenOffice document format. The format is an open standard, and is supported by a variety of office software packages. ODF is an XML format, which may comprise a single XML document, or a collection of subdocuments within a package. The package format is the commonly used form, and comprises a standard ZIP package containing the XML content and any associated binary data, together with a manifest which lists the package content. An ODF spreadsheet document contains spreadsheet data. The content is contained in a \'content\' xml subdocument. Additional subdocuments contain style information, document metadata, and application-specific settings.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Little-endian (Intel)',
  ReleaseDate: '01 May 2005',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '22 Aug 2006',
  ProvenanceDescription: 'This format can be identified via a container signature in DROID version 6 or later. The PRONOM database cannot currently represent container signatures.',
  LastUpdatedDate: '19 Apr 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'application/vnd.oasis.opendocument.spreadsheet',
       IdentifierType: 'MIME' },
     { Identifier: 'fmt/137', IdentifierType: 'PUID' } ],
  Developers: 
   { DeveloperID: '127',
     DeveloperName: '',
     OrganisationName: 'OASIS',
     DeveloperCompoundName: 'OASIS' },
  Document: 
   { DocumentID: '72',
     DisplayText: 'OASIS, 2005, Open Document Format for Office Applications (OpenDocument) v1.0, OASIS Standard, 1 May 2005',
     DocumentType: 'Authoritative',
     AvailabilityDescription: 'Public',
     AvailabilityNote: '',
     PublicationDate: '01 May 2005',
     TitleText: 'Open Document Format for Office Applications (OpenDocument) v1.0, OASIS Standard, 1 May 2005',
     DocumentIPR: '',
     DocumentNote: '',
     DocumentIdentifier: 
      { Identifier: 'docs.oasis-open.org/office/v1.0/OpenDocument-v1.0-os.pdf',
        IdentifierType: 'URL' },
     Author: 
      { AuthorID: '127',
        AuthorName: '',
        OrganisationName: 'OASIS',
        AuthorCompoundName: 'OASIS' },
     Publisher: 
      { PublisherID: '127',
        PublisherName: '',
        OrganisationName: 'OASIS',
        PublisherCompoundName: 'OASIS' } },
  ExternalSignature: 
   [ { ExternalSignatureID: '780',
       Signature: 'ods',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '781',
       Signature: 'ots',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '204',
     SignatureName: 'ODF 1.0 spreadsheet',
     SignatureNote: 'ZIP header + MIME-type declaration + version number',
     ByteSequence: 
      { ByteSequenceID: '262',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: 'Little-endian',
        ByteSequenceValue: '504B0304{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574*6F66666963653A76657273696F6E3D22312E30' } },
  RelatedFormat: 
   [ { RelationshipType: 'Has priority over',
       RelatedFormatID: '778',
       RelatedFormatName: 'OpenDocument Format',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '1037',
       RelatedFormatName: 'OpenDocument Spreadsheet',
       RelatedFormatVersion: '1.1' },
     { RelationshipType: 'Is subtype of',
       RelatedFormatID: '778',
       RelatedFormatName: 'OpenDocument Format',
       RelatedFormatVersion: '1.0' } ] }