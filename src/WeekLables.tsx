import React, { Fragment, useMemo } from 'react';
import { SVGProps } from './SVG';

export interface WeekLablesProps extends React.SVGProps<SVGTextElement> {
  weekLables: SVGProps['weekLables'];
  rectSize: SVGProps['rectSize'];
  space: SVGProps['space'];
}
export const WeekLables = ({ weekLables = [], rectSize = 0, space = 0 }: WeekLablesProps) =>
  useMemo(
    () => (
      <Fragment>
        {[...Array(7)].map((_, idx) => {
          if (weekLables && weekLables[idx]) {
            return (
              <text key={idx} x={15} y={15} dy={(idx + 1) * (rectSize + space)}>
                {weekLables[idx]}
              </text>
            );
          }
          return undefined;
        })}
      </Fragment>
    ),
    [rectSize, space, weekLables],
  );
