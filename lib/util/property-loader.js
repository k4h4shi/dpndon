const readPkg = require('read-pkg');
const packageJson = require('package-json');

const PropertyExtractor = require('./property-extractor');

/**
 * load property of object.
 */
class PropertyLoader {

  /**
   * initialize with loader.
   * @param {Loader} loader is impl load function.
   */
  constructor(loader) {
    this._loader = loader;
  }

  /**
   * load property of package.json.
   * @param {String} propName
   * @returns {Promise} property of package.json
   */
  loadProp(propName) {
    return this._loader.load()
      .then(pkgJson => new PropertyExtractor(pkgJson))
      .then(handler => handler.extractProp(propName));;
  }

  /**
   * load properties of package.json.
   * @param {Array} propNames
   * @returns {Promise} properties of package.json
   */
  loadProps(propNames) {
    return this._loader.load()
      .then(pkgJson => new PropertyExtractor(pkgJson))
      .then(handler => handler.extractProps(propNames));;
  }

  /**
   * load keys of property of package.json.
   * @param {String} propName
   * @returns {Promise} keys of property of package.json
   */
  loadPropKeys(propName) {
    return this._loader.load()
      .then(pkgJson => new PropertyExtractor(pkgJson))
      .then(handler => handler.extractPropKeys(propName));
  }

  /**
   * load keys of properties of package.json.
   * @param {Array} propName
   * @returns {Promise} keys of property of package.json
   */
  loadPropsKeys(propNames) {
    return this._loader.load()
      .then(pkgJson => new PropertyExtractor(pkgJson))
      .then(handler => handler.extractPropsKeys(propNames));
  }

}

module.exports = PropertyLoader;