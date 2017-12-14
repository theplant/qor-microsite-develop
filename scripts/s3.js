// Upload files to S3

var paths = require('../config/paths');
var fs = require('fs-extra');
var s3info = require('../microsite.config').S3;
var AWS = require('aws-sdk');
var path = require('path');
var mime = require('mime');
var chalk = require('chalk');
const BUCKET_NAME = '/' + s3info.bucketName + s3info.prefix;
const buildPath = paths.appBuild + '/';

AWS.config.update({
    accessKeyId: s3info.accessKeyId,
    secretAccessKey: s3info.secretAccessKey,
    region: s3info.region
});

var s3 = new AWS.S3({apiVersion: '2006-03-01'});

function syncBuildToS3() {
    // upload build folder files.
    uploadFolder();

    fs.readdir(buildPath, function(err, items) {
        if (err) {
            console.log(err);
        }

        // upload build subfolder files.
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

    fileList.forEach(entry => {
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
        if (fileInfo.isFile()) {
            fileList.push(filesFound[i]);
        }
    }

    return fileList;
}

function uploadFile(file, folderName) {
    var fileStream = fs.createReadStream(file);
    var fileName = path.basename(file);
    var metaData = mime.getType(fileName);
    var bucketName = BUCKET_NAME;

    if (folderName) {
        bucketName = BUCKET_NAME + '/' + folderName;
    }

    s3.upload(
        {
            ACL: 'public-read',
            Bucket: bucketName,
            Key: fileName,
            Body: fileStream,
            ContentType: metaData
        },
        function(error, response) {
            if (error) {
                console.log('Error', error);
            }
            if (response) {
                console.log('>>>>>>>> File: ' + chalk.green(file) + ' upload success');
            }
        }
    );
}

module.exports = {
    uploadFolder: uploadFolder,
    uploadFile: uploadFile,
    syncBuildToS3: syncBuildToS3
};
