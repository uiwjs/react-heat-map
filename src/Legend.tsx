import React, { Fragment, useMemo } from 'react';
import { Rect, RectProps } from './Rect';
import { SVGProps } from './SVG';

export interface LegendProps extends RectProps {
  panelColors: SVGProps['panelColors'];
  rectSize: SVGProps['rectSize'];
  leftPad: number;
  legendCellSize: number;
  topPad: number;
  space: number;
}
export default function Legend({
  panelColors,
  leftPad = 0,
  topPad = 0,
  space = 0,
  rectSize = 0,
  legendCellSize = 0,
  ...props
}: LegendProps) {
  let size = legendCellSize || rectSize;
  return useMemo(
    () => (
      <Fragment>
        {Object.keys(panelColors || {}).map((num, key) => (
          <Rect
            key={key}
            {...props}
            x={(size + 1) * key + leftPad}
            y={topPad + rectSize * 8 + 6}
            fill={panelColors![Number(num)]}
            width={size}
            height={size}
          />
        ))}
      </Fragment>
    ),
    [panelColors, props, rectSize, leftPad, topPad, size],
  );
}
