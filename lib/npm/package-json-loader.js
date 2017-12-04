const packageJson = require('package-json');
const unpkgJson = require('unpkg-json');

/**
 * load package.json from npm registory.
 */
class PackageJsonLoader {
  /**
   * initialize PackageJsonLoader.
   * @param {String} pkgName : package name
   * @param {String} version : package version
   * @param {Boolean} unpkg : use unpkg.com for registry
   */
  constructor(pkgName, version, unpkg=false) {
    this._pkgName = pkgName;
    this._version = version;
    this._unpkg = unpkg;
    this._packageJson = packageJson;
    this._unpkgJson = unpkgJson;
  }

  /**
   * load package json.
   * if pkgName was configured, search package.json at npm registry.
   * if pkgName was not configured, throws error
   * @returns {Promise} resolve with package.json
   */
  load() {
    return new Promise((resolve, reject) => {
      if (!this._pkgName) {
        reject(new Error('pkgName is required'));
      } else {
        this._fetchPackageJson()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
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
    let name = this._pkgName;

    if (!this._unpkg) {
      return this._packageJson(name, {
        version: this._version || 'latest',
        fullMetadata: true
      })
    } else {
      if (this._version) {
        name = `${this._pkgName}@${this._version}`
      }
      return this._unpkgJson(name);
    }
  }
}

module.exports = PackageJsonLoader;