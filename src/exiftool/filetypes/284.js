exports.info = { FormatID: '1024',
  FormatName: 'Gridded Binary',
  FormatVersion: '1.0',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Dataset',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '01 Nov 2010',
  ProvenanceDescription: 'Following up external submission. Signature submitted by The Alfred Wegener Institute for Polar and Marine Research, Germany.',
  LastUpdatedDate: '01 Nov 2010',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/284', IdentifierType: 'PUID' },
  ExternalSignature: 
   [ { ExternalSignatureID: '1007',
       Signature: 'grb',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1013',
       Signature: 'wmo',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '300',
     SignatureName: 'Gridded Binary 1.0',
     SignatureNote: 'GRIB indicator section GRIB (4 bytes), reserved + discipline (3 bytes), edition number (1 byte). EOF End Section (4 bytes)',
     ByteSequence: 
      [ { ByteSequenceID: '399',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '47524942{3}01' },
        { ByteSequenceID: '400',
          PositionType: 'Absolute from EOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '37373737' } ] } }