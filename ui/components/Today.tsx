import { isSameDay } from 'date-fns';
import useSWR from 'swr';
import c from 'classnames';
import { DropIcon, PillIcon } from './Icons';

function TodayProgress({ data }) {
  return (
    <div className="bg-gray-300 rounded-full py-1 w-full relative mt-4 text-gray-500">
      <div className="absolute left-[0%] text-xs bottom-3">12 AM</div>
      <div className="absolute left-[12%] text-xs bottom-3">3 AM</div>
      <div className="absolute left-[24%] text-xs bottom-3">6 AM</div>
      <div className="absolute left-[36%] text-xs bottom-3">9 AM</div>
      <div className="absolute left-[48%] text-xs bottom-3">12 AM</div>
      <div className="absolute left-[60%] text-xs bottom-3">3 AM</div>
      <div className="absolute left-[72%] text-xs bottom-3">6 AM</div>
      <div className="absolute left-[84%] text-xs bottom-3">9 PM</div>
      <div className="absolute left-[96%] text-xs bottom-3">12 AM</div>

      {data.map((e) => (
        <div
          style={{ left: `${e.left * 100}%` }}
          className={c(
            e.type === 'insulin' ? 'bg-cyan-600/50 border-cyan-600' : 'bg-red-600/50 border-red-600',
            'border-2 rounded-full absolute -top-1 h-4 w-4',
          )}
        />
      ))}
    </div>
  );
}

export default function TodaySummary() {
  const { data: insulinData } = useSWR('/api/diabetes/me/logs/insulin/');
  const { data: sugarData } = useSWR('/api/diabetes/me/logs/sugar-level/');

  const data = [];

  for (const d of (insulinData?.results || [])) {
    if (isSameDay(new Date(d?.createdAt), new Date())) {
      const date = new Date(d?.createdAt);
      data.push({
        type: 'insulin',
        left: (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000) / 86400,
      });
    }
  }
  for (const d of (sugarData?.results || [])) {
    if (isSameDay(new Date(d?.createdAt), new Date())) {
      const date = new Date(d?.createdAt);
      data.push({
        type: 'sugar',
        left: (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000) / 86400,
      });
    }
  }

  return (
    <>
      <TodayProgress data={data}/>

      <div className="flex justify-center space-x-6 mt-6">
        <div className="max-w-[150px] w-full text-center">
          <div className="flex items-center space-x-2 text-red-700 text-sm justify-center">
            <DropIcon className="w-5 h-5 text-red-600"/>
            <div>Blood Sugar</div>
          </div>

          <div className="mt-2 ml-1 text-xs flex flex-col items-center space-y-0.5">
            <div className="flex items-center space-x-2">
              <div className="text-gray-600 w-7">Avg</div>
              <div className="text-gray-800">10 mg/dL</div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-gray-600 w-7">Max</div>
              <div className="text-gray-800">10 mg/dL</div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-gray-600 w-7">Min</div>
              <div className="text-gray-800">10 mg/dL</div>
            </div>
          </div>
        </div>

        <div className="max-w-[150px] w-full text-center">
          <div className="flex items-center space-x-2 text-cyan-700 text-sm justify-center">
            <PillIcon className="w-5 h-5 text-cyan-600"/>
            <div>Insulin Dosage</div>
          </div>

          <div className="mt-2 ml-1 text-xs flex flex-col items-center space-y-0.5">
            <div className="flex items-center space-x-2">
              <div className="text-gray-600 w-7">Bol</div>
              <div className="text-gray-800">20 Units</div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-gray-600 w-7">Bas</div>
              <div className="text-gray-800">10 units</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
