exports.info = { FormatID: '745',
  FormatName: 'OpenOffice Writer',
  FormatVersion: '1.0',
  FormatAliases: 'StarOffice Writer (1.0)',
  FormatFamilies: '',
  FormatTypes: 'Word Processor',
  FormatDisclosure: '',
  FormatDescription: 'All OpenOffice v1.0 documents (Calc, Draw, Impress, Writer) use the extensible Markup Language (XML) for representing the elements and attributes of each structural component of the document. As XML has no native support for binary objects, OpenOffice.org files use a standard Zip file to store the XML content together with its associated binary data. Information about the files contained in the Zip file is stored in an XML file called the manifest file. The manifest file is always stored at the pathname META-INF/manifest.xml. The manifest file contains a list of all the files in the Zip file, the media type of each file, and the information necessary to decrypt any encrypted files included in the Zip file.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '180',
  ProvenanceName: 'The National Archives and Records Administration / The National Archives and Records Administration',
  ProvenanceSourceDate: '11 Mar 2005',
  ProvenanceDescription: 'Further information about this file format can be obtained at http://www.openoffice.org/xml/xml_specification.pdf',
  LastUpdatedDate: '28 Aug 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'application/vnd.sun.xml.writer',
       IdentifierType: 'MIME' },
     { Identifier: 'fmt/128', IdentifierType: 'PUID' } ],
  ExternalSignature: 
   { ExternalSignatureID: '664',
     Signature: 'sxw',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '139',
     SignatureName: 'OpenOffice Writer 1.0',
     SignatureNote: 'PKZIP file header + MIME-type declaration, PKZIP file header + meta.xml (office:version="1.0")',
     ByteSequence: 
      { ByteSequenceID: '84',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '504B0304140000000000{20}6D696D65747970656170706C69636174696F6E2F766E642E73756E2E786D6C2E777269746572*504B0304140000000000{20}6D6574612E786D6C3C3F786D6C2076657273696F6E3D22312E3022{322}6F66666963653A76657273696F6E3D22312E30223E' } },
  RelatedFormat: 
   { RelationshipType: 'Has priority over',
     RelatedFormatID: '382',
     RelatedFormatName: 'ZIP Format',
     RelatedFormatVersion: '' } }