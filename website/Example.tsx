import { Fragment, useState } from 'react';
import Tooltip from '@uiw/react-tooltip';
import HeatMap, { HeatMapValue } from '../';
import styles from './App.module.less';

const data1: HeatMapValue[] = [
  { date: '2016/01/11', count: 2, content: '' },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
  { date: '2016/03/02', count: 5, content: '' },
  { date: '2016/03/04', count: 11, content: '' },
  { date: '2016/03/14', count: 31, content: '' },
  { date: '2016/03/16', count: 2, content: '' },
  { date: '2016/04/11', count: 2, content: '' },
  { date: '2016/05/01', count: 5, content: '' },
  { date: '2016/05/02', count: 5, content: '' },
  { date: '2016/05/04', count: 11, content: '' },
  { date: '2016/05/14', count: 31, content: '' },
  { date: '2016/05/16', count: 2, content: '' },
  { date: '2016/05/17', count: 2, content: '' },
  { date: '2016/05/18', count: 2, content: '' },
  { date: '2016/05/19', count: 8, content: '' },
  { date: '2016/05/20', count: 6, content: '' },
  { date: '2016/05/21', count: 41, content: '' },
  { date: '2016/05/22', count: 6, content: '' },
  { date: '2016/06/11', count: 2, content: '' },
  { date: '2016/07/01', count: 5, content: '' },
  { date: '2016/07/02', count: 5, content: '' },
  { date: '2016/07/04', count: 11, content: '' },
  { date: '2016/07/14', count: 31, content: '' },
  { date: '2016/07/16', count: 2, content: '' },
  { date: '2016/07/17', count: 2, content: '' },
  { date: '2016/07/18', count: 2, content: '' },
  { date: '2016/07/19', count: 8, content: '' },
  { date: '2016/07/20', count: 6, content: '' },
  { date: '2016/07/21', count: 41, content: '' },
  { date: '2016/07/22', count: 6, content: '' },
  ...[...Array(17)].map((_, idx) => ({ date: `2016/08/${idx + 10}`, count: idx, content: '' })),
];
const data2: HeatMapValue[] = [
  { date: '2016/04/02', count: 5, content: '' },
  { date: '2016/04/04', count: 11, content: '' },
  { date: '2016/04/14', count: 31, content: '' },
  { date: '2016/04/16', count: 2, content: '' },
  { date: '2016/04/17', count: 2, content: '' },
  { date: '2016/04/18', count: 2, content: '' },
  { date: '2016/04/19', count: 8, content: '' },
  { date: '2016/04/11', count: 2, content: '' },
  { date: '2016/04/01', count: 5, content: '' },
  { date: '2016/04/02', count: 5, content: '' },
  { date: '2016/04/04', count: 11, content: '' },
  { date: '2016/04/14', count: 31, content: '' },
  { date: '2016/04/16', count: 2, content: '' },
  { date: '2016/04/17', count: 2, content: '' },
  { date: '2016/04/18', count: 2, content: '' },
  { date: '2016/04/19', count: 8, content: '' },
  { date: '2016/04/20', count: 6, content: '' },
  { date: '2016/04/21', count: 41, content: '' },
  { date: '2016/04/22', count: 6, content: '' },
];

const darkColor = { 0: 'rgb(255 255 255 / 25%)', 8: '#7BC96F', 4: '#C6E48B', 12: '#239A3B', 32: '#196127' };

