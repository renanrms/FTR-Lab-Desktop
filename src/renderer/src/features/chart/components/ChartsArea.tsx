// import { Container } from '@mui/material'
import { Chart } from './Chart'

const series = [
  {
    XAxis: { key: 't', name: 'Tempo' },
    YAxis: { key: 'distance', name: 'Distância' },
    data: [
      { t: 0.0, distance: 0.3 },
      { t: 0.4, distance: 0.6 },
      { t: 0.8, distance: 0.7 },
      { t: 1.5, distance: 1.0 },
      { t: 1.8, distance: 1.2 },
      { t: 2.1, distance: 1.5 },
    ],
  },
  {
    XAxis: { key: 't', name: 'Tempo' },
    YAxis: { key: 'temperature', name: 'Temperatura' },
    data: [
      { t: 0.1, temperature: 25.3 },
      { t: 0.2, temperature: 25.6 },
      { t: 0.3, temperature: 25.7 },
      { t: 0.4, temperature: 25.0 },
      { t: 0.5, temperature: 25.2 },
      { t: 0.6, temperature: 25.5 },
      { t: 0.65, temperature: 25.5 },
      { t: 0.71, temperature: 25.5 },
      { t: 0.8, temperature: 25.5 },
      { t: 0.9, temperature: 25.5 },
    ],
  },
  {
    XAxis: { key: 't', name: 'Tempo' },
    YAxis: { key: 'pressure', name: 'Pressão' },
    data: [
      { t: 0.1, pressure: 1.008 },
      { t: 0.2, pressure: 1.015 },
      { t: 0.3, pressure: 1.025 },
      { t: 0.4, pressure: 1.05 },
      { t: 0.5, pressure: 1.01 },
      { t: 0.6, pressure: 1.005 },
      { t: 0.65, pressure: 1.08 },
      { t: 0.71, pressure: 1.082 },
      { t: 0.8, pressure: 1.084 },
      { t: 0.9, pressure: 1.089 },
    ],
  },
]

export function ChartsArea() {
  return (
    <div className="w-full h-full flex justify-center overflow-auto">
      <div className="max-w-7xl flex justify-between flex-wrap">
        {series.map((serie, index) => (
          <Chart
            className="w-[280px] md:w-[420px] h-[300px] lg:w-[550px] lg:h-[350px] m-4"
            XAxis={serie.XAxis}
            YAxis={serie.YAxis}
            data={serie.data}
            key={index}
          ></Chart>
        ))}
      </div>
    </div>
  )
}
