import type { CSSProperties } from 'react';
import type { HeatMapValue, SVGProps } from './SVG';
import React from 'react';

export const rectStyle: CSSProperties = {
  display: 'block',
  cursor: 'pointer',
}

export interface RectProps extends React.SVGProps<SVGRectElement> {
  value?: HeatMapValue & {
    column: number;
    row: number;
    index: number;
  };
  render?: SVGProps['rectRender']
}

export const Rect = (props: RectProps) => {
  const { style, value, render, key, ...reset} = props;
  const rectProps: React.SVGProps<SVGRectElement> = {
    ...reset,
    style: {
      display: 'block',
      cursor: 'pointer',
      ...style,
    }
  }

  if (render && typeof render === 'function') {
    const elm = render({ ...rectProps }, value as Required<RectProps>['value']);
    if (elm && React.isValidElement(elm)) {
      return elm;
    }
  }

  return <rect {...rectProps} />;
};
