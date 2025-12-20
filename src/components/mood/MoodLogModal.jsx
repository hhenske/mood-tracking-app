import { useState } from "react";

import iconNeutral from '../../assets/images/icon-neutral-color.svg'
import iconHappy from '../../assets/images/icon-happy-color.svg'
import iconVeryHappy from '../../assets/images/icon-very-happy-color.svg'
import iconSad from '../../assets/images/icon-sad-color.svg'
import iconVerySad from '../../assets/images/icon-very-sad-color.svg'


export default function MoodLogModal({isOpen, onClose, onSubmit}) { 
    const [step, setStep] = useState(1);
    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedFeelings, setSelectedFeelings] = useState([]);
    const [journalEntry, setJournalEntry] = useState("");
    const [sleepHours, setSleepHours] = useState(null);

    const maxCharacters = 150;

    const moods = [
        { value: 2, label: 'Very Happy', icon: iconVeryHappy },
        { value: 1, label: 'Happy', icon: iconHappy },
        { value: 0, label: 'Neutral', icon: iconNeutral },
        { value: -1, label: 'Sad', icon: iconSad },
        { value: -2, label: 'Very Sad', icon: iconVerySad }
    ];

    const feelings = [
        "Joyful", "Down", "Anxious", "Calm", "Excited", "Frustrated", "Lonely", "Grateful", "Overwhelmed",
        "Motivated", "Irritable", "Peaceful", "Tired", "Hopeful", "Confident", "Stressed", "Content",
        "Disappointed", "Optimistic", "Restless"
    ];

    const sleepOptions = [
        { value: 1, label: '0-2 hours'},
        { value: 3.5, label: '3-4 hours'},
        { value: 5.5, label: '5-6 hours'},
        { value: 7.5, label: '7-8 hours'},
        { value: 9, label: '9+ hours'}
    ];

    
    const handleFeelingToggle = (feeling) => {
    if (selectedFeelings.includes(feeling)) {
      setSelectedFeelings(selectedFeelings.filter(f => f !== feeling));
    } else if (selectedFeelings.length < 3) 
        setSelectedFeelings([...selectedFeelings, feeling]); 
    };


    const handleContinue = () => { 
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const handleSubmit = () => { 
        const moodLog = {
            mood: selectedMood,
            feelings: selectedFeelings,
            journalEntry,
            sleepHours,
            createdAt: new Date().toISOString()      
        };

        onSubmit(moodLog);

        console.log("Mood Log Submitted:", moodLog);
        setStep(1);
        setSelectedMood(null);
        setSelectedFeelings([]);
        setJournalEntry("");
        setSleepHours(null);
    };


    const canContinue = () => { 
        if (step === 1) return selectedMood !== null;
        if (step === 2) return selectedFeelings.length > 0;
        if (step === 3) return true; 
        if (step === 4) return sleepHours !== null;
        return false;
    };

        if (!isOpen) return null;


        return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 md:p-5 w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-neutral9">Log your mood</h2>
                <button onClick={onClose} className="text-neutral6 hover:text-neutral9 text-2xl">
                X</button>
                </div>
            
                {/* Progress Bar */}
                <div className="flex gap-2 mb-4 md:mb-6">
                {[1, 2, 3, 4].map((s) => (
                    <div
                    key={s}
                    className={`h-1 flex-1 rounded ${
                        s <= step ? 'bg-blue6' : 'bg-neutral2'
                    }`}
                    />
                ))}
                </div>
                   
                {/* Step 1: Mood Selection */}
        {step === 1 && (
          <div>
            <p className="text-base md:text-lg text-neutral9 mb-4 md:mb-6">How was your mood today?</p>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              {moods.map((mood) => (
                <label
                  key={mood.value}
                  className="flex items-center justify-between bg-white border-2 border-neutral2 rounded-lg p-3 md:p-4 cursor-pointer hover:border-blue6 transition-colors"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <input
                      type="radio"
                      name="mood"
                      value={mood.value}
                      checked={selectedMood === mood.value}
                      onChange={() => setSelectedMood(mood.value)}
                      className="ww-4 h-4 md:w-5 md:h-5 text-blue6"
                    />
                    <span className="text-base md:text-lg font-medium text-neutral9">{mood.label}</span>
                </div>
            <img src={mood.icon} alt={mood.label} className="w-7 h-7 md:w-8 md:h-8" />
        </label>
              ))}
            </div>
            <button
              onClick={handleContinue}
              disabled={!canContinue()}
              className={`w-full py-2.5 md:py-3 rounded-lg text-white font-semibold text-base ${
                canContinue()
                  ? 'bg-blue6 hover:bg-blue7'
                  : 'bg-neutral3 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Feelings */}
        {step === 2 && ( 
            <div>
            <p className="text-base md:text-lg text-neutral9 mb-2">How did you feel?</p>
            <p className="text-xs md:text-sm text-neutral6 mb-4 md:mb-6">Select up to 3 tags:</p>
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {feelings.map((feeling) => (
                    <label
                    key={feeling}
                    className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedFeelings.includes(feeling)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeelings.includes(feeling)}
                      onChange={() => handleFeelingToggle(feeling)}
                      disabled={selectedFeelings.length >= 3 && !selectedFeelings.includes(feeling) && selectedFeelings.length >= 3}
                      className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue6"
                    />
                     <span className="text-xs md:text-sm text-neutral9">{feeling}</span>
                    </label>
                ))}
            
            </div>
            <button
              onClick={handleContinue}
              disabled={!canContinue()}
              className={`w-full py-2.5 md:py-3 rounded-lg text-white font-semibold text-base ${
                canContinue()
                  ? 'bg-blue6 hover:bg-blue7'
                  : 'bg-neutral3 cursor-not-allowed'
                }`}
            >
              Continue
            </button>
          </div>    
        )}

         {/* Step 3: Journal Entry */}
        {step === 3 && (
          <div>
            <p className="text-base md:text-lg text-neutral9 mb-4 md:mb-6">Write about your day...</p>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value.slice(0, maxCharacters))}
              placeholder="Share your thoughts (optional)"
              className="w-full h-32 md:h-40 p-3 md:p-4 text-sm md:text-base border-2 border-neutral2 rounded-lg resize-none focus:border-blue6 focus:outline-none mb-2"
            />
            <p className="text-xs md:text-sm text-neutral6 text-right mb-4 md:mb-6">
              {journalEntry.length}/{maxCharacters}
            </p>
            <button
              onClick={handleContinue}
              className="w-full py-2.5 md:py-3 rounded-lg text-white font-semibold text-base bg-blue6 hover:bg-blue7"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 4: Sleep Hours */}
        {step === 4 && (
          <div>
            <p className="text-base md:text-lg text-neutral9 mb-4 md:mb-6">How many hours did you sleep last night?</p>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              {sleepOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center bg-white border-2 border-neutral2 rounded-lg p-3 md:p-4 cursor-pointer hover:border-blue6 transition-colors"
                >
                  <input
                    type="radio"
                    name="sleep"
                    value={option.value}
                    checked={sleepHours === option.value}
                    onChange={() => setSleepHours(option.value)}
                    className="w-4 h-4 md:w-5 md:h-5 text-blue6 mr-2 md:mr-3"
                  />
                  <span className="text-base md:text-lg font-medium text-neutral9">{option.label}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!canContinue()}
              className={`w-full py-2.5 md:py-3 rounded-lg text-white font-semibold text-base ${
                canContinue()
                  ? 'bg-blue6 hover:bg-blue7'
                  : 'bg-neutral3 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};