exports.info = { FormatID: '1258',
  FormatName: 'Hypertext Markup Language',
  FormatVersion: '5',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: '',
  FormatDisclosure: '',
  FormatDescription: 'The HyperText Markup Language (HTML) is a markup language designed for the rendering of information via a web browser. It was originally defined as a highly simplified subset of SGML, but is now an international standard, and is maintained by the World Wide Web Consortium (W3C). A HTML document consists of nested elements, each of which may have attributes and content. It begins with an HTML Document Type declaration. HTML 5 does not explicitly define the HTML version or any Document Type Definition (DTD) within the DOCTYPE tag.',
  BinaryFileFormat: '',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '25 Oct 2012',
  ProvenanceDescription: 'This signature may be subject to further revision as, at the time of writing, development on the HTML5 standard is still ongoing.',
  LastUpdatedDate: '25 Oct 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/471', IdentifierType: 'PUID' },
  ExternalSignature: 
   [ { ExternalSignatureID: '1278',
       Signature: 'htm',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1279',
       Signature: 'html',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   [ { SignatureID: '735',
       SignatureName: 'HTML5 Variant 1',
       SignatureNote: 'HTML 5 does not explicitly define the HTML version or any Document Type Definition (DTD) within the DOCTYPE tag. An HTML5 DOCTYPE tag may contain an obsolete permitted DOCTYPE string, however this is discouraged. As such the present signature does not cover identification of an HTML5 document that includes this obsolete permitted DOCTYPE string. This signature may be subject to further revision as, at the time of writing, development on the HTML5 standard is still ongoing. Variant 1: <!(DOCTYPE|doctype){0-4}(HTML|html)>',
       ByteSequence: 
        { ByteSequenceID: '924',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '1024',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '3C21(444F4354595045|646F6374797065){0-4}(48544D4C|68746D6C)3E' } },
     { SignatureID: '736',
       SignatureName: 'HTML5 Variant 2',
       SignatureNote: 'BOF: <!(DOCTYPE|doctype){0-4}(HTML|html){0-4}{SYSTEM|system){0-4}(\'|")about:legacy-compat(\'|")>',
       ByteSequence: 
        { ByteSequenceID: '925',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '1024',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '3C21(444F4354595045|646F6374797065){0-4}(48544D4C|68746D6C){0-4}(53595354454D|73797374656D){0-4}(27|22)61626F75743A6C65676163792D636F6D706174(27|22)3E' } } ],
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1029',
       RelatedFormatName: 'WARC',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1287',
       RelatedFormatName: 'Internet Explorer for Mac cache file',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '645',
       RelatedFormatName: 'Hypertext Markup Language',
       RelatedFormatVersion: '' } ] }