exports.info = { FormatID: '1103',
  FormatName: '3GPP Audio/Video File',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Audio, Video',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '21 Jun 2011',
  ProvenanceDescription: '',
  LastUpdatedDate: '21 Jun 2011',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'audio/3gpp', IdentifierType: 'MIME' },
     { Identifier: 'fmt/357', IdentifierType: 'PUID' },
     { Identifier: 'video/3gpp', IdentifierType: 'MIME' } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '1125',
       Signature: '3gp',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1126',
       Signature: '3gpp',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '526',
     SignatureName: '3GPP Audio/Video File',
     SignatureNote: 'Header: The 4 letters \'ftyp\' identifies the atom/box type as an ftyp box, the next 4 indicate the ftyp code for the "major brand". The brand sequence indicates the \'best use\' of the file, and has several different profiles: basic, streaming-server, progressive-download, extended-presentation, media stream recording, file delivery, adaptive streaming.',
     ByteSequence: 
      { ByteSequenceID: '648',
        PositionType: 'Absolute from BOF',
        Offset: '4',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '667479703367(65|67|68|70|72|73|74)[34:39]0000[00:03]00' } },
  RelatedFormat: 
   [ { RelationshipType: 'Can contain',
       RelatedFormatID: '1102',
       RelatedFormatName: 'Adaptive Multi-Rate Audio',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '924',
       RelatedFormatName: 'MPEG-4 Media File',
       RelatedFormatVersion: '' } ] }