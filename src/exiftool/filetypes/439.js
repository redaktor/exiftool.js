exports.info = { FormatID: '1226',
  FormatName: 'BSDIFF',
  FormatVersion: '4.0',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: '',
  FormatDisclosure: '',
  FormatDescription: 'A binary source patch file containing differences to be applied to a source binary in order to create a target binary file. As only the delta is stored and BZIP2 compression is used, this format provides an efficient means of applying patches to binary files.',
  BinaryFileFormat: 'Binary',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '11 Jun 2012',
  ProvenanceDescription: '',
  LastUpdatedDate: '11 Jun 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/439', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '1227',
     Signature: 'bsdiff',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '672',
     SignatureName: 'BSDIFF4.0',
     SignatureNote: '',
     ByteSequence: 
      { ByteSequenceID: '826',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '4253444946463430{24}425A68??314159265359' } } }