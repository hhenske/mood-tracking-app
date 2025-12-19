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
        <h3 className="ext-xs lg:text-sm font-semibold text-neutral6 mb-2">
          Average {type === 'mood' ? 'Mood' : 'Sleep'}
          <span className="ml-1 text-[10px] lg:text-xs font-normal">(Last 5 Check-ins)</span>
        </h3>

        <div className="bg-neutral2 rounded-lg p-3 lg:p-4 mb-4 lg:mb-6">
          <p className="text-sm lg:text-base font-semibold text-neutral9 mb-1">
            {emptyStates[type].title}
          </p>
          <p className="text-xs lg:text-sm text-neutral6">
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
      <h3 className="text-xs lg:text-sm font-semibold text-neutral6 mb-2">
        Average {type === 'mood' ? 'Mood' : 'Sleep'}
        <span className="mml-1 text-[10px] lg:text-xs font-normal">
          (Last 5 Check-ins)
          </span>
      </h3>

      <div className={`${bgColor} rounded-lg p-3 lg:p-4 mb-4`}>
        {/* Value row */}
        <div className="flex items-center gap-2 mb-2">
          {type === 'mood' && (
            <div className="scale-90 lg:scale-100">
              <MoodIcon mood={data.value} />
            </div>
          )}

          {type === 'sleep' && (
            <span className="text-lg lg:text-xl text-neutral0">💤</span>
          )}

          <p className={`text-base lg:text-lg font-semibold ${valueTextColor}`}>
            {type === 'mood' ? data.value : data.hours}
          </p>
        </div>

        {/* Trend */}
        <div className={`flex items-center gap-1 text-xs lg:text-sm ${helperTextColor}`}>
          <span>
            {data.trend === 'same' ? '→' : data.trend === 'increase' ? '↗' : '↘'}
          </span>
          <p>{data.comparison}</p>
        </div>
      </div>
    </div>
  );
}