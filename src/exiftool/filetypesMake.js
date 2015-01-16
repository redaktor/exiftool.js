

// TO:)DO 
// remind the empire's national archives that they planned json support several years ago

var http = require('http');
var fs = require('fs');
var util = require('util');
var xml2js = require('xml2js');

var parseXML = new xml2js.Parser({ 
	trim: true,
	normalize: true,
	mergeAttrs: true,
	explicitRoot: false,
	explicitArray: false,
	// PRONOM specific
	// emptyTag: '\r\n      '
}).parseString;

var resArr = new Array();

function replacer(key, value) {
    if (typeof value === 'string') {
        return (value==='\r\n      ') ? '' : String(value).trim();
    }
    return value;
}
function getJSON(i, maxi){
	if (i===0) console.log('Looking for records ...');
	var _max = (typeof maxi === 'number') ? maxi : 0;
	var PRONOM = {
		fmtBase: 'http://www.nationalarchives.gov.uk/PRONOM/fmt/',
		release: 'http://www.nationalarchives.gov.uk/aboutapps/pronom/release-notes.xml'
	};
	var url = (i>0) ? PRONOM.fmtBase.concat(i, '.xml') : PRONOM.release;
	http.get(url, function(res) {
		var bodyarr = [];
		res.on('data', function(chunk){
			bodyarr.push(chunk);
		});
		res.on('end', function(){
			if (i>0) console.log('Got response for', i);
			var xml = bodyarr.join('').toString();
			if (i===0){
				parseXML(xml, getMax);
			} else if (i<=_max) {
				parseXML(xml, function(e,j){ writeFile(e,j,i,_max) });
			}
		});
	}).on('error', function(err) {
		// TODO err
		console.log('Got error: ' + err.message);
		if (i===0) {
			// TODO fail
		} else {
			resArr.push('');
		}
	});
}
function getMax(err, result){
	var maxRecords = 642;
	var res = ('release_note' in result) ? result.release_note[0].release_outline : null;
	if (!err && res instanceof Array === true && res.length>0){
		var index = -1;
		if ('name' in res[0] && res[0].name == 'New Records') {
			index = 0;
		} else {
			res.forEach( function(rc, i){
				if ('name' in rc && rc.name == 'New Records') index = i;
			});
		}
		res[index].format.forEach( function(f){
			var n = parseInt(f.puid._);
			if ( typeof n === 'number' && n > maxRecords ) maxRecords = n;
		});
	} else {
		// TODO err	
	}
	console.log( 'Fetching '.concat(maxRecords, ' file descriptions from PRONOM ...') );
	for (var i = 1; i <= maxRecords; i++) getJSON(i, maxRecords);
}
function writeFile(err, result, i, maxRecords){
	if (!err && typeof result ==='object' && 'report_format_detail' in result){
		var res = JSON.parse(JSON.stringify(result.report_format_detail.FileFormat, replacer));
		
		var extensions = ''
		if ('ExternalSignature' in res){
			var sObj = res.ExternalSignature;
			if (!(sObj instanceof Array)) sObj = [res.ExternalSignature];
			extensions = sObj.map(function(s){ 
				return (typeof s === 'object' && 'Signature' in s) ? s.Signature : ''; 
			}).join(', ');	
		} 
		
		// basically means "do not write deprecated" ...
		if (typeof res === 'object' && ('ExternalSignature' in res || 'InternalSignature' in res)){
			var resStr = 'exports.info = '.concat( util.inspect(res, {depth:12}) );
			fs.writeFile('./filetypes/'.concat( i, '.js'), resStr, function (err) {
				if (err){ 
					console.log('Got error: ' + err.message);
				} else if (i>0){
					console.log('Wrote ./filetypes/'.concat(i, '.js (', extensions, ')'));
					if (i===maxRecords) console.log('READY!');
				}
			});
		} else if (i>0) {
			console.log('!!! Deprecated :', i, '- no signature found');
		}
	}
}

getJSON(0);