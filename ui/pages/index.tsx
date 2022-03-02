import dynamic from 'next/dynamic';
import { useState } from 'react';

import DashboardLayout from '../layouts/DashboardLayout';
import { PillIcon, DropIcon } from '../components/Icons';
import Button from '../components/Button';
import AddBloodSugar from '../components/AddBloodSugar';
import AddInsulinLevel from '../components/AddInsulinLevel';
import Insulin from '../components/Insulin';
import BloodSugar from '../components/BloodSugar';
import TodaySummary from "../components/Today";

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
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
};
const series = [
  {
    name: 'series-1',
    type: 'column',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
  {
    name: 'series-2',
    type: 'scatter',
    data: [31, 42, 46, 51, 50, 61, 71, 94],
  },
  {
    name: 'series-2',
    type: 'scatter',
    data: [31, 42, 46, 51, 50, 61, 71, 94],
  },
];

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function HomePage() {
  const [isBloodDialogOpen, setBOpen] = useState(false);
  const [isInsulinDialogOpen, setIOpen] = useState(false);

  return (
    <DashboardLayout>
      <AddBloodSugar isOpen={isBloodDialogOpen} onClose={() => setBOpen(false)} />
      <AddInsulinLevel isOpen={isInsulinDialogOpen} onClose={() => setIOpen(false)} />

      <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Todays Overview
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0 flex items-center space-x-2">
              <Button kind="secondary" onClick={() => setIOpen(true)}>Add Insulin</Button>
              <Button kind="secondary" onClick={() => setBOpen(true)}>Add Blood Sugar</Button>
            </div>
          </div>
        </div>
        <div className="px-4 py-5">
          <TodaySummary />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 mt-4">
        <BloodSugar setOpen={setBOpen} />
        <Insulin setIOpen={setIOpen} />
      </div>
    </DashboardLayout>
  );
}
