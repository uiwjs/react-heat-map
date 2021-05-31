import React, { useRef, useEffect, useState } from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeAttr from 'rehype-attr';
import Code, { CodeProps } from './Code';
import HeatMap from '../';
import Example from './Example';
import logo from './logo.svg';
import styles from './App.module.less';
import MDStr from '../README.md';

const getCodeStr = (data: any[] = [], code: string = '') => {
  data.forEach((node) => {
    if (node.type === 'text') {
      code += node.value;
    } else if (node.children && Array.isArray(node.children)) {
      code += getCodeStr(node.children);
    }
  });
  return code;
};

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <GitHubCorners zIndex={9999} fixed href="https://github.com/uiwjs/react-heat-map" />
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="react logo" />
        <p className={styles.info}>
          React component create calendar heatmap to visualize time series data, a la github contribution graph.
        </p>
      </header>
      <Example />
      <MarkdownPreview
        source={MDStr}
        className={styles.content}
        rehypePlugins={[[rehypeAttr, { properties: 'attr' }]]}
        components={{
          /**
           * bgWhite 设置代码预览背景白色，否则为格子背景。
           * noCode 不显示代码编辑器。
           * noPreview 不显示代码预览效果。
           * noScroll 预览区域不显示滚动条。
           * codePen 显示 Codepen 按钮，要特别注意 包导入的问题，实例中的 import 主要用于 Codepen 使用。
           */
          code: ({ inline, node, noPreview, noScroll, bgWhite, noCode, codePen, codeSandbox, ...props }) => {
            const conf = { noPreview, noScroll, bgWhite, noCode, codePen, codeSandbox } as CodeProps;
            if (noPreview || noScroll || bgWhite || noCode || codePen || codeSandbox) {
              return (
                <Code
                  {...conf}
                  code={getCodeStr(node.children)}
                  dependencies={{ useRef, useEffect, useState, HeatMap }}
                  language={(props.className || '').replace(/^language-/, '')}
                />
              );
            }
            return <code {...props} />;
          },
        }}
      />
    </div>
  );
};

export default App;
