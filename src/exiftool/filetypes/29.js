exports.info = { FormatID: '702',
  FormatName: 'AutoCAD Drawing',
  FormatVersion: '2.6',
  FormatAliases: 'DWG (2.6)',
  FormatFamilies: 'DWG',
  FormatTypes: 'Image (Vector)',
  FormatDisclosure: 'None',
  FormatDescription: 'The AutoCAD Drawing format is a vector graphics format, and is the native file format of AutoDesk\'s AutoCAD family of products. The format is proprietary and AutoDesk does not make details of its structure public. The information contained here is derived primarily from the OpenDWG Alliance\'s reverse-engineered documentation of the format, and should not therefore be regarded as definitive. The basic structure of a DWG file comprises a header section, a drawing class definitions section, the drawing object data, a drawing object map, which contains the locations of all the objects in the drawing, and an image data section, which may contain a raster image of the drawing in either Windows Bitmap (BMP) or Windows Metafile (WMF) format. DWG version 2.6 is the version of the format associated with Version 2.6 of AutoCAD.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Little-endian (Intel)',
  ReleaseDate: '01 Apr 1987',
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
   [ { Identifier: 'fmt/29', IdentifierType: 'PUID' },
     { Identifier: 'image/vnd.dwg', IdentifierType: 'MIME' } ],
  ExternalSignature: 
   { ExternalSignatureID: '653',
     Signature: 'dwg',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '91',
     SignatureName: 'AutoCAD Drawing Format 2.6',
     SignatureNote: 'Header',
     ByteSequence: 
      { ByteSequenceID: '9',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '414331303033' } },
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '718',
       RelatedFormatName: 'Drawing Interchange File Format (ASCII)',
       RelatedFormatVersion: '2.6' },
     { RelationshipType: 'Is previous version of',
       RelatedFormatID: '703',
       RelatedFormatName: 'AutoCAD Drawing',
       RelatedFormatVersion: 'R9' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '701',
       RelatedFormatName: 'AutoCAD Drawing',
       RelatedFormatVersion: '2.5' } ] }