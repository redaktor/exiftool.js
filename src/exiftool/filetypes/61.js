exports.info = { FormatID: '684',
  FormatName: 'Microsoft Excel 97 Workbook (xls)',
  FormatVersion: '8',
  FormatAliases: 'Microsoft Excel Workbook (97-2000)',
  FormatFamilies: '',
  FormatTypes: 'Spreadsheet',
  FormatDisclosure: 'None',
  FormatDescription: 'The Binary Interchange File Format (BIFF) is a spreadsheet file format developed by Microsoft. BIFF 8 is a native file format of Microsoft Excel 97. The format is proprietary and Microsoft does not make details of its structure public. The information here is derived primarily from OpenOffice.org\'s reverse-engineered documentation of the format and should not therefore be regarded as definitive. BIFF 8 is based on Microsoft’s generic OLE2 Compound Document Format. An Excel workbook is stored as a ‘Book’ stream within a Compound Document Format file. The Book stream comprises a Workbook Globals Substream, containing a Beginning of File (BOF) record, the Workbook global records, and terminated by an End of File (EOF) record. This is followed by one or more Worksheet substreams, containing a Beginning of File (BOF) record, the worksheet records, and terminated by an End of File (EOF) record. The format remained unchanged with the release of Excel 2000.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Little-endian (Intel)',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '11 Mar 2005',
  ProvenanceDescription: 'This format can be identified via a container signature in DROID version 6 or later. The PRONOM database cannot currently represent container signatures.',
  LastUpdatedDate: '18 Dec 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'application/vnd.ms-excel',
       IdentifierType: 'MIME' },
     { Identifier: 'com.microsoft.excel.xls',
       IdentifierType: 'Apple Uniform Type Identifier' },
     { Identifier: 'fmt/61', IdentifierType: 'PUID' } ],
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
   [ { ExternalSignatureID: '618',
       Signature: 'xls',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '714',
       Signature: 'xlw',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '78',
     SignatureName: 'BIFF 8 & 8X Workbook (generic)',
     SignatureNote: '09 - BOF / 08 - Version indicator / {2} - unspecified / 0006 - version / 0500 - substream',
     ByteSequence: 
      { ByteSequenceID: '195',
        PositionType: 'Absolute from BOF',
        Offset: '512',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '0908{2}00060500' } },
  RelatedFormat: 
   [ { RelationshipType: 'Has priority over',
       RelatedFormatID: '682',
       RelatedFormatName: 'Microsoft Excel 5.0/95 Workbook (xls)',
       RelatedFormatVersion: '5/95' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '767',
       RelatedFormatName: 'OLE2 Compound Document Format',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Is previous version of',
       RelatedFormatID: '685',
       RelatedFormatName: 'Microsoft Excel 2000-2003 Workbook (xls)',
       RelatedFormatVersion: '8X' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '683',
       RelatedFormatName: 'Microsoft Excel 95 Workbook (xls)',
       RelatedFormatVersion: '7' },
     { RelationshipType: 'Is subtype of',
       RelatedFormatID: '767',
       RelatedFormatName: 'OLE2 Compound Document Format',
       RelatedFormatVersion: '' } ],
  FormatProperties: 
   { FormatProperty: 
      [ { PropertyName: 'Creation Date',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Number of Pages',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Creating Application',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Title',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Creator',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Subject',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Comments',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Encrypted',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Word Count',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Character Count',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' } ] } }