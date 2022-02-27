import React from 'react';
import CodePreview, { CodePreviewProps } from '@uiw/react-code-preview';

export interface CodeProps extends CodePreviewProps {
  language: string;
  code: string;
  version: string;
  codeSandbox?: boolean;
  codePen?: boolean;
  dependencies: any;
}

export default function Code({ version, language, dependencies, codePen, codeSandbox, ...other }: CodeProps) {
  const props: CodePreviewProps = { ...other };
  if (codePen) {
    props.codePenOption = {
      title: `@uiw/react-heat-map${version} - demo`,
      includeModule: ['@uiw/react-heat-map'],
      js: (props.code || '').replace('_mount_', 'document.getElementById("container")'),
      html: '<div id="container" style="padding: 24px"></div>',
      css_external: `https://unpkg.com/@uiw/react-heat-map@${version}/dist/heat-map.min.css`,
      js_external: `https://unpkg.com/react@17.x/umd/react.development.js;https://unpkg.com/react-dom@17.x/umd/react-dom.development.js;https://unpkg.com/classnames@2.2.6/index.js;https://unpkg.com/@uiw/react-heat-map@${version}/dist/heat-map.min.js;https://unpkg.com/@uiw/codepen-require-polyfill@1.1.3/index.js`,
    };
  }
  if (codeSandbox) {
    props.codeSandboxOption = {
      files: {
        'sandbox.config.json': {
          content: `{
        "template": "node",
        "container": {
          "startScript": "start",
          "node": "14"
        }
      }`,
        },
        'public/index.html': {
          content: `<div id="container"></div>`,
        },
        'src/index.js': {
          content: props.code!.replace('_mount_', 'document.getElementById("container")'),
        },
        '.kktrc.js': {
          content: `import lessModules from "@kkt/less-modules";\nexport default (conf, env, options) => {\nconf = lessModules(conf, env, options);\nreturn conf;\n};`,
        },
        'package.json': {
          content: {
            name: 'react-heat-map-example',
            description: `react-heat-map v${version} - demo`,
            devDependencies: {
              '@kkt/less-modules': '~7.1.1',
              kkt: '~7.1.5',
            },
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
              "@uiw/react-tooltip": "~4.12.2",
              '@uiw/react-heat-map': 'latest',
            },
            license: 'MIT',
            scripts: {
              start: 'kkt start',
              build: 'kkt build',
              test: 'kkt test --env=jsdom',
            },
            browserslist: {
              production: [
                ">0.2%",
                "not dead",
                "not op_mini all"
              ],
              development: [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ]
            }
          },
        },
      },
    };
  }
  return <CodePreview {...props} dependencies={dependencies} style={{ marginBottom: 0 }} />;
}
