import { useState, useEffect } from 'react';
import '../index.css';
import Header from '../components/layout/Header.jsx';
import MoodCard from '../components/mood/MoodCard.jsx';
import MoodTrendsChart from '../components/charts/MoodTrendsChart'
import moodData from '../data/data.json'
import MoodLogModal from '../components/mood/MoodLogModal.jsx';
import TodayMoodSummary from '../components/mood/TodayMoodSummary.jsx';
import ProfileCard from '../components/onboarding/ProfileCard.jsx';


export default function Home({ user, onOpenProfile, onLogout, todayMood, onSubmitMood }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

      
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
      
      {/* ProfileCard is rendered by App during onboarding; removed from Home to avoid duplicate rendering */}

      <Header 
        onOpenProfile={onOpenProfile}
        onLogout={onLogout}
      />

       {/* Welcome Message */}
        <div className="flex flex-col items-center justify-center px-4 lg:px-6 py-12 lg:py-20">
            <h3 className="text-sm lg:text-md font-bold text-blue6 mb-4 lg:mb-6">
              Hello, {user?.name ?? 'there'}!
            </h3>
            <h1 className="text-3xl lg:text-5xl font-bold text-neutral9 mb-3 lg:mb-4 text-center">
              How are you feeling today?
            </h1>
            <p className="text-xs lg:text-sm text-neutral6 text-center max-w-xl">
              {getCurrentDate()}
            </p>
            
            {!todayMood && (
              <button onClick={() => setIsModalOpen(true)}
                  className="bg-blue6 text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg text-base lg:text-lg font-semibold hover:bg-blue7 transition-colors mt-8 lg:mt-14"
                  >
            Log Today's Mood
              </button>
            )}

      
        </div>


        {todayMood && (
          <TodayMoodSummary mood={todayMood} />
        )}
        

        {/* Charts Section */}
        <div className="px-4 max-w-6xl gap-4 lg:gap-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr,5fr] gap-4 lg:gap-6 items-stretch min-h-[360px]">

            {/* Left - Mood Cards */}
            <div className="bg-neutral0 rounded-lg px-4 py-8 lg:py-12 shadow-sm h-full flex flex-col justify-between">
            <div className="mb-2">
            <MoodCard 
                type="mood" 
                hasData={true}  // Change to false to see "Keep tracking!" version
                data={{
                value: "Neutral",
                trend: "same",
                comparison: "Same as the previous 5 check-ins"
                }}
            />
            </div>
            <div className="mt-2">
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
            </div>

            {/* Right Chart */}
                <div className="bg-white rounded-lg p-4 lg:p-2">
                    <MoodTrendsChart moodEntries={moodData.moodEntries} />
                </div>
            </div>
        </div>
           
            {/* Modal */}
      <MoodLogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={(moodLog) => {
          console.log('Home onSubmit received:', moodLog);
          setIsModalOpen(false);
          if (typeof onSubmitMood === 'function') {
            onSubmitMood(moodLog);
          } else {
            console.warn('onSubmitMood prop is not provided');
          }
        }}
        />

    </div>
  );
}
