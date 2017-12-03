const packageJson = require('package-json');

/**
 * load package.json from npm registory.
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
  }

  /**
   * load package json.
   * if pkgName was configured, search package.json at npm registry.
   * if pkgName was not configured, throws error
   * @throws {Error} pkgName is required.
   * @returns {Promise} package.json
   */
  load() {
    return new Promise((resolve, reject) => {
      if (!this._pkgName) {
        reject(new Error('pkgName is required'));
      } else {
        this._fetchPackageJson().then((result) => {
          resolve(result);
        });
      }
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