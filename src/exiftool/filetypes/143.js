exports.info = { FormatID: '786',
  FormatName: 'Waveform Audio (WAVEFORMATEXTENSIBLE)',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: 'WAVE',
  FormatTypes: 'Audio',
  FormatDisclosure: '',
  FormatDescription: 'Waveform Audio (WAVEFORMATEXTENSION) is an extended version of the Waveform Audio file format, and was developed by Microsoft. It is related to the Waveform Audio (WAVEFORMATEX) format, but is an even more extended version.',
  BinaryFileFormat: 'Text',
  ByteOrders: 'Little-endian (Intel)',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '01 Feb 2007',
  ProvenanceDescription: '',
  LastUpdatedDate: '01 Feb 2007',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'audio/x-wav', IdentifierType: 'MIME' },
     { Identifier: 'fmt/143', IdentifierType: 'PUID' } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '789',
       Signature: 'wav',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '790',
       Signature: 'wave',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '608',
     SignatureName: 'Waveform Audio (WAVEFORMATEXTENSIBLE)',
     SignatureNote: 'RIFF header, WAVE ID, Format chunk, chunk length GTE 40, wformat Tag = decimal 65534 = 0xFEFF and Data chunk',
     ByteSequence: 
      { ByteSequenceID: '753',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: 'Big-endian',
        ByteSequenceValue: '52494646{4}57415645666D7420{4}FEFF{38-1000}64617461' } },
  RelatedFormat: 
   [ { RelationshipType: 'Has priority over',
       RelatedFormatID: '654',
       RelatedFormatName: 'Waveform Audio',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '785',
       RelatedFormatName: 'Waveform Audio (WAVEFORMATEX)',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Is subtype of',
       RelatedFormatID: '654',
       RelatedFormatName: 'Waveform Audio',
       RelatedFormatVersion: '' } ] }