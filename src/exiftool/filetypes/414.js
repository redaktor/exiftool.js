exports.info = { FormatID: '1192',
  FormatName: 'Audio Interchange File Format',
  FormatVersion: '1.2',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Audio',
  FormatDisclosure: '',
  FormatDescription: 'The Audio Interchange File Format (Audio IFF) provides a standard for storing sampled sounds. The format allows for the storage of monaural or multichannel sampled sounds at a variety of sample rates and sample widths. Audio IFF conforms to the " EA IFF 85" Standard for Interchange Format Files developed by Electronic Arts. Audio IFF is primarily an interchange format, although application designers should find it flexible enough to use as a data storage format as well. If an application does choose to use a different storage format, it should be able to convert to and from the format defined in this document. This will facilitate the sharing of sound data between applications. Audio IFF is the result of several meetings held with music developers over a period of ten months in 1987-88.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '180',
  ProvenanceName: 'The National Archives and Records Administration / The National Archives and Records Administration',
  ProvenanceSourceDate: '06 Nov 2012',
  ProvenanceDescription: 'Specification available at http://www.music.mcgill.ca/~ich/classes/synth/AudioIFF1.2.1/AudioIFF1.2.1.html',
  LastUpdatedDate: '06 Nov 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/414', IdentifierType: 'PUID' },
  ExternalSignature: 
   [ { ExternalSignatureID: '1235',
       Signature: 'aif',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1428',
       Signature: 'aiff',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '320',
     SignatureName: 'Audio Interchange File Format',
     SignatureNote: 'Starts like most IFF files (FORM) followed by four bytes that tell how many more bytes follow in the file followed by AIFF.',
     ByteSequence: 
      { ByteSequenceID: '420',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: 'Big-endian',
        ByteSequenceValue: '464F524D{4}41494646' } },
  RelatedFormat: 
   { RelationshipType: 'Has priority over',
     RelatedFormatID: '221',
     RelatedFormatName: 'Interchange File',
     RelatedFormatVersion: '' } }