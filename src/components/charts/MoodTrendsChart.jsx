import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import iconNeutral from '../../assets/images/icon-neutral-white.svg';
import iconHappy from '../../assets/images/icon-happy-white.svg';
import iconVeryHappy from '../../assets/images/icon-very-happy-white.svg';
import iconSad from '../../assets/images/icon-sad-white.svg';
import iconVerySad from '../../assets/images/icon-very-sad-white.svg';
import zzIcon from '../../assets/images/icon-sleep.svg'; 


export default function MoodTrendsChart({ moodEntries }) {
  const isMobile = window.innerWidth < 640;


// Transform the data for the chart
  const transformData = (entries) => {
    return entries.map(entry => {
      const date = new Date(entry.createdAt);
      return {
        date,
        sleep: entry.sleepHours,
        mood: entry.mood
      };
    });
    };
  const visibleBars = isMobile ? 4 : 11;
  const chartData = transformData(moodEntries).slice(-visibleBars);



  
  // Custom colors based on mood value
  const getMoodColor = (mood) => {
    switch (mood) {
      case 2: return 'hsl(38, 90%, 70%)';
      case 1: return 'hsl(135, 65%, 70%)';
      case 0: return 'hsl(255, 70%, 78%)';
      case -1: return 'hsl(210, 80%, 70%)';
      case -2: return 'hsl(0, 80%, 72%)';
      default: return 'hsl(255, 70%, 78%)';
    }
  };

  /* ---------- Axis Ticks ---------- */

  const DateTick = ({ x, y, payload }) => {
    const date = payload.value;
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();

    return (
      <g transform={`translate(${x}, ${y + 10})`}>
        <text
          x={-8}
          textAnchor="right"
          fontSize={isMobile ? 8 : 9}
          fill="#6B7280"
        >
          {month}
        </text>
        <text
          y={14}
          textAnchor="left"
          fontSize={isMobile ? 9 : 10}
          fontWeight="600"
          fill="#111827"
        >
          {day}
        </text>
      </g>
    );
  };

  const SleepTick = ({ x, y, payload }) => {
  let label = '';

  if (payload.value < 2) label = '0–2 hours';
  else if (payload.value < 5) label = '3–4 hours';
  else if (payload.value < 7) label = '5–6 hours';
  else if (payload.value < 9) label = '7–8 hours';
  else label = '9+ hours';

    return (
      <g transform={`translate(${x}, ${y})`}>
        <image
          href={zzIcon}
          x={-18}
          y={-6}
          width={isMobile ? 8 : 10}
          height={isMobile ? 8 : 10}
          opacity={0.6}
        />
        <text
          x={-4}
          y={4}
          fontSize={isMobile ? 9 : 10}
          fill="#6B7280"
          textAnchor="start"
          transform="scale(0.9, 1)"
        >
          {label}
        </text>
      </g>
    );
  };

  /* ---------- Bar Shape ---------- */

  const getMoodIcon = (mood) => {
    if (mood === 2) return iconVeryHappy;
    if (mood === 1) return iconHappy;
    if (mood === 0) return iconNeutral;
    if (mood === -1) return iconSad;
    if (mood === -2) return iconVerySad;
    return iconNeutral;
  };

  const RoundedBar = (props) => {
    const { fill, x, y, width, height, payload } = props;
    const radius = width / 2;
    const iconSize = isMobile ? 18 : 24;
    const iconSrc = getMoodIcon(payload.mood);

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={radius}
          ry={radius}
        />
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

  /* ---------- Render ---------- */

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6">
      <h2 className="text-lg lg:text-xl font-semibold mb-0 text-neutral9">
        Mood and sleep trends
      </h2>

      <ResponsiveContainer width="100%" height={isMobile ? 260 : 300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 4, left: 4, bottom: 0 }}
          barCategoryGap="4%"
          barGap={2}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            opacity={0.15}
          />

          <XAxis
            dataKey="date"
            tick={<DateTick />}
            interval={isMobile ? 1 : 0}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            height={40}
          />

          <YAxis
            type="number"
            domain={[0, 10]}
            ticks={[1, 2.5, 4, 5.5, 7]}
            tick={<SleepTick />}
            axisLine={false}
            tickLine={false}
            width={isMobile ? 44 : 56}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}
            formatter={(value, name) =>
              name === 'sleep' ? [`${value} hours`, 'Sleep'] : value
            }
          />

          <Bar
            dataKey="sleep"
            shape={<RoundedBar />}
            barSize={isMobile ? 22 : 34}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getMoodColor(entry.mood)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
