6.0.2 / 2015-12-31
==================
* package.json: changing "main" to point at proper file path

6.0.0 / 2015-12-30
==================
* Moving all source code to `/src` directory
* Transpiling JS with [Babel](https://babeljs.io/)
* Adding `Other Guidelines` section to CONTRIBUTING.MD
* Updating README with Grunt CLI tasks
* Update postpublish script to reference transpiled code
* Freezing dependency versions (this allows us to ensure the module and grunt tasks always have consistent/repeatable behavior)
* Adding an `.nvmrc` file for Node 5.x.x. This version of node comes with NPM 3.x.x, which creates a flat dependency tree for `node_modules`, which basically eliminates the need for bower as our client-side deps management solution

5.3.6 / 2015-12-27
==================
* Restoring bootstrap depedency to bower.json file (Fixes issue with `grunt prod` task)

5.3.4 / 2015-12-27
==================
* Bug fix: Ticks now reposition themselves during window resize - Thanks to [Zachary Siswick](https://github.com/zsiswick)
