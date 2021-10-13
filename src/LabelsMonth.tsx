import React, { Fragment, useMemo } from 'react';
import { oneDayTime } from './utils';
import { SVGProps } from './SVG';

export interface LablesMonthProps extends React.SVGProps<SVGTextElement> {
  monthLabels: SVGProps['monthLabels'];
  rectSize: SVGProps['rectSize'];
  space: SVGProps['space'];
  leftPad: number;
  colNum: number;
  startDate: SVGProps['startDate'];
}

export const LabelsMonth = ({
    monthLabels = [],
    rectSize = 0,
    space = 0,
    leftPad = 0,
    colNum = 0,
    startDate,
  }: LablesMonthProps) => {
  const data = useMemo(() => {
    if (monthLabels === false || colNum < 1) return [];
    return [...Array(colNum * 7)]
      .map((_, idx) => {
        if ((idx / 7) % 1 === 0) {
          const date = new Date(startDate!.getTime() + idx * oneDayTime);
          const month = date.getMonth();
          return { col: idx / 7, index: idx, month, day: date.getDate(), monthStr: monthLabels[month], date };
        }
        return null;
      })
      .filter(Boolean)
      .filter((item, idx, list) => list[idx - 1] && list[idx - 1]!.month !== item!.month);
  }, [colNum, monthLabels, startDate]);

  return useMemo(
    () => (
      <Fragment>
        {[...data].map((item, idx) => {
          return (
            <text
              key={idx}
              data-size={rectSize}
              x={leftPad + space + space}
              y={15}
              dx={item!.col * (rectSize + space)}
              textAnchor='start'
            >
              {item!.monthStr}
            </text>
          );
        })}
      </Fragment>
    ),
    [data, leftPad, rectSize, space],
  );
};
