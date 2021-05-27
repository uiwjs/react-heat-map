import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import logo from './logo.svg';
import styles from './App.module.css';
import HeatMap from '../';
import MDStr from '../README.md';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="react logo" />
        <p className={styles.info}>
          Create calendar heatmap to visualize time series data, a la github contribution graph.
        </p>
        <div className={styles.example}>
          <HeatMap style={{ width: 600 }}>test</HeatMap>
        </div>
      </header>
      <MarkdownPreview source={MDStr} className={styles.content} />
    </div>
  );
};

export default App;
