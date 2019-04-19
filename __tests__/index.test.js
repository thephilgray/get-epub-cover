/**
 *
 * unit tests - requires only the data from content.opf
 *
 */

/* it returns the path to the cover image when the manifest includes an item with the property `cover-image` */

/* and the manifest item also has other properties */

/* and metada includes a meta `cover` tag */

/* it returns the path to the cover image when metadata includes a meta `cover` tag but the corresponding manifest item does not contain the property `cover-image` */

/* it throws an error when there is no item in the manifest with the id specified by the meta `cover` `content` property */

/**
 *
 * e2e tests - requires full EPUB fixtures
 *
 */

/* it throws an error when the file or directory is not an EPUB */

/* TODO: it returns the path to the cover image for zipped EPUBs */
