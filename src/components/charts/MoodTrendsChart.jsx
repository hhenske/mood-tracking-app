import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  // Custom bar component
  const CustomBar = (props) => {
    const { fill, x, y, width, height, payload } = props;
    const moodColor = getMoodColor(payload.mood);
    return <rect x={x} y={y} width={width} height={height} fill={moodColor} />;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-neutral9">Mood and sleep trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis 
            label={{ value: '# of hours', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Bar dataKey="sleep" shape={<CustomBar />} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}