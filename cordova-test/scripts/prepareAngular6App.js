// const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function(context) {
    console.log('Build Angular 6 application into "./www" directory.');
    const basePath = context.opts.projectRoot;
    // const baseWWW = basePath + '/www';

    console.log(execSync(
        "ng build --prod --output-path cordova-test/www/ --base-href ./   && sed -i'' -e \"s/.*EntryOfCordovaJS.*/  <script src='cordova.js'><\\/script> /\" cordova-test/www/index.html", {
            maxBuffer: 1024 * 1024,
            cwd: basePath + '/..'
        }).toString('utf8'));
};