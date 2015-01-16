exports.info = { FormatID: '1256',
  FormatName: 'MS DOS Compression format (KWAJ variant)',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: '',
  FormatDisclosure: '',
  FormatDescription: 'The MS DOS compression format uses the LZSS algorithm to compress a single file into another single file, replacing the last character in the filename with an underscore. It is implemented via the MS DOS commands COMPRESS.EXE and EXPAND.EXE.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '25 Oct 2012',
  ProvenanceDescription: 'A DOS compressed file will be named file.**_, so a .exe will look like file.ex_, a DOS compressed .jpg will look like file.jp_ etc.',
  LastUpdatedDate: '25 Oct 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/469', IdentifierType: 'PUID' },
  InternalSignature: 
   { SignatureID: '733',
     SignatureName: 'MS DOS Compression format (KWAJ)',
     SignatureNote: 'BOF: KWAJˆð\'Ñ',
     ByteSequence: 
      { ByteSequenceID: '922',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '4B57414A88F027D1' } } }