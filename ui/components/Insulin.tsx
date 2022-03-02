import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { startOfDay, format } from 'date-fns';
import Button from './Button';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

function groupBy(list, criteria) {
  return list.reduce((prev, curr) => {
    const group = criteria(curr);
    if (!prev[group]) {
      prev[group] = [];
    }
    prev[group].push(curr);
    return prev;
  }, {});
}

export default function Insulin({ setIOpen }) {
  const { data } = useSWR('/api/diabetes/me/logs/insulin/');

  const aggregated = groupBy(data?.results || [], (i) => {
    const date = new Date(i.createdAt);
    return format(startOfDay(date), 'yyyy-MM-dd');
  });

  console.log(Object.values(aggregated).map((v) => new Date(v[0].createdAt)));

  const options = {
    chart: {
      id: 'basic-bar',
      zoom: {
        enabled: false,
      },
    },
    markers: {
      size: 5,
    },
    fill: {
      opacity: 0.8,
    },
    stroke: {
      show: false,
    },
    yaxis: [
      {
        labels: {
          formatter(val) {
            return val.toFixed(0);
          },
        },
      },
    ],
    xaxis: {
      categories: Object.values(aggregated).map((v) => v[0].createdAt),
      labels: {
        formatter(value, timestamp) {
          return value && format(new Date(value), 'MMM dd');
        },
      },
    },
  };

  const series = [
    {
      name: 'Average',
      type: 'column',
      data: Object.values(aggregated).map((val) => val.reduce((a, i) => a + i.quantity, 0) / val.length),
    },
    {
      name: 'Min',
      type: 'scatter',
      data: Object.values(aggregated).map((val) => val.reduce((a, i) => Math.min(a, i.quantity), Infinity)),
    },
    {
      name: 'Max',
      type: 'scatter',
      data: Object.values(aggregated).map((val) => val.reduce((a, i) => Math.max(a, i.quantity), 0)),
    },
  ];

  return (
    <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Insulin dosage
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0 flex items-center space-x-2">
            <Button kind="secondary" onClick={() => setIOpen(true)}>Add Insulin</Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <ApexCharts
          options={options}
          series={series}
          type="line"
        />
      </div>
    </div>
  );
}
