const fs = require('fs-extra');
const parseOpf = require('../lib/parseOpf.js');
const coverFromManifest = require('../lib/coverFromManifest.js');

describe('unit tests', () => {
  const opfJs = JSON.parse(
    '{"_declaration":{"_attributes":{"version":"1.0","encoding":"UTF-8","standalone":"yes"}},"package":{"_attributes":{"version":"3.0","xmlns":"http://www.idpf.org/2007/opf","unique-identifier":"bookid","prefix":"rendition: http://www.idpf.org/vocab/rendition/# ibooks: http://vocabulary.itunes.apple.com/rdf/ibooks/vocabulary-extensions-1.0/ rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#"},"metadata":{"_attributes":{"xmlns:dc":"http://purl.org/dc/elements/1.1/"},"meta":[{"_attributes":{"name":"cover","content":"img-cover"}},{"_attributes":{"property":"dcterms:modified"},"_text":"2019-04-19T08:05:26Z"},{"_attributes":{"refines":"#bookid","property":"identifier-type","scheme":"xsd:string"},"_text":"URN"}],"dc:type":{"_text":"education"},"dc:title":{"_attributes":{"id":"title"},"_text":"Textbook"},"dc:date":{"_text":"2018-08-22T01:47:08-04:00"},"dc:language":{"_text":"en-US"},"dc:identifier":{"_attributes":{"id":"bookid"},"_text":"1d01a8b5-cbcd-5756-82d6-8c890ad14fc6"},"dc:creator":{"_text":"Lorem Creator"},"dc:publisher":{"_text":"Publisher"}},"manifest":{"item":[{"_attributes":{"id":"toc","href":"xhtml/toc.xhtml","media-type":"application/xhtml+xml","properties":"nav"}},{"_attributes":{"id":"ncx","href":"toc.ncx","media-type":"application/x-dtbncx+xml"}},{"_attributes":{"id":"img-cover","href":"images/cover.jpg","media-type":"image/jpeg","properties":"cover-image"}},{"_attributes":{"id":"cover","href":"xhtml/cover.xhtml","media-type":"application/xhtml+xml","properties":"svg"}},{"_attributes":{"id":"styles.css","href":"css/styles.css","media-type":"text/css"}},{"_attributes":{"id":"page01_chapter01","href":"xhtml/page01_chapter01.xhtml","media-type":"application/xhtml+xml"}}]},"spine":{"_attributes":{"toc":"ncx"},"itemref":[{"_attributes":{"idref":"cover"}},{"_attributes":{"idref":"page01_chapter01"}}]}}}'
  );
  describe('coverFromManifest', () => {
    /* it returns the href to the cover image when the manifest includes an item with the property `cover-image` */

    test('should return the href to the cover image when the manifest includes an item with the property `cover-image`', () => {
      const expected = 'images/cover.jpg';
      const actual = coverFromManifest(opfJs);
      expect(actual).toEqual(expected);
    });

    /* and the manifest item also has other properties */
    /* and metada includes a meta `cover` tag */
  });

  describe('coverFromMeta', () => {
    /* it returns the path to the cover image when metadata includes a meta `cover` tag but the corresponding manifest item does not contain the property `cover-image` */
    /* it throws an error when there is no item in the manifest with the id specified by the meta `cover` `content` property */
  });
});

describe('fs tests', () => {
  describe('parseOpf', () => {
    const FIXTURE = `${__dirname}/book.epub`;
    beforeEach(() => {
      fs.writeFileSync(FIXTURE, ``);
    });
    afterEach(() => {
      fs.remove(FIXTURE);
    });

    /* it throws an error when the file or directory is not an (unzipped) EPUB */
    test('should throw an error when the file or directory is not an (unzipped) EPUB', async () => {
      let error;
      try {
        await parseOpf(FIXTURE);
      } catch (e) {
        error = e;
      }
      expect(error).toEqual(
        new Error(
          `Could not read META-INF/container.xml. Make sure the EPUB is unzipped.`
        )
      );
    });
  });

  /* TODO: it returns the path to the cover image for zipped EPUBs */
});
