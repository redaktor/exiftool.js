exports.info = { FormatID: '1109',
  FormatName: 'GSSI SIR-10 RADAN data file',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: '',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '170',
  ProvenanceName: 'Archaeology Data Service / Archaeology Data Service',
  ProvenanceSourceDate: '18 Aug 2011',
  ProvenanceDescription: 'Submitted by Archaeology Data Service',
  LastUpdatedDate: '18 Aug 2011',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/362', IdentifierType: 'PUID' },
  Developers: 
   { DeveloperID: '172',
     DeveloperName: 'Geophysical Survey Systems Inc.',
     OrganisationName: 'Geophysical Survey Systems Inc.',
     DeveloperCompoundName: 'Geophysical Survey Systems Inc. / Geophysical Survey Systems Inc.' },
  ExternalSignature: 
   { ExternalSignatureID: '1131',
     Signature: 'dzt',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '531',
     SignatureName: 'GSSI SIR-10 RADAN data file',
     SignatureNote: 'File header section at the start of the file followed by the GPR traces in the data section. Each file can have from 1 to 4 data channels.',
     ByteSequence: 
      { ByteSequenceID: '657',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '(FF00|0007)000400(02|04)100000(00|80)0000(00|80)[41:42]{84}[31:39][30:39][30:39]{13}(46494C45|434C4153){906}(0000|FFFF)' } } }