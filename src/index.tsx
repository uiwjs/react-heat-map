import React, { useRef } from 'react';
import SVG from './SVG';
import './style/index.less';

export interface HeatMapProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  startDate?: Date;
  endDate?: Date;
  rectSize?: number;
  renderRect?: () => React.ReactNode;
  value?: Record<
    string,
    {
      date: string;
      content: string;
      count: string;
    }
  >;
  weekLables?: string[];
  monthLables?: string[];
}

export default function HeatMap(props: HeatMapProps = {}) {
  const {
    prefixCls = 'w-heatmap',
    className,
    startDate = new Date(),
    rectSize = 14,
    weekLables = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthLables = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ...others
  } = props;

  const warpper = React.createRef<HTMLDivElement>();

  const cls = [className, prefixCls].filter(Boolean).join(' ');

  return (
    <div className={cls} ref={warpper} {...others}>
      <SVG rectSize={rectSize} />
    </div>
  );
}
