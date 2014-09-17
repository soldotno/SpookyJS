var path = require("path");
var fs = require('fs');

function CasperExecuter() {
}

CasperExecuter.prototype.findCasperInNodeModules = function () {
    var currentDir = __dirname;
    casperjsExec = currentDir + "/../../node_modules/.bin/casperjs";
    if (fs.existsSync(casperjsExec)) {
        return casperjsExec;
    }
    return false;
};


CasperExecuter.prototype.findCasperInPath = function (command) {
    var PATH = process.env.PATH.split(path.delimiter);
    var found = false;
    PATH.forEach(function (dir) {
        if (found) {
            return true;
        }
        var file = path.join(dir, command);
        if (fs.existsSync(file)) {
            found = true;
        }
    });
    return found;
};

CasperExecuter.prototype.getExecutor = function () {
    if (casperExecuter.findCasperInPath('casperjs'))
        return 'casperjs';
    else {
        casperjsNodeExec = casperExecuter.findCasperInNodeModules();
        if (casperjsNodeExec) {
            return casperjsNodeExec;
        } else {
            return 'casperjs'
        }
    }
};

// This implementation only uses casperjs from the node_modules when it can't
// find casperjs on the path and it can find it in the node_modules/.bin/ directory
// if it can't find it there it just fallback to the path even though it know it's not there, could be optimized
casperExecuter = new CasperExecuter();
module.exports = casperExecuter.getExecutor();