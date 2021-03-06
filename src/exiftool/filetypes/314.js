exports.info = { FormatID: '1059',
  FormatName: 'Play SID Audio',
  FormatVersion: '1',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Audio',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '18 Jan 2011',
  ProvenanceDescription: '',
  LastUpdatedDate: '18 Jan 2011',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'audio/prs.sid', IdentifierType: 'MIME' },
     { Identifier: 'fmt/314', IdentifierType: 'PUID' } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '1059',
       Signature: 'dxr',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1060',
       Signature: 'psid',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '406',
     SignatureName: 'Play Sid Audio Version 1',
     SignatureNote: 'Header ASCII: PSID , followed by offset from the start of the file to the C64 binary data area (0x0076 for version 1 and 0x007C for version 2)',
     ByteSequence: 
      { ByteSequenceID: '512',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '5053494400010076' } },
  RelatedFormat: 
   { RelationshipType: 'Is previous version of',
     RelatedFormatID: '1060',
     RelatedFormatName: 'Play SID Audio',
     RelatedFormatVersion: '2' } }