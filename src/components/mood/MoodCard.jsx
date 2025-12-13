import MoodIcon from './MoodIcon.jsx';

export default function MoodCard({ type, hasData, data }) {  
    //Default for when there's not enough data
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

    //Render empty stat
    if (!hasData) {
        return (
            <div className="bg-neutral0 rounded-lg p-4 shadow">
        <h3 className="text-sm font-semibold text-neutral9 mb-3">
          Average {type === 'mood' ? 'Mood' : 'Sleep'} (Last 5 Check-ins)
        </h3>
        <div className="bg-blue1 rounded-lg p-4">
        <p className="text-lg font-bold text-neutral9 mb-1">
            {emptyStates[type].title}
          </p>
          <p className="text-sm text-neutral6">
            {emptyStates[type].subtitle}
          </p>
        </div>
      </div>
        );
    }

    //render with data
    const bgColor = type === 'mood' ? 'gb-blue2' : 'bg-blue6';
    const textColor = type === 'mood' ? 'text-neutral9' : 'text-white';

    return (
        <div className="bg-neutral0 rounded-lg p-4 shadow">
            <h3 className="text-sm font-semibold text-neutral9 mb-3">
                Average {type === 'mood' ? 'Mood' : 'Sleep'} (Last 5 Check-ins)
            </h3>
            <div className={`${bgColor} rounded-lg p-4 ${textColor}`}>
                <div className="flex items-center gap-2 mb-2">
                    {type === 'mood' && <MoodIcon mood={data.value} />}
                    {type === 'sleep' && <span className="text-xl">💤</span>}
                    <p className="text-lg font-bold">
                        {type === 'mood' ? data.value : data.hours}
                    </p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <span>{data.trend === 'same' ? '→' : data.trend === 'increase' ? '↗' : '↘'}</span>
                    <p>{data.comparison}</p>
                </div>
            </div>
        </div>
    );
}