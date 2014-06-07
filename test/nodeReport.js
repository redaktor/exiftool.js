/* Note
// differences between exiftool.pm and exiftool.js structure / output are marked by //*(int)
// the 9 "//*(int)" exceptions should basically prevent that "more detailed" results are marked as unsupported ...
*/

(function() {
    "use strict";
    var exif = require('../src/');
    var walk = require('walk'), fs = require('fs'), options, walker;
    var sys = require('sys')
    var exec = require('child_process').exec;
    var child;
    
    // Which report to generate ?
	
    var reference = 'Perl'; 
    // 'JS' = compare JS against Perl - "compliance report"
    // OR 
    // 'Perl' = compare Perl against JS - "coverage report"

    // if perl exiftool is not in PATH, enter absolute path here:
    var perl = 'exiftool';


    var reportType = (reference==='JS') ? 'compliance' : 'coverage';
    var compareWith = (reference==='JS') ? 'Perl' : 'JS';
    var desc = {
	    JS: '<a href="https://github.com/mattburns/exiftool.js">exiftool.js</a>',
	    Perl: '<a href="http://www.sno.phy.queensu.ca/~phil/exiftool/">exiftool reference</a>'
    };
    var reportDesc = '<a href="../">Comparison</a> of outputs from '.concat( desc[reference], ' against ', desc[compareWith]); 

    

    var results = []; // store the responses from js and perl exiftools

    var currentRoot = ''; // aka, current directory

    var reportFiles = []; // list of each of the report filenames
    var totalFiles = 0; // count of all jpeg files
    var totalSupportedTags = 0; // count of all tag values that were identical
    var totalUnsupportedTags = 0; // count of all tag values that were not identical
    var supportedByModel = {};
    var unsupportedByModel = {};

    /**
     * Write a summary html file (reports/{{compliance/coverage}}/index.html) which summarises the exiftool support and links to the other html files
     */
    var writeSummary = function() {
		var percentT = totalSupportedTags / (totalSupportedTags+totalUnsupportedTags) *100;
           
        var html = '<p>'.concat( 
						'<span class="label label-success large">', percentT.toFixed(2), '% total ', reportType, ' &mdash; sort by ',
						'<select class="sort-options">',
							'<option value="">default</option>', 
							'<option value="coverageDesc">', reportType, ' descending</option>', 
							'<option value="coverage">', reportType, ' ascending</option>', 
							'<option value="title">title alphabetically</option>', 
						'</select> ',
						'</span>',
					'</p>', 
					'<p>', 
						totalFiles, ' total files: <br>', 
						totalSupportedTags, ' supported tags, ', 
						totalUnsupportedTags, ' unsupported tags',
					'</p>',
		'<ul id="grid" class="row-fluid">');
        
        for (var key in reportFiles) {
			var percent = supportedByModel[reportFiles[key]] / (supportedByModel[reportFiles[key]]+unsupportedByModel[reportFiles[key]]) *100;
			var percStr = (percent===100) ? percent.toFixed(1) : percent.toFixed(2);
			var percLab = (percent===100) ? 'success' : 'warning';
            html = html.concat(
				'<li class="span12" data-coverage="', percent,'" data-title="', reportFiles[key].split('.')[0], '">',
					'<b class="label label-', percLab, '">', percStr, '%</b> &nbsp;',
					'<a href="', reportFiles[key], '">', reportFiles[key], '</a>\n', 
					'Supported: ', supportedByModel[reportFiles[key]], ', Unsupported: ', unsupportedByModel[reportFiles[key]], 
				'</li>\n'
			);
        }
		
        html = html.concat('</ul>');

        fs.readFile('reports/template.html', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var result = data.replace(/{{type}}/g, reportType).replace(/{{desc}}/g, reportDesc).replace(/{{htmlbody}}/g, html);

            var reportFile = 'reports/'.concat(reportType, '/index.html');
            fs.writeFile(reportFile, result, 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log(reportFile, ' written\n');
                }
            });
        });
    }

    /**
     * Stash the json for the current directory (manufacturer) into a json file.
     * This also then generated the html report for that manufacturer by using that json file.
     */
    var stashJson = function(json) {
        if (results.length > 0) {
            var pathString = currentRoot.replace(/\//g, '-');
            var jsonFile = 'results/'.concat(pathString, '.json');
            fs.writeFile(jsonFile, JSON.stringify(results, null, '\t'),
                    function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('\n', jsonFile, ' written');
                        }
                        results = [];
                    });

            var supportedTags = '';
            var html = '<table class="table table-bordered">'.concat(
                        '<thead><tr>',
                        '<th>image</th>',
                        '<th class="supported">supported tags</th>',
                        '<th class="unsupported">unsupported tags (perl output, followed by js output)</th>',
                        '</tr></thead>\n<tbody>\n'
			);

            var totalSupportedByThisModel = 0;
            var totalUnsupportedByThisModel = 0;
            
            for (var i = 0; i < results.length; i++) {

                totalFiles++;
                var supportedTags = [];
                var unsupportedTags = [];
				var _reference = 'exif'.concat(reference);
                for ( var key in results[i][_reference]) {
					var jsRes = results[i].exifJS[key];
					var perlRes = results[i].exifPerl[key];
                    
					// we always use EXIF spec. as keys ...
					if (perlRes == 'ExifImageWidth') jsRes = results[i].exifJS['PixelXDimension'];
					if (perlRes == 'ExifImageHeight') jsRes = results[i].exifJS['PixelYDimension'];
					if (jsRes == 'PixelXDimension') perlRes = results[i].exifPerl['ExifImageWidth'];
					if (jsRes == 'PixelYDimension') perlRes = results[i].exifPerl['ExifImageHeight'];
					
					if ( jsRes == perlRes
					
						//*(1) js might be a more detailed string (usually perlNumber+units) - if more detailed = OK
						|| (typeof jsRes === 'string' && typeof perlRes === 'number' && jsRes.indexOf(perlRes.toString())>-1)
						//*(2) js might be an extended string (usually (+/-)perlString+units) - if more detailed = OK
						|| (typeof jsRes === 'string' && typeof perlRes === 'string' && jsRes.indexOf(perlRes)>-1)
						//*(3) sometimes perlStrings are simply not trimmed - if so = OK
						|| (typeof jsRes === 'string' && typeof perlRes === 'string' && jsRes === perlRes.trim())
						//*(4) Flash is a more "consistent" string in js (3 seperated by comma [OnOff,FiredStatus,Modes]) ...
						|| (key=='Flash' && typeof jsRes === 'string' && typeof perlRes === 'string' && jsRes.toLowerCase().indexOf(perlRes.toLowerCase().split(',')[0])>-1)
						//*(5) for GPS tags we use the ° sign instead of degrees and 4decimal seconds, not 2 and 
						//     btw we return the decimal degrees in _val for maps ... - I assume that is OK
						|| (key.indexOf('GPS')===0 && typeof jsRes === 'string' && jsRes.replace('°', ' deg').replace(/[0-9][0-9]\"/g,'"') == perlRes )
						//*(6) js returns more semantic versions - that's OK
						|| (key.indexOf('Version')>-1 && (parseFloat(perlRes)/100 === parseFloat(jsRes)))
						//*(7) js might return more values - more values are OK
						|| (reference === 'JS' && typeof perlRes === 'undefined')
						
						//*(8) sometimes we might not discover the word Unknown before the value - minor FIXME or OK ???
						|| (typeof perlRes === 'string' && perlRes.indexOf('Unknown')>-1 && perlRes.indexOf(jsRes)>-1)
						//*(9) TODO - we had an issue with edited user comments - 
						// we CURRENTLY keep the pointer when perl user comment might be empty - minor FIXME
						|| (key === 'UserComment' && perlRes === '' && typeof jsRes === 'number')
						//*(10) TODO - we do not have versioning yet 
						|| (reference === 'Perl' && key === 'ExifToolVersion')
						// FileSize is more detailed (b, kb, mb but as precise decimals) and OK  
						|| key === 'FileSize' 
						
					) {
                        supportedTags.push(key + " : " + jsRes);
                        totalSupportedTags++;
                        totalSupportedByThisModel++;
                    } else {
                        unsupportedTags.push(key + " : " + perlRes + "<br>\n" + key + " : " + jsRes + "<br>\n");
                        totalUnsupportedTags++;
                        totalUnsupportedByThisModel++;
                    }
                }
                var rowHtml = '<tr>\n'.concat(
                	'<td>', results[i].img, '</td>\n',
                	'<td class="supported">', supportedTags.join('<br>\n'), '</td>\n',
                	'<td class="unsupported">', unsupportedTags.join('<br>\n'), '</td>\n',
                	'</tr>\n'
				);

                html = html.concat(rowHtml);
            }
            html = html.concat('</tbody></table>');
            

            fs.readFile('reports/template.html', 'utf8', function(err, data) {
                if (err) {
                    return console.log(err);
                }
                var result = data.replace(/{{type}}/g, reportType).replace(/{{desc}}/g, reportDesc).replace(/{{htmlbody}}/g, html);

                var reportFile = 'reports/'.concat(reportType, '/', pathString, '.html');
                fs.writeFile(reportFile, result, 'utf8', function(err) {
                    if (err) {
                        return console.log(err);
                    } else {
                        console.log(reportFile, " written\n");
                        reportFiles.push(pathString.concat('.html'));
                        supportedByModel[pathString.concat('.html')] = totalSupportedByThisModel;
                        unsupportedByModel[pathString.concat('.html')] = totalUnsupportedByThisModel;
                        writeSummary();
                    }
                });
            });
        }
    }

    options = {
        followLinks : false
    };

    walker = walk.walk("sampleImages", options);

    walker.on("names", function(root, nodeNamesArray) {
        if (root != currentRoot) {
            stashJson(results);
        }
        currentRoot = root;

        nodeNamesArray.sort(function(a, b) {
            if (a < b)
                return 1;
            if (a > b)
                return -1;
            return 0;
        });
    });

    walker.on("directories", function(root, dirStatsArray, next) {
        next();
    });

    walker.on("file", function(root, fileStats, next) {
        var imgFile = root + '/' + fileStats.name;
        sys.print(imgFile + '\n');

        exif.getExif(imgFile, function(metaJS) {
            child = exec(perl.concat(" -q -q -F -j --FileAccessDate --FileModifyDate --FileInodeChangeDate '", imgFile, "'"), function(error,
                    stdout, stderr) {
                if (error !== null) {
                    console.log('exec error with ' + imgFile + ': ' + error);
                } else {

                    // stdout string takes some munging...
                    var metaPerl = String(stdout);
                    metaPerl = metaPerl.replace(/\r?\n|\r/g, ""); // lose newlines
                    metaPerl = metaPerl.substring(1, metaPerl.length - 1); // lose surrounding []
							
					//*(0) structure : our js returns all values in their buckets, make it one barrel [flatten objects] ...
					// TODO - "flat" should go to exiftool as exposable method (either in options or as chainable function)
					var r = new Object();
					var flat = function(obj) {
						for (var i in obj) {
							if (!obj.hasOwnProperty(i)) continue;
							
							if (typeof obj[i] === 'object' && !(obj[i] instanceof Array)) {
								if ('value' in obj[i]) {
									if( !(i in r) || 'priority' in obj[i] || r[i] === 'n/a' ){ 
										r[i] = obj[i].value;
									}
								} else {
									var flatObject = flat(obj[i]);
									for (var x in flatObject) {
										if (!flatObject.hasOwnProperty(x)) continue;
										if( !(x in r) || (typeof flatObject[x] === 'object' && 'priority' in flatObject[x]) || r[i] === 'n/a' ){ 
											r[x] = (typeof flatObject[x] === 'object' && 'value' in flatObject[x]) ? flatObject[x].value : flatObject[x];
										}
									}
								}
							} else {
								if( !(i in r) || r[i] === 'n/a' ) r[i] = obj[i];
							}
						}
						return r;
					};

                    results.push({
                        "img" : imgFile,
                        "exifJS" : flat(metaJS),
                        "exifPerl" : JSON.parse(metaPerl)
                    });
                }
                next();
            });

        });
    });
    walker.on("end", function() {
        stashJson();
    });
}());
