import React, { Fragment, useMemo } from 'react';
import { oneDayTime } from './utils';
import { SVGProps } from './SVG';
import { textStyle } from './LabelsWeek';

export interface LablesMonthProps extends React.SVGProps<SVGTextElement> {
  monthLabels: SVGProps['monthLabels'];
  rectSize: SVGProps['rectSize'];
  space: SVGProps['space'];
  leftPad: number;
  colNum: number;
  rectY?: number;
  startDate: SVGProps['startDate'];
  endDate?: SVGProps['endDate'];
}

const generateData = (colNum: number, monthLabels: false | string[], startDate: Date, endDate?: Date) => {
  if (monthLabels === false || colNum < 1) return [];
  return Array.from({ length: colNum * 7 })
    .map((_, idx) => {
      if ((idx / 7) % 1 === 0) {
        const date = new Date(startDate.getTime() + idx * oneDayTime);
        const month = date.getMonth();
        if (endDate && date > endDate) return null;
        return { col: idx / 7, index: idx, month, day: date.getDate(), monthStr: monthLabels[month], date };
      }
      return null;
    })
    .filter(Boolean)
    .filter((item, idx, list) => list[idx - 1] && list[idx - 1]!.month !== item!.month);
};

export const LabelsMonth = ({
    monthLabels = [],
    rectSize = 0,
    space = 0,
    leftPad = 0,
    colNum = 0,
    rectY = 15,
    startDate,
    endDate,
  }: LablesMonthProps) => {

  const data = useMemo(() => generateData(colNum, monthLabels, startDate!, endDate), [colNum, monthLabels, startDate, endDate]);
  return (
    <Fragment>
      {data.map((item, idx) => (
        <text
          key={idx}
          data-size={rectSize}
          x={leftPad + space + space}
          y={rectY}
          dx={item!.col * (rectSize + space)}
          textAnchor='start'
          style={textStyle}
        >
          {item!.monthStr}
        </text>
      ))}
    </Fragment>
  );
};
