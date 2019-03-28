#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));

const terminalImage = require('terminal-image'); // just for fun
const { red, green, blue } = require('chalk'); // just for fun

const getEpubCover = require('./index.js');

const epubDir = argv._[0] || '';

/* as a callback */

// getEpubCover(epubDir, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

/* as a promise */

getEpubCover(epubDir)
  .then(async data => {
    console.log(await terminalImage.file(data));
    console.log(green(`EPUB COVER LOCATION: ${blue.underline(data)}`));
  })
  .catch(err => {
    console.log(red(err));
  });
