import React, { useMemo } from 'react';
import { SVGProps } from './SVG';
import { Rect, RectProps } from './Rect';

export interface RectDayDefaultProps {
  space?: SVGProps['space'];
  rectSize?: SVGProps['rectSize'];
  column?: number;
  row?: number;
  date?: string;
}

export interface RectDayProps extends RectDayDefaultProps, RectProps {}
export const RectDay = ({ rectSize = 0, space = 0, date, row = 0, column = 0, ...other }: RectDayProps) =>
  useMemo(() => {
    return (
      <Rect
        key={row}
        {...other}
        width={rectSize}
        height={rectSize}
        x={column * (rectSize + space)}
        y={(rectSize + space) * row}
        data-index={column * 7 + row}
        data-row={row}
        data-column={column}
        data-date={date}
      />
    );
  }, [column, date, other, rectSize, row, space]);
