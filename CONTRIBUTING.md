Issues
======

We take all manner of questions, suggestions, and bug reports. Feel free to open an issue regarding anything and it'll get looked at! If you have a bug report, please include a jsfiddle!

Pull Requests
=============

Please accompany all pull requests with the following (where appropriate):

* unit tests (we use [Jasmine 1.3](http://jasmine.github.io/1.3/introduction.html))
* jsfiddle (or an equivalent such as codepen, plunker, etc)
* documentation updates
* examples (for new options being added)

We support both Sass and LESS. If you modify one in your PR, please modify both and make sure they both work.

Additionally, when you are ready to submit your PR, please rebase your commits against the latest master branch so they are easier to examine! Please make sure you're not committing your re-built `dist` files, either. We'll do that!

Also, please note, your code will not be merged if it does not pass our CI test. Thanks for your contribution!

Other Guidelines
=============
* Please do not include anything from the `dist` directory in your pull request. The contents of this directory are automatically generated when the project maintainers merge pull requests/bump the version/publish to NPM
* The application JavaScript source code is transpiled using [Babel](https://babeljs.io/)
