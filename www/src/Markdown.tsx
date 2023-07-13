import { useEffect, useRef } from 'react';
import CodeLayout from 'react-code-preview-layout';
import { getMetaId, isMeta, getURLParameters } from 'markdown-react-code-preview-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeIgnore from 'rehype-ignore';
import data from '@uiw/react-heat-map/README.md';
import { CodeComponent, ReactMarkdownNames } from 'react-markdown/lib/ast-to-react';

const Preview = CodeLayout.Preview;
const Code = CodeLayout.Code;
const Toolbar = CodeLayout.Toolbar;

const CodePreview: CodeComponent | ReactMarkdownNames = ({ inline, node, ...props }) => {
  const $dom = useRef<HTMLDivElement>(null);
  const { 'data-meta': meta, ...rest } = props as any;

  useEffect(() => {
    if ($dom.current) {
      const parentElement = $dom.current.parentElement;
      if (parentElement && parentElement.parentElement) {
        parentElement.parentElement.replaceChild($dom.current, parentElement);
      }
    }
  }, [$dom]);

  if (inline || !isMeta(meta)) {
    return <code {...props} />;
  }
  const line = node.position?.start.line;
  const metaId = getMetaId(meta) || String(line);
  const Child = data.components[`${metaId}`];
  if (metaId && typeof Child === 'function') {
    const code = data.data[metaId].value || '';
    const { title } = getURLParameters(meta);
    return (
      <CodeLayout>
        <Preview style={{ background: 'var(--color-theme-bg)' }}>
          <Child />
        </Preview>
        <Toolbar text={code}>{title || 'Code Example'}</Toolbar>
        <Code>
          <code {...rest}/>
        </Code>
      </CodeLayout>
    );
  }
  return <code {...rest} />;
};

export default function Markdown() {
  return (
    <MarkdownPreview
      style={{ maxWidth: 920, margin: '0 auto', padding: '30px 10px 0 10px' }}
      disableCopy={true}
      rehypePlugins={[rehypeIgnore]}
      source={data.source}
      components={{
        code: CodePreview,
      }}
    />
  );
}
