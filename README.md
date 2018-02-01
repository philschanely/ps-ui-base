# ps-ui-base

The PS UI Base toolkit is a highly-modular design system for rapid web page development. It contains different materials that can be assembled into more complex page layouts.

This library is a fork of the fabulous [Fabricator](https://fbrctr.github.io/) project by [@LukeAskew](https://twitter.com/LukeAskew/).

## Getting Started

ps-ui-base requires [node.js](http://nodejs.org). Make sure your have `v0.10` or higher installed before proceeding.

**Start the local development environment:**

```
$ npm start
```

### Development Environment Features

- Live preview sever (using [BrowserSync](http://www.browsersync.io/))
- CSS Autoprefixing
- Sass compilation
- Browserify bundling
- Image optimization

## Build

**Build for release:**

```
$ npm run build
```

Fabricator builds both a static documentation site and optimized CSS and JS toolkit files.

The build artifacts output to the `dist` directory. This can be deployed to any static hosting environment - no language runtime or database is required.
