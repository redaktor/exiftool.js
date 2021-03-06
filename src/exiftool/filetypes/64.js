exports.info = { FormatID: '710',
  FormatName: 'Drawing Interchange File Format (ASCII)',
  FormatVersion: '1.0',
  FormatAliases: 'ASCII DXF (1.0)',
  FormatFamilies: 'DXF',
  FormatTypes: 'Image (Vector)',
  FormatDisclosure: 'None',
  FormatDescription: 'ASCII DXF format is the ASCII encoded variant of the Drawing Interchange File Format, an exchange format for vector graphics developed by AutoDesk. They are probably the widely-used formats for exchanging vector data, and have become a de-facto industry standard. The format is owned by AutoDesk and typically changes with each release of their AutoCAD family of products. DXF files contain a tagged representation of the vector data. The structure comprises a Header section, followed by sections containing data on Classes, Tables, Blocks, Entities and, optionally, thumbnail images. Each section contains a series of data elements. each preceded by a group code tag, which indicates the type of data element. ASCII DXF version 1.0 is the version of the format associated with Version 1.0 of the AutoCAD family of software products.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '01 Dec 1982',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '11 Mar 2005',
  ProvenanceDescription: '',
  LastUpdatedDate: '02 Aug 2005',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'fmt/64', IdentifierType: 'PUID' },
     { Identifier: 'image/vnd.dxf', IdentifierType: 'MIME' } ],
  ExternalSignature: 
   { ExternalSignatureID: '680',
     Signature: 'dxf',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '99',
     SignatureName: 'Drawing Interchange File Format 1.0',
     SignatureNote: 'Header section with $ACADVER group code, EOF marker',
     ByteSequence: 
      [ { ByteSequenceID: '49',
          PositionType: 'Variable',
          Offset: '',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '300D0A53454354494F4E0D0A2020320D0A4845414445520D0A*390D0A24414341445645520D0A2020310D0A4D43302E300D0A*300D0A454E445345430D0A' },
        { ByteSequenceID: '50',
          PositionType: 'Absolute from EOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '300D0A454F460D0A' } ] },
  RelatedFormat: 
   [ { RelationshipType: 'Has priority over',
       RelatedFormatID: '694',
       RelatedFormatName: 'AutoCAD Drawing',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '766',
       RelatedFormatName: 'Drawing Interchange File Format (ASCII)',
       RelatedFormatVersion: 'Generic' },
     { RelationshipType: 'Is previous version of',
       RelatedFormatID: '711',
       RelatedFormatName: 'Drawing Interchange File Format (ASCII)',
       RelatedFormatVersion: '1.2' } ] }