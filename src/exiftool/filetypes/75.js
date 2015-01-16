exports.info = { FormatID: '721',
  FormatName: 'Drawing Interchange File Format (ASCII)',
  FormatVersion: 'R11/12',
  FormatAliases: 'ASCII DXF (R11/12)',
  FormatFamilies: 'DXF',
  FormatTypes: 'Image (Vector)',
  FormatDisclosure: 'Full',
  FormatDescription: 'ASCII DXF format is the ASCII encoded variant of the Drawing Interchange File Format, an exchange format for vector graphics developed by AutoDesk. They are probably the widely-used formats for exchanging vector data, and have become a de-facto industry standard. The format is owned by AutoDesk and typically changes with each release of their AutoCAD family of products. DXF files contain a tagged representation of the vector data. The structure comprises a Header section, followed by sections containing data on Classes, Tables, Blocks, Entities and, optionally, thumbnail images. Each section contains a series of data elements. each preceded by a group code tag, which indicates the type of data element. ASCII DXF version 11/12 is the version of the format associated with Releases 11 and 12 of the AutoCAD family of software products.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '01 Oct 1990',
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
   [ { Identifier: 'fmt/75', IdentifierType: 'PUID' },
     { Identifier: 'image/vnd.dxf', IdentifierType: 'MIME' } ],
  Document: 
   { DocumentID: '34',
     DisplayText: 'Autodesk Corporation, 1992, Drawing Interchange and File Formats, Release 12',
     DocumentType: 'Authoritative',
     AvailabilityDescription: 'Public',
     AvailabilityNote: '',
     PublicationDate: '01 Jan 1992',
     TitleText: 'Drawing Interchange and File Formats, Release 12',
     DocumentIPR: '',
     DocumentNote: '',
     Author: 
      { AuthorID: '18',
        AuthorName: '',
        OrganisationName: 'Autodesk Corporation',
        AuthorCompoundName: 'Autodesk Corporation' },
     Publisher: 
      { PublisherID: '18',
        PublisherName: '',
        OrganisationName: 'Autodesk Corporation',
        PublisherCompoundName: 'Autodesk Corporation' } },
  ExternalSignature: 
   { ExternalSignatureID: '638',
     Signature: 'dxf',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '110',
     SignatureName: 'Drawing Interchange File Format R11/12',
     SignatureNote: 'Header section with $ACADVER group code, EOF marker',
     ByteSequence: 
      [ { ByteSequenceID: '27',
          PositionType: 'Variable',
          Offset: '',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '30(0D0A|0A)53454354494F4E(0D0A|0A)202032(0D0A|0A)484541444552(0D0A|0A)*39(0D0A|0A)2441434144564552(0D0A|0A)202031(0D0A|0A)414331303039(0D0A|0A)*30(0D0A|0A)454E44534543(0D0A|0A)' },
        { ByteSequenceID: '28',
          PositionType: 'Absolute from EOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '30(0D0A|0A)454F46(0D0A|0A)' } ] },
  RelatedFormat: 
   [ { RelationshipType: 'Equivalent to',
       RelatedFormatID: '740',
       RelatedFormatName: 'Drawing Interchange File Format (Binary)',
       RelatedFormatVersion: 'R11/12' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '705',
       RelatedFormatName: 'AutoCAD Drawing',
       RelatedFormatVersion: 'R11/12' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '766',
       RelatedFormatName: 'Drawing Interchange File Format (ASCII)',
       RelatedFormatVersion: 'Generic' },
     { RelationshipType: 'Is previous version of',
       RelatedFormatID: '722',
       RelatedFormatName: 'Drawing Interchange File Format (ASCII)',
       RelatedFormatVersion: 'R13' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '720',
       RelatedFormatName: 'Drawing Interchange File Format (ASCII)',
       RelatedFormatVersion: 'R10' } ] }