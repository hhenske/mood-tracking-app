import { useState } from "react";
import iconNeutral from '../../assets/images/icon-neutral-color.svg'
import iconHappy from '../../assets/images/icon-happy-color.svg'
import iconVeryHappy from '../../assets/images/icon-very-happy-color.svg'
import iconSad from '../../assets/images/icon-sad-color.svg'
import iconVerySad from '../../assets/images/icon-very-sad-color.svg'

export default function TodayMoodSummary({ mood }) {
  const date = new Date(mood.createdAt);

  const moodLabels = {
    2: "Very Happy",
    1: "Happy",
    0: "Neutral",
    "-1": "Sad",
    "-2": "Very Sad"
  };

  return (
    <section className="p-4 mb-6 mx-10 flex gap-5">
  {/* Left Column */}
  <div className="flex-1 bg-white rounded-xl p-6 grid grid-cols-2 gap-2 items-center justify-center">
    {/* {Left column of left column} */}
    <div >
      <p className="text-sm text-neutral6 mb-2">I'm feeling</p>
      <p className="text-lg font-semibold mb-12">Very Sad</p>
      <blockquote className="text-sm text-neutral7 text-center">
      "You are stronger than you think; the storm will pass."
    </blockquote>
    </div>
    {/* right col of left column: Mood image */}
    <img 
      src={iconSad} 
      alt="Sad mood icon" 
      className="w-70 h-70"
    />
    
  </div>

  {/* Right Column */}
  <div className="flex-1 flex flex-col gap-5">
    {/* Top container: Sleep */}
    
      <div className="bg-white rounded-xl p-4">
        <p className="text-sm text-neutral6 mb-1">🛌 Sleep</p>
        <p className="text-base font-medium">3-4 hours</p>
      
    </div>
    {/* Bottom container: Reflection */}
    <div className="bg-white rounded-xl p-4">
      <p className="text-sm text-neutral6 mb-1">✏️ Reflection of the day</p>
      <p className="text-base font-medium mb-2">
        Rough night of sleep. Need support and rest.
      </p>
      <div className="flex gap-2 text-xs text-neutral6">
        <span>#Down</span>
        <span>#Tired</span>
      </div>
    </div>
  </div>
</section>
  );
}

