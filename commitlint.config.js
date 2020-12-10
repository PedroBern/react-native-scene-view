module.exports = {
  extends: ['@commitlint/config-conventional'],
  'type-enum': [
    'feat', //  A new feature for the final user
    'fix', // A bug fix for the final user
    'docs', // Documentation only changes
    'style', // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    'refactor', // A code change that neither fixes a bug nor adds a feature
    'test', // Adding missing or correcting existing tests
    'perf', // A code change that improves performance
    'chore', // Auxiliary tools and libraries such as documentation generation / Changes that don't modify src or test files
    'revert', // revert: , followed by the header of the reverted commit
  ],
}

// follow https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type
