exports.info = { FormatID: '696',
  FormatName: 'AutoCAD Drawing',
  FormatVersion: '1.3',
  FormatAliases: 'DWG (1.3)',
  FormatFamilies: 'DWG',
  FormatTypes: 'Image (Vector)',
  FormatDisclosure: 'None',
  FormatDescription: 'The AutoCAD Drawing format is a vector graphics format, and is the native file format of AutoDesk\'s AutoCAD family of products. The format is proprietary and AutoDesk does not make details of its structure public. The information contained here is derived primarily from the OpenDWG Alliance\'s reverse-engineered documentation of the format, and should not therefore be regarded as definitive. The basic structure of a DWG file comprises a header section, a drawing class definitions section, the drawing object data, a drawing object map, which contains the locations of all the objects in the drawing, and an image data section, which may contain a raster image of the drawing in either Windows Bitmap (BMP) or Windows Metafile (WMF) format. DWG version 1.3 is the version of the format associated with Version 1.3 of AutoCAD.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Little-endian (Intel)',
  ReleaseDate: '01 Aug 1983',
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
   [ { Identifier: 'fmt/23', IdentifierType: 'PUID' },
     { Identifier: 'image/vnd.dwg', IdentifierType: 'MIME' } ],
  ExternalSignature: 
   { ExternalSignatureID: '558',
     Signature: 'dwg',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '85',
     SignatureName: 'AutoCAD Drawing Format 1.3',
     SignatureNote: 'Header',
     ByteSequence: 
      { ByteSequenceID: '3',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '4143312E33' } },
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '712',
       RelatedFormatName: 'Drawing Interchange File Format (ASCII)',
       RelatedFormatVersion: '1.3' },
     { RelationshipType: 'Is previous version of',
       RelatedFormatID: '697',
       RelatedFormatName: 'AutoCAD Drawing',
       RelatedFormatVersion: '1.4' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '695',
       RelatedFormatName: 'AutoCAD Drawing',
       RelatedFormatVersion: '1.2' } ] }