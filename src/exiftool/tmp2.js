var util = require('util');

var files = [ 
  '1.js', '100.js', '101.js', '102.js', '103.js', '104.js', '105.js', '106.js', '107.js', '108.js', '109.js', '11.js', '110.js', '111.js', '112.js', '114.js', '115.js', '116.js', '117.js', '118.js', '119.js', '12.js', '120.js', '121.js', '122.js', '123.js', '124.js', '125.js', '126.js', '127.js', '128.js', '129.js', '13.js', '130.js', '131.js', '132.js', '133.js', '134.js', '135.js', '136.js', '137.js', '138.js', '139.js', '14.js', '140.js', '141.js', '142.js', '143.js', '144.js', '145.js', '146.js', '147.js', '148.js', '15.js', '150.js', '151.js', '152.js', '153.js', '154.js', '155.js', '156.js', '157.js', '158.js', '159.js', '16.js', '160.js', '161.js', '162.js', '163.js', '166.js', '167.js', '168.js', '169.js', '17.js', '170.js', '171.js', '172.js', '173.js', '174.js', '175.js', '176.js', '177.js', '178.js', '179.js', '18.js', '180.js', '181.js', '182.js', '183.js', '184.js', '185.js', '186.js', '187.js', '188.js', '189.js', '19.js', '190.js', '191.js', '192.js', '193.js', '194.js', '195.js', '196.js', '197.js', '198.js', '199.js', '2.js', '20.js', '200.js', '201.js', '202.js', '203.js', '204.js', '205.js', '206.js', '207.js', '208.js', '209.js', '21.js', '210.js', '211.js', '212.js', '213.js', '214.js', '215.js', '216.js', '217.js', '218.js', '219.js', '22.js', '220.js', '222.js', '223.js', '224.js', '225.js', '226.js', '227.js', '228.js', '229.js', '23.js', '230.js', '231.js', '233.js', '237.js', '238.js', '239.js', '24.js', '240.js', '241.js', '242.js', '243.js', '244.js', '245.js', '246.js', '247.js', '249.js', '25.js', '250.js', '252.js', '253.js', '255.js', '256.js', '257.js', '258.js', '259.js', '26.js', '260.js', '261.js', '262.js', '263.js', '264.js', '268.js', '269.js', '27.js', '270.js', '271.js', '272.js', '273.js', '274.js', '275.js', '276.js', '277.js', '278.js', '279.js', '28.js', '280.js', '281.js', '282.js', '283.js', '284.js', '285.js', '286.js', '287.js', '288.js', '289.js', '29.js', '290.js', '291.js', '292.js', '293.js', '294.js', '295.js', '296.js', '297.js', '298.js', '299.js', '3.js', '30.js', '300.js', '301.js', '302.js', '303.js', '304.js', '305.js', '306.js', '307.js', '308.js', '309.js', '31.js', '310.js', '311.js', '312.js', '313.js', '314.js', '315.js', '316.js', '317.js', '318.js', '319.js', '32.js', '320.js', '321.js', '322.js', '323.js', '324.js', '325.js', '326.js', '327.js', '328.js', '329.js', '33.js', '330.js', '331.js', '332.js', '333.js', '334.js', '335.js', '336.js', '337.js', '338.js', '339.js', '34.js', '340.js', '341.js', '342.js', '343.js', '344.js', '345.js', '346.js', '347.js', '348.js', '349.js', '35.js', '350.js', '351.js', '352.js', '353.js', '354.js', '355.js', '356.js', '357.js', '358.js', '359.js', '36.js', '360.js', '361.js', '362.js', '363.js', '364.js', '365.js', '366.js', '367.js', '368.js', '369.js', '37.js', '370.js', '371.js', '372.js', '373.js', '374.js', '375.js', '376.js', '377.js', '378.js', '379.js', '38.js', '380.js', '381.js', '382.js', '383.js', '384.js', '385.js', '386.js', '387.js', '388.js', '389.js', '39.js', '390.js', '391.js', '392.js', '393.js', '394.js', '395.js', '396.js', '397.js', '398.js', '399.js', '4.js', '40.js', '400.js', '401.js', '402.js', '403.js', '404.js', '405.js', '406.js', '407.js', '408.js', '409.js', '41.js', '410.js', '411.js', '412.js', '413.js', '414.js', '415.js', '416.js', '417.js', '418.js', '419.js', '42.js', '420.js', '421.js', '422.js', '423.js', '424.js', '425.js', '426.js', '427.js', '428.js', '429.js', '43.js', '430.js', '431.js', '432.js', '433.js', '434.js', '435.js', '436.js', '437.js', '438.js', '439.js', '44.js', '440.js', '441.js', '442.js', '443.js', '444.js', '445.js', '446.js', '447.js', '448.js', '449.js', '45.js', '450.js', '451.js', '452.js', '453.js', '454.js', '455.js', '456.js', '457.js', '458.js', '459.js', '460.js', '461.js', '462.js', '463.js', '464.js', '465.js', '466.js', '467.js', '468.js', '469.js', '470.js', '471.js', '472.js', '473.js', '474.js', '475.js', '476.js', '477.js', '478.js', '479.js', '480.js', '481.js', '482.js', '483.js', '484.js', '485.js', '486.js', '487.js', '488.js', '489.js', '490.js', '491.js', '492.js', '493.js', '494.js', '495.js', '496.js', '497.js', '498.js', '499.js', '5.js', '50.js', '500.js', '501.js', '502.js', '503.js', '504.js', '505.js', '506.js', '507.js', '508.js', '509.js', '510.js', '511.js', '512.js', '513.js', '514.js', '515.js', '516.js', '517.js', '518.js', '519.js', '52.js', '520.js', '521.js', '522.js', '523.js', '524.js', '525.js', '526.js', '527.js', '528.js', '529.js', '53.js', '530.js', '531.js', '532.js', '533.js', '534.js', '535.js', '536.js', '537.js', '538.js', '539.js', '54.js', '540.js', '541.js', '542.js', '543.js', '544.js', '545.js', '546.js', '547.js', '548.js', '549.js', '55.js', '550.js', '551.js', '552.js', '553.js', '554.js', '555.js', '556.js', '557.js', '558.js', '559.js', '56.js', '560.js', '561.js', '562.js', '563.js', '564.js', '565.js', '566.js', '567.js', '568.js', '569.js', '57.js', '570.js', '571.js', '572.js', '573.js', '574.js', '575.js', '576.js', '577.js', '578.js', '579.js', '58.js', '580.js', '581.js', '582.js', '583.js', '584.js', '585.js', '586.js', '587.js', '588.js', '589.js', '59.js', '590.js', '591.js', '592.js', '593.js', '594.js', '595.js', '596.js', '597.js', '598.js', '599.js', '6.js', '60.js', '600.js', '601.js', '602.js', '603.js', '604.js', '605.js', '606.js', '607.js', '608.js', '609.js', '61.js', '610.js', '611.js', '612.js', '613.js', '614.js', '615.js', '616.js', '617.js', '618.js', '619.js', '62.js', '620.js', '621.js', '622.js', '623.js', '624.js', '625.js', '626.js', '627.js', '628.js', '629.js', '63.js', '630.js', '631.js', '632.js', '633.js', '634.js', '635.js', '636.js', '637.js', '638.js', '639.js', '64.js', '640.js', '641.js', '642.js', '643.js', '644.js', '65.js', '66.js', '67.js', '68.js', '69.js', '70.js', '71.js', '72.js', '73.js', '74.js', '75.js', '76.js', '77.js', '78.js', '79.js', '80.js', '81.js', '82.js', '83.js', '84.js', '85.js', '86.js', '87.js', '88.js', '89.js', '90.js', '91.js', '92.js', '93.js', '94.js', '95.js', '96.js', '97.js', '98.js', '99.js' ];
