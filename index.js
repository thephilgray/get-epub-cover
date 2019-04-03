const path = require('path');
const fs = require('fs-extra');
const { xml2js } = require('xml-js');

/* export a function that returns an error or a string with the path to the cover */
module.exports = (pathToEpub, cb) =>
  new Promise(async (resolve, reject) => {
    /*= ============================================
=            handleError            =
============================================= */
    /* establish an error handler for if anything goes wrong */

    function handleError(message) {
      const err = new Error(message);
      /* if there's a callback, call it with the err obj and data as null */
      if (cb) {
        return cb(err, null);
      }

      /* reject the promise with the error object */
      return reject(err);
    }

    /*= ====  End of handleError  ====== */

    /*= ============================================
    =            resolve            =
    ============================================= */

    /* try to find META-INF/container.xml */

    let containerXml;
    let relativeOpfPath;
    let opfXml;
    let cover;

    try {
      containerXml = await fs.readFile(
        path.resolve(pathToEpub, `META-INF/container.xml`),
        'utf8'
      );
    } catch (e) {
      return handleError(
        `Could not read META-INF/container.xml. Make sure the EPUB is unzipped.`
      );
    }

    /* try to get the path to opf */
    const containerJs = xml2js(containerXml, { compact: true });

    try {
      relativeOpfPath =
        containerJs.container.rootfiles.rootfile._attributes['full-path'];
    } catch (e) {
      return handleError(
        `Could not get the path to the rootfile from META-INF/container.xml.`
      );
    }

    const opfPath = path.resolve(pathToEpub, relativeOpfPath);

    /* try to read the opf */

    try {
      opfXml = await fs.readFile(opfPath, 'utf8').catch(handleError);
    } catch (e) {
      return handleError(`Could not find the rootfile at ${pathToEpub}.`);
    }

    /* try to parse the xml  */

    const opfJs = xml2js(opfXml, { compact: true });

    /* try to find the item with the id cover-image and get its href value */

    /* check the manifest for item with property 'cover-image'; fallback to checking the meta tag with name 'cover' */

    const {
      package: {
        manifest,
        metadata: { meta },
      },
    } = opfJs;

    const [manifestCoverItem] = manifest.item.filter(
      item => item._attributes.properties === 'cover-image'
    );
    const [metaDataCoverReference] = meta.filter(
      item => item._attributes.name === 'cover'
    );

    if (manifestCoverItem) {
      cover = manifestCoverItem._attributes.href;
    } else if (!manifestCoverItem && metaDataCoverReference) {
      const coverId = metaDataCoverReference.content;
      const [metaCoverItem] = manifest.item.filter(
        item => item._attributes.id === coverId
      );
      if (!metaCoverItem)
        return handleError(
          'No cover image specified in package metadata or package manifest item properties.'
        );
      cover = metaCoverItem._attributes.href;
    } else {
      return handleError(
        'No cover image specified in package metadata or package manifest item properties.'
      );
    }

    /* create an absolute path from the relative coverImage path and the opf parent directory path */
    const coverImagePath = path.resolve(path.dirname(opfPath), cover);

    /* if there's a callback, call it passing null for the err and the absolute path to the coverImage as the value for data */
    if (cb) {
      return cb(null, coverImagePath);
    }

    /* resolve the promise with the absolute path to the coverImage */
    return resolve(coverImagePath);
  });

/*= ====  End of resolve  ====== */