export default function Example() {
  const [value, setValue] = useState(data1);
  const [selectaDate, setSelectaDate] = useState();
  const [enableEndDate, setEnableEndDate] = useState(false);
  const [enableDark, setEnableDark] = useState(false);
  const [enableCircle, setEnableCircle] = useState(false);
  const [rectSize, setRectSize] = useState(11);
  const [legendCellSize, setLegendCellSize] = useState<number | undefined>();
  const [enableWeekLables, setEnableWeekLables] = useState<false | undefined | string[]>(undefined);
  const [enableMonthLables, setEnableMonthLables] = useState<false | undefined | string[]>(undefined);
  return (
    <Fragment>
      <div className={styles.example} style={{ width: 663 }}>
        <HeatMap
          style={{
            backgroundColor: enableDark ? '#000' : '#fff',
            color: enableDark ? '#888' : '#000',
          }}
          panelColors={enableDark ? darkColor : undefined}
          width={663}
          rectSize={rectSize}
          legendCellSize={legendCellSize}
          weekLables={enableWeekLables}
          monthLables={enableMonthLables}
          startDate={new Date('2016/01/01')}
          endDate={enableEndDate ? new Date('2016/6/01') : undefined}
          value={value}
          rectProps={{
            rx: !enableCircle ? 0 : 5,
            onClick: (e) => {
              setSelectaDate((e.target as any).dataset.date);
            },
          }}
          rectRender={(props, data) => {
            // if (!data.count) return <rect {...props} />;
            return (
              <Tooltip key={data.index} placement="top" content={`count: ${data.count || 0}`}>
                <rect {...props} />
              </Tooltip>
            );
          }}
          // rectRender={({
          //   rectSize,
          //   column,
          //   space,
          //   row,
          //   fill,
          //   date,
          //   rx,
          //   ...props
          // }: RectDayElement<SVGCircleElement>) => {
          //   if (!enableCircle) return undefined;
          //   return (
          //     <circle
          //       {...props}
          //       fill={fill}
          //       r={rectSize! / 2}
          //       cx={column! * (rectSize! + space!) + 4}
          //       cy={(rectSize! + space!) * row! + 5}
          //       width={rectSize}
          //       height={rectSize}
          //     />
          //   );
          // }}
        />
      </div>
      <div style={{ width: 663, margin: '0 auto' }} className={styles.tools}>
        <div style={{ paddingLeft: 10 }}>
          <button onClick={() => setValue(data1)}>Value 1</button>
          <button onClick={() => setValue(data2)}>Value 2</button>
          <span>{selectaDate}</span>
        </div>
        <label>
          <input type="checkbox" checked={enableEndDate} onChange={(e) => setEnableEndDate(e.target.checked)} />
          endDate = {enableEndDate ? '2016/6/01' : 'undefined'}
        </label>
        <label>
          <input type="checkbox" checked={enableDark} onChange={(e) => setEnableDark(e.target.checked)} />
          {enableDark ? 'Dark' : 'Light'}
        </label>

        <label>
          <input type="checkbox" checked={enableCircle} onChange={(e) => setEnableCircle(e.target.checked)} />
          {enableCircle ? 'Circle' : 'Rect'}
        </label>

        <label>
          <input
            type="radio"
            name="weekLables"
            checked={enableWeekLables === undefined}
            onChange={(e) => setEnableWeekLables(undefined)}
          />
          weekLables = undefined, Default: {JSON.stringify(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])}
        </label>
        <label>
          <input
            type="radio"
            name="weekLables"
            checked={enableWeekLables === false}
            onChange={(e) => setEnableWeekLables(false)}
          />
          weekLables = false
        </label>
        <label>
          <input
            type="radio"
            name="weekLables"
            checked={Array.isArray(enableWeekLables)}
            onChange={(e) => setEnableWeekLables(['日', '一', '', '三', '', '五', '六'])}
          />
          weekLables = {JSON.stringify(['日', '一', '', '三', '', '五', '六'])}
        </label>

        <label>
          <input
            type="radio"
            name="monthLables"
            checked={enableMonthLables === undefined}
            onChange={(e) => setEnableMonthLables(undefined)}
          />
          monthLables = undefined, Default:{' '}
          {JSON.stringify(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])}
        </label>
        <label>
          <input
            type="radio"
            name="monthLables"
            checked={enableMonthLables === false}
            onChange={(e) => setEnableMonthLables(false)}
          />
          monthLables = false
        </label>
        <label>
          <input
            type="radio"
            name="monthLables"
            checked={Array.isArray(enableMonthLables)}
            onChange={(e) =>
              setEnableMonthLables(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'])
            }
          />
          monthLables = {JSON.stringify(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'])}
        </label>

        <div style={{ display: 'flex' }}>
          <label>
            <input type="radio" name="rectSize" checked={rectSize === 11} onChange={(e) => setRectSize(11)} />
            rectSize = 11
          </label>
          <label>
            <input type="radio" name="rectSize" checked={rectSize === 12} onChange={(e) => setRectSize(12)} />
            rectSize = 12
          </label>
          <label>
            <input type="radio" name="rectSize" checked={rectSize === 14} onChange={(e) => setRectSize(14)} />
            rectSize = 14
          </label>
        </div>

        <div style={{ display: 'flex' }}>
          <label>
            <input
              type="number"
              value={legendCellSize || ''}
              onChange={(e) => setLegendCellSize(Number(e.target.value) || 0)}
            />
            legendCellSize = {legendCellSize}
          </label>
        </div>
      </div>
    </Fragment>
  );
}
