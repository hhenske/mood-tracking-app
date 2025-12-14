import MoodIcon from './MoodIcon.jsx';

export default function MoodCard({ type, hasData, data }) {
  const emptyStates = {
    mood: {
      title: "Keep tracking!",
      subtitle: "Log 5 check-ins to see your average mood."
    },
    sleep: {
      title: "Not enough data yet!",
      subtitle: "Track 5 nights of sleep to view average sleep."
    }
  };

  // Empty state
  if (!hasData) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-neutral6 mb-2">
          Average {type === 'mood' ? 'Mood' : 'Sleep'}
          <span className="ml-1 text-xs font-normal">(Last 5 Check-ins)</span>
        </h3>

        <div className="bg-neutral2 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-neutral9 mb-1">
            {emptyStates[type].title}
          </p>
          <p className="text-sm text-neutral6">
            {emptyStates[type].subtitle}
          </p>
        </div>
      </div>
    );
  }

  // With data
  const bgColor = type === 'mood' ? 'bg-neutral2' : 'bg-blue6';
  const valueTextColor = type === 'mood' ? 'text-neutral9' : 'text-neutral0';
  const helperTextColor = type === 'mood' ? 'text-' : 'text-blue1';

  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral6 mb-2">
        Average {type === 'mood' ? 'Mood' : 'Sleep'}
        <span className="ml-1 text-xs font-normal">(Last 5 Check-ins)</span>
      </h3>

      <div className={`${bgColor} rounded-lg p-4 mb-4`}>
        <div className="flex items-center gap-2 mb-2">
          {type === 'mood' && <MoodIcon mood={data.value} />}
          {type === 'sleep' && <span className="text-xl text-neutral0">💤</span>}

          <p className={`text-lg font-semibold ${valueTextColor}`}>
            {type === 'mood' ? data.value : data.hours}
          </p>
        </div>

        <div className={`flex items-center gap-1 text-sm ${helperTextColor}`}>
          <span>
            {data.trend === 'same' ? '→' : data.trend === 'increase' ? '↗' : '↘'}
          </span>
          <p>{data.comparison}</p>
        </div>
      </div>
    </div>
  );
}