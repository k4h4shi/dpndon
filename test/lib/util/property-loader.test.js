const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const PropertyLoader = require('./../../../lib/util/property-loader');
const PakcageJsonLoader = require('./../../../lib/npm/package-json-loader');

const { expect } = chai;

chai.use(chaiAsPromised);

describe('PropertyLoader', () => {
  let pkgJsonPropLoader, load, _fetchPackageJson;

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

  const loader = new PakcageJsonLoader(packageJson);

  describe('loadProp', () => {
    before(() => {
      pkgJsonPropLoader = new PropertyLoader(loader);
      load = sinon.stub(pkgJsonPropLoader._loader, 'load');
    });

    after(() => {
      load.restore();
    });

    it('try to read package.json by default', () => {
      load.returns(Promise.resolve(packageJson));
      expect(pkgJsonPropLoader.loadProp('dependencies')).to.eventually.deep.equal(dependencies);
    });

    it('reject when cant find package.json at cwd', () => {
      const error = new Error();
      load.returns(Promise.reject(error));
      expect(pkgJsonPropLoader.loadProp('dependencies')).to.rejectedWith(error);
    })
  });

  describe('loadProps', () => {
    before(() => {
      pkgJsonPropLoader = new PropertyLoader(loader);
      load = sinon.stub(pkgJsonPropLoader._loader, 'load');
    });

    after(() => {
      load.restore();
    });

    it('try to read props of package.json', () => {
      load.returns(Promise.resolve(packageJson));
      const result = pkgJsonPropLoader.loadProps(['dependencies', 'devDependencies']);
      expect(result).to.eventually.deep.equal({dependencies, devDependencies});
    });

    it('reject when cant find package.json at cwd', () => {
      const error = new Error();
      load.returns(Promise.reject(error));
      const result = pkgJsonPropLoader.loadProps(['dependencies', 'devDependencies']);
      expect(result).to.rejectedWith(error);
    })
  });

  describe('loadPropKeys', () => {
    before(() => {
      pkgJsonPropLoader = new PropertyLoader(loader);
      load = sinon.stub(pkgJsonPropLoader._loader, 'load');
    });

    after(() => {
      load.restore();
    });

    it('try to read prop key of package.json', () => {
      load.returns(Promise.resolve(packageJson));
      const result = pkgJsonPropLoader.loadPropKeys('dependencies');
      expect(result).to.eventually.deep.equal(Object.keys(dependencies));
    });

    it('reject when cant find package.json at cwd', () => {
      const error = new Error();
      load.returns(Promise.reject(error));
      const result = pkgJsonPropLoader.loadPropKeys('dependencies');
      expect(result).to.rejectedWith(error);
    })
  });

  describe('loadPropsKeys', () => {
    before(() => {
      pkgJsonPropLoader = new PropertyLoader(loader);
      load = sinon.stub(pkgJsonPropLoader._loader, 'load');
    });

    after(() => {
      load.restore();
    });

    it('try to read props key of package.json', () => {
      load.returns(Promise.resolve(packageJson));
      const expected = Object.keys(dependencies).concat(Object.keys(devDependencies));
      const result = pkgJsonPropLoader.loadPropsKeys(['dependencies', 'devDependencies']);
      expect(result).to.eventually.deep.equal(expected);
    });

    it('reject when cant find package.json at cwd', () => {
      const error = new Error();
      load.returns(Promise.reject(error));
      const result = pkgJsonPropLoader.loadPropsKeys(['dependencies', 'devDependencies']);
      expect(result).to.rejectedWith(error);
    })
  });
});