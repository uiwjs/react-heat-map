import React, { Fragment, useMemo } from 'react';
import { SVGProps } from './SVG';

export interface LablesWeekProps extends React.SVGProps<SVGTextElement> {
  weekLables: SVGProps['weekLables'];
  rectSize: SVGProps['rectSize'];
  space: SVGProps['space'];
  topPad: number;
}
export const LablesWeek = ({ weekLables = [], rectSize = 0, topPad = 0, space = 0 }: LablesWeekProps) =>
  useMemo(
    () => (
      <Fragment>
        {[...Array(7)].map((_, idx) => {
          if (weekLables && weekLables[idx]) {
            return (
              <text key={idx} x={15} y={topPad} dy={(idx + 1) * (rectSize + space) - 5}>
                {weekLables[idx]}
              </text>
            );
          }
          return null;
        })}
      </Fragment>
    ),
    [rectSize, space, topPad, weekLables],
  );
