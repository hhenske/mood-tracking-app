import { useState } from "react";

import iconNeutral from '../../assets/images/icon-neutral-color.svg'
import iconHappy from '../../assets/images/icon-happy-color.svg'
import iconVeryHappy from '../../assets/images/icon-very-happy-color.svg'
import iconSad from '../../assets/images/icon-sad-color.svg'
import iconVerySad from '../../assets/images/icon-very-sad-color.svg'


export default function MoodLogModal({isOpen, onClose}) { 
    const [step, setStep] = useState(1);
    const [selectMood, setSelectedMood] = useState(null);
    const [selectedFeelings, setSelectedFeelings] = useState([]);
    const [journalEntry, setJournalEntry] = useState("");
    const [sleepHours, setSleepHours] = useState(null);

    const maxCharacters = 500;

    const moods = [
        { value: 2, label: 'Very Happy'}
        { value: 1, label: 'Happy'}
        { value: 0, label: 'Neutral'}
        { value: -1, label: 'Sad'}
        { value: -2, label: 'Very Sad'}
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

    const getMoodIcon = (value) => {
   
    const icons = {
      2: '../../assets/images/icon-very-happy-color.svg',
      1: '../../assets/images/icon-happy-color.svg',
      0: '../../assets/images/icon-neutral-color.svg',
      '-1': '../../assets/images/icon-sad-color.svg',
      '-2': '../../assets/images/icon-very-sad-color.svg'
    };
        return icons[value];

    const handleFeelingToggle = (feeling) => {
    if (selectedFeelings.includes(feeling)) {
      setSelectedFeelings(selectedFeelings.filter(f => f !== feeling));
    } else if (selectedFeelings.length < 3) 
        setSelectedFeelings([...selectedFeelings, feeling]); 
    };
  };

    const handleContinue = () => { 
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const handleSubmit = () => { 
        const moodLog = {
            mood: selectMood,
            feelings: selectedFeelings,
            journalEntry,
            sleepHours,
            createdAt: new Date().toISOString()      
        };
        console.log("Mood Log Submitted:", moodLog);
        onClose();
        setStep(1);
        setSelectedMood(null);
        setSelectedFeelings([]);
        setJournalEntry("");
        setSleepHours(null);
    };


    const canContinue = () => { 
        if (step === 1) return selectMood !== null;
        if (step === 2) return selectedFeelings.length > 0;
        if (step === 3) return true; 
        if (step === 4) return sleepHours !== null;
        return false;
    };

    if (!isOpen) return null;


    const handleJournalChange = (e) => {
        if (e.target.value.length <= maxCharacters) {
            setJournalEntry(e.target.value);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-5 w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral9">Log your mood</h2>
                <button onClick={onClose} className="text-neutral6 hover:text-neutral9 text-2xl">
                X</button>
                </div>
            
                {/* Progress Bar */}
                <div className="flex gap-2 mb-6">
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
                </div>
    };