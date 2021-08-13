import React from 'react';
import CodePreview, { CodePreviewProps } from '@uiw/react-code-preview';

export interface CodeProps extends CodePreviewProps {
  language: string;
  code: string;
  codeSandbox?: boolean;
  codePen?: boolean;
  dependencies: any;
}

export default function Code({ language, dependencies, codePen, codeSandbox, ...other }: CodeProps) {
  const props: CodePreviewProps = { ...other };
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
          content: `import webpack from "webpack";\nimport lessModules from "@kkt/less-modules";\nexport default (conf, env, options) => {\nconf = lessModules(conf, env, options);\nreturn conf;\n};`,
        },
        'package.json': {
          content: {
            name: 'react-heat-map-example',
            description: `react-heat-map - example`,
            devDependencies: {
              '@kkt/less-modules': '6.11.0',
              kkt: '6.11.0',
              typescript: '4.1.3',
            },
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
              '@uiw/react-tooltip': '4.9.4',
              '@uiw/react-heat-map': 'latest',
            },
            license: 'MIT',
            scripts: {
              start: 'kkt start',
              build: 'kkt build',
              test: 'kkt test --env=jsdom',
            },
            browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
          },
        },
      },
    };
  }
  return <CodePreview {...props} language={language} dependencies={dependencies} style={{ marginBottom: 0 }} />;
}
