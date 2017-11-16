# dpndon
dpndon - fetch information of npm modules that the project depend on.

## Usage
```javascript
const dpndon = require('dpndon');

dpndon({
  pkgName: 'dpndon',
  dependencyTypes: ['dependencies', 'devDependencies'],
  props: ['name', 'homepage']
})
.then(console.log)
.catch(console.error);

/** output:
{
  dependencies: [
    {
      name: 'package-json',
      homepage: 'https://github.com/sindresorhus/package-json#readme' 
    },
    { 
      name: 'read-pkg',
      homepage: 'https://github.com/sindresorhus/read-pkg#readme'
    } 
  ],
  devDependencies: [
    { 
      name: 'chai',
      homepage: 'http://chaijs.com'
    },
    { 
      name: 'chai-as-promised',
      homepage: 'https://github.com/domenic/chai-as-promised#readme'
    },
    { 
      name: 'mocha',
      homepage: 'https://mochajs.org'
    },
    { 
      name: 'sinon',
      homepage: 'http://sinonjs.org/'
    }
  ]
}
*/
```

## License
MIT

## Author
[Kotaro Takahashi@k4h4shi](https://twitter.com/k4h4shi)
