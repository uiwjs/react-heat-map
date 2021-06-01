import React, { useEffect, useMemo, useState } from 'react';
import { LablesWeek } from './LablesWeek';
import { LablesMonth } from './LablesMonth';
import { RectDay, RectDayDefaultProps } from './RectDay';
import { formatData, getDateToString, existColor, numberSort, isValidDate, oneDayTime } from './utils';
import Legend, { LegendProps } from './Legend';

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
  legendCellSize?: number;
  space?: number;
  rectProps?: RectDayElement | RectDayDefaultProps;
  legendRender?: LegendProps['legendRender'];
  rectRender?: <E = SVGRectElement>(
    data: E & RectDayDefaultProps & { fill?: string },
    valueItem?: HeatMapValue,
  ) => React.ReactElement | void;
  value?: Array<HeatMapValue>;
  weekLables?: string[] | false;
  monthLables?: string[] | false;
  panelColors?: Record<number, string>;
}

export default function SVG(props: SVGProps) {
  const {
    rectSize = 11,
    legendCellSize = 11,
    space = 2,
    startDate = new Date(),
    endDate,
    rectProps,
    rectRender,
    legendRender,
    value = [],
    weekLables = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthLables = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    panelColors = { 0: '#EBEDF0', 8: '#7BC96F', 4: '#C6E48B', 12: '#239A3B', 32: '#196127' },
    ...other
  } = props || {};
  const [gridNum, setGridNum] = useState(0);
  const [leftPad, setLeftPad] = useState(!!weekLables ? 28 : 5);
  const [topPad, setTopPad] = useState(!!monthLables ? 20 : 5);
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

  useEffect(() => {
    setTopPad(!!monthLables ? 20 : 5);
  }, [monthLables]);

  const initStartDate = useMemo(() => {
    if (isValidDate(startDate)) {
      return !startDate.getDay() ? startDate : new Date(startDate.getTime() - startDate.getDay() * oneDayTime);
    } else {
      const newDate = new Date();
      return new Date(newDate.getTime() - newDate.getDay() * oneDayTime);
    }
  }, [startDate]);

  return (
    <svg ref={svgRef} {...other}>
      {legendCellSize !== 0 && (
        <Legend
          legendRender={legendRender}
          panelColors={panelColors}
          rectSize={rectSize}
          legendCellSize={legendCellSize}
          leftPad={leftPad}
          topPad={topPad}
          space={space}
        />
      )}
      <LablesWeek weekLables={weekLables} rectSize={rectSize} space={space} topPad={topPad} />
      <LablesMonth
        monthLables={monthLables}
        rectSize={rectSize}
        space={space}
        leftPad={leftPad}
        colNum={gridNum}
        startDate={initStartDate}
      />
      <g transform={`translate(${leftPad}, ${topPad})`}>
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
                const currentDate = new Date(initStartDate.getTime() + oneDayTime * (idx * 7 + cidx));
                dayProps.date = getDateToString(currentDate);
                if (endDate instanceof Date && currentDate.getTime() > endDate.getTime()) {
                  return null;
                }
                if (dayProps.date && data[dayProps.date] && panelColors && Object.keys(panelColors).length > 0) {
                  dayProps.fill = existColor(data[dayProps.date].count || 0, nums, panelColors);
                } else if (panelColors && panelColors[0]) {
                  dayProps.fill = panelColors[0];
                }
                if (rectRender && typeof rectRender === 'function') {
                  const elm = rectRender(dayProps, data[dayProps.date]);
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
