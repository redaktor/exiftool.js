exports.info = { FormatID: '1019',
  FormatName: 'FLAC (Free Lossless Audio Codec)',
  FormatVersion: '1.2.1',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Audio',
  FormatDisclosure: '',
  FormatDescription: 'FLAC stands for Free Lossless Audio Codec, an audio format similar to MP3, but lossless, meaning that audio is compressed in FLAC without any loss in quality. The basic structure of a FLAC stream is: •The four byte string "fLaC" •The STREAMINFO metadata block •Zero or more other metadata blocks •One or more audio frames The first four bytes are to identify the FLAC stream. The metadata that follows contains all the information about the stream except for the audio data itself. After the metadata comes the encoded audio data.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '17 Sep 2007',
  WithdrawnDate: '',
  ProvenanceSourceID: '180',
  ProvenanceName: 'The National Archives and Records Administration / The National Archives and Records Administration',
  ProvenanceSourceDate: '29 Jul 2010',
  ProvenanceDescription: 'Further information about this file format can be obtained at: http://flac.sourceforge.net/documentation_format_overview.html',
  LastUpdatedDate: '28 Aug 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/279', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '1001',
     Signature: 'flac',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '295',
     SignatureName: 'FLAC (Free Lossless Audio Codec)',
     SignatureNote: 'BOF: fLaC..."',
     ByteSequence: 
      { ByteSequenceID: '394',
        PositionType: 'Absolute from BOF',
        Offset: '',
        MaxOffset: '4',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '664C614300000022' } } }