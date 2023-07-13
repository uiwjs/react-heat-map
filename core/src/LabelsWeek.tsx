import type { CSSProperties } from 'react';
import React, { Fragment, useMemo } from 'react';
import { SVGProps } from './SVG';

export const textStyle: CSSProperties = {
  textAnchor: 'middle',
  fontSize: 'inherit',
  fill: 'currentColor',
}

export interface LablesWeekProps extends React.SVGProps<SVGTextElement> {
  weekLabels: SVGProps['weekLabels'];
  rectSize: SVGProps['rectSize'];
  space: SVGProps['space'];
  topPad: number;
}
export const LabelsWeek = ({ weekLabels = [], rectSize = 0, topPad = 0, space = 0 }: LablesWeekProps) =>
  useMemo(
    () => (
      <Fragment>
        {[...Array(7)].map((_, idx) => {
          if (weekLabels && weekLabels[idx]) {
            return (
              <text className="w-heatmap-week" key={idx} x={15} y={topPad} dy={(idx + 1) * (rectSize + space) - 5} style={textStyle}>
                {weekLabels[idx]}
              </text>
            );
          }
          return null;
        })}
      </Fragment>
    ),
    [rectSize, space, topPad, weekLabels],
  );
