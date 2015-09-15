## Redux Chat Example

**This was base on [Flux Chat example](https://github.com/d6u/flux-chat),**
**which was originated from Facebook Flux Chat example, but with Redux as its**
**Flux implementation.**

## Redux

Instead of using the official Facebook Flux dispatcher, Redux Chat example is
using [Redux](https://github.com/rackt/redux) with no dispatcher, a singleton
store pure function action creators and reducers. Details please see official
Redux README file.

## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

`npm install`

This will install all dependencies.

To build the project, first run this command:

`npm start`

This will perform an initial build and start a watcher process that will
update bundle.js with any changes you wish to make. This watcher is
based on [Webpack](http://webpack.github.io/), and it transforms
React's JSX syntax into standard JavaScript with [Babel](https://babeljs.io/).

After starting the watcher, you can open `index.html` in your browser to
open the app.
