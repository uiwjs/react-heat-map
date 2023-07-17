import { createRoot } from 'react-dom/client';
import MarkdownPreview from '@uiw/react-markdown-preview-example';
import data from '@uiw/react-heat-map/README.md';
import Demo from './Example';

const Github = MarkdownPreview.Github;
const Example = MarkdownPreview.Example;

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <MarkdownPreview
    source={data.source}
    components={data.components}
    data={data.data}
    title="HeatMap for React"
    description="React component create calendar heatmap to visualize time series data, a la github contribution graph."
    version={`v${VERSION}`}
  >
    <Github href="https://github.com/uiwjs/react-heat-map" />
    <Example>
      <Demo />
    </Example>
  </MarkdownPreview>,
);