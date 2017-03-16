# QOR Microsite develop workflow

## Create microsite step: 
1. login to admin, open /admin/micro_sites
2. add new microsite
3. click `develop` button
4. start developing

## Dependencies
[nodejs](https://nodejs.org/en/)

You’ll need to have Node >= 4 on your machine.
We strongly recommend to use Node >= 6 and npm >= 3 for faster installation speed and better disk usage

## How to develop microsite
- Download Microsite develop environment ZIP file.
- Unzip file, go to `microsite-develop` directory.
- Create a folder(e.g. named `src`) or move your microsite project folder into `microsite-develop` directory.
- Install required Node.js modules

```$ npm install```

- Copy your all microsite assets files into `microsite-develop/src` directory.
- Open `microsite.config.js` file to modify microsite config

  - `S3` config.

  - `WatchPath` property to your real work path(`/Users/yourname/project/microsite-develop/src`).

  - `Webpack` config,(If you don't need webpack tool to bundle your assets. just ignore this config).

  - `PreviewUrl` check admin microsite preview url, copy to here.


### For don't need compile assets project
1. Open terminal
2. Go to the project directory
```$ cd microsite-develop```
3. Run script
```$ npm run watch```

sever will watch directory which defined in `microsite.config.js ` file `WatchPath` property. if file changed or added, will upload to S3 immediately.
4. Start developing

### For need compile assets project
1. Open `microsite.config.js` file to modify `Webpack` property
 - `appHtml` your main HTML path, default is `src/index.html` 
 - `appIndexJs` your main JS path, default is `src/index.js`, please import other JS and CSS into this file.
 - `appBuild` folder name. after you run `npm run release`, all bundled assets will store in this folder. default is `build`.
 - `appSrc` same as `WatchPath`, but just need folder name. default is `src`.
2. Open terminal
3. Go to the project directory
```$ cd microsite-develop```
4. Run script
```$ npm run dev```
5. Start developing


