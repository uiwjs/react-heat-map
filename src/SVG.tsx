import React, { useEffect, useState } from 'react';

export type SVGProps = {
  rectSize: number;
};

export default function SVG(props: SVGProps) {
  const { rectSize = 14 } = props || {};
  const svgRef = React.createRef<SVGSVGElement>();
  const [gridNum, setGridNum] = useState(0);
  useEffect(() => {
    if (svgRef.current) {
      const width = svgRef.current.clientWidth || 0;
      setGridNum(Math.ceil(width / rectSize) || 0);
    }
  }, [rectSize, svgRef]);
  return (
    <svg ref={svgRef}>
      {[...Array(gridNum)].map((_, idx) => {
        console.log(idx);
        return <g key={idx} transform={`translate(${rectSize * idx}, 0)`}></g>;
      })}
    </svg>
  );
}
