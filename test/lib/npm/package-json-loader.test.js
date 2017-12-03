const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const PackageJsonLoader = require('./../../../lib/npm/package-json-loader');

const { expect } = chai;

chai.use(chaiAsPromised);

describe('PackageJsonLoader', () => {
  let pkgJsonLoader, _readPackageJson, _fetchPackageJson;

  const dependencies = {
    "chai": "^4.1.2",
    "mocha": "^4.0.1",
    "sinon": "^4.0.1"
  };

  const devDependencies = {
    "package-json": "^4.0.1",
    "read-pkg": "^2.0.0"
  }

  const packageJson = {
    name: 'dpndon-core',
    version: '0.0.5',
    url: 'https://github.com/dpndon-core/dpndon-core',
    dependencies: dependencies,
    devDependencies: devDependencies
  };

  describe('load', () => {
    before(() => {
      pkgJsonLoader = new PackageJsonLoader('dpndon-core');
      _fetchPackageJson = sinon.stub(pkgJsonLoader, '_fetchPackageJson');
    });

    after(() => {
      _fetchPackageJson.restore();
    });

    it('try to fetch package.json from npm registry.', () => {
      _fetchPackageJson.returns(Promise.resolve(packageJson));
      expect(pkgJsonLoader.load()).to.eventually.deep.equal(packageJson);
    });

    it('reject when it failed to fetch package.json from npm registry.', () => {
      const error = new Error();
      _fetchPackageJson.returns(Promise.reject(error));
      expect(pkgJsonLoader.load()).to.rejectedWith(error);
    });

  });

  describe('_fetchPackageJson', () => {
    let stub;

    const packageName = 'sinon';
    
    before(() => {
      pakcageJsonLoader = new PackageJsonLoader(packageName);
      stub = sinon.stub(pkgJsonLoader, '_packageJson');
    });
    
    it('fetch package json from npm repositry.', () => {
      const packageJson = {
        'name': sinon
      }

      stub.withArgs().returns(Promise.resolve(packageJson));

      const result = pkgJsonLoader._fetchPackageJson();
      expect(result).to.eventually.deep.equal(packageJson);
    });

    it('reject when it cant fetch package.json from the registry.', () => {
      const error = new Error('RequestError: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443');

      stub.withArgs().returns(Promise.reject(error));
      const result = pkgJsonLoader._fetchPackageJson();
      expect(result).to.rejectedWith(error);
    })
  });
});