HeatMap 日历热图
===
<!--rehype:style=text-align: center;-->

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Build & Deploy](https://github.com/uiwjs/react-heat-map/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-heat-map/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/npm/dm/@uiw/react-heat-map.svg?style=flat)](https://www.npmjs.com/package/@uiw/react-heat-map)
[![npm version](https://img.shields.io/npm/v/@uiw/react-heat-map.svg)](https://www.npmjs.com/package/@uiw/react-heat-map)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@uiw/react-heat-map)](https://bundlephobia.com/result?p=@uiw/react-heat-map)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/uiwjs/react-codemirror)
<!--rehype:style=text-align: center;-->

A lightweight calendar heatmap react component built on SVG, customizable version of GitHub's contribution graph. Try it out on [website example](https://uiwjs.github.io/react-heat-map/).

<!--rehype:ignore:start-->

[![](https://user-images.githubusercontent.com/1680273/186116433-d58c2b6d-8468-4322-943c-9b63c2e447e4.png)](https://uiwjs.github.io/react-heat-map)

<!--rehype:ignore:end-->

## Install

```bash
# Not dependent on uiw.
npm install @uiw/react-heat-map --save
```

## Basic Usage

Basic usage example, Please pay warning to the time setting.

⚠️ Example: ~~`2016-01-11`<!--rehype:style=color: red;background-color: #ffd8d8;-->~~ -> `2016/01/11`<!--rehype:style=color: green;background: #a7e4b5;-->, Support `Safari`<!--rehype:style=background-color: #87d499;-->

```jsx mdx:preview
import React from 'react';
import HeatMap from '@uiw/react-heat-map';

const value = [
  { date: '2016/01/11', count: 2 },
  { date: '2016/01/12', count: 20 },
  { date: '2016/01/13', count: 10 },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
  { date: '2016/04/11', count: 2 },
  { date: '2016/05/01', count: 5 },
  { date: '2016/05/02', count: 5 },
  { date: '2016/05/04', count: 11 },
];

const Demo = () => {
  return (
    <div>
      <HeatMap
        value={value}
        weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
        startDate={new Date('2016/01/01')}
      />
    </div>
  )
};

export default Demo
```

## Set Color

Set the theme color style.

```jsx mdx:preview
import React from 'react';
import HeatMap from '@uiw/react-heat-map';

const value = [
  { date: '2016/01/11', count:2 },
  { date: '2016/04/12', count:2 },
  { date: '2016/05/01', count:5 },
  { date: '2016/05/02', count:5 },
  { date: '2016/05/03', count:1 },
  { date: '2016/05/04', count:11 },
  { date: '2016/05/08', count:32 },
];

const Demo = () => {
  return (
    <HeatMap
      value={value}
      width={600}
      style={{ color: '#ad001d', '--rhm-rect-active': 'red' }}
      startDate={new Date('2016/01/01')}
      panelColors={{
        0: '#f4decd',
        2: '#e4b293',
        4: '#d48462',
        10: '#c2533a',
        20: '#ad001d',
        30: '#000',
      }}
    />
  )
};
export default Demo
```

## Set Rect Style

Set the radius of the rect.

```jsx mdx:preview
import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';

const value = [
  { date: '2016/01/11', count:2 },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx })),
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx })),
  { date: '2016/04/12', count:2 },
  { date: '2016/05/01', count:5 },
  { date: '2016/05/02', count:5 },
  { date: '2016/05/03', count:1 },
  { date: '2016/05/04', count:11 },
  { date: '2016/05/08', count:32 },
];

const Demo = () => {
  const [range, setRange] = useState(5)
  return (
    <div>
      <input type="range" min="0" max="5" step="0.1" value={range} onChange={(e) => setRange(e.target.value)} /> {range}
      <HeatMap
        value={value}
        width={600}
        style={{ '--rhm-rect': '#b9b9b9' }}
        startDate={new Date('2016/01/01')}
        legendRender={(props) => <rect {...props} y={props.y + 10} rx={range} />}
        rectProps={{
          rx: range
        }}
      />
    </div>
  )
};
export default Demo
```

## Tooltip

A simple text popup tip.

```jsx mdx:preview
import React from 'react';
import Tooltip from '@uiw/react-tooltip';
import HeatMap from '@uiw/react-heat-map';

const value = [
  { date: '2016/01/11', count:2 },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx, })),
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, })),
  { date: '2016/04/12', count:2 },
  { date: '2016/05/01', count:5 },
  { date: '2016/05/02', count:5 },
  { date: '2016/05/03', count:1 },
  { date: '2016/05/04', count:11 },
  { date: '2016/05/08', count:32 },
];

const Demo = () => {
  return (
    <HeatMap
      value={value}
      width={600}
      startDate={new Date('2016/01/01')}
      rectRender={(props, data) => {
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip placement="top" content={`count: ${data.count || 0}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
    />
  )
};
export default Demo
```

## Show/Hide Legend

```jsx mdx:preview
import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';

const value = [
  { date: '2016/01/11', count:2 },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx })),
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx })),
  { date: '2016/04/12', count:2 },
  { date: '2016/05/01', count:5 },
  { date: '2016/05/02', count:5 },
  { date: '2016/05/03', count:1 },
  { date: '2016/05/04', count:11 },
  { date: '2016/05/08', count:32 },
];

