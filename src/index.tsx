import React from 'react';
import SVG, { SVGProps } from './SVG';
import './style/index.less';

export * from './SVG';

export interface HeatMapProps extends SVGProps {
  prefixCls?: string;
}

export default function HeatMap(props: HeatMapProps) {
  const { prefixCls = 'w-heatmap', className, ...others } = props;
  const cls = [className, prefixCls].filter(Boolean).join(' ');
  return <SVG className={cls} {...others} />;
}
