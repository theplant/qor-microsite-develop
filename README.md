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
- Download [Microsite develop environment](https://github.com/theplant/qor-microsite-develop/archive/v1.0-beta.zip) ZIP file.
- Unzip file, go to `microsite-develop` directory.
- Create a folder(e.g. named `src`) or move your microsite project folder into `microsite-develop` directory(:bulb: **Tip:** All below setups assume your microsite assets folder name is `src`, you should change it if you rename the assets folder).
- Install required Node.js modules

```$ npm install```


- Open `microsite.config.js` file to modify microsite config

  - `S3`: AWS S3 config.
  - `WatchPath`: your microsite assets path(`/Users/yourname/microsite-develop/src`).
  - `Webpack`: If you don't need webpack tool to bundle your assets. just ignore this config.
  - `PreviewUrl`: check admin microsite preview url, replace with your microsite preview url.


### For don't need compile assets project
1. Go to the project directory

```$ cd microsite-develop```

2. Run script

```$ npm run watch```

sever will watch directory which defined in `microsite.config.js ` file `WatchPath` property. if file changed or added, will upload to S3 immediately.

3. Start developing

### For need compile assets project
1. Open `microsite.config.js` file to modify `Webpack` config
   - `appHtml` your main HTML path, default is `src/index.html` 
   - `appIndexJs` your main JS path, default is `src/index.js`, please import other JS and CSS into this file.
   - `appBuild` folder name. after you run `npm run release`, all bundled assets will store in this folder. default is `build`.
   - `appSrc` same as `WatchPath`, but just need folder name. default is `src`.

2. Go to the project directory

```$ cd microsite-develop```

3. Run script

```$ npm run dev```

4. Start developing


