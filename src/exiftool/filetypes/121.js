exports.info = { FormatID: '768',
  FormatName: 'DROID Signature File Format',
  FormatVersion: '1.0',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Text (Mark-up)',
  FormatDisclosure: 'Full',
  FormatDescription: 'The DROID Signature File format is a format for storing internal and external signatures used by the DROID software tool to perform automatic file format identification. It was developed by The National Archives of the UK. DROID Signature Files are generated by TNA from the PRONOM technical registry, and are issued periodically as new formats are added to the registry. A DROID Signature File is an XML document, comprising an \'FFSignatureFile\' element, which describes the version number and date of the signature file, an \'InternalSignatureCollection\' element, which contains the set of internal signature values, and a \'FileFormatCollection\' element, which contains information on the set of formats described, together with their associated external signatures. The version number of a Signature File is incremented each time a new signature file is issued from the PRONOM registry, and does not indicate a different version of the format itself.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '17 Sep 2005',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '11 Oct 2005',
  ProvenanceDescription: '',
  LastUpdatedDate: '11 Oct 2005',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'fmt/121', IdentifierType: 'PUID' },
     { Identifier: 'text/xml', IdentifierType: 'MIME' } ],
  Developers: 
   { DeveloperID: '1',
     DeveloperName: 'Digital Preservation Department',
     OrganisationName: 'The National Archives',
     DeveloperCompoundName: 'Digital Preservation Department / The National Archives' },
  Document: 
   { DocumentID: '64',
     DisplayText: 'Brown, A, 2005, Automatic format identification using PRONOM and DROID, Digital Preservation Technical Paper, 1, The National Archives',
     DocumentType: 'Authoritative',
     AvailabilityDescription: 'Public',
     AvailabilityNote: '',
     PublicationDate: '17 Sep 2005',
     TitleText: 'Automatic format identification using PRONOM and DROID',
     DocumentIPR: '',
     DocumentNote: '',
     DocumentIdentifier: 
      { Identifier: 'www.nationalarchives.gov.uk/aboutapps/fileformat/pdf/automatic_format_identification.pdf',
        IdentifierType: 'URL' } },
  ExternalSignature: 
   { ExternalSignatureID: '764',
     Signature: 'xml',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '175',
     SignatureName: 'DROID Signature File',
     SignatureNote: '',
     ByteSequence: 
      { ByteSequenceID: '208',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '{0-50}3C46465369676E617475726546696C6520{0-100}56657273696F6E3D' } },
  RelatedFormat: 
   { RelationshipType: 'Has priority over',
     RelatedFormatID: '638',
     RelatedFormatName: 'Extensible Markup Language',
     RelatedFormatVersion: '1.0' } }