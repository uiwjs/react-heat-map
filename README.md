HeatMap 日历热图
===

[![Build & Deploy](https://github.com/uiwjs/react-heat-map/workflows/Build%20&%20Deploy/badge.svg)](https://github.com/uiwjs/react-heat-map/actions)
[![Issues](https://img.shields.io/github/issues/uiwjs/react-heat-map.svg)](https://github.com/uiwjs/react-heat-map/issues)
[![Forks](https://img.shields.io/github/forks/uiwjs/react-heat-map.svg)](https://github.com/uiwjs/react-heat-map/network)
[![Stars](https://img.shields.io/github/stars/uiwjs/react-heat-map.svg)](https://github.com/uiwjs/react-heat-map/stargazers)
[![Release](https://img.shields.io/github/release/uiwjs/react-heat-map)](https://github.com/uiwjs/react-heat-map/releases)
[![npm version](https://img.shields.io/npm/v/@uiw/react-heat-map.svg)](https://www.npmjs.com/package/@uiw/react-heat-map)

Create calendar heatmap to visualize time series data, a la github contribution graph.

## Install

```bash
# Not dependent on uiw.
npm install @uiw/react-heat-map --save
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 需要显示的数据，必填 | Array | `[]` |

## Development

**`development`**

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
npm run watch
# Step 2, development mode, listen to compile preview website instance
npm run start
```

**`production`**

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!


## License

Licensed under the MIT License.
