## Flux Chat Example

**This was copied from [Facebook Flux Chat example](https://github.com/facebook/flux/tree/master/examples/flux-chat)**.

The reason for copying over is to easily keep it up to date with new React
release and for readers to compare different Flux implementations. You can read
over the original repo
[here](https://github.com/facebook/flux/tree/master/examples/flux-chat).

## Changes from Original Flux Chat Example

- Update React.js to 0.14rc1
- Mock server latency when "fetching" messages (use `setTimeout`)
- Use ES6 syntax
- Consolidate actions into single file (actions.js)
- Webpack instead of Browserify
- Babel instead of Reactify
- Remove testing for stores (for now)

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
