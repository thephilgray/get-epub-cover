# get-epub-cover

A Node app to find and return the absolute path to the cover image of an unzipped EPUB.

## Installation

- As a local package

```bash
npm i get-epub-cover
```

- As a CLI (Command Line Interface) Application

```bash
npm i -g get-epub-cover
```

## Usage

> NOTE: EPUB project should be an unzipped directory

- Require it
- Call it with the path to the unzipped EPUB directory as the first argument.
- Expect a promise; or, pass a callback as the second argument.

```js
const getEpubCover = require('get-epub-cover');

const epubDir = './epub-project-directory';

/* expect a promise */

getEpubCover(epubDir)
  .then(data => {
    console.log(`EPUB COVER LOCATION: ${data}`);
  })
  .catch(err => {
    console.log(err);
  });

/* or, pass a callback */

getEpubCover(epubDir, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

### CLI

- Install it globally
- `CD` into the path of the EPUB directory and then enter `get-epub-cover` without an argument

```bash
cd epub-project-directory
get-epub-cover
```

- Or, enter `get-epub-cover` followed by the absolute path (relative to the current working directory) to the EPUB directory as the first argument

```bash
get-epub-cover epub-project-directory
```

- The EPUB cover will be displayed in the terminal (for terminals that support colors) followed by an absolute path to the cover image.
- Otherwise, an error will be logged
