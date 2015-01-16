exports.info = { FormatID: '918',
  FormatName: 'Digital Moving Picture Exchange Bitmap',
  FormatVersion: '1.0',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Video',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '165',
  ProvenanceName: 'Georgia Tech Research Institute / Georgia Tech Research Institute',
  ProvenanceSourceDate: '27 Oct 2009',
  ProvenanceDescription: '',
  LastUpdatedDate: '19 Jul 2013',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/193', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '900',
     Signature: 'dpx',
     SignatureType: 'File extension' },
  InternalSignature: 
   [ { SignatureID: '848',
       SignatureName: 'DPX v1 Big endian',
       SignatureNote: 'Magic number in first four bytes: SDPX indicates big-endian byte order; 4 byte offset to image; Version 1.0',
       ByteSequence: 
        { ByteSequenceID: '1072',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '0',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '53445058{4}56312E30' } },
     { SignatureID: '849',
       SignatureName: 'DPX v1 Little endian',
       SignatureNote: 'Magic number in first four bytes: XPDS indicates little-endian byte order; 4 byte offset to image; Version 1.0',
       ByteSequence: 
        { ByteSequenceID: '1073',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '0',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '58504453{4}56312E30' } } ],
  RelatedFormat: 
   { RelationshipType: 'Is previous version of',
     RelatedFormatID: '1328',
     RelatedFormatName: 'Digital Moving Picture Exchange Bitmap',
     RelatedFormatVersion: '2.0' } }