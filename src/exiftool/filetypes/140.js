exports.info = { FormatID: '783',
  FormatName: 'OpenDocument Database Format',
  FormatVersion: '1.0',
  FormatAliases: 'ODF Database (1.0)',
  FormatFamilies: '',
  FormatTypes: 'Database',
  FormatDisclosure: 'Full',
  FormatDescription: 'OpenDocument (ODF) format is a generic format for office documents, such as text, spreadsheets, presentations, drawings, and databases. It was developed by OASIS, based on the original OpenOffice document format. The format is an open standard, and is supported by a variety of office software packages. ODF is an XML format, which may comprise a single XML document, or a collection of subdocuments within a package. The package format is the commonly used form, and comprises a standard ZIP package containing the XML content and any associated binary data, together with a manifest which lists the package content. An ODF database document contains a relational database. The content is contained in a \'content\' xml subdocument. Additional subdocuments contain style information, document metadata, and application-specific settings.',
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
  FileFormatIdentifier: { Identifier: 'fmt/140', IdentifierType: 'PUID' },
  Developers: 
   { DeveloperID: '127',
     DeveloperName: '',
     OrganisationName: 'OASIS',
     DeveloperCompoundName: 'OASIS' },
  ExternalSignature: 
   { ExternalSignatureID: '786',
     Signature: 'odb',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '207',
     SignatureName: 'ODF 1.0 database',
     SignatureNote: 'ZIP header + MIME-type declaration + version number',
     ByteSequence: 
      { ByteSequenceID: '265',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: 'Little-endian',
        ByteSequenceValue: '504B0304{26}6D696D65747970656170706C69636174696F6E2F766E642E73756E2E786D6C2E62617365*6F66666963653A76657273696F6E3D22312E30' } },
  RelatedFormat: 
   [ { RelationshipType: 'Has priority over',
       RelatedFormatID: '382',
       RelatedFormatName: 'ZIP Format',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '777',
       RelatedFormatName: 'Java Archive Format',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '778',
       RelatedFormatName: 'OpenDocument Format',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '1231',
       RelatedFormatName: 'OpenDocument Database Format',
       RelatedFormatVersion: '1.1' },
     { RelationshipType: 'Is subtype of',
       RelatedFormatID: '778',
       RelatedFormatName: 'OpenDocument Format',
       RelatedFormatVersion: '1.0' } ] }