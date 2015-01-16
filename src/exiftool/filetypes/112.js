exports.info = { FormatID: '671',
  FormatName: 'Still Picture Interchange File Format',
  FormatVersion: '1.0',
  FormatAliases: 'SPIFF (1.0)',
  FormatFamilies: '',
  FormatTypes: 'Image (Raster)',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Big-endian (Motorola)',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '11 Mar 2005',
  ProvenanceDescription: '',
  LastUpdatedDate: '02 Aug 2005',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'fmt/112', IdentifierType: 'PUID' },
     { Identifier: 'image/jpeg', IdentifierType: 'MIME' } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '582',
       Signature: 'spf',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '746',
       Signature: 'jpg',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '70',
     SignatureName: 'SPIFF 1.0',
     SignatureNote: 'SOI and APP8 markers',
     ByteSequence: 
      { ByteSequenceID: '176',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: 'FFD8FFE800205350494646000100(00|01|02|03|04){11}(00|01|02|03|04|05){9}FFE8' } },
  RelatedFormat: 
   { RelationshipType: 'Has priority over',
     RelatedFormatID: '670',
     RelatedFormatName: 'Raw JPEG Stream',
     RelatedFormatVersion: '' } }