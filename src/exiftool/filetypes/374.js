exports.info = { FormatID: '1121',
  FormatName: 'Microsoft Visual FoxPro Database Table File',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Database',
  FormatDisclosure: '',
  FormatDescription: 'This is a generic record for several versions of the Microsoft Visual Fox Pro database format, which at the moment we are unable to identify down to version level. This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '04 Nov 2011',
  ProvenanceDescription: 'Further information about the FoxPro Database format, can be obtained at http://www.digitalpreservation.gov/formats/fdd/fdd000325.shtml',
  LastUpdatedDate: '04 Nov 2011',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/374', IdentifierType: 'PUID' },
  ExternalSignature: 
   { ExternalSignatureID: '1156',
     Signature: 'dbf',
     SignatureType: 'File extension' },
  InternalSignature: 
   [ { SignatureID: '552',
       SignatureName: 'Microsoft Visual FoxPro Database table file',
       SignatureNote: 'Header sequence: Version number, Date of last update MMDD, First upper or lowercase character of field name, field type (B, C, D, F, I, L, M, N, P, T, Y).',
       ByteSequence: 
        { ByteSequenceID: '683',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '30??[01:0C][01:1F]{28}([41:5A]|[61:7A]){10}(42|43|44|49|4C|4D|4E|50|54|59)' } },
     { SignatureID: '553',
       SignatureName: 'Microsoft Visual FoxPro Database table file, autoincrement enabled',
       SignatureNote: 'Header sequence: Version number, Date of last update MMDD, First upper or lowercase character of field name, field type (B, C, D, F, I, L, M, N, P, T, Y).',
       ByteSequence: 
        { ByteSequenceID: '684',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '31??[01:0C][01:1F]{28}([41:5A]|[61:7A]){10}(42|43|44|49|4C|4D|4E|50|54|59)' } },
     { SignatureID: '554',
       SignatureName: 'Microsoft Visual FoxPro Database table file, with field type Varchar or Varbinary',
       SignatureNote: 'Header sequence: Version number, Date of last update MMDD, First upper or lowercase character of field name, field type (B, C, D, F, I, L, M, N, P, T, Y).',
       ByteSequence: 
        { ByteSequenceID: '685',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '32??[01:0C][01:1F]{28}([41:5A]|[61:7A]){10}(42|43|44|49|4C|4D|4E|50|54|59)' } } ],
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1124',
       RelatedFormatName: 'Microsoft Visual FoxPro Report',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1126',
       RelatedFormatName: 'Microsoft Visual FoxPro Class Library',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1127',
       RelatedFormatName: 'Microsoft Visual FoxPro Project',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1129',
       RelatedFormatName: 'Microsoft Visual FoxPro database container (table files)',
       RelatedFormatVersion: '' } ] }