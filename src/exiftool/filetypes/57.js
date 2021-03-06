exports.info = { FormatID: '680',
  FormatName: 'Microsoft Excel 4.0 Worksheet (xls)',
  FormatVersion: '4S',
  FormatAliases: 'Microsoft Excel Worksheet (4.0)',
  FormatFamilies: '',
  FormatTypes: 'Spreadsheet',
  FormatDisclosure: 'None',
  FormatDescription: 'The Binary Interchange File Format (BIFF) is a spreadsheet file format developed by Microsoft. BIFF 4S is a native file format of Microsoft Excel 4.0 for Windows. Excel 4.0 allowed either a single worksheet to be stored as a worksheet file (BIFF 4S), or for multiple worksheets to be combined in a single workbook file (BIFF 4W). The format is proprietary and Microsoft does not make details of its structure public. The information contained here is derived primarily from OpenOffice.org\'s reverse-engineered documentation of the format, and should not therefore be regarded as definitive. BIFF is a stream based format, and a BIFF 4S file comprises a single Worksheet stream, containing a Beginning of File (BOF) record, followed by a series of Worksheet records, and terminated by an End of File (EOF) record.',
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
     { Identifier: 'fmt/57', IdentifierType: 'PUID' } ],
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
   { ExternalSignatureID: '661',
     Signature: 'xls',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '74',
     SignatureName: 'BIFF 4 Worksheet',
     SignatureNote: 'BIFF4: BOF hex 0904. record length hex 0600, BIFF version=(not used), filetype=worksheet=1000',
     ByteSequence: 
      { ByteSequenceID: '190',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '09040600{2}1000' } },
  RelatedFormat: 
   [ { RelationshipType: 'Is previous version of',
       RelatedFormatID: '682',
       RelatedFormatName: 'Microsoft Excel 5.0/95 Workbook (xls)',
       RelatedFormatVersion: '5/95' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '679',
       RelatedFormatName: 'Microsoft Excel 3.0 Worksheet (xls)',
       RelatedFormatVersion: '3' },
     { RelationshipType: 'Is supertype of',
       RelatedFormatID: '181',
       RelatedFormatName: 'Microsoft Excel Chart',
       RelatedFormatVersion: '4.0' } ] }