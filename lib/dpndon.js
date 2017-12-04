const PropertyLoader = require('./util/property-loader')
const PackageJsonLoader = require('./npm/package-json-loader')

/**
 * dpndon fetch information of npm modules that the project depend on.
 */
module.exports = ({pkgName, dependencyTypes, props, unpkg=false}) => {
  const loader = createPropLoader({pkgName, unpkg})
  const dependenciesArray = dependencyTypes.map(type => {
    return loader.loadProp(type)
    .then(dependencies => {
      return Object.entries(dependencies || {})
      .map(([name, version]) => {
        const loader = createPropLoader({
          pkgName: name, 
          version, 
          unpkg
        });
        return loader.loadProps(props);
      });
    })
    .then(props => Promise.all(props));
    
  });
  return Promise.all(dependenciesArray)
  .then(dependenciesArray => {
    return dependenciesArray.reduce((result, dependencies, index) => {
      const type = dependencyTypes[index];
      result[type] = dependencies;
      return result
    }, {});
  });
}

/**
 * create property loader for package.json
 * @param {String} pkgName 
 * @param {String} version
 * @return {PropertyLoader} propertyLoader
 */
function createPropLoader({pkgName, version, unpkg}) {
  return new PropertyLoader(new PackageJsonLoader(pkgName, version, unpkg));
}