import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import iconNeutral from '../../assets/images/icon-neutral-white.svg';
import iconHappy from '../../assets/images/icon-happy-white.svg';
import iconVeryHappy from '../../assets/images/icon-very-happy-white.svg';
import iconSad from '../../assets/images/icon-sad-white.svg';
import iconVerySad from '../../assets/images/icon-very-sad-white.svg';



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

  const chartData = transformData(moodEntries);

  // Custom colors based on mood value
  const getMoodColor = (mood) => {
    if (mood === 2) return '#4ADE80';
    if (mood === 1) return '#60A5FA';
    if (mood === 0) return '#A78BFA';
    if (mood === -1) return '#F87171';
    if (mood === -2) return '#FB923C';
    return '#A78BFA';
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
    const radius = 20;
    
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
        {/* Mood icon at top */}
        <text
          x={x + width / 2}
          y={y - 10}
          textAnchor="middle"
          fontSize="24"
        >
          {getMoodIcon(payload.mood)}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-neutral9">Mood and sleep trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            label={{ 
              value: '# of hours', 
              angle: -90, 
              position: 'insideLeft', 
              style: { fontSize: 12, fill: '#6B7280' } 
            }}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
            formatter={(value, name) => {
              if (name === 'sleep') return [`${value} hours`, 'Sleep'];
              return value;
            }}
          />
          <Bar dataKey="sleep" shape={<RoundedBar />}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getMoodColor(entry.mood)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}