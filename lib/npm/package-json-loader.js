const readPkg = require('read-pkg');
const packageJson = require('package-json');

/**
 * load package.json from local file system, or npm registory.
 */
class PackageJsonLoader {
  /**
   * initialize PackageJsonLoader.
   * @param {String} pkgName
   * @param {String} version
   */
  constructor(pkgName, version) {
    this._pkgName = pkgName;
    this._version = version;
    this._packageJson = packageJson;
    this._readPkg = readPkg;
  }

  /**
   * load package json.
   * if pkgName was configured, search package.json at npm registry.
   * if pkgName was not configured, search package.json at current working directory.
   * @returns {Promise} package.json
   */
  load() {
    return this._pkgName
        ? this._fetchPackageJson()
        : this._readPackageJson();
  }

  /**
   * read package json from current working directory.
   * @return {Object} package.json
   */
  _readPackageJson() {
    return new Promise((resolve, reject) => {
      this._readPkg().then(resolve).catch(reject);
    })
  }

  /**
   * fetch package json from npm registry.
   * @param {String} pkgName
   * @returns {Promise} package.json
   */
  _fetchPackageJson() {
    const LATEST = 'latest';
    return this._packageJson(this._pkgName, {
      version : this._version ? this._version : LATEST,
      fullMetadata: true
    });
  }
}

module.exports = PackageJsonLoader;