exports.info = { FormatID: '1373',
  FormatName: 'MPEG 2 Transport Stream',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Video',
  FormatDisclosure: '',
  FormatDescription: 'MPEG transport stream is a format for transmission and storage of audio, video, and Program and System Information Protocol (PSIP) data.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '194',
  ProvenanceName: 'National Library of Wales / National Library of Wales',
  ProvenanceSourceDate: '28 Aug 2013',
  ProvenanceDescription: '',
  LastUpdatedDate: '28 Aug 2013',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/585', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '1416',
     Signature: 'm2t',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '927',
     SignatureName: 'MPEG 2 Transport Stream',
     SignatureNote: 'Packets of 188 bytes each, each packet beginning with 0x47. This signature may be strengthened with a better understanding of the make-up of these packets.',
     ByteSequence: 
      { ByteSequenceID: '1147',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '0',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '47{187}47{187}47{187}47{187}47{187}47{187}47{187}47' } } }