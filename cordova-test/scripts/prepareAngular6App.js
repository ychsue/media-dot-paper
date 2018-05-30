const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function (context) {
    console.log('Build Angular 6 application into "./www" directory.');
    const basePath = context.opts.projectRoot;
    const baseWWW = basePath+'/www';

    console.log(execSync(
        "ng build --output-path cordova-test/www/ --base-href /www/",{
            maxBuffer: 1024*1024,
            cwd: basePath+'/..'
        }).toString('utf8'));
};