exports.info = { FormatID: '678',
  FormatName: 'Microsoft Excel 2.x Worksheet (xls)',
  FormatVersion: '2',
  FormatAliases: 'Microsoft Excel Worksheet (2.1)',
  FormatFamilies: '',
  FormatTypes: 'Spreadsheet',
  FormatDisclosure: 'None',
  FormatDescription: 'The Binary Interchange File Format (BIFF) is a spreadsheet file format developed by Microsoft. BIFF 2 is the native file format of Microsoft Excel 2.1 for Windows. The format is proprietary and Microsoft does not make details of its structure public. The information contained here is derived primarily from OpenOffice.org\'s reverse-engineered documentation of the format, and should not therefore be regarded as definitive. BIFF is a stream based format, and a BIFF 2 file comprises a single worksheet stream, containing a Beginning of File (BOF) record, followed by a series of Worksheet records, and terminated by an End of File (EOF) record.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Little-endian (Intel)',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '11 Mar 2005',
  ProvenanceDescription: '',
  LastUpdatedDate: '19 Jul 2013',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'application/vnd.ms-excel',
       IdentifierType: 'MIME' },
     { Identifier: 'com.microsoft.excel.xls',
       IdentifierType: 'Apple Uniform Type Identifier' },
     { Identifier: 'fmt/55', IdentifierType: 'PUID' } ],
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
  Document: 
   { DocumentID: '10',
     DisplayText: 'OpenOffice.org, 2004, OpenOffice.org\'s documentation of the Microsoft Excel file format: Excel versions 2, 3, 4, 5, 95, 97, 2000, XP, 2003',
     DocumentType: 'Speculative',
     AvailabilityDescription: 'Public',
     AvailabilityNote: '',
     PublicationDate: '25 Nov 2004',
     TitleText: 'OpenOffice.org\'s documentation of the Microsoft Excel file format: Excel versions 2, 3, 4, 5, 95, 97, 2000, XP, 2003',
     DocumentIPR: '',
     DocumentNote: '',
     DocumentIdentifier: 
      { Identifier: 'sc.openoffice.org/excelfileformat.pdf',
        IdentifierType: 'URL' },
     Author: 
      { AuthorID: '103',
        AuthorName: '',
        OrganisationName: 'OpenOffice.org',
        AuthorCompoundName: 'OpenOffice.org' },
     Publisher: 
      { PublisherID: '103',
        PublisherName: '',
        OrganisationName: 'OpenOffice.org',
        PublisherCompoundName: 'OpenOffice.org' } },
  ExternalSignature: 
   { ExternalSignatureID: '574',
     Signature: 'xls',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '72',
     SignatureName: 'BIFF 2 Worksheet',
     SignatureNote: 'BIFF2: BOF hex 0900. record length hex 0400, BIFF version (not used), filetype=worksheet=1000',
     ByteSequence: 
      { ByteSequenceID: '177',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '09000400{2}1000' } },
  RelatedFormat: 
   [ { RelationshipType: 'Is previous version of',
       RelatedFormatID: '679',
       RelatedFormatName: 'Microsoft Excel 3.0 Worksheet (xls)',
       RelatedFormatVersion: '3' },
     { RelationshipType: 'Is supertype of',
       RelatedFormatID: '1341',
       RelatedFormatName: 'Microsoft Excel Chart',
       RelatedFormatVersion: '2.x' },
     { RelationshipType: 'Is supertype of',
       RelatedFormatID: '1343',
       RelatedFormatName: 'Microsoft Excel Macro',
       RelatedFormatVersion: '2.x' } ] }