import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import iconNeutral from '../../assets/images/icon-neutral-white.svg';
import iconHappy from '../../assets/images/icon-happy-white.svg';
import iconVeryHappy from '../../assets/images/icon-very-happy-white.svg';
import iconSad from '../../assets/images/icon-sad-white.svg';
import iconVerySad from '../../assets/images/icon-very-sad-white.svg';
import zzIcon from '../../assets/images/icon-sleep.svg'; 


export default function MoodTrendsChart({ moodEntries }) {
  // Transform the data for the chart
  const transformData = (entries) => {
    return entries.map(entry => {
      const date = new Date(entry.createdAt);
      const monthDay = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate().toString().padStart(2, '0')}`;
      
      return {
        date: monthDay,
        sleep: entry.sleepHours,
        mood: entry.mood
      };
    });
  };

  const chartData = transformData(moodEntries).slice(-11); // Last 11 entries

  // Custom colors based on mood value
  const getMoodColor = (mood) => {
  switch (mood) {
    case 2: // very good (amber)
      return 'hsl(38, 90%, 70%)';
    case 1: // good (green)
      return 'hsl(135, 65%, 70%)';
    case 0: // neutral (purple)
      return 'hsl(255, 70%, 78%)';
    case -1: // bad (blue)
      return 'hsl(210, 80%, 70%)';
    case -2: // very bad (red)
      return 'hsl(0, 80%, 72%)';
    default:
      return 'hsl(255, 70%, 78%)';
  }
};

    const sleepTicks = [1, 3.5, 5.5, 7.5, 9.5];

    const SleepTick = ({ x, y, payload }) => {
        let label = '';

        if (payload.value < 2) label = '0–2 hours';
        else if (payload.value < 5) label = '3–4 hours';
        else if (payload.value < 7) label = '5–6 hours';
        else if (payload.value < 9) label = '7–8 hours';
        else label = '9+ hours';

        // Anchor the label to the container's left padding (slightly nudged)
        // nudge closer to the bars so there's less empty space
        const leftAlign = 30; // nudged a bit to move labels right
        const offset = leftAlign - x;

        return (
            <g transform={`translate(${x}, ${y})`}>
            <image
                href={zzIcon}
                x={offset - 14}
                y={-7}
                width={12}
                height={12}
                opacity={0.6}
            />
            <text
                x={offset}
                y={4}
                fontSize={12}
                fill="#6B7280"
                textAnchor="start"
            >
                {label}
            </text>
            </g>
        );
    };

    // Get mood icon
  const getMoodIcon = (mood) => {
    if (mood === 2) return iconVeryHappy;  // Great
    if (mood === 1) return iconHappy;       // Good
    if (mood === 0) return iconNeutral;     // Neutral
    if (mood === -1) return iconSad;        // Bad
    if (mood === -2) return iconVerySad;    // Terrible
    return iconNeutral;
  };


 // Custom shape for rounded bars with icons
  const RoundedBar = (props) => {
    const { fill, x, y, width, height, payload } = props;
    const radius = width /2;
    const iconSize = 24;
    const iconSrc = getMoodIcon(payload.mood);

    return (
      <g>
        {/* Rounded rectangle bar */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={radius}
          ry={radius}
        />
        {/* Mood icon (image) centered above the bar */}
        <image
          href={iconSrc}
          x={x + (width - iconSize) / 2}
          y={y + 6}
          width={iconSize}
          height={iconSize}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-0 text-neutral9">Mood and sleep trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 28, right: 8, left: 56, bottom: 0 }} barCategoryGap={'2%'} barGap={1}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.15} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            type="number"
            domain={[0, 10]}
            ticks={sleepTicks}
            tick={<SleepTick />}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
            formatter={(value, name) => {
              if (name === 'sleep') return [`${value} hours`, 'Sleep'];
              return value;
            }}
          />
          <Bar dataKey="sleep" shape={<RoundedBar />} barSize={34}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getMoodColor(entry.mood)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}