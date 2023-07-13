import React from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import '@wcj/dark-mode';
import MarkdownPreview from './Markdown';
import Example from './Example';
import logo from './logo.svg';
import styles from './App.module.less';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <dark-mode permanent style={{ position: 'fixed', top: 8, left: 10, zIndex: 10 }}></dark-mode>
      <sup className={styles.version}>{VERSION}</sup>
      <GitHubCorners zIndex={9999} fixed href="https://github.com/uiwjs/react-heat-map" />
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="react logo" />
        <p className={styles.info}>
          React component create calendar heatmap to visualize time series data, a la github contribution graph.
        </p>
        <Example />
      </header>
      <MarkdownPreview />
    </div>
  );
};

export default App;
