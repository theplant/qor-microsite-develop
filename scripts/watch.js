var watchPath = require('../microsite.config').WatchPath;
var chokidar = require('chokidar');
var chalk = require('chalk');
var s3 = require('./s3');
var isHtmlOnly = process.argv[2];
var newWatchPath = isHtmlOnly ? `${watchPath}/*.html` : watchPath;

function getBucketPath(path){
    var srcFolder = watchPath.match(/\/\w+$/)[0].substr(1);
    var getFolderRe = new RegExp(srcFolder + '\/\\w+\\/');
    var folder = getFolderRe.exec(path);
    
    if (folder){
        return folder[0].split('/')[1];
    } else {
        return undefined;
    }
    
}

var watcher = chokidar.watch(newWatchPath, {
    ignored: /[\/\\]\./,
    persistent: true,
    depth: 2
});

console.log(chalk.green('Start watching on ' + newWatchPath));
console.log();

watcher
    .on('change', path => {
        console.log('File:  ' + chalk.green(path) + ' has been changed, uploading to S3 now: ');
        console.log();
        s3.uploadFile(path, getBucketPath(path));
    })
    .on('add', path => {
        console.log('File:  ' + chalk.green(path) + ' has been added, uploading to S3 now: ');
        console.log();
        s3.uploadFile(path, getBucketPath(path));
    })
    .on('error', error => console.log(`Watcher error: ${error}`))
    .on('addDir', path => console.log(`Directory ${path} has been added`));






