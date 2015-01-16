exports.info = { FormatID: '1207',
  FormatName: 'Video Object File (MPEG-2 subset)',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Video',
  FormatDisclosure: '',
  FormatDescription: 'A Video Object File (or VOB) is a strict subset of the MPEG-2 Program Stream, primarily used within DVD video. A VOB will contain an extended private stream containing both \'Packet Control Information\', and \'Data Search Information\'.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '11 Jun 2012',
  ProvenanceDescription: '',
  LastUpdatedDate: '26 Feb 2013',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/425', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '1213',
     Signature: 'vob',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '636',
     SignatureName: 'Video Object File',
     SignatureNote: 'Same as BOF sequence for MPEG 1 & 2 but variation on last byte. VAR is seeking presence of Private Stream with ‘Packet Control Information’, then ‘Data Search Information’ respectively',
     ByteSequence: 
      [ { ByteSequenceID: '787',
          PositionType: 'Absolute from BOF',
          Offset: '',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '000001BA{8-11}000001(BB|BD|BE|E0)' },
        { ByteSequenceID: '1007',
          PositionType: 'Variable',
          Offset: '',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '000001BF03D400{979}000001BF03FA01' } ] },
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '659',
       RelatedFormatName: 'MPEG-1 Video Format',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '660',
       RelatedFormatName: 'MPEG-2 Video Format',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Is subtype of',
       RelatedFormatID: '660',
       RelatedFormatName: 'MPEG-2 Video Format',
       RelatedFormatVersion: '' } ] }