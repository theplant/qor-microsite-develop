// Upload files to S3

var paths = require('../config/paths');
var fs = require('fs-extra');
var microsite = require('../microsite.config');
var AWS = require('aws-sdk');
var path = require('path');
var mime = require('mime');
var chalk = require('chalk');
const BUCKET_NAME = '/' + microsite.S3.bucketName + microsite.S3.prefix;
const buildPath = paths.appBuild + '/';

AWS.config.update({
    accessKeyId: microsite.S3.accessKeyId,
    secretAccessKey: microsite.S3.secretAccessKey,
    region: microsite.S3.region
});

var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

function syncBuildToS3() {

    uploadFolder();

    fs.readdir(buildPath, function(err, items) {
        if (err) {
            console.log(err);
        }

        for (var i = 0; i < items.length; i++) {
            fileInfo = fs.lstatSync(buildPath + items[i]);
            if (fileInfo.isDirectory()) {
                uploadFolder(items[i]);
            }

        }
    });
}

function uploadFolder(folderName) {
    var filePath;
    var fileList;

    if (folderName) {
        filePath = buildPath + folderName + '/';
        // console.log('>>>>>>>> uploading ' + folderName + ' directory files:');
    } else {
        filePath = buildPath;
    }

    fileList = getFileList(filePath);

    fileList.forEach(function(entry) {
        // console.log('>>>>>>>>>>>>>>>> Uploading: ' + filePath + entry);
        uploadFile(filePath + entry, folderName);
    });
}

function getFileList(path) {
    var i, fileInfo, filesFound;
    var fileList = [];

    filesFound = fs.readdirSync(path);
    for (i = 0; i < filesFound.length; i++) {
        fileInfo = fs.lstatSync(path + filesFound[i]);
        if (fileInfo.isFile()) fileList.push(filesFound[i]);
    }

    return fileList;
}


function uploadFile(file, folderName) {
    var fileStream = fs.createReadStream(file);
    var fileName = path.basename(file);
    var metaData = mime.lookup(fileName);
    var bucketName = BUCKET_NAME;

    if (folderName) {
        bucketName = BUCKET_NAME + '/' + folderName;
    }

    s3.upload({
        ACL: 'public-read',
        Bucket: bucketName,
        Key: fileName,
        Body: fileStream,
        ContentType: metaData
    }, function(error, response) {
        if (error) {
            console.log("Error", error);
        }
        if (response) {
            console.log('>>>>>>>> File: ' + chalk.green(file) + ' upload success');
        }
    });
}

module.exports = {
    uploadFolder: uploadFolder,
    uploadFile: uploadFile,
    syncBuildToS3: syncBuildToS3
}