var video = { 
	andrew_inset: { 
	 	ext: 'ez',
		signature: false,
	 	desc: '',
	 	mime: 'application/andrew-inset' },
     applixware: { 
	 	ext: 'AW',
		signature: [ 138, 1, 9, 0, 0, 0, 225, 8 ],
	 	desc: 'MS Answer Wizard',
	 	mime: 'application/applixware' },
     atom_xml: { 
	 	ext: 'atom',
		signature: false,
	 	desc: '',
	 	mime: 'application/atom+xml' },
     atomcat_xml: { 
	 	ext: 'atomcat',
		signature: false,
	 	desc: '',
	 	mime: 'application/atomcat+xml' },
     atomsvc_xml: { 
	 	ext: 'atomsvc',
		signature: false,
	 	desc: '',
	 	mime: 'application/atomsvc+xml' },
     ccxml_xml: { 
	 	ext: 'ccxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/ccxml+xml' },
     cdmi_capability: { 
	 	ext: 'cdmia',
		signature: false,
	 	desc: '',
	 	mime: 'application/cdmi-capability' },
     cdmi_container: { 
	 	ext: 'cdmic',
		signature: false,
	 	desc: '',
	 	mime: 'application/cdmi-container' },
     cdmi_domain: { 
	 	ext: 'cdmid',
		signature: false,
	 	desc: '',
	 	mime: 'application/cdmi-domain' },
     cdmi_object: { 
	 	ext: 'cdmio',
		signature: false,
	 	desc: '',
	 	mime: 'application/cdmi-object' },
     cdmi_queue: { 
	 	ext: 'cdmiq',
		signature: false,
	 	desc: '',
	 	mime: 'application/cdmi-queue' },
     cu_seeme: { 
	 	ext: 'cu',
		signature: false,
	 	desc: '',
	 	mime: 'application/cu-seeme' },
     davmount_xml: { 
	 	ext: 'davmount',
		signature: false,
	 	desc: '',
	 	mime: 'application/davmount+xml' },
     docbook_xml: { 
	 	ext: 'dbk',
		signature: false,
	 	desc: '',
	 	mime: 'application/docbook+xml' },
     dssc_der: { 
	 	ext: 'dssc',
		signature: false,
	 	desc: '',
	 	mime: 'application/dssc+der' },
     dssc_xml: { 
	 	ext: 'xdssc',
		signature: false,
	 	desc: '',
	 	mime: 'application/dssc+xml' },
     ecmascript: { 
	 	ext: 'ecma',
		signature: false,
	 	desc: '',
	 	mime: 'application/ecmascript' },
     emma_xml: { 
	 	ext: 'emma',
		signature: false,
	 	desc: '',
	 	mime: 'application/emma+xml' },
     epub_zip: { 
	 	ext: 'epub',
		signature: false,
	 	desc: '',
	 	mime: 'application/epub+zip' },
     exi: { 
	 	ext: 'exi',
		signature: false,
	 	desc: '',
	 	mime: 'application/exi' },
     font_tdpfr: { 
	 	ext: 'pfr',
		signature: false,
	 	desc: '',
	 	mime: 'application/font-tdpfr' },
     gml_xml: { 
	 	ext: 'gml',
		signature: false,
	 	desc: '',
	 	mime: 'application/gml+xml' },
     gpx_xml: { 
	 	ext: 'gpx',
		signature: false,
	 	desc: '',
	 	mime: 'application/gpx+xml' },
     gxf: { 
	 	ext: 'gxf',
		signature: false,
	 	desc: '',
	 	mime: 'application/gxf' },
     hyperstudio: { 
	 	ext: 'stk',
		signature: false,
	 	desc: '',
	 	mime: 'application/hyperstudio' },
     inkml_xml: { 
	 	ext: ['ink', 'inkml'],
		signature: false,
	 	desc: '',
	 	mime: 'application/inkml+xml' },
     ipfix: { 
	 	ext: 'ipfix',
		signature: false,
	 	desc: '',
	 	mime: 'application/ipfix' },
     java_archive: 
      [ { ext: 'JAR',
	 	  signature: [ 80, 75, 3, 4 ],
	 	  desc: 'Java archive_1',
	 	  mime: 'application/java-archive' },
	 	{ ext: 'JAR',
	 	  signature: [ 74, 65, 82, 67, 83, 0 ],
	 	  desc: 'JARCS compressed archive',
	 	  mime: 'application/java-archive' },
	 	{ ext: 'JAR',
	 	  signature: [ 95, 39, 168, 137 ],
	 	  desc: 'Jar archive',
	 	  mime: 'application/java-archive' },
	 	{ ext: 'JAR',
	 	  signature: [ 80, 75, 3, 4, 20, 0, 8, 0 ],
	 	  desc: 'Java archive_2',
	 	  mime: 'application/java-archive' } ],
     java_serialized_object: { 
	 	ext: 'ser',
		signature: false,
	 	desc: '',
	 	mime: 'application/java-serialized-object' },
     java_vm: { 
	 	ext: 'CLASS',
		signature: [ 202, 254, 186, 190 ],
	 	desc: 'Java bytecode',
	 	mime: 'application/java-vm' },
     javascript: { 
	 	ext: 'js',
		signature: false,
	 	desc: '',
	 	mime: 'application/javascript' },
     json: { 
	 	ext: 'json',
		signature: false,
	 	desc: '',
	 	mime: 'application/json' },
     jsonml_json: { 
	 	ext: 'jsonml',
		signature: false,
	 	desc: '',
	 	mime: 'application/jsonml+json' },
     lost_xml: { 
	 	ext: 'lostxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/lost+xml' },
     mac_binhex40: { 
	 	ext: 'HQX',
		signature: [ 40, 84, 104, 105, 115, 32, 102, 105 ],
	 	desc: 'BinHex 4 Compressed Archive',
	 	mime: 'application/mac-binhex40' },
     mac_compactpro: 
      [ { ext: 'CPT',
	 	  signature: [ 67, 80, 84, 70, 73, 76, 69 ],
	 	  desc: 'Corel Photopaint file_2',
	 	  mime: 'application/mac-compactpro' },
	 	{ ext: 'CPT',
	 	  signature: [ 67, 80, 84, 55, 70, 73, 76, 69 ],
	 	  desc: 'Corel Photopaint file_1',
	 	  mime: 'application/mac-compactpro' } ],
     mads_xml: { 
	 	ext: 'mads',
		signature: false,
	 	desc: '',
	 	mime: 'application/mads+xml' },
     marc: { 
	 	ext: 'mrc',
		signature: false,
	 	desc: '',
	 	mime: 'application/marc' },
     marcxml_xml: { 
	 	ext: 'mrcx',
		signature: false,
	 	desc: '',
	 	mime: 'application/marcxml+xml' },
     mathematica: { 
	 	ext: ['ma', 'nb', 'mb'],
		signature: false,
	 	desc: '',
	 	mime: 'application/mathematica' },
     mathml_xml: { 
	 	ext: 'mathml',
		signature: false,
	 	desc: '',
	 	mime: 'application/mathml+xml' },
     mbox: { 
	 	ext: 'mbox',
		signature: false,
	 	desc: '',
	 	mime: 'application/mbox' },
     mediaservercontrol_xml: { 
	 	ext: 'mscml',
		signature: false,
	 	desc: '',
	 	mime: 'application/mediaservercontrol+xml' },
     metalink_xml: { 
	 	ext: 'metalink',
		signature: false,
	 	desc: '',
	 	mime: 'application/metalink+xml' },
     metalink4_xml: { 
	 	ext: 'meta4',
		signature: false,
	 	desc: '',
	 	mime: 'application/metalink4+xml' },
     mets_xml: { 
	 	ext: 'mets',
		signature: false,
	 	desc: '',
	 	mime: 'application/mets+xml' },
     mods_xml: { 
	 	ext: 'mods',
		signature: false,
	 	desc: '',
	 	mime: 'application/mods+xml' },
     mp21: { 
	 	ext: ['m21', 'mp21'],
		signature: false,
	 	desc: '',
	 	mime: 'application/mp21' },
     mp4: { 
	 	ext: 'mp4s',
		signature: false,
	 	desc: '',
	 	mime: 'application/mp4' },
     msword: 
      [ { ext: 'DOC',
	 	  signature: [ 207, 17, 224, 161, 177, 26, 225, 0 ],
	 	  desc: 'Perfect Office document',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 236, 165, 193, 0 ],
	 	  desc: 'Word document subheader',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 219, 165, 45, 0 ],
	 	  desc: 'Word 2.0 file',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Office document',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 13, 68, 79, 67 ],
	 	  desc: 'DeskMate Document',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 207, 17, 224, 161, 177, 26, 225, 0 ],
	 	  desc: 'Perfect Office document',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 236, 165, 193, 0 ],
	 	  desc: 'Word document subheader',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 219, 165, 45, 0 ],
	 	  desc: 'Word 2.0 file',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Office document',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOC',
	 	  signature: [ 13, 68, 79, 67 ],
	 	  desc: 'DeskMate Document',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOT',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Office document',
	 	  mime: 'application/msword' },
	 	{ ext: 'DOT',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Office document',
	 	  mime: 'application/msword' } ],
     mxf: { 
	 	ext: 'mxf',
		signature: false,
	 	desc: '',
	 	mime: 'application/mxf' },
     octet_stream: 
      [ { ext: 'BIN',
	 	  signature: [ 66, 76, 73, 50, 50, 51, 81 ],
	 	  desc: 'Speedtouch router firmware',
	 	  mime: 'application/octet-stream' },
	 	{ ext: 'DMS',
	 	  signature: [ 68, 77, 83, 33 ],
	 	  desc: 'Amiga DiskMasher compressed archive',
	 	  mime: 'application/octet-stream' },
	 	{ ext: 'DMS',
	 	  signature: [ 68, 77, 83, 33 ],
	 	  desc: 'Amiga DiskMasher compressed archive',
	 	  mime: 'application/octet-stream' },
	 	{ ext: 'MAR',
	 	  signature: [ 77, 65, 82, 67 ],
	 	  desc: 'Microsoft|MSN MARC archive',
	 	  mime: 'application/octet-stream' },
	 	{ ext: 'MAR',
	 	  signature: [ 77, 65, 82, 49, 0 ],
	 	  desc: 'Mozilla archive',
	 	  mime: 'application/octet-stream' },
	 	{ ext: 'MAR',
	 	  signature: [ 77, 65, 114, 48, 0 ],
	 	  desc: 'MAr compressed archive',
	 	  mime: 'application/octet-stream' } ],
     oda: { 
	 	ext: 'oda',
		signature: false,
	 	desc: '',
	 	mime: 'application/oda' },
     oebps_package_xml: { 
	 	ext: 'opf',
		signature: false,
	 	desc: '',
	 	mime: 'application/oebps-package+xml' },
     ogg: { 
	 	ext: 'OGX',
		signature: [ 79, 103, 103, 83, 0, 2, 0, 0 ],
	 	desc: 'Ogg Vorbis Codec compressed file',
	 	mime: 'application/ogg' },
     omdoc_xml: { 
	 	ext: 'omdoc',
		signature: false,
	 	desc: '',
	 	mime: 'application/omdoc+xml' },
     onenote: { 
	 	ext: ['onetoc', 'onetoc2', 'onetmp', 'onepkg'],
		signature: false,
	 	desc: '',
	 	mime: 'application/onenote' },
     oxps: { 
	 	ext: 'oxps',
		signature: false,
	 	desc: '',
	 	mime: 'application/oxps' },
     patch_ops_error_xml: { 
	 	ext: 'xer',
		signature: false,
	 	desc: '',
	 	mime: 'application/patch-ops-error+xml' },
     pdf: { 
	 	ext: 'PDF',
		signature: [ 37, 80, 68, 70 ],
	 	desc: 'PDF file',
	 	mime: 'application/pdf' },
     pgp_encrypted: { 
	 	ext: 'pgp',
		signature: false,
	 	desc: '',
	 	mime: 'application/pgp-encrypted' },
     pgp_signature: { 
	 	ext: ['asc', 'sig'],
		signature: false,
	 	desc: '',
	 	mime: 'application/pgp-signature' },
     pics_rules: { 
	 	ext: 'prf',
		signature: false,
	 	desc: '',
	 	mime: 'application/pics-rules' },
     pkcs10: { 
	 	ext: 'P10',
		signature: [ 100, 0, 0, 0 ],
	 	desc: 'Intel PROset|Wireless Profile',
	 	mime: 'application/pkcs10' },
     pkcs7_mime: { 
	 	ext: ['p7m', 'p7c'],
		signature: false,
	 	desc: '',
	 	mime: 'application/pkcs7-mime' },
     pkcs7_signature: { 
	 	ext: 'p7s',
		signature: false,
	 	desc: '',
	 	mime: 'application/pkcs7-signature' },
     pkcs8: { 
	 	ext: 'p8',
		signature: false,
	 	desc: '',
	 	mime: 'application/pkcs8' },
     pkix_attr_cert: { 
	 	ext: 'AC',
		signature: [ 114, 105, 102, 102 ],
	 	desc: 'Sonic Foundry Acid Music File',
	 	mime: 'application/pkix-attr-cert' },
     pkix_cert: { 
	 	ext: 'cer',
		signature: false,
	 	desc: '',
	 	mime: 'application/pkix-cert' },
     pkix_crl: { 
	 	ext: 'crl',
		signature: false,
	 	desc: '',
	 	mime: 'application/pkix-crl' },
     pkix_pkipath: { 
	 	ext: 'pkipath',
		signature: false,
	 	desc: '',
	 	mime: 'application/pkix-pkipath' },
     pkixcmp: { 
	 	ext: 'pki',
		signature: false,
	 	desc: '',
	 	mime: 'application/pkixcmp' },
     pls_xml: { 
	 	ext: 'pls',
		signature: false,
	 	desc: '',
	 	mime: 'application/pls+xml' },
     prs_cww: { 
	 	ext: 'cww',
		signature: false,
	 	desc: '',
	 	mime: 'application/prs.cww' },
     pskc_xml: { 
	 	ext: 'pskcxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/pskc+xml' },
     rdf_xml: { 
	 	ext: 'rdf',
		signature: false,
	 	desc: '',
	 	mime: 'application/rdf+xml' },
     reginfo_xml: { 
	 	ext: 'rif',
		signature: false,
	 	desc: '',
	 	mime: 'application/reginfo+xml' },
     relax_ng_compact_syntax: { 
	 	ext: 'rnc',
		signature: false,
	 	desc: '',
	 	mime: 'application/relax-ng-compact-syntax' },
     resource_lists_xml: { 
	 	ext: 'rl',
		signature: false,
	 	desc: '',
	 	mime: 'application/resource-lists+xml' },
     resource_lists_diff_xml: { 
	 	ext: 'rld',
		signature: false,
	 	desc: '',
	 	mime: 'application/resource-lists-diff+xml' },
     rls_services_xml: { 
	 	ext: 'rs',
		signature: false,
	 	desc: '',
	 	mime: 'application/rls-services+xml' },
     rpki_ghostbusters: { 
	 	ext: 'gbr',
		signature: false,
	 	desc: '',
	 	mime: 'application/rpki-ghostbusters' },
     rpki_manifest: { 
	 	ext: 'mft',
		signature: false,
	 	desc: '',
	 	mime: 'application/rpki-manifest' },
     rpki_roa: { 
	 	ext: 'roa',
		signature: false,
	 	desc: '',
	 	mime: 'application/rpki-roa' },
     rsd_xml: { 
	 	ext: 'rsd',
		signature: false,
	 	desc: '',
	 	mime: 'application/rsd+xml' },
     rss_xml: { 
	 	ext: 'rss',
		signature: false,
	 	desc: '',
	 	mime: 'application/rss+xml' },
     rtf: { 
	 	ext: 'RTF',
		signature: [ 123, 92, 114, 116, 102, 49 ],
	 	desc: 'RTF file',
	 	mime: 'application/rtf' },
     sbml_xml: { 
	 	ext: 'sbml',
		signature: false,
	 	desc: '',
	 	mime: 'application/sbml+xml' },
     scvp_cv_request: { 
	 	ext: 'scq',
		signature: false,
	 	desc: '',
	 	mime: 'application/scvp-cv-request' },
     scvp_cv_response: { 
	 	ext: 'scs',
		signature: false,
	 	desc: '',
	 	mime: 'application/scvp-cv-response' },
     scvp_vp_request: { 
	 	ext: 'spq',
		signature: false,
	 	desc: '',
	 	mime: 'application/scvp-vp-request' },
     scvp_vp_response: { 
	 	ext: 'spp',
		signature: false,
	 	desc: '',
	 	mime: 'application/scvp-vp-response' },
     sdp: { 
	 	ext: 'sdp',
		signature: false,
	 	desc: '',
	 	mime: 'application/sdp' },
     set_payment_initiation: { 
	 	ext: 'setpay',
		signature: false,
	 	desc: '',
	 	mime: 'application/set-payment-initiation' },
     set_registration_initiation: { 
	 	ext: 'setreg',
		signature: false,
	 	desc: '',
	 	mime: 'application/set-registration-initiation' },
     shf_xml: { 
	 	ext: 'shf',
		signature: false,
	 	desc: '',
	 	mime: 'application/shf+xml' },
     smil_xml: { 
	 	ext: ['smi', 'smil'],
		signature: false,
	 	desc: '',
	 	mime: 'application/smil+xml' },
     sparql_query: { 
	 	ext: 'rq',
		signature: false,
	 	desc: '',
	 	mime: 'application/sparql-query' },
     sparql_results_xml: { 
	 	ext: 'srx',
		signature: false,
	 	desc: '',
	 	mime: 'application/sparql-results+xml' },
     srgs: { 
	 	ext: 'gram',
		signature: false,
	 	desc: '',
	 	mime: 'application/srgs' },
     srgs_xml: { 
	 	ext: 'grxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/srgs+xml' },
     sru_xml: { 
	 	ext: 'sru',
		signature: false,
	 	desc: '',
	 	mime: 'application/sru+xml' },
     ssdl_xml: { 
	 	ext: 'ssdl',
		signature: false,
	 	desc: '',
	 	mime: 'application/ssdl+xml' },
     ssml_xml: { 
	 	ext: 'ssml',
		signature: false,
	 	desc: '',
	 	mime: 'application/ssml+xml' },
     tei_xml: { 
	 	ext: ['tei', 'teicorpus'],
		signature: false,
	 	desc: '',
	 	mime: 'application/tei+xml' },
     thraud_xml: { 
	 	ext: 'tfi',
		signature: false,
	 	desc: '',
	 	mime: 'application/thraud+xml' },
     timestamped_data: { 
	 	ext: 'tsd',
		signature: false,
	 	desc: '',
	 	mime: 'application/timestamped-data' },
	_3gpp_pic_bw_large: { 
	 	ext: 'plb',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.3gpp.pic-bw-large' },
	_3gpp_pic_bw_small: { 
	 	ext: 'psb',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.3gpp.pic-bw-small' },
	_3gpp_pic_bw_var: { 
	 	ext: 'pvb',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.3gpp.pic-bw-var' },
	_3gpp2_tcap: { 
	 	ext: 'tcap',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.3gpp2.tcap' },
	_3m_post_it_notes: { 
	 	ext: 'pwn',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.3m.post-it-notes' },
	accpac_simply_aso: { 
	 	ext: 'aso',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.accpac.simply.aso' },
	accpac_simply_imp: { 
	 	ext: 'imp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.accpac.simply.imp' },
	acucobol: { 
	 	ext: 'acu',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.acucobol' },
	acucorp: { 
	 	ext: ['atc', 'acutc'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.acucorp' },
	adobe_air_application_installer_package_zip: { 
	 	ext: 'air',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.adobe.air-application-installer-package+zip' },
	adobe_formscentral_fcdt: { 
	 	ext: 'fcdt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.adobe.formscentral.fcdt' },
	adobe_fxp: { 
	 	ext: ['fxp', 'fxpl'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.adobe.fxp' },
	adobe_xdp_xml: { 
	 	ext: 'xdp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.adobe.xdp+xml' },
	adobe_xfdf: { 
	 	ext: 'xfdf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.adobe.xfdf' },
	ahead_space: { 
	 	ext: 'ahead',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ahead.space' },
	airzip_filesecure_azf: { 
	 	ext: 'azf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.airzip.filesecure.azf' },
	airzip_filesecure_azs: { 
	 	ext: 'azs',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.airzip.filesecure.azs' },
	amazon_ebook: { 
	 	ext: 'azw',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.amazon.ebook' },
	americandynamics_acc: { 
	 	ext: 'acc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.americandynamics.acc' },
	amiga_ami: { 
	 	ext: 'ami',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.amiga.ami' },
	android_package_archive: { 
	 	ext: 'apk',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.android.package-archive' },
	anser_web_certificate_issue_initiation: { 
	 	ext: 'cii',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.anser-web-certificate-issue-initiation' },
	anser_web_funds_transfer_initiation: { 
	 	ext: 'fti',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.anser-web-funds-transfer-initiation' },
	antix_game_component: { 
	 	ext: 'atx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.antix.game-component' },
	apple_installer_xml: { 
	 	ext: 'mpkg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.apple.installer+xml' },
	apple_mpegurl: { 
	 	ext: 'm3u8',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.apple.mpegurl' },
	aristanetworks_swi: { 
	 	ext: 'swi',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.aristanetworks.swi' },
	astraea_software_iota: { 
	 	ext: 'iota',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.astraea-software.iota' },
	audiograph: { 
	 	ext: 'aep',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.audiograph' },
	blueice_multipass: { 
	 	ext: 'mpm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.blueice.multipass' },
	bmi: { 
	 	ext: 'bmi',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.bmi' },
	businessobjects: { 
	 	ext: 'rep',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.businessobjects' },
	chemdraw_xml: { 
	 	ext: 'cdxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.chemdraw+xml' },
	chipnuts_karaoke_mmd: { 
	 	ext: 'mmd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.chipnuts.karaoke-mmd' },
	cinderella: { 
	 	ext: 'cdy',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.cinderella' },
	claymore: { 
	 	ext: 'cla',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.claymore' },
	cloanto_rp9: { 
	 	ext: 'rp9',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.cloanto.rp9' },
	clonk_c4group: { 
	 	ext: ['c4g', 'c4d', 'c4f', 'c4p', 'c4u'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.clonk.c4group' },
	cluetrust_cartomobile_config: { 
	 	ext: 'c11amc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.cluetrust.cartomobile-config' },
	cluetrust_cartomobile_config_pkg: { 
	 	ext: 'c11amz',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.cluetrust.cartomobile-config-pkg' },
	commonspace: { 
	 	ext: 'csp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.commonspace' },
	contact_cmsg: { 
	 	ext: 'cdbcmsg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.contact.cmsg' },
	cosmocaller: { 
	 	ext: 'cmc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.cosmocaller' },
	crick_clicker: { 
	 	ext: 'clkx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.crick.clicker' },
	crick_clicker_keyboard: { 
	 	ext: 'clkk',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.crick.clicker.keyboard' },
	crick_clicker_palette: { 
	 	ext: 'clkp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.crick.clicker.palette' },
	crick_clicker_template: { 
	 	ext: 'clkt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.crick.clicker.template' },
	crick_clicker_wordbank: { 
	 	ext: 'clkw',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.crick.clicker.wordbank' },
	criticaltools_wbs_xml: { 
	 	ext: 'wbs',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.criticaltools.wbs+xml' },
	ctc_posml: { 
	 	ext: 'pml',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ctc-posml' },
	cups_ppd: { 
	 	ext: 'ppd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.cups-ppd' },
	curl_car: { 
	 	ext: 'car',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.curl.car' },
	curl_pcurl: { 
	 	ext: 'pcurl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.curl.pcurl' },
	dart: { 
	 	ext: 'dart',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dart' },
	data_vision_rdz: { 
	 	ext: 'rdz',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.data-vision.rdz' },
	dece_data: { 
	 	ext: ['uvf', 'uvvf', 'uvd', 'uvvd'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dece.data' },
	dece_ttml_xml: { 
	 	ext: ['uvt', 'uvvt'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dece.ttml+xml' },
	dece_unspecified: { 
	 	ext: ['uvx', 'uvvx'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dece.unspecified' },
	dece_zip: { 
	 	ext: ['uvz', 'uvvz'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dece.zip' },
	denovo_fcselayout_link: { 
	 	ext: 'fe_launch',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.denovo.fcselayout-link' },
	dna: { 
	 	ext: 'dna',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dna' },
	dolby_mlp: { 
	 	ext: 'mlp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dolby.mlp' },
	dpgraph: { 
	 	ext: 'dpg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dpgraph' },
	dreamfactory: { 
	 	ext: 'dfac',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dreamfactory' },
	ds_keypoint: { 
	 	ext: 'kpxx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ds-keypoint' },
	dvb_ait: { 
	 	ext: 'ait',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dvb.ait' },
	dvb_service: { 
	 	ext: 'svc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dvb.service' },
	dynageo: { 
	 	ext: 'geo',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.dynageo' },
	ecowin_chart: { 
	 	ext: 'mag',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ecowin.chart' },
	enliven: { 
	 	ext: 'nml',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.enliven' },
	epson_esf: { 
	 	ext: 'esf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.epson.esf' },
	epson_msf: { 
	 	ext: 'msf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.epson.msf' },
	epson_quickanime: { 
	 	ext: 'qam',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.epson.quickanime' },
	epson_salt: { 
	 	ext: 'slt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.epson.salt' },
	epson_ssf: { 
	 	ext: 'ssf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.epson.ssf' },
	eszigno3_xml: { 
	 	ext: ['es3', 'et3'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.eszigno3+xml' },
	ezpix_album: { 
	 	ext: 'ez2',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ezpix-album' },
	ezpix_package: { 
	 	ext: 'ez3',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ezpix-package' },
	fdf: { 
	 	ext: 'fdf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fdf' },
	fdsn_mseed: { 
	 	ext: 'mseed',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fdsn.mseed' },
	fdsn_seed: { 
	 	ext: ['seed', 'dataless'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fdsn.seed' },
	flographit: { 
	 	ext: 'gph',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.flographit' },
	fluxtime_clip: { 
	 	ext: 'ftc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fluxtime.clip' },
	framemaker: { 
	 	ext: ['fm', 'frame', 'maker', 'book'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.framemaker' },
	frogans_fnc: { 
	 	ext: 'fnc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.frogans.fnc' },
	frogans_ltf: { 
	 	ext: 'ltf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.frogans.ltf' },
	fsc_weblaunch: { 
	 	ext: 'fsc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fsc.weblaunch' },
	fujitsu_oasys: { 
	 	ext: 'oas',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fujitsu.oasys' },
	fujitsu_oasys2: { 
	 	ext: 'oa2',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fujitsu.oasys2' },
	fujitsu_oasys3: { 
	 	ext: 'oa3',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fujitsu.oasys3' },
	fujitsu_oasysgp: { 
	 	ext: 'fg5',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fujitsu.oasysgp' },
	fujitsu_oasysprs: { 
	 	ext: 'bh2',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fujitsu.oasysprs' },
	fujixerox_ddd: { 
	 	ext: 'ddd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fujixerox.ddd' },
	fujixerox_docuworks: { 
	 	ext: 'xdw',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fujixerox.docuworks' },
	fujixerox_docuworks_binder: { 
	 	ext: 'xbd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fujixerox.docuworks.binder' },
	fuzzysheet: { 
	 	ext: 'fzs',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.fuzzysheet' },
	genomatix_tuxedo: { 
	 	ext: 'txd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.genomatix.tuxedo' },
	geogebra_file: { 
	 	ext: 'ggb',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.geogebra.file' },
	geogebra_tool: { 
	 	ext: 'ggt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.geogebra.tool' },
	geometry_explorer: { 
	 	ext: ['gex', 'gre'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.geometry-explorer' },
	geonext: { 
	 	ext: 'gxt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.geonext' },
	geoplan: { 
	 	ext: 'g2w',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.geoplan' },
	geospace: { 
	 	ext: 'g3w',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.geospace' },
	gmx: { 
	 	ext: 'gmx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.gmx' },
	google_earth_kml_xml: { 
	 	ext: 'kml',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.google-earth.kml+xml' },
	google_earth_kmz: { 
	 	ext: 'kmz',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.google-earth.kmz' },
	grafeq: { 
	 	ext: ['gqf', 'gqs'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.grafeq' },
	groove_account: { 
	 	ext: 'gac',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.groove-account' },
	groove_help: { 
	 	ext: 'ghf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.groove-help' },
	groove_identity_message: { 
	 	ext: 'gim',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.groove-identity-message' },
	groove_injector: { 
	 	ext: 'grv',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.groove-injector' },
	groove_tool_message: { 
	 	ext: 'gtm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.groove-tool-message' },
	groove_tool_template: { 
	 	ext: 'tpl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.groove-tool-template' },
	groove_vcard: { 
	 	ext: 'vcg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.groove-vcard' },
	hal_xml: { 
	 	ext: 'hal',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hal+xml' },
	handheld_entertainment_xml: { 
	 	ext: 'zmm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.handheld-entertainment+xml' },
	hbci: { 
	 	ext: 'hbci',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hbci' },
	hhe_lesson_player: { 
	 	ext: 'les',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hhe.lesson-player' },
	hp_hpgl: { 
	 	ext: 'hpgl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hp-hpgl' },
	hp_hpid: { 
	 	ext: 'hpid',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hp-hpid' },
	hp_hps: { 
	 	ext: 'hps',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hp-hps' },
	hp_jlyt: { 
	 	ext: 'jlt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hp-jlyt' },
	hp_pcl: { 
	 	ext: 'pcl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hp-pcl' },
	hp_pclxl: { 
	 	ext: 'pclxl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.hp-pclxl' },
	ibm_minipay: { 
	 	ext: 'mpy',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ibm.minipay' },
	ibm_modcap: { 
	 	ext: ['afp', 'listafp', 'list3820'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ibm.modcap' },
	ibm_rights_management: { 
	 	ext: 'irm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ibm.rights-management' },
	ibm_secure_container: { 
	 	ext: 'sc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ibm.secure-container' },
	iccprofile: { 
	 	ext: ['icc', 'icm'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.iccprofile' },
	igloader: { 
	 	ext: 'igl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.igloader' },
	immervision_ivp: { 
	 	ext: 'ivp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.immervision-ivp' },
	immervision_ivu: { 
	 	ext: 'ivu',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.immervision-ivu' },
	insors_igm: { 
	 	ext: 'igm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.insors.igm' },
	intercon_formnet: { 
	 	ext: ['xpw', 'xpx'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.intercon.formnet' },
	intergeo: { 
	 	ext: 'i2g',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.intergeo' },
	intu_qbo: { 
	 	ext: 'qbo',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.intu.qbo' },
	intu_qfx: { 
	 	ext: 'qfx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.intu.qfx' },
	ipunplugged_rcprofile: { 
	 	ext: 'rcprofile',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ipunplugged.rcprofile' },
	irepository_package_xml: { 
	 	ext: 'irp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.irepository.package+xml' },
	is_xpr: { 
	 	ext: 'xpr',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.is-xpr' },
	isac_fcs: { 
	 	ext: 'fcs',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.isac.fcs' },
	jam: { 
	 	ext: 'jam',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.jam' },
	jcp_javame_midlet_rms: { 
	 	ext: 'rms',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.jcp.javame.midlet-rms' },
	jisp: { 
	 	ext: 'jisp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.jisp' },
	joost_joda_archive: { 
	 	ext: 'joda',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.joost.joda-archive' },
	kahootz: { 
	 	ext: ['ktz', 'ktr'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kahootz' },
	kde_karbon: { 
	 	ext: 'karbon',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kde.karbon' },
	kde_kchart: { 
	 	ext: 'chrt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kde.kchart' },
	kde_kformula: { 
	 	ext: 'kfo',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kde.kformula' },
	kde_kivio: { 
	 	ext: 'flw',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kde.kivio' },
	kde_kontour: { 
	 	ext: 'kon',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kde.kontour' },
	kde_kpresenter: { 
	 	ext: ['kpr', 'kpt'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kde.kpresenter' },
	kde_kspread: { 
	 	ext: 'ksp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kde.kspread' },
	kde_kword: { 
	 	ext: 'KWD',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'KWord document',
	 	mime: 'application/vnd.kde.kword' },
	kenameaapp: { 
	 	ext: 'htke',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kenameaapp' },
	kidspiration: { 
	 	ext: 'kia',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kidspiration' },
	kinar: { 
	 	ext: ['kne', 'knp'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kinar' },
	koan: { 
	 	ext: ['skp', 'skd', 'skt', 'skm'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.koan' },
	kodak_descriptor: { 
	 	ext: 'sse',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.kodak-descriptor' },
	las_las_xml: { 
	 	ext: 'lasxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.las.las+xml' },
	llamagraphics_life_balance_desktop: { 
	 	ext: 'lbd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.llamagraphics.life-balance.desktop' },
	llamagraphics_life_balance_exchange_xml: { 
	 	ext: 'lbe',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.llamagraphics.life-balance.exchange+xml' },
	lotus_1_2_3: { 
	 	ext: '123',
		signature: [ 0, 0, 26, 0, 5, 16, 4 ],
	 	desc: 'Lotus 1-2-3 (v9)',
	 	mime: 'application/vnd.lotus-1-2-3' },
	lotus_approach: { 
	 	ext: 'APR',
		signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	desc: 'Lotus|IBM Approach 97 file',
	 	mime: 'application/vnd.lotus-approach' },
	lotus_freelance: { 
	 	ext: 'pre',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.lotus-freelance' },
	lotus_notes: 
      [ { ext: 'NSF',
	 	  signature: [ 78, 69, 83, 77, 26, 1 ],
	 	  desc: 'NES Sound file',
	 	  mime: 'application/vnd.lotus-notes' },
	 	{ ext: 'NSF',
	 	  signature: [ 26, 0, 0, 4, 0, 0 ],
	 	  desc: 'Lotus Notes database',
	 	  mime: 'application/vnd.lotus-notes' } ],
	lotus_organizer: { 
	 	ext: 'ORG',
		signature: [ 65, 79, 76, 86, 77, 49, 48, 48 ],
	 	desc: 'AOL personal file cabinet',
	 	mime: 'application/vnd.lotus-organizer' },
	lotus_screencam: { 
	 	ext: 'scm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.lotus-screencam' },
	lotus_wordpro: { 
	 	ext: 'LWP',
		signature: [ 87, 111, 114, 100, 80, 114, 111 ],
	 	desc: 'Lotus WordPro file',
	 	mime: 'application/vnd.lotus-wordpro' },
	macports_portpkg: { 
	 	ext: 'portpkg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.macports.portpkg' },
	mcd: { 
	 	ext: 'mcd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mcd' },
	medcalcdata: { 
	 	ext: 'mc1',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.medcalcdata' },
	mediastation_cdkey: { 
	 	ext: 'cdkey',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mediastation.cdkey' },
	mfer: { 
	 	ext: 'mwf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mfer' },
	mfmp: { 
	 	ext: 'mfm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mfmp' },
	micrografx_flo: { 
	 	ext: 'flo',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.micrografx.flo' },
	micrografx_igx: { 
	 	ext: 'igx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.micrografx.igx' },
	mif: 
      [ { ext: 'MIF',
	 	  signature: [ 60, 77, 97, 107, 101, 114, 70, 105 ],
	 	  desc: 'Adobe FrameMaker',
	 	  mime: 'application/vnd.mif' },
	 	{ ext: 'MIF',
	 	  signature: [ 86, 101, 114, 115, 105, 111, 110, 32 ],
	 	  desc: 'MapInfo Interchange Format file',
	 	  mime: 'application/vnd.mif' } ],
	mobius_daf: { 
	 	ext: 'daf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mobius.daf' },
	mobius_dis: { 
	 	ext: 'dis',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mobius.dis' },
	mobius_mbk: { 
	 	ext: 'mbk',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mobius.mbk' },
	mobius_mqy: { 
	 	ext: 'mqy',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mobius.mqy' },
	mobius_msl: { 
	 	ext: 'msl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mobius.msl' },
	mobius_plc: { 
	 	ext: 'plc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mobius.plc' },
	mobius_txf: { 
	 	ext: 'txf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mobius.txf' },
	mophun_application: { 
	 	ext: 'mpn',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mophun.application' },
	mophun_certificate: { 
	 	ext: 'mpc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mophun.certificate' },
	mozilla_xul_xml: { 
	 	ext: 'xul',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mozilla.xul+xml' },
	ms_artgalry: { 
	 	ext: 'cil',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-artgalry' },
	ms_cab_compressed: 
      [ { ext: 'CAB',
	 	  signature: [ 77, 83, 67, 70 ],
	 	  desc: 'Microsoft cabinet file',
	 	  mime: 'application/vnd.ms-cab-compressed' },
	 	{ ext: 'CAB',
	 	  signature: [ 73, 83, 99, 40 ],
	 	  desc: 'Install Shield compressed file',
	 	  mime: 'application/vnd.ms-cab-compressed' } ],
	ms_excel: 
      [ { ext: 'XLA',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Office document',
	 	  mime: 'application/vnd.ms-excel' },
	 	{ ext: 'XLS',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Office document',
	 	  mime: 'application/vnd.ms-excel' },
	 	{ ext: 'XLS',
	 	  signature: [ 253, 255, 255, 255, 34 ],
	 	  desc: 'Excel spreadsheet subheader_4',
	 	  mime: 'application/vnd.ms-excel' },
	 	{ ext: 'XLS',
	 	  signature: [ 253, 255, 255, 255, 31 ],
	 	  desc: 'Excel spreadsheet subheader_3',
	 	  mime: 'application/vnd.ms-excel' },
	 	{ ext: 'XLS',
	 	  signature: [ 253, 255, 255, 255, 16 ],
	 	  desc: 'Excel spreadsheet subheader_2',
	 	  mime: 'application/vnd.ms-excel' },
	 	{ ext: 'XLS',
	 	  signature: [ 9, 8, 16, 0, 0, 6, 5, 0 ],
	 	  desc: 'Excel spreadsheet subheader_1',
	 	  mime: 'application/vnd.ms-excel' },
	 	{ ext: 'XLS',
	 	  signature: [ 253, 255, 255, 255, 41 ],
	 	  desc: 'Excel spreadsheet subheader_7',
	 	  mime: 'application/vnd.ms-excel' },
	 	{ ext: 'XLS',
	 	  signature: [ 253, 255, 255, 255, 40 ],
	 	  desc: 'Excel spreadsheet subheader_6',
	 	  mime: 'application/vnd.ms-excel' },
	 	{ ext: 'XLS',
	 	  signature: [ 253, 255, 255, 255, 35 ],
	 	  desc: 'Excel spreadsheet subheader_5',
	 	  mime: 'application/vnd.ms-excel' } ],
	ms_excel_addin_macroenabled_12: { 
	 	ext: 'xlam',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-excel.addin.macroenabled.12' },
	ms_excel_sheet_binary_macroenabled_12: { 
	 	ext: 'xlsb',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-excel.sheet.binary.macroenabled.12' },
	ms_excel_sheet_macroenabled_12: { 
	 	ext: 'xlsm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-excel.sheet.macroenabled.12' },
	ms_excel_template_macroenabled_12: { 
	 	ext: 'xltm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-excel.template.macroenabled.12' },
	ms_fontobject: { 
	 	ext: 'eot',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-fontobject' },
	ms_htmlhelp: { 
	 	ext: 'CHM',
		signature: [ 73, 84, 83, 70 ],
	 	desc: 'MS Compiled HTML Help File',
	 	mime: 'application/vnd.ms-htmlhelp' },
	ms_ims: { 
	 	ext: 'ims',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-ims' },
	ms_lrm: { 
	 	ext: 'lrm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-lrm' },
	ms_officetheme: { 
	 	ext: 'thmx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-officetheme' },
	ms_pki_seccat: { 
	 	ext: 'CAT',
		signature: [ 48 ],
	 	desc: 'MS security catalog file',
	 	mime: 'application/vnd.ms-pki.seccat' },
	ms_pki_stl: { 
	 	ext: 'stl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-pki.stl' },
	ms_powerpoint: 
      [ { ext: 'PPS',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Office document',
	 	  mime: 'application/vnd.ms-powerpoint' },
	 	{ ext: 'PPT',
	 	  signature: [ 253, 255, 255, 255, 28, 0, 0, 0 ],
	 	  desc: 'PowerPoint presentation subheader_5',
	 	  mime: 'application/vnd.ms-powerpoint' },
	 	{ ext: 'PPT',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Office document',
	 	  mime: 'application/vnd.ms-powerpoint' },
	 	{ ext: 'PPT',
	 	  signature: [ 253, 255, 255, 255, 14, 0, 0, 0 ],
	 	  desc: 'PowerPoint presentation subheader_4',
	 	  mime: 'application/vnd.ms-powerpoint' },
	 	{ ext: 'PPT',
	 	  signature: [ 160, 70, 29, 240 ],
	 	  desc: 'PowerPoint presentation subheader_3',
	 	  mime: 'application/vnd.ms-powerpoint' },
	 	{ ext: 'PPT',
	 	  signature: [ 15, 0, 232, 3 ],
	 	  desc: 'PowerPoint presentation subheader_2',
	 	  mime: 'application/vnd.ms-powerpoint' },
	 	{ ext: 'PPT',
	 	  signature: [ 0, 110, 30, 240 ],
	 	  desc: 'PowerPoint presentation subheader_1',
	 	  mime: 'application/vnd.ms-powerpoint' },
	 	{ ext: 'PPT',
	 	  signature: [ 253, 255, 255, 255, 67, 0, 0, 0 ],
	 	  desc: 'PowerPoint presentation subheader_6',
	 	  mime: 'application/vnd.ms-powerpoint' } ],
	ms_powerpoint_addin_macroenabled_12: { 
	 	ext: 'ppam',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-powerpoint.addin.macroenabled.12' },
	ms_powerpoint_presentation_macroenabled_12: { 
	 	ext: 'pptm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-powerpoint.presentation.macroenabled.12' },
	ms_powerpoint_slide_macroenabled_12: { 
	 	ext: 'sldm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-powerpoint.slide.macroenabled.12' },
	ms_powerpoint_slideshow_macroenabled_12: { 
	 	ext: 'ppsm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-powerpoint.slideshow.macroenabled.12' },
	ms_powerpoint_template_macroenabled_12: { 
	 	ext: 'potm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-powerpoint.template.macroenabled.12' },
	ms_project: { 
	 	ext: ['mpp', 'mpt'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-project' },
	ms_word_document_macroenabled_12: { 
	 	ext: 'docm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-word.document.macroenabled.12' },
	ms_word_template_macroenabled_12: { 
	 	ext: 'dotm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ms-word.template.macroenabled.12' },
	ms_works: 
      [ { ext: 'WKS',
	 	  signature: [ 255, 0, 2, 0, 4, 4, 5, 84 ],
	 	  desc: 'Works for Windows spreadsheet',
	 	  mime: 'application/vnd.ms-works' },
	 	{ ext: 'WKS',
	 	  signature: [ 14, 87, 75, 83 ],
	 	  desc: 'DeskMate Worksheet',
	 	  mime: 'application/vnd.ms-works' },
	 	{ ext: 'WPS',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'MSWorks text document',
	 	  mime: 'application/vnd.ms-works' } ],
	ms_wpl: { 
	 	ext: 'WPL',
		signature: 
	 	 [ 77,
	 	   105,
	 	   99,
	 	   114,
	 	   111,
	 	   115,
	 	   111,
	 	   102,
	 	   116,
	 	   32,
	 	   87,
	 	   105,
	 	   110,
	 	   100,
	 	   111,
	 	   119,
	 	   115,
	 	   32,
	 	   77,
	 	   101,
	 	   100,
	 	   105,
	 	   97,
	 	   32,
	 	   80,
	 	   108,
	 	   97,
	 	   121,
	 	   101,
	 	   114,
	 	   32,
	 	   45,
	 	   45,
	 	   32 ],
	 	desc: 'Windows Media Player playlist',
	 	mime: 'application/vnd.ms-wpl' },
	ms_xpsdocument: { 
	 	ext: 'XPS',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'XML paper specification file',
	 	mime: 'application/vnd.ms-xpsdocument' },
	mseq: { 
	 	ext: 'mseq',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mseq' },
	musician: { 
	 	ext: 'mus',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.musician' },
	muvee_style: { 
	 	ext: 'msty',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.muvee.style' },
	mynfc: { 
	 	ext: 'taglet',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.mynfc' },
	neurolanguage_nlu: { 
	 	ext: 'nlu',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.neurolanguage.nlu' },
	nitf: 
      [ { ext: 'NTF',
	 	  signature: [ 26, 0, 0 ],
	 	  desc: 'Lotus Notes database template',
	 	  mime: 'application/vnd.nitf' },
	 	{ ext: 'NTF',
	 	  signature: [ 48, 49, 79, 82, 68, 78, 65, 78 ],
	 	  desc: 'National Transfer Format Map',
	 	  mime: 'application/vnd.nitf' },
	 	{ ext: 'NTF',
	 	  signature: [ 78, 73, 84, 70, 48 ],
	 	  desc: 'National Imagery Transmission Format file',
	 	  mime: 'application/vnd.nitf' } ],
	noblenet_directory: { 
	 	ext: 'nnd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.noblenet-directory' },
	noblenet_sealer: { 
	 	ext: 'nns',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.noblenet-sealer' },
	noblenet_web: { 
	 	ext: 'nnw',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.noblenet-web' },
	nokia_n_gage_data: { 
	 	ext: 'ngdat',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.nokia.n-gage.data' },
	nokia_radio_preset: { 
	 	ext: 'rpst',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.nokia.radio-preset' },
	nokia_radio_presets: { 
	 	ext: 'rpss',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.nokia.radio-presets' },
	novadigm_edm: { 
	 	ext: 'edm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.novadigm.edm' },
	novadigm_edx: { 
	 	ext: 'edx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.novadigm.edx' },
	novadigm_ext: { 
	 	ext: 'ext',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.novadigm.ext' },
	oasis_opendocument_chart: { 
	 	ext: 'odc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.chart' },
	oasis_opendocument_chart_template: { 
	 	ext: 'otc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.chart-template' },
	oasis_opendocument_database: { 
	 	ext: 'odb',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.database' },
	oasis_opendocument_formula: { 
	 	ext: 'odf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.formula' },
	oasis_opendocument_formula_template: { 
	 	ext: 'odft',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.formula-template' },
	oasis_opendocument_graphics: { 
	 	ext: 'odg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.graphics' },
	oasis_opendocument_graphics_template: { 
	 	ext: 'otg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.graphics-template' },
	oasis_opendocument_image: { 
	 	ext: 'odi',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.image' },
	oasis_opendocument_image_template: { 
	 	ext: 'oti',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.image-template' },
	oasis_opendocument_presentation: { 
	 	ext: 'ODP',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'OpenDocument template',
	 	mime: 'application/vnd.oasis.opendocument.presentation' },
	oasis_opendocument_presentation_template: { 
	 	ext: 'otp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.presentation-template' },
	oasis_opendocument_spreadsheet: { 
	 	ext: 'ods',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.spreadsheet' },
	oasis_opendocument_spreadsheet_template: { 
	 	ext: 'ots',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.spreadsheet-template' },
	oasis_opendocument_text: { 
	 	ext: 'ODT',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'OpenDocument template',
	 	mime: 'application/vnd.oasis.opendocument.text' },
	oasis_opendocument_text_master: { 
	 	ext: 'odm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.text-master' },
	oasis_opendocument_text_template: { 
	 	ext: 'OTT',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'OpenDocument template',
	 	mime: 'application/vnd.oasis.opendocument.text-template' },
	oasis_opendocument_text_web: { 
	 	ext: 'oth',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oasis.opendocument.text-web' },
	olpc_sugar: { 
	 	ext: 'xo',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.olpc-sugar' },
	oma_dd2_xml: { 
	 	ext: 'dd2',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.oma.dd2+xml' },
	openofficeorg_extension: { 
	 	ext: 'oxt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.openofficeorg.extension' },
	openxmlformats_officedocument_presentationml_presentation: 
      [ { ext: 'PPTX',
	 	  signature: [ 80, 75, 3, 4, 20, 0, 6, 0 ],
	 	  desc: 'MS Office 2007 documents',
	 	  mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
	 	{ ext: 'PPTX',
	 	  signature: [ 80, 75, 3, 4 ],
	 	  desc: 'MS Office Open XML Format Document',
	 	  mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' } ],
	openxmlformats_officedocument_presentationml_slide: { 
	 	ext: 'sldx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.openxmlformats-officedocument.presentationml.slide' },
	openxmlformats_officedocument_presentationml_slideshow: { 
	 	ext: 'ppsx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' },
	openxmlformats_officedocument_presentationml_template: { 
	 	ext: 'potx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.openxmlformats-officedocument.presentationml.template' },
	openxmlformats_officedocument_spreadsheetml_sheet: 
      [ { ext: 'XLSX',
	 	  signature: [ 80, 75, 3, 4, 20, 0, 6, 0 ],
	 	  desc: 'MS Office 2007 documents',
	 	  mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' } ],
	openxmlformats_officedocument_spreadsheetml_template: { 
	 	ext: 'xltx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' },
	openxmlformats_officedocument_wordprocessingml_document: 
      [ { ext: 'DOCX',
	 	  signature: [ 80, 75, 3, 4 ],
	 	  desc: 'MS Office Open XML Format Document',
	 	  mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
	 	{ ext: 'DOCX',
	 	  signature: [ 80, 75, 3, 4 ],
	 	  desc: 'MS Office Open XML Format Document',
	 	  mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
	],
	openxmlformats_officedocument_wordprocessingml_template: { 
	 	ext: 'dotx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' },
	osgeo_mapguide_package: { 
	 	ext: 'mgp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.osgeo.mapguide.package' },
	osgi_dp: { 
	 	ext: 'dp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.osgi.dp' },
	osgi_subsystem: { 
	 	ext: 'esa',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.osgi.subsystem' },
	palm: 
      [ { ext: 'PDB',
	 	  signature: [ 77, 105, 99, 114, 111, 115, 111, 102, 116, 32, 67, 47, 67, 43, 43, 32 ],
	 	  desc: 'MS C++ debugging symbols file',
	 	  mime: 'application/vnd.palm' },
	 	{ ext: 'PDB',
	 	  signature: [ 77, 45, 87, 32, 80, 111, 99, 107 ],
	 	  desc: 'Merriam-Webster Pocket Dictionary',
	 	  mime: 'application/vnd.palm' },
	 	{ ext: 'PDB',
	 	  signature: [ 172, 237, 0, 5, 115, 114, 0, 18 ],
	 	  desc: 'BGBlitz position database file',
	 	  mime: 'application/vnd.palm' },
	 	{ ext: 'PDB',
	 	  signature: [ 115, 122, 101, 122 ],
	 	  desc: 'PowerBASIC Debugger Symbols',
	 	  mime: 'application/vnd.palm' },
	 	{ ext: 'PDB',
	 	  signature: [ 115, 109, 95 ],
	 	  desc: 'PalmOS SuperMemo',
	 	  mime: 'application/vnd.palm' } ],
	pawaafile: { 
	 	ext: 'paw',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.pawaafile' },
	pg_format: { 
	 	ext: 'str',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.pg.format' },
	pg_osasli: { 
	 	ext: 'ei6',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.pg.osasli' },
	picsel: { 
	 	ext: 'efif',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.picsel' },
	pmi_widget: { 
	 	ext: 'wg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.pmi.widget' },
	pocketlearn: { 
	 	ext: 'plf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.pocketlearn' },
	powerbuilder6: { 
	 	ext: 'pbd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.powerbuilder6' },
	previewsystems_box: { 
	 	ext: 'box',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.previewsystems.box' },
	proteus_magazine: { 
	 	ext: 'mgz',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.proteus.magazine' },
	publishare_delta_tree: { 
	 	ext: 'qps',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.publishare-delta-tree' },
	pvi_ptid1: { 
	 	ext: 'ptid',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.pvi.ptid1' },
	quark_quarkxpress: 
      [ { ext: 'QXD',
	 	  signature: [ 0, 0, 77, 77, 88, 80, 82 ],
	 	  desc: 'Quark Express (Motorola)',
	 	  mime: 'application/vnd.quark.quarkxpress' },
	 	{ ext: 'QXD',
	 	  signature: [ 0, 0, 73, 73, 88, 80, 82 ],
	 	  desc: 'Quark Express (Intel)',
	 	  mime: 'application/vnd.quark.quarkxpress' } ],
	realvnc_bed: { 
	 	ext: 'bed',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.realvnc.bed' },
	recordare_musicxml: { 
	 	ext: 'mxl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.recordare.musicxml' },
	recordare_musicxml_xml: { 
	 	ext: 'musicxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.recordare.musicxml+xml' },
	rig_cryptonote: { 
	 	ext: 'cryptonote',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.rig.cryptonote' },
	rim_cod: { 
	 	ext: 'COD',
		signature: [ 78, 97, 109, 101, 58, 32 ],
	 	desc: 'Agent newsreader character map',
	 	mime: 'application/vnd.rim.cod' },
	rn_realmedia: { 
	 	ext: 'RM',
		signature: [ 46, 82, 77, 70 ],
	 	desc: 'RealMedia streaming media',
	 	mime: 'application/vnd.rn-realmedia' },
	rn_realmedia_vbr: { 
	 	ext: 'RMVB',
		signature: [ 46, 82, 77, 70 ],
	 	desc: 'RealMedia streaming media',
	 	mime: 'application/vnd.rn-realmedia-vbr' },
	route66_link66_xml: { 
	 	ext: 'link66',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.route66.link66+xml' },
	sailingtracker_track: { 
	 	ext: 'st',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sailingtracker.track' },
	seemail: { 
	 	ext: 'see',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.seemail' },
	sema: { 
	 	ext: 'sema',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sema' },
	semd: { 
	 	ext: 'semd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.semd' },
	semf: { 
	 	ext: 'semf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.semf' },
	shana_informed_formdata: { 
	 	ext: 'ifm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.shana.informed.formdata' },
	shana_informed_formtemplate: { 
	 	ext: 'itp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.shana.informed.formtemplate' },
	shana_informed_interchange: { 
	 	ext: 'iif',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.shana.informed.interchange' },
	shana_informed_package: { 
	 	ext: 'ipk',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.shana.informed.package' },
	simtech_mindmapper: { 
	 	ext: ['twd', 'twds'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.simtech-mindmapper' },
	smaf: { 
	 	ext: 'MMF',
		signature: [ 77, 77, 77, 68, 0, 0 ],
	 	desc: 'Yamaha Synthetic music Mobile Application Format',
	 	mime: 'application/vnd.smaf' },
	smart_teacher: { 
	 	ext: 'teacher',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.smart.teacher' },
	solent_sdkm_xml: { 
	 	ext: ['sdkm', 'sdkd'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.solent.sdkm+xml' },
	spotfire_dxp: { 
	 	ext: 'dxp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.spotfire.dxp' },
	spotfire_sfs: { 
	 	ext: 'sfs',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.spotfire.sfs' },
	stardivision_calc: { 
	 	ext: 'sdc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.stardivision.calc' },
	stardivision_draw: { 
	 	ext: 'sda',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.stardivision.draw' },
	stardivision_impress: { 
	 	ext: 'sdd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.stardivision.impress' },
	stardivision_math: { 
	 	ext: 'smf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.stardivision.math' },
	stardivision_writer: { 
	 	ext: ['sdw', 'vor'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.stardivision.writer' },
	stardivision_writer_global: { 
	 	ext: 'sgl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.stardivision.writer-global' },
	stepmania_package: { 
	 	ext: 'smzip',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.stepmania.package' },
	stepmania_stepchart: { 
	 	ext: 'sm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.stepmania.stepchart' },
	sun_xml_calc: { 
	 	ext: 'SXC',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'StarOffice spreadsheet',
	 	mime: 'application/vnd.sun.xml.calc' },
	sun_xml_calc_template: { 
	 	ext: 'stc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sun.xml.calc.template' },
	sun_xml_draw: { 
	 	ext: 'SXD',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'OpenOffice documents',
	 	mime: 'application/vnd.sun.xml.draw' },
	sun_xml_draw_template: { 
	 	ext: 'std',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sun.xml.draw.template' },
	sun_xml_impress: { 
	 	ext: 'SXI',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'OpenOffice documents',
	 	mime: 'application/vnd.sun.xml.impress' },
	sun_xml_impress_template: { 
	 	ext: 'sti',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sun.xml.impress.template' },
	sun_xml_math: { 
	 	ext: 'sxm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sun.xml.math' },
	sun_xml_writer: { 
	 	ext: 'SXW',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'OpenOffice documents',
	 	mime: 'application/vnd.sun.xml.writer' },
	sun_xml_writer_global: { 
	 	ext: 'sxg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sun.xml.writer.global' },
	sun_xml_writer_template: { 
	 	ext: 'stw',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sun.xml.writer.template' },
	sus_calendar: { 
	 	ext: ['sus', 'susp'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.sus-calendar' },
	svd: { 
	 	ext: 'svd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.svd' },
	symbian_install: { 
	 	ext: ['sis', 'sisx'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.symbian.install' },
	syncml_xml: { 
	 	ext: 'xsm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.syncml+xml' },
	syncml_dm_wbxml: { 
	 	ext: 'bdm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.syncml.dm+wbxml' },
	syncml_dm_xml: { 
	 	ext: 'xdm',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.syncml.dm+xml' },
	tao_intent_module_archive: { 
	 	ext: 'tao',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.tao.intent-module-archive' },
	tcpdump_pcap: 
      [ { ext: 'CAP',
	 	  signature: [ 88, 67, 80, 0 ],
	 	  desc: 'Packet sniffer files',
	 	  mime: 'application/vnd.tcpdump.pcap' },
	 	{ ext: 'CAP',
	 	  signature: [ 82, 84, 83, 83 ],
	 	  desc: 'WinNT Netmon capture file',
	 	  mime: 'application/vnd.tcpdump.pcap' },
	 	{ ext: 'DMP',
	 	  signature: [ 80, 65, 71, 69, 68, 85 ],
	 	  desc: 'Windows memory dump',
	 	  mime: 'application/vnd.tcpdump.pcap' },
	 	{ ext: 'DMP',
	 	  signature: [ 77, 68, 77, 80, 147, 167 ],
	 	  desc: 'Windows dump file',
	 	  mime: 'application/vnd.tcpdump.pcap' },
	 	{ ext: 'DMP',
	 	  signature: [ 80, 65, 71, 69, 68, 85 ],
	 	  desc: 'Windows memory dump',
	 	  mime: 'application/vnd.tcpdump.pcap' },
	 	{ ext: 'DMP',
	 	  signature: [ 77, 68, 77, 80, 147, 167 ],
	 	  desc: 'Windows dump file',
	 	  mime: 'application/vnd.tcpdump.pcap' } ],
	tmobile_livetv: { 
	 	ext: 'tmo',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.tmobile-livetv' },
	trid_tpt: { 
	 	ext: 'tpt',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.trid.tpt' },
	triscape_mxs: { 
	 	ext: 'mxs',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.triscape.mxs' },
	trueapp: { 
	 	ext: 'tra',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.trueapp' },
	ufdl: { 
	 	ext: ['ufd', 'ufdl'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.ufdl' },
	uiq_theme: { 
	 	ext: 'utz',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.uiq.theme' },
	umajin: { 
	 	ext: 'umj',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.umajin' },
	unity: { 
	 	ext: 'unityweb',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.unity' },
	uoml_xml: { 
	 	ext: 'uoml',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.uoml+xml' },
	vcx: { 
	 	ext: 'vcx',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.vcx' },
	visio: { 
	 	ext: 'VSD',
		signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	desc: 'Visio file',
	 	mime: 'application/vnd.visio' },
	visionary: { 
	 	ext: 'vis',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.visionary' },
	vsf: { 
	 	ext: 'vsf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.vsf' },
	wap_wbxml: { 
	 	ext: 'wbxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.wap.wbxml' },
	wap_wmlc: { 
	 	ext: 'wmlc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.wap.wmlc' },
	wap_wmlscriptc: { 
	 	ext: 'wmlsc',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.wap.wmlscriptc' },
	webturbo: { 
	 	ext: 'wtb',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.webturbo' },
	wolfram_player: { 
	 	ext: 'nbp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.wolfram.player' },
	wordperfect: { 
	 	ext: 'WPD',
		signature: [ 255, 87, 80, 67 ],
	 	desc: 'WordPerfect text and graphics',
	 	mime: 'application/vnd.wordperfect' },
	wqd: { 
	 	ext: 'wqd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.wqd' },
	wt_stf: { 
	 	ext: 'stf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.wt.stf' },
	xara: { 
	 	ext: 'xar',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.xara' },
	xfdl: { 
	 	ext: 'xfdl',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.xfdl' },
	yamaha_hv_dic: { 
	 	ext: 'hvd',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.yamaha.hv-dic' },
	yamaha_hv_script: { 
	 	ext: 'hvs',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.yamaha.hv-script' },
	yamaha_hv_voice: { 
	 	ext: 'hvp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.yamaha.hv-voice' },
	yamaha_openscoreformat: { 
	 	ext: 'osf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.yamaha.openscoreformat' },
	yamaha_openscoreformat_osfpvg_xml: { 
	 	ext: 'osfpvg',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.yamaha.openscoreformat.osfpvg+xml' },
	yamaha_smaf_audio: { 
	 	ext: 'saf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.yamaha.smaf-audio' },
	yamaha_smaf_phrase: { 
	 	ext: 'spf',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.yamaha.smaf-phrase' },
	yellowriver_custom_menu: { 
	 	ext: 'cmp',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.yellowriver-custom-menu' },
	zul: { 
	 	ext: ['zir', 'zirz'],
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.zul' },
	zzazz_deck_xml: { 
	 	ext: 'zaz',
		signature: false,
	 	desc: '',
	 	mime: 'application/vnd.zzazz.deck+xml' },
	voicexml_xml: { 
	 	ext: 'vxml',
		signature: false,
	 	desc: '',
	 	mime: 'application/voicexml+xml' },
     widget: { 
	 	ext: 'wgt',
		signature: false,
	 	desc: '',
	 	mime: 'application/widget' },
     winhlp: 
      [ { ext: 'HLP',
	 	  signature: [ 76, 78, 2, 0 ],
	 	  desc: 'Windows help file_3',
	 	  mime: 'application/winhlp' },
	 	{ ext: 'HLP',
	 	  signature: [ 63, 95, 3, 0 ],
	 	  desc: 'Windows Help file_2',
	 	  mime: 'application/winhlp' },
	 	{ ext: 'HLP',
	 	  signature: [ 0, 0, 255, 255, 255, 255 ],
	 	  desc: 'Windows Help file_1',
	 	  mime: 'application/winhlp' } ],
     wsdl_xml: { 
	 	ext: 'wsdl',
		signature: false,
	 	desc: '',
	 	mime: 'application/wsdl+xml' },
     wspolicy_xml: { 
	 	ext: 'wspolicy',
		signature: false,
	 	desc: '',
	 	mime: 'application/wspolicy+xml' },
     x_7z_compressed: { 
	 	ext: '7Z',
		signature: [ 55, 122, 188, 175, 39, 28 ],
	 	desc: '7-Zip compressed file',
	 	mime: 'application/x-7z-compressed' },
     x_abiword: { 
	 	ext: 'abw',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-abiword' },
     x_ace_compressed: { 
	 	ext: 'ace',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-ace-compressed' },
     x_apple_diskimage: 
      [ { ext: 'DMG',
	 	  signature: [ 120 ],
	 	  desc: 'MacOS X image file',
	 	  mime: 'application/x-apple-diskimage' }
	],
     x_authorware_bin: { 
	 	ext: ['aab', 'x32', 'u32', 'vox'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-authorware-bin' },
     x_authorware_map: { 
	 	ext: 'aam',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-authorware-map' },
     x_authorware_seg: { 
	 	ext: 'aas',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-authorware-seg' },
     x_bcpio: { 
	 	ext: 'bcpio',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-bcpio' },
     x_bittorrent: { 
	 	ext: 'torrent',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-bittorrent' },
     x_blorb: { 
	 	ext: ['blb', 'blorb'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-blorb' },
     x_bzip: { 
	 	ext: 'bz',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-bzip' },
     x_bzip2: { 
	 	ext: 'BZ2',
		signature: [ 66, 90, 104 ],
	 	desc: 'bzip2 compressed archive',
	 	mime: 'application/x-bzip2' },
     x_cbr: { 
	 	ext: ['cbr', 'cba', 'cbt', 'cbz', 'cb7'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-cbr' },
     x_cdlink: { 
	 	ext: 'VCD',
		signature: [ 69, 78, 84, 82, 89, 86, 67, 68 ],
	 	desc: 'VideoVCD|VCDImager file',
	 	mime: 'application/x-cdlink' },
     x_cfs_compressed: { 
	 	ext: 'cfs',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-cfs-compressed' },
     x_chat: { 
	 	ext: 'chat',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-chat' },
     x_chess_pgn: { 
	 	ext: 'pgn',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-chess-pgn' },
     x_conference: { 
	 	ext: 'nsc',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-conference' },
     x_cpio: { 
	 	ext: 'cpio',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-cpio' },
	// TODO - CSH can be .csh	text/x-script.csh as well
     x_csh: { 
	 	ext: 'CSH',
		signature: [ 99, 117, 115, 104, 0, 0, 0, 2 ],
	 	desc: 'Photoshop Custom Shape',
	 	mime: 'application/x-csh' },
     x_debian_package: { 
	 	ext: ['deb', 'udeb'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-debian-package' },
     x_dgc_compressed: { 
	 	ext: 'dgc',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-dgc-compressed' },
     x_director: { 
	 	ext: ['dir', 'dcr', 'dxr', 'cst', 'cct', 'cxt', 'w3d', 'fgd', 'swa'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-director' },
     x_doom: { 
	 	ext: 'wad',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-doom' },
     x_dtbncx_xml: { 
	 	ext: 'ncx',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-dtbncx+xml' },
     x_dtbook_xml: { 
	 	ext: 'dtb',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-dtbook+xml' },
     x_dtbresource_xml: { 
	 	ext: 'res',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-dtbresource+xml' },
     x_dvi: { 
	 	ext: 'dvi',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-dvi' },
     x_envoy: { 
	 	ext: 'evy',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-envoy' },
     x_eva: { 
	 	ext: 'eva',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-eva' },
     x_font_bdf: { 
	 	ext: 'bdf',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-font-bdf' },
     x_font_ghostscript: { 
	 	ext: 'gsf',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-font-ghostscript' },
     x_font_linux_psf: { 
	 	ext: 'psf',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-font-linux-psf' },
     x_font_otf: { 
	 	ext: 'otf',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-font-otf' },
     x_font_pcf: { 
	 	ext: 'pcf',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-font-pcf' },
     x_font_snf: { 
	 	ext: 'snf',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-font-snf' },
     x_font_ttf: { 
	 	ext: ['ttf', 'ttc'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-font-ttf' },
     x_font_type1: { 
	 	ext: ['pfa', 'pfb', 'pfm', 'afm'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-font-type1' },
     font_woff: { 
	 	ext: 'woff',
		signature: false,
	 	desc: '',
	 	mime: 'application/font-woff' },
     x_freearc: 
      [ { ext: 'ARC',
	 	  signature: [ 26, 3 ],
	 	  desc: 'LH archive (old vers.|type 2)',
	 	  mime: 'application/x-freearc' },
	 	{ ext: 'ARC',
	 	  signature: [ 26, 2 ],
	 	  desc: 'LH archive (old vers.|type 1)',
	 	  mime: 'application/x-freearc' },
	 	{ ext: 'ARC',
	 	  signature: [ 26, 9 ],
	 	  desc: 'LH archive (old vers.|type 5)',
	 	  mime: 'application/x-freearc' },
	 	{ ext: 'ARC',
	 	  signature: [ 26, 8 ],
	 	  desc: 'LH archive (old vers.|type 4)',
	 	  mime: 'application/x-freearc' },
	 	{ ext: 'ARC',
	 	  signature: [ 65, 114, 67, 1 ],
	 	  desc: 'FreeArc compressed file',
	 	  mime: 'application/x-freearc' },
	 	{ ext: 'ARC',
	 	  signature: [ 26, 4 ],
	 	  desc: 'LH archive (old vers.|type 3)',
	 	  mime: 'application/x-freearc' } ],
     x_futuresplash: { 
	 	ext: 'SPL',
		signature: [ 0, 0, 1, 0 ],
	 	desc: 'Windows icon|printer spool file',
	 	mime: 'application/x-futuresplash' },
     x_gca_compressed: { 
	 	ext: 'gca',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-gca-compressed' },
     x_glulx: { 
	 	ext: 'ulx',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-glulx' },
     x_gnumeric: { 
	 	ext: 'gnumeric',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-gnumeric' },
     x_gramps_xml: { 
	 	ext: 'gramps',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-gramps-xml' },
     x_gtar: { 
	 	ext: 'gtar',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-gtar' },
     x_hdf: { 
	 	ext: 'hdf',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-hdf' },
     x_install_instructions: { 
	 	ext: 'install',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-install-instructions' },
     x_iso9660_image: { 
	 	ext: 'ISO',
		signature: [ 67, 68, 48, 48, 49 ],
	 	desc: 'ISO-9660 CD Disc Image',
	 	mime: 'application/x-iso9660-image' },
     x_java_jnlp_file: { 
	 	ext: 'jnlp',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-java-jnlp-file' },
     x_latex: { 
	 	ext: 'latex',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-latex' },
     x_lzh_compressed: 
      [ { ext: 'LHA',
	 	  signature: [ 45, 108, 104 ],
	 	  desc: 'Compressed archive',
	 	  mime: 'application/x-lzh-compressed' }
		  ],
     x_mie: { 
	 	ext: 'mie',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-mie' },
     x_mobipocket_ebook: 
      [ { ext: 'PRC',
	 	  signature: [ 116, 66, 77, 80, 75, 110, 87, 114 ],
	 	  desc: 'PathWay Map file',
	 	  mime: 'application/x-mobipocket-ebook' },
	 	{ ext: 'PRC',
	 	  signature: [ 66, 79, 79, 75, 77, 79, 66, 73 ],
	 	  desc: 'Palmpilot resource file',
	 	  mime: 'application/x-mobipocket-ebook' } ],
     x_ms_application: { 
	 	ext: 'application',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-ms-application' },
     x_ms_shortcut: { 
	 	ext: 'LNK',
		signature: [ 76, 0, 0, 0, 1, 20, 2, 0 ],
	 	desc: 'Windows shortcut file',
	 	mime: 'application/x-ms-shortcut' },
     x_ms_wmd: { 
	 	ext: 'wmd',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-ms-wmd' },
     x_ms_wmz: { 
	 	ext: 'WMZ',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'Windows Media compressed skin file',
	 	mime: 'application/x-msmetafile' },
     x_ms_xbap: { 
	 	ext: 'xbap',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-ms-xbap' },
     x_msaccess: { 
	 	ext: 'MDB',
		signature: [ 0, 1, 0, 0, 83, 116, 97, 110, 100, 97, 114, 100, 32, 74, 101, 116, 32, 68, 66 ],
	 	desc: 'Microsoft Access',
	 	mime: 'application/x-msaccess' },
     x_msbinder: { 
	 	ext: 'obd',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-msbinder' },
     x_mscardfile: { 
	 	ext: 'crd',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-mscardfile' },
     x_msclip: { 
	 	ext: 'clp',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-msclip' },
     x_msdownload: 
      [ { ext: 'COM',
	 	  signature: [ 232 ],
	 	  desc: 'Windows executable file_1',
	 	  mime: 'application/x-msdownload' },
	 	{ ext: 'COM',
	 	  signature: [ 77, 90 ],
	 	  desc: 'Windows|DOS executable file',
	 	  mime: 'application/x-msdownload' },
	 	{ ext: 'COM',
	 	  signature: [ 235 ],
	 	  desc: 'Windows executable file_3',
	 	  mime: 'application/x-msdownload' },
	 	{ ext: 'COM',
	 	  signature: [ 233 ],
	 	  desc: 'Windows executable file_2',
	 	  mime: 'application/x-msdownload' },
	 	{ ext: 'DLL',
	 	  signature: [ 77, 90 ],
	 	  desc: 'Windows|DOS executable file',
	 	  mime: 'application/x-msdownload' },
	 	{ ext: 'DLL',
	 	  signature: [ 77, 90 ],
	 	  desc: 'Windows|DOS executable file',
	 	  mime: 'application/x-msdownload' },
	 	{ ext: 'MSI',
	 	  signature: [ 35, 32 ],
	 	  desc: 'Cerius2 file',
	 	  mime: 'application/x-msdownload' },
	 	{ ext: 'MSI',
	 	  signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	  desc: 'Microsoft Installer package',
	 	  mime: 'application/x-msdownload' } ],
     x_msmediaview: { 
	 	ext: ['mvb', 'm13', 'm14'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-msmediaview' },
     x_msmetafile: 
      [ { ext: 'WMF',
	 	  signature: [ 215, 205, 198, 154 ],
	 	  desc: 'Windows graphics metafile',
	 	  mime: 'application/x-msmetafile' },
	 	{ ext: 'WMZ',
	 	  signature: [ 80, 75, 3, 4 ],
	 	  desc: 'Windows Media compressed skin file',
	 	  mime: 'application/x-msmetafile' } ],
     x_msmoney: { 
	 	ext: 'MNY',
		signature: [ 0, 1, 0, 0, 77, 83, 73, 83, 65, 77, 32, 68, 97, 116, 97, 98, 97, 115, 101 ],
	 	desc: 'Microsoft Money file',
	 	mime: 'application/x-msmoney' },
     x_mspublisher: { 
	 	ext: 'PUB',
		signature: [ 208, 207, 17, 224, 161, 177, 26, 225 ],
	 	desc: 'MS Publisher file',
	 	mime: 'application/x-mspublisher' },
     x_msschedule: { 
	 	ext: 'scd',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-msschedule' },
     x_msterminal: { 
	 	ext: 'trm',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-msterminal' },
     x_mswrite: 
      [ { ext: 'WRI',
	 	  signature: [ 190, 0, 0, 0, 171 ],
	 	  desc: 'MS Write file_3',
	 	  mime: 'application/x-mswrite' },
	 	{ ext: 'WRI',
	 	  signature: [ 50, 190 ],
	 	  desc: 'MS Write file_2',
	 	  mime: 'application/x-mswrite' },
	 	{ ext: 'WRI',
	 	  signature: [ 49, 190 ],
	 	  desc: 'MS Write file_1',
	 	  mime: 'application/x-mswrite' } ],
     x_netcdf: { 
	 	ext: ['nc', 'cdf'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-netcdf' },
     x_nzb: { 
	 	ext: 'nzb',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-nzb' },
     x_pkcs12: { 
	 	ext: ['p12', 'pfx'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-pkcs12' },
     x_pkcs7_certificates: { 
	 	ext: ['p7b', 'spc'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-pkcs7-certificates' },
     x_pkcs7_certreqresp: { 
	 	ext: 'p7r',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-pkcs7-certreqresp' },
     x_rar_compressed: { 
	 	ext: 'RAR',
		signature: [ 82, 97, 114, 33, 26, 7, 0 ],
	 	desc: 'WinRAR compressed archive',
	 	mime: 'application/x-rar-compressed' },
     x_research_info_systems: { 
	 	ext: 'ris',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-research-info-systems' },
     x_sh: { 
	 	ext: 'sh',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-sh' },
     x_shar: { 
	 	ext: 'shar',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-shar' },
     x_shockwave_flash: 
      [ { ext: 'SWF',
	 	  signature: [ 70, 87, 83 ],
	 	  desc: 'Shockwave Flash player',
	 	  mime: 'application/x-shockwave-flash' },
	 	{ ext: 'SWF',
	 	  signature: [ 67, 87, 83 ],
	 	  desc: 'Shockwave Flash file',
	 	  mime: 'application/x-shockwave-flash' } ],
     x_silverlight_app: { 
	 	ext: 'xap',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-silverlight-app' },
     x_sql: { 
	 	ext: 'sql',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-sql' },
     x_stuffit: 
      [ { ext: 'SIT',
	 	  signature: [ 83, 116, 117, 102, 102, 73, 116, 32 ],
	 	  desc: 'StuffIt compressed archive',
	 	  mime: 'application/x-stuffit' },
	 	{ ext: 'SIT',
	 	  signature: [ 83, 73, 84, 33, 0 ],
	 	  desc: 'StuffIt archive',
	 	  mime: 'application/x-stuffit' } ],
     x_stuffitx: { 
	 	ext: 'sitx',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-stuffitx' },
     x_subrip: { 
	 	ext: 'srt',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-subrip' },
     x_sv4cpio: { 
	 	ext: 'sv4cpio',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-sv4cpio' },
     x_sv4crc: { 
	 	ext: 'sv4crc',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-sv4crc' },
     x_t3vm_image: { 
	 	ext: 't3',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-t3vm-image' },
     x_tads: { 
	 	ext: 'gam',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-tads' },
     x_tar: { 
	 	ext: 'TAR',
		signature: [ 117, 115, 116, 97, 114 ],
	 	desc: 'Tape Archive',
	 	mime: 'application/x-tar' },
     x_tcl: { 
	 	ext: 'tcl',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-tcl' },
     x_tex: { 
	 	ext: 'tex',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-tex' },
     x_tex_tfm: { 
	 	ext: 'tfm',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-tex-tfm' },
     x_texinfo: { 
	 	ext: ['texinfo', 'texi'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-texinfo' },
     x_tgif: 
      [ { ext: 'OBJ',
	 	  signature: [ 128 ],
	 	  desc: 'Relocatable object code',
	 	  mime: 'application/x-tgif' },
	 	{ ext: 'OBJ',
	 	  signature: [ 76, 1 ],
	 	  desc: 'MS COFF relocatable object code',
	 	  mime: 'application/x-tgif' } ],
     x_ustar: { 
	 	ext: 'ustar',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-ustar' },
     x_wais_source: { 
	 	ext: 'src',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-wais-source' },
     x_x509_ca_cert: { 
	 	ext: ['der', 'crt'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-x509-ca-cert' },
     x_xfig: { 
	 	ext: 'fig',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-xfig' },
     x_xliff_xml: { 
	 	ext: 'xlf',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-xliff+xml' },
     x_xpinstall: { 
	 	ext: 'XPI',
		signature: [ 80, 75, 3, 4 ],
	 	desc: 'Mozilla Browser Archive',
	 	mime: 'application/x-xpinstall' },
     x_xz: { 
	 	ext: 'xz',
		signature: false,
	 	desc: '',
	 	mime: 'application/x-xz' },
     x_zmachine: { 
	 	ext: ['z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7', 'z8'],
		signature: false,
	 	desc: '',
	 	mime: 'application/x-zmachine' },
     xaml_xml: { 
	 	ext: 'xaml',
		signature: false,
	 	desc: '',
	 	mime: 'application/xaml+xml' },
     xcap_diff_xml: { 
	 	ext: 'xdf',
		signature: false,
	 	desc: '',
	 	mime: 'application/xcap-diff+xml' },
     xenc_xml: { 
	 	ext: 'xenc',
		signature: false,
	 	desc: '',
	 	mime: 'application/xenc+xml' },
     xhtml_xml: { 
	 	ext: ['xhtml', 'xht'],
		signature: false,
	 	desc: '',
	 	mime: 'application/xhtml+xml' },
     xml: { 
	 	ext: 'XML',
		signature: 
	 	 [ 60,
	 	   63,
	 	   120,
	 	   109,
	 	   108,
	 	   32,
	 	   118,
	 	   101,
	 	   114,
	 	   115,
	 	   105,
	 	   111,
	 	   110,
	 	   61,
	 	   34,
	 	   49,
	 	   46,
	 	   48,
	 	   34,
	 	   63,
	 	   62 ],
	 	desc: 'User Interface Language',
	 	mime: 'application/xml' },
     xml_dtd: 
      [ { ext: 'DTD',
	 	  signature: [ 7, 100, 116, 50, 100, 100, 116, 100 ],
	 	  desc: 'DesignTools 2D Design file',
	 	  mime: 'application/xml-dtd' }
	],
     xop_xml: { 
	 	ext: 'xop',
		signature: false,
	 	desc: '',
	 	mime: 'application/xop+xml' },
     xproc_xml: { 
	 	ext: 'xpl',
		signature: false,
	 	desc: '',
	 	mime: 'application/xproc+xml' },
     xslt_xml: { 
	 	ext: 'xslt',
		signature: false,
	 	desc: '',
	 	mime: 'application/xslt+xml' },
     xspf_xml: { 
	 	ext: 'xspf',
		signature: false,
	 	desc: '',
	 	mime: 'application/xspf+xml' },
     xv_xml: { 
	 	ext: ['mxml', 'xhvml', 'xvml', 'xvm'],
		signature: false,
	 	desc: '',
	 	mime: 'application/xv+xml' },
     yang: { 
	 	ext: 'yang',
		signature: false,
	 	desc: '',
	 	mime: 'application/yang' },
     yin_xml: { 
	 	ext: 'yin',
		signature: false,
	 	desc: '',
	 	mime: 'application/yin+xml' },
     zip: 
      [ { ext: 'ZIP',
	 	  signature: [ 80, 75, 3, 4, 20, 0, 1, 0 ],
	 	  desc: 'ZLock Pro encrypted ZIP',
	 	  mime: 'application/zip' },
	 	{ ext: 'ZIP',
	 	  signature: [ 80, 75, 7, 8 ],
	 	  desc: 'PKZIP archive_3',
	 	  mime: 'application/zip' },
	 	{ ext: 'ZIP',
	 	  signature: [ 80, 75, 5, 6 ],
	 	  desc: 'PKZIP archive_2',
	 	  mime: 'application/zip' },
	 	{ ext: 'ZIP',
	 	  signature: [ 80, 75, 3, 4 ],
	 	  desc: 'PKZIP archive_1',
	 	  mime: 'application/zip' },
	 	{ ext: 'ZIP',
	 	  signature: [ 80, 75, 83, 112, 88 ],
	 	  desc: 'PKSFX self-extracting archive',
	 	  mime: 'application/zip' },
	 	{ ext: 'ZIP',
	 	  signature: [ 80, 75, 76, 73, 84, 69 ],
	 	  desc: 'PKLITE archive',
	 	  mime: 'application/zip' },
	 	{ ext: 'ZIP',
	 	  signature: [ 87, 105, 110, 90, 105, 112 ],
	 	  desc: 'WinZip compressed archive',
	 	  mime: 'application/zip' } 
	] 
};

var res = {};

for (var key in video){
	
	if ( !(video[key] instanceof Array) ) video[key] = [video[key]];
	
	video[key].forEach(function(videokey){
		
		var e = { PUID:[], SP:[], ext:[], signature:[], desc:videokey.desc, mime:videokey.mime };
		e.signature = videokey.signature;
		if (typeof videokey.ext === 'string') e.ext.push(videokey.ext.toUpperCase());
		if (videokey.ext instanceof Array) e.ext = videokey.ext.map(function(str){return str.toUpperCase()});
		
			
		files.forEach(function(f, i){
			var o = require( './filetypes/'.concat(f) ).info;
			var PUID = parseInt( f.replace('.js','') );
			
			if(e.desc==='') e.desc = e.desc.concat( o.FormatName, ', ');
			//console.log( i );
			
			var matchesExt = 0;
			if ('ExternalSignature' in o){
				var es = ((o.ExternalSignature instanceof Array)) ? o.ExternalSignature : [o.ExternalSignature];
				es.forEach(function(s){
					e.ext.forEach(function(e){
						if (s.SignatureType === 'File extension' && s.Signature.toUpperCase() === e){
							matchesExt = 1;
						}
					});
					var extSig = s.Signature.toUpperCase();
					if(matchesExt>0 && e.ext.indexOf(extSig)<0){
						e.ext.push(extSig);
					}
				});
			}
			
			
			if(matchesExt>0){
				if ('InternalSignature' in o){
					var is = ((o.InternalSignature instanceof Array)) ? o.InternalSignature : [o.InternalSignature];
					is.forEach(function(s){
						var sig = { id:PUID, regex:'', signatureOffset:0, desc:s.SignatureName, mime:'' };
						var sb = ((s.ByteSequence instanceof Array)) ? s.ByteSequence : [s.ByteSequence];
						sb.forEach(function(bs){
							if ((bs.Offset != '0' && bs.Offset != '')||(bs.MaxOffset != '0' && bs.MaxOffset != '')){ 
								if( parseInt(bs.Offset)<parseInt(bs.MaxOffset) ){
									sig.signatureOffset = [parseInt(bs.Offset), parseInt(bs.MaxOffset)];
								} else {
									sig.signatureOffset = parseInt(bs.Offset);
								}
							}
							if (bs.PositionType === 'Absolute from BOF'){ 
								sig.regex = bs.ByteSequenceValue.replace('{','.{').replace('*','(.+)');
							}
							
						});
						if(sig.regex != '') e.SP.push(sig);
					});
				}
				e.PUID.push(PUID);
			}
		});
		
		var newKey = key;
		/*
		x_stuffitx: 
   { PUID: [ 399 ],
     SP: 
      [ { id: 399,
          regex: '5374756666497421A136F7DC0AA2A29BDD4215F7DC0AA2A23399',
          signatureOffset: 0,
          desc: 'StuffIt X',
          mime: '' } ],
     ext: [ 'SITX' ],
     signature: false,
     desc: 'Broadcast WAVE, ',
     mime: 'application/x-stuffitx' },
		*/
		
		
		
		if (e.signature instanceof Array) {
			var newKey = '_';
			e.signature.forEach(function(n){
				var hex = n.toString(16).toUpperCase();
				newKey = newKey.concat((n<10) ? '0'.concat(hex) : hex);
			});
		}
		res[newKey] = e;
	});
}
console.log( util.inspect(res, {depth:12}) );
/*

files.forEach(function(f, i){
	var o = require( './filetypes/'.concat(f) ).info;
	res[parseInt( f.replace('.js','') )] = { type: o.FormatTypes, name: o.FormatName };
});
console.log( util.inspect(res, {depth:12}) );
*/
/*
  InternalSignature: 
   { SignatureID: '17',
     SignatureName: 'GIF 1989a',
     SignatureNote: 'header & trailer',
     ByteSequence: 
      [ { ByteSequenceID: '181',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '474946383961' },
        { ByteSequenceID: '182',
          PositionType: 'Absolute from EOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '3B' } ] },
*/