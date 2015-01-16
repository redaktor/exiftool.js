exports.info = { FormatID: '1134',
  FormatName: 'Microsoft Animated Cursor Format',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Image (Raster)',
  FormatDisclosure: '',
  FormatDescription: 'Animated Cursor Format (ANI), also known as Windows NT Animated Cursor, is a chunk-based bitmap format developed by Microsoft, based on the generic Resource Interchange File Format (RIFF) specification developed by Microsoft and IBM. Structurally, an ANI file is composed of a number of chunks, each comprising a four character code chunk identifier, the chunk size, and the chunk data. It comprises a RIFF header with an ANI data type identifier, followed by a series of chunks which contain two or more bitmaps stored in an ANI file. Each bitmap is typically either a Windows cursor or icon data, but may also be raw, uncompressed bitmaps. Additional information stored in the ANI file controls the rate and the sequence in which each frame is displayed. Furthe information regarding this and other RIFF formats can be found at http://oreilly.com/www/centers/gff/formats/micriff/',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '23 Nov 2011',
  ProvenanceDescription: '',
  LastUpdatedDate: '23 Nov 2011',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/386', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '1176',
     Signature: 'ani',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '571',
     SignatureName: 'Microsoft Animated Cursor Format',
     SignatureNote: 'Header: RIFF (4 bytes) ACON (variable length byte sequence) anih, then length of subchunck (32) minus 8 followed by HeaderSize is the size of the subchunk data (all the bytes appearing after the Size field) in bytes. Followed by LIST (4 bytes) framicon',
     ByteSequence: 
      { ByteSequenceID: '704',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '52494646{4}41434F4E{0-*}616E69682400000024000000[!00]*4C495354{4}6672616D69636F6E' } } }