import React from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Example from './Example';
import logo from './logo.svg';
import styles from './App.module.less';
import MDStr from '../README.md';

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
      <MarkdownPreview source={MDStr} className={styles.content} />
    </div>
  );
};

export default App;
