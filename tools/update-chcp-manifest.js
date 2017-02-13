var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

function checksum(filename) {
    data = fs.readFileSync(filename, 'utf8');
    return crypto.createHash('sha1').update(data).digest('hex');
}

var manifestFile = 'www/chcp.manifest';
var rootDir = process.cwd()+"/www/";

manifestFile = path.resolve(manifestFile);
rootDir = path.resolve(rootDir);

var manifest = [];

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
console.log(JSON.stringify(igfiles));

createManifestFile(rootDir, "", igfiles);
function createManifestFile(folder, url, igfiles) {
    console.log(folder, url);
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
                //console.log({file: key, hash: version});
                manifest.push({file: key, hash: version});
            } catch (e) {
                console.error('Could not hash file.', e);
            }
        } else if (stat.isDirectory()) {
            createManifestFile(path.join(folder, file), key, igfiles)
        }

    }
}
try {
    fs.writeFileSync(
        path.resolve(rootDir, manifestFile),
        JSON.stringify(manifest, null, 2)
    );
} catch (e) {
    console.error('Could not write manifest.json', e);
}