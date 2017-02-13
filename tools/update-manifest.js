var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

function checksum(filename) {
    data = fs.readFileSync(filename, 'utf8');
    return crypto.createHash('sha1').update(data).digest('hex');
}

var manifestFile = 'manifest.json';
var rootDir = process.cwd();

var args = process.argv.slice(-2);
args.forEach(function (arg) {
    if (arg.indexOf('.json') > -1) {
        manifestFile = arg;
    } else if (arg.indexOf('update-manifest') < 0) {
        rootDir = arg;
    }
});
manifestFile = path.resolve(manifestFile);
rootDir = path.resolve(rootDir);

var manifest;
try {
    manifest = fs.readFileSync(manifestFile, 'utf8');
    manifest = JSON.parse(manifest);
    if (typeof manifest !== "object") throw new Error('Manifest not an object!');
    if (!manifest.files) throw new Error("Manifest has no files!");
} catch (e) {
    console.error('Invalid ' + path.resolve(manifestFile), e, manifest);
    process.exit(1);
}

var versionChecksum = "";
//TODO  改写这里 , 从www目录迭代生产文件的名称和路径及version
var URLJoin = require('url-join');

var igfiles = {
    ".git": true,
    "manifest.json": true,
    "dev": true,
    ".gitignore": true,
    "chcp.json": true,
    "chcp.manifest": true
};
//igfiles[manifest.] =true;

manifest.files={};
createManifestFile(rootDir, "", igfiles);
function createManifestFile(folder, url, igfiles) {
    var routedir = path.join(folder);
    var files = fs.readdirSync(routedir);
    for (var idx in files) {
        var file = files[idx];
        if (igfiles[file]) {
            continue;
        }
        var key = url != "" ? URLJoin(url, file) : file;
        var stat = fs.statSync(path.join(routedir, file));
        if (stat.isFile()) {
            try {
                var version = checksum(path.resolve(folder, file));
                versionChecksum += version;
                manifest.files[key] = {filename: key, version: version};
            } catch (e) {
                console.error('Could not hash file.', e);
            }
        } else if (stat.isDirectory()) {
            createManifestFile(path.join(folder, file), key, igfiles)
        }

    }
}

/*
 for(var key in manifest.files) {
 try {
 var filename = manifest.files[key].filename;
 var version = checksum(path.resolve(rootDir,filename));
 versionChecksum += version;
 manifest.files[key].version = version;
 } catch(e){
 console.error('Could not hash file.',e);
 }
 }

 */
if (typeof manifest.version === 'number') {
    manifest.version++;
} else {
    manifest.version = crypto.createHash('sha1').update(versionChecksum).digest('hex');
}

try {
    fs.writeFileSync(
        path.resolve(rootDir, manifestFile),
        JSON.stringify(manifest, null, 2)
    );
} catch (e) {
    console.error('Could not write manifest.json', e);
}