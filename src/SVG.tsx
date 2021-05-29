import React, { useEffect, useMemo, useState } from 'react';
import { WeekLables } from './WeekLables';
import { RectDay, RectDayDefaultProps } from './RectDay';
import { formatData, getDateToString, existColor, numberSort } from './utils';

const oneDayTime = 24 * 60 * 60 * 1000;

export type HeatMapValue = {
  date: string;
  content: string | string[] | React.ReactNode;
  count: number;
};

export type RectDayElement<T = SVGRectElement> = RectDayDefaultProps & React.SVGProps<T>;

export interface SVGProps extends React.SVGProps<SVGSVGElement> {
  startDate?: Date;
  endDate?: Date;
  rectSize?: number;
  space?: number;
  rectProps?: RectDayElement | RectDayDefaultProps;
  renderRect?: <E = SVGRectElement>(data: E & RectDayDefaultProps & { fill?: string }) => React.ReactElement | void;
  value?: Array<HeatMapValue>;
  weekLables?: string[] | false;
  monthLables?: string[];
  panelColors?: Record<number, string>;
}

export default function SVG(props: SVGProps) {
  const {
    rectSize = 11,
    space = 2,
    startDate = new Date(),
    endDate,
    rectProps,
    renderRect,
    value = [],
    weekLables = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthLables = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    panelColors = { 0: '#EBEDF0', 8: '#7BC96F', 4: '#C6E48B', 12: '#239A3B', 32: '#196127' },
    ...other
  } = props || {};
  const [gridNum, setGridNum] = useState(0);
  const [leftPad, setLeftPad] = useState(!!weekLables ? 28 : 5);
  const svgRef = React.createRef<SVGSVGElement>();
  const nums = useMemo(() => numberSort(Object.keys(panelColors).map((item) => parseInt(item, 10))), [panelColors]);
  const data = useMemo(() => formatData(value), [value]);
  useEffect(() => setLeftPad(!!weekLables ? 28 : 5), [weekLables]);
  useEffect(() => {
    if (svgRef.current) {
      const width = svgRef.current.clientWidth - leftPad || 0;
      setGridNum(Math.floor(width / (rectSize + space)) || 0);
    }
  }, [rectSize, svgRef, space, leftPad]);
  return (
    <svg ref={svgRef} {...other}>
      <WeekLables weekLables={weekLables} rectSize={rectSize} space={space} />
      <g transform={`translate(${leftPad}, 20)`}>
        {[...Array(gridNum)].map((_, idx) => {
          return (
            <g key={idx} data-column={idx}>
              {[...Array(7)].map((_, cidx) => {
                const dayProps: RectDayElement = {
                  ...rectProps,
                  rectSize,
                  space,
                  key: cidx,
                  row: cidx,
                  column: idx,
                  fill: '#EBEDF0',
                };
                if (startDate instanceof Date) {
                  const currentDate = new Date(startDate.getTime() + oneDayTime * (idx * 7 + cidx));
                  dayProps.date = getDateToString(currentDate);
                  if (endDate instanceof Date && currentDate.getTime() > endDate.getTime()) {
                    return null;
                  }
                }
                if (dayProps.date && data[dayProps.date] && panelColors && Object.keys(panelColors).length > 0) {
                  dayProps.fill = existColor(data[dayProps.date].count || 0, nums, panelColors);
                } else if (panelColors && panelColors[0]) {
                  dayProps.fill = panelColors[0];
                }
                if (renderRect && typeof renderRect === 'function') {
                  const elm = renderRect(dayProps);
                  if (elm && React.isValidElement(elm)) {
                    return elm;
                  }
                }
                return <RectDay {...dayProps} />;
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