const Demo = () => {
  const [size, setSize] = useState(0)
  return (
    <div>
      <label style={{ userSelect: 'none' }}>
        <input
          type="checkbox"
          checked={size === 0}
          onChange={(e) => setSize(e.target.checked ? 0 : 12)}
        />
        {size === 0 ? ' Hide' : ' Show'} Legend
      </label>
      <HeatMap
        width={600}
        value={value}
        legendCellSize={size}
        startDate={new Date('2016/01/01')}
      />
    </div>
  )
};
export default Demo
```

## Selected Rect

```jsx mdx:preview
import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';

const value = [
  { date: '2016/01/11', count:2 },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx })),
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx })),
  { date: '2016/04/12', count:2 },
  { date: '2016/05/01', count:5 },
  { date: '2016/05/02', count:5 },
  { date: '2016/05/03', count:1 },
  { date: '2016/05/04', count:11 },
  { date: '2016/05/08', count:32 },
];

const Demo = () => {
  const [selected, setSelected] = useState('')
  return (
    <div>
      <HeatMap
        width={600}
        value={value}
        startDate={new Date('2016/01/01')}
        rectRender={(props, data) => {
          if (selected !== '') {
            props.opacity = data.date === selected ? 1 : 0.45
          }
          return (
            <rect {...props} onClick={() => {
              setSelected(data.date === selected ? '' : data.date);
            }} />
          );
        }}
      />
    </div>
  )
};
export default Demo
```

## Props

| Property | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| value | Data to be displayed, **required** | Array | `[]` |
| rectSize | Grid size | number | `11` |
| legendCellSize | Size of the legend cells, in pixel. Value equal to `0` hide legend. | number | `11` |
| startDate | Start date | Date | `new Date()` |
| endDate | End date | Date | - |
| space | Interval between grid sizes | number | `2` | 
| monthPlacement | position of month labels | `'top' | 'bottom'` | `top` | 
| rectProps | Grid node attribute settings | `React.SVGProps<SVGRectElement>` | `2` |
| weekLabels | Week display | string[] | `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']` | 
| monthLabels | Month display | string[] | `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']` | 
| panelColors | Backgroud color of active colors | `Record<number, string>` | `{ 0: '#EBEDF0', 8: '#7BC96F', 4: '#C6E48B', 12: '#239A3B', 32: '#196127' }` | 
| rectRender | Single `day` block re-render | `<E = SVGRectElement>(data: E & { key: number }, valueItem: HeatMapValue & { date: string, column: number, row: number, index: number }) => React.ReactElement` | - |
| legendRender | Single `legend` block re-render | `(props: React.SVGProps<SVGRectElement>) => React.ReactNode` | - |

## Development

**`development`**

Runs the project in development mode.  

```bash
npm install
```

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
npm run doc
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-heat-map/graphs/contributors">
  <img src="https://uiwjs.github.io/react-heat-map/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
