exports.info = { FormatID: '1037',
  FormatName: 'OpenDocument Spreadsheet',
  FormatVersion: '1.1',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Spreadsheet',
  FormatDisclosure: 'Full',
  FormatDescription: 'OpenDocument (ODF) format is a generic format for office documents, such as text, spreadsheets, presentations, drawings, and databases. It was developed by OASIS, based on the original OpenOffice document format. The format is an open standard, and is supported by a variety of office software packages. ODF is an XML format, which may comprise a single XML document, or a collection of subdocuments within a package. The package format is the commonly used form, and comprises a standard ZIP package containing the XML content and any associated binary data, together with a manifest which lists the package content. An ODF spreadsheet document contains spreadsheet data. The content is contained in a \'content\' xml subdocument. Additional subdocuments contain style information, document metadata, and application-specific settings.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Little-endian (Intel)',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '03 Nov 2010',
  ProvenanceDescription: 'This format can be identified via a container signature in DROID version 6 or later. The PRONOM database cannot currently represent container signatures.',
  LastUpdatedDate: '19 Apr 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'application/vnd.oasis.opendocument.spreadsheet',
       IdentifierType: 'MIME' },
     { Identifier: 'fmt/294', IdentifierType: 'PUID' } ],
  Developers: 
   { DeveloperID: '127',
     DeveloperName: '',
     OrganisationName: 'OASIS',
     DeveloperCompoundName: 'OASIS' },
  ExternalSignature: 
   [ { ExternalSignatureID: '1024',
       Signature: 'ods',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1025',
       Signature: 'ots',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   [ { SignatureID: '312',
       SignatureName: 'ODF 1.1 spreadsheet (with version number)',
       SignatureNote: 'ZIP header + MIME-type declaration + version number. ODF versions without version number detail are assumed to be version 1.1',
       ByteSequence: 
        { ByteSequenceID: '413',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '504B0304{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414*6F66666963653A76657273696F6E3D22312E3122' } },
     { SignatureID: '313',
       SignatureName: 'ODF 1.1 spreadsheet (without version number)',
       SignatureNote: 'ZIP header + MIME-type declaration. ODF versions without version number detail are assumed to be version 1.1',
       ByteSequence: 
        { ByteSequenceID: '414',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '504B0304{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414' } } ],
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '780',
       RelatedFormatName: 'OpenDocument Spreadsheet',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1038',
       RelatedFormatName: 'OpenDocument Spreadsheet',
       RelatedFormatVersion: '1.2' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '382',
       RelatedFormatName: 'ZIP Format',
       RelatedFormatVersion: '' } ] }