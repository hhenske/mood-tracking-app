
import iconNeutral from '../../assets/images/icon-neutral-color.svg'
import iconHappy from '../../assets/images/icon-happy-color.svg'
import iconVeryHappy from '../../assets/images/icon-very-happy-color.svg'
import iconSad from '../../assets/images/icon-sad-color.svg'
import iconVerySad from '../../assets/images/icon-very-sad-color.svg'
import iconSleep from '../../assets/images/icon-sleep.svg';
import iconReflection from '../../assets/images/icon-reflection.svg';



const moodConfig = {
  2: { label: 'Very Happy', icon: iconVeryHappy },
  1: { label: 'Happy', icon: iconHappy },
  0: { label: 'Neutral', icon: iconNeutral },
  '-1': { label: 'Sad', icon: iconSad },
  '-2': { label: 'Very Sad', icon: iconVerySad }
};

export default function TodayMoodSummary({ mood }) {
  if (!mood) return null;

  const date = new Date(mood.createdAt);
  const moodMeta = moodConfig[mood.mood.toString()];
  if (!moodMeta) return null;


  return (
    <section className="p-4 mb-6 max-w-6xl mx-auto flex gap-6">

  {/* Left Column */}
  <div className="flex-[1.3] bg-white rounded-xl p-6 grid grid-cols-[1fr_auto] items-center">
    
    <div>
      <p className="text-lg text-neutral6 font-semibold mb-1">I'm feeling</p>
      <p className="text-3xl font-bold mb-10">
        {moodMeta.label}
      </p>

      {mood.journalEntry && (
        <div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.75 12C22.9688 12 24 13.0313 24 14.25V20.25C24 21.5156 22.9688 22.5 21.75 22.5H15.75C14.4844 22.5 13.5 21.5156 13.5 20.25V9C13.5 4.875 16.8281 1.5 21 1.5H21.375C21.9844 1.5 22.5 2.01562 22.5 2.625V4.875C22.5 5.53125 21.9844 6 21.375 6H21C19.3125 6 18 7.35938 18 9V12H21.75ZM8.25 12C9.46875 12 10.5 13.0313 10.5 14.25V20.25C10.5 21.5156 9.46875 22.5 8.25 22.5H2.25C0.984375 22.5 0 21.5156 0 20.25V9C0 4.875 3.32813 1.5 7.5 1.5H7.875C8.48438 1.5 9 2.01562 9 2.625V4.875C9 5.53125 8.48438 6 7.875 6H7.5C5.8125 6 4.5 7.35938 4.5 9V12H8.25Z" fill="#4865DB"/>
          </svg>

          <blockquote className="text-xs text-neutral7 font-medium italic max-w-xs mt-4">
            {mood.journalEntry}
          </blockquote>
          
        </div>
      )}
    </div>

    <img
      src={moodMeta.icon}
      alt={moodMeta.label}
      className="w-44 h-44 ml-8"
    />
  </div>

  {/* Right Column */}
  <div className="flex-[1] flex flex-col gap-5">

    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <img
          src={iconSleep}
          alt=""
          className="w-3 h-3"
        />
        <p className="text-sm text-neutral6">Sleep</p>
      </div>
      <p className="text-2xl font-bold">
        {mood.sleepHours} hours
      </p>
    </div>

    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <img
          src={iconReflection}
          alt=""
          className="w-3 h-3"
        />
        <p className="text-sm text-neutral6">
          Reflection of the day</p>
      </div>
      <div>
        
        <p className="text-xs text-neutral7 font-medium max-w-xs mt-2">
            {mood.journalEntry}
        </p>

        
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-neutral6 mt-10">
        {mood.feelings.map(feeling => (
          <span
            key={feeling}
            className="px-1 py-1 italic rounded-md"
          >
            #{feeling}
          </span>
        ))}
      </div>
    </div>

  </div>
</section>
  );
}

