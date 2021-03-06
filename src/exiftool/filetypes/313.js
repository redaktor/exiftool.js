exports.info = { FormatID: '1058',
  FormatName: 'Open Financial Exchange',
  FormatVersion: '2.1.1',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Text (Mark-up)',
  FormatDisclosure: '',
  FormatDescription: 'Open Financial Exchange is a unified specification for the electronic exchange of financial data between financial institutions, businesses and consumers via the Internet. The first verison was released in 1997, and was a result of colloborative work between CheckFree Corp., Intuit Inc., and Microsoft. Version 2.1.1 is a XML version of the format.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '01 May 2006',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '03 Dec 2010',
  ProvenanceDescription: '',
  LastUpdatedDate: '03 Dec 2010',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'application/x-ofx', IdentifierType: 'MIME' },
     { Identifier: 'fmt/313', IdentifierType: 'PUID' } ],
  Developers: 
   [ { DeveloperID: '167',
       DeveloperName: 'CheckFree Corp',
       OrganisationName: 'CheckFree Corp',
       DeveloperCompoundName: 'CheckFree Corp / CheckFree Corp' },
     { DeveloperID: '51',
       DeveloperName: '',
       OrganisationName: 'Intuit Inc.',
       DeveloperCompoundName: 'Intuit Inc.' },
     { DeveloperID: '93',
       DeveloperName: '',
       OrganisationName: 'Microsoft Corporation',
       DeveloperCompoundName: 'Microsoft Corporation' } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '1057',
       Signature: 'ofx',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1058',
       Signature: 'qfx',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '405',
     SignatureName: 'Open Financial Exchange 2.1.1',
     SignatureNote: 'The first entry will always be OFXHEADER with a version number. This entry identifies the contents as an Open Financial Exchange file and provides the version number of the Open Financial Exchange headers that follow (not the version number of the contents). For example:OFXHEADER="200" Open Financial Exchange headers must contain the following tags, seperated by CRLF VERSION="211" SECURITY="" OLDFILEUID="" NEWFILEUID=""',
     ByteSequence: 
      { ByteSequenceID: '511',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '1024',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '4F46584845414445523D(22|27)323030(22|27)0D0A56455253494F4E3D(22|27)323131(22|27)0D0A53454355524954593D(22|27)*(22|27)0D0A4F4C4446494C455549443D(22|27)*(22|27)0D0A4E455746494C455549443D' } } }