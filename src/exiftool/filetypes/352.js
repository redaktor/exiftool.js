exports.info = { FormatID: '1097',
  FormatName: 'Paradox Database Table',
  FormatVersion: '5.0',
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
  FileFormatIdentifier: { Identifier: 'fmt/352', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '1119',
     Signature: 'db',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '519',
     SignatureName: 'Paradox Database Table 5.0',
     SignatureNote: 'Header: offset 2 contains 2 byte length of header block (always 2048 (0800h); 0ffset 4 a 1 byte code of 00 or 02 for indexed or non-indexed database table, respectively; offset 5, 1 byte indicating maximum block size ( 1 = 1024, … 32=32768 in steps of 1 k); offset 39h or 57 decimal code indicating table version; offset 5Ch or 92 decimal 00000000h indicating file is not encrypted.',
     ByteSequence: 
      { ByteSequenceID: '640',
        PositionType: 'Absolute from BOF',
        Offset: '2',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '0008(00|02)[01:20]{51}(0A|0B){34}00000000' } },
  RelatedFormat: 
   { RelationshipType: 'Is subsequent version of',
     RelatedFormatID: '1096',
     RelatedFormatName: 'Paradox Database Table',
     RelatedFormatVersion: '4.0' } }