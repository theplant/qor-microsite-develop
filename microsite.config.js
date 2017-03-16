module.exports = {
    // you can find S3 
    S3: {
        accessKeyId: '', // S3 accessKeyId
        secretAccessKey: '', // S3 secretAccessKey
        region: "", // S3 region
        bucketName: '', //S3 bucket name
        prefix: '' //S3 working path
    },
    WatchPath: '/path to project/microsite-develop/src', //Your microsite source file path
    Webpack: {
        appHtml: 'src/index.html', // Main html file
        appIndexJs: 'src/index.js', // Main Javascript file
        appBuild: 'build', // Build directory name, after you run `npm run build`, all files will fill into this directory
        appSrc: 'src' // Source files path
    },
    PreviewUrl: 'https://dev.demo.getqor.com/admin/micro_sites/3,Default/!develop/', // microsite preview URL
};