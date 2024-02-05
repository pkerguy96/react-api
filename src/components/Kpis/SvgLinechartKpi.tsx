//@ts-nocheck
import { useEffect, useRef, useState } from "react";

interface Props {
  data: number[];
  size?: number;
  color?: string;
}

const SvgLineChartKpi = ({ data = [], size = 1, color = "blue" }: Props) => {
  const [props, setProps] = useState({ width: 0, height: 0 });
  const svg = useRef();
  const maxX = data.length - 1;
  const maxY = Math.max(...data);

  const getX = (index: number) => (props.width / maxX) * index;
  const getY = (value: number) => (props.height / maxY) * (maxY - value);

  const getPath = () => {
    if (data.length < 2) {
      return "";
    }

    let path = `M${getX(0)} ${getY(data[0])}`;

    for (let i = 1; i < data.length - 1; i++) {
      const xMid = (getX(i) + getX(i + 1)) / 2;
      const yMid = (getY(data[i]) + getY(data[i + 1])) / 2;
      path += ` Q${getX(i)} ${getY(data[i])} ${xMid} ${yMid}`;
    }

    path += ` T${getX(data.length - 1)} ${getY(data[data.length - 1])}`;

    return path;
  };

  useEffect(() => {
    if (svg.current)
      setProps({
        width: svg.current?.clientWidth,
        height: svg.current?.clientHeight,
      });

    window.addEventListener("resize", () => {
      if (svg.current)
        setProps({
          width: svg.current?.clientWidth,
          height: svg.current?.clientHeight,
        });
    });

    return window.removeEventListener("resize", () => {
      if (svg.current)
        setProps({
          width: svg.current?.clientWidth,
          height: svg.current?.clientHeight,
        });
    });
  }, [svg]);

  return (
    <svg
      ref={svg}
      width="100%"
      style={{
        aspectRatio: "16/9",
        marginBottom: "2px",
        filter: `drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))`,
      }}
      viewBox={`0 0 ${props.width} ${props.height}`}
    >
      <path d={getPath()} stroke={color} strokeWidth={size} fill="none" />
    </svg>
  );
};

export default SvgLineChartKpi;
