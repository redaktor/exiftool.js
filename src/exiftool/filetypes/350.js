exports.info = { FormatID: '1095',
  FormatName: 'Paradox Database Table',
  FormatVersion: '3.0',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Database',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '165',
  ProvenanceName: 'Georgia Tech Research Institute / Georgia Tech Research Institute',
  ProvenanceSourceDate: '21 Apr 2011',
  ProvenanceDescription: 'Submitted by Georgia Tech Research Institute',
  LastUpdatedDate: '21 Apr 2011',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/350', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '1117',
     Signature: 'db',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '517',
     SignatureName: 'Paradox Database Table 3.0',
     SignatureNote: 'Header: offset 2 contains 2 byte length of header block (always 2048 little-endian (0008h); 0ffset 4 a 1 byte code of 00 or 02 for indexed or non-indexed database table, respectively; offset 5, 1 byte indicating maximum block size ( 1 = 1024, … 4=4096 in steps of 1 k); offset 25h or 37 decimal 00000000h indicating file is not encrypted, offset 39h or 57 decimal code indicating table version [03:04].',
     ByteSequence: 
      { ByteSequenceID: '638',
        PositionType: 'Absolute from BOF',
        Offset: '2',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '0008(00|02)[01:04]{31}00000000{16}[03:04]' } },
  RelatedFormat: 
   { RelationshipType: 'Is previous version of',
     RelatedFormatID: '1096',
     RelatedFormatName: 'Paradox Database Table',
     RelatedFormatVersion: '4.0' } }