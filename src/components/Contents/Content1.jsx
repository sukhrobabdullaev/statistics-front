import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

const time = [
  new Date(2024, 1, 0),
  new Date(2024, 2, 0),
  new Date(2024, 3, 0),
  new Date(2024, 4, 0),
  new Date(2024, 5, 0),
  new Date(2024, 6, 0),
  new Date(2024, 7, 0),
];

const a = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const b = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const c = [2400, 2210, 2290, 2000, 2181, 2500, 2100];

const getPercents = (array) =>
  array.map((v, index) => (100 * v) / (a[index] + b[index] + c[index]));

export default function Content1() {
  return (
    <div className="flex items-center">
      <BarChart
        series={[
          { data: [35, 44, 24, 34] },
          { data: [51, 6, 49, 30] },
          { data: [15, 25, 30, 50] },
        ]}
        height={300}
        width={400}
        xAxis={[{ data: ["Ko'rsatma", "Chaqiruv", "Sud"], scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
      <LineChart
        width={500}
        height={300}
        series={[
          {
            data: getPercents(a),
            type: "line",
            label: "Ko'rsatma",
            area: true,
            stack: "total",
            showMark: false,
          },
          {
            data: getPercents(b),
            type: "line",
            label: "Chaqiruv",
            area: true,
            stack: "total",
            showMark: false,
          },
          {
            data: getPercents(c),
            type: "line",
            label: "Sud",
            area: true,
            stack: "total",
            showMark: false,
          },
        ]}
        xAxis={[
          {
            scaleType: "time",
            data: time,
            min: time[0].getTime(),
            max: time[time.length - 1].getTime(),
          },
        ]}
      />
    </div>
  );
}
