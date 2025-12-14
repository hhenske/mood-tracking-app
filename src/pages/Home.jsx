import '../index.css';
import App from '../App.jsx';
import Header from '../components/layout/Header.jsx';
import MoodCard from '../components/mood/MoodCard.jsx';
import MoodTrendsChart from '../components/charts/MoodTrendsChart'
import moodData from '../data/data.json'


export default function Home() {

    const userName= "Sarah";

  // Get current date formatted
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);
    
    // Add ordinal suffix (st, nd, rd, th)
    const day = date.getDate();
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    // Replace the day number with day + suffix
    return formatted.replace(day.toString(), `${day}${suffix(day)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-main text-neutral9 p-6">
      <Header />

       {/* Welcome Message */}
        <div className="flex flex-col items-center justify-center px-6 py-20">
            <h3 className="text-md font-bold text-blue6 mb-6">Hello, {userName}!</h3>
            <h1 className="text-5xl font-bold text-neutral9 mb-4">How are you feeling today?</h1>
            <p className="text-sm text-neutral6 text-center max-w-xl">{getCurrentDate()}</p>
            <button className="bg-blue6 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue7 transition-colors mt-14">
          Log Today's Mood
        </button>
        </div>

        {/* Charts Section */}
        <div className="px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-[1fr,2fr] gap-4">

            {/* Left - Mood Cards */}
            <div className="bg-neutral0 rounded-lg p-4 shadow-sm">
            <MoodCard 
                type="mood" 
                hasData={true}  // Change to false to see "Keep tracking!" version
                data={{
                value: "Neutral",
                trend: "same",
                comparison: "Same as the previous 5 check-ins"
                }}
            />
            <MoodCard 
                type="sleep" 
                hasData={true}  // Change to false to see "Not enough data yet!" version
                data={{
                hours: "5-6 Hours",
                trend: "increase",
                comparison: "Increase from the previous 5 check-ins"
                }}
            />
            </div>

            {/* Right Chart */}
                <div className="bg-white rounded-lg p-6">
                    <MoodTrendsChart moodEntries={moodData.moodEntries} />
                </div>
            </div>
        </div>
    </div>
  );
}