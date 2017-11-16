const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const PropertyExtractor = require('./../../../lib/util/property-extractor');

const { expect } = chai;

describe('PropertyExtractor', () => {
  const dependencies = {
    "chai": "^4.1.2",
    "mocha": "^4.0.1",
    "sinon": "^4.0.1"
  };

  const devDependencies = {
    "package-json": "^4.0.1",
    "read-pkg": "^2.0.0"
  };

  let pkgJson = {
    name: 'dpndon-core',
    dependencies: dependencies,
    devDependencies: devDependencies
  };

  const propHander = new PropertyExtractor(pkgJson);
  it('can be instantiated with object', () => {
    expect(propHander._obj).to.be.deep.equal(pkgJson);
  });
  
  describe('extractProp', () => {
    it('extract property from object', () => {
      const propertyName = 'dependency';
      const property = propHander.extractProp(propertyName);
      expect(property).to.deep.equal(pkgJson[propertyName]);
    });
  });

  describe('extractProps', () => {
    it('extract properties from object', () => {
      const expected = { dependencies, devDependencies };
      const propertyNames = ['dependencies', 'devDependencies'];
      const properties = propHander.extractProps(propertyNames);
      expect(properties).to.deep.equal(expected);
    });
  });

  describe('extractPropKeys', () => {
    it('extract keys of property from object', () => {
      const expected = Object.keys(dependencies);
      const propertyName = 'dependencies';
      const propertyKeys = propHander.extractPropKeys(propertyName);
      expect(propertyKeys).to.deep.equal(expected);
    });

    it('returns empty array if property is not exists', () => {
      const expected = [];
      const propertyName = 'optionalDependencies';
      const propertyKeys = propHander.extractPropKeys(propertyName);
      expect(propertyKeys).to.deep.equal(expected);
    });
  });

  describe('extractPropsKeys', () => {
    it('extract keys of properties from object', () => {
      const expected = Object.keys(dependencies).concat(Object.keys(devDependencies));
      const propertyNames = ['dependencies', 'devDependencies'];
      const propertiesKeys = propHander.extractPropsKeys(propertyNames);
      expect(propertiesKeys).to.deep.equal(expected);
    });

  });
});