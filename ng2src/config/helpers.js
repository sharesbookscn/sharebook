/**
 * @author: @AngularClass
 */
var path = require('path');

// Helper functions
var ROOT = path.resolve(__dirname, '../../');
function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}
function replaceRequire (content,path){
    //把require替换成为文件内容
    const reg = /require\d*\(\d*[\'\"`](.*)[\'\"`]\d*\)/i;
    let str = content.toString("utf8");
    var matchs = str.match(reg);
    path = path.replace(/\\/g,'/');
    const folder = path.substr(0,path.lastIndexOf("/")+1);
    while(matchs){
        const filename = folder+matchs[1];
        fs = require('fs');
        let data = fs.readFileSync(filename, {encoding :"utf8"});
        data = data.replace(/`/g,'&#96;');
        str = str.replace(reg,'`'+data+'`');
        matchs = str.match(reg);
    }
    return str;
}

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.replaceRequire = replaceRequire;
