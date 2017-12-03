/**
 * extract property of a object.
 */
class PropertyExtractor {
  /**
   * initialize with a object to extract.
   * @param {Object} obj
   */
  constructor(obj) {
    this._obj = obj;
  }

  /**
   * extract property from package.json
   * @param {String} propertyName - to extract
   * @returns {Object} property
   */
  extractProp(propertyName) {
    return this._obj[propertyName];
  }

  /**
   * extract properties from package.json
   * @param {Array} propertyNames - to extract
   * @returns {Object} has properties
   */
  extractProps(propertyNames) {
    return propertyNames.reduce((result, propertyName) => {
      result[propertyName] = this.extractProp(propertyName);
      return result;
    }, {});
  }

  /**
   * extract property's keys from package.json
   * @param {String} propertyName - to extract
   * @returns {Array} property's keys
   */
  extractPropKeys(propertyName) {
    const property = this.extractProp(propertyName) || {}
    return Object.keys(property);
  }

  /**
   * extract properties's keys from package.json
   * @param {Array} propertyNames - to extract
   * @returns {Array} property's keys
   */
  extractPropsKeys(propertyNames) {
    const propertyKeys = propertyNames.map((propertyName) => {
      return this.extractPropKeys(propertyName);
    })
    .reduce((array, propertyKeys) => {
      array.push(...propertyKeys);
      return array;
    }, []);

    return propertyKeys;
  }
}

module.exports = PropertyExtractor;