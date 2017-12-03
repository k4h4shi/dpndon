const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
const dpndon = require('./../index');
const fs = require('fs');
const path = require('path');

chai.use(chaiAsPromised);

describe('dpndon', () => {
  it('can extract dependency names', () => {
    const pkgName = 'dpndon';
    const dependencyTypes = ['dependencies'];
    const props = ['name'];
    const pkgJson = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8');
    const dependencies =
        Object.keys(JSON.parse(pkgJson).dependencies)
          .map(name => {
            return {name}
          });
  
    const result = dpndon({
      pkgName: pkgName,
      dependencyTypes: dependencyTypes,
      props: props
    });
  
    return expect(result).to.eventually.deep.equal({dependencies});
  });

  it('can extract optional dependencies names', () => {
    const pkgName = 'dpndon';
    const dependencyTypes = ['optionalDependencies'];
    const props = ['name'];
    const pkgJson = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8');
    
    const optionalDependencies =
      Object.keys(JSON.parse(pkgJson).optionalDependencies || {})
        .map(name => {
          return {name}
        });

    const result = dpndon({
      pkgName: pkgName,
      dependencyTypes: dependencyTypes,
      props: props
    });
  
    return expect(result).to.eventually.deep.equal({optionalDependencies});
  });

  it('throw error if pkgName is not given', () => {
    const pkgName = undefined;
    const dependencyTypes = ['optionalDependencies'];
    const props = ['name'];
    const result = dpndon({
      pkgName: pkgName,
      dependencyTypes: dependencyTypes,
      props: props
    });
    return expect(result).to.be.rejectedWith('pkgName is required');
  })
});