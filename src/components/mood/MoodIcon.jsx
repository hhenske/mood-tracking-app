import iconNeutral from '../../assets/images/icon-neutral-color.svg'
import iconHappy from '../../assets/images/icon-happy-color.svg'
import iconVeryHappy from '../../assets/images/icon-very-happy-color.svg'
import iconSad from '../../assets/images/icon-sad-color.svg'
import iconVerySad from '../../assets/images/icon-very-sad-color.svg'


export default function MoodIcon({ mood, size = "md" }) {
    const sizeClasses = {
        sm: "w-5 h-5 text-base",
        md: "w-6 h-6 text-lg",
        lg: "w-8 h-8 text-2xl"
    }

    // Mood configurations with SVG icons
    const moods = {
        "Great": { icon: iconVeryHappy },
        "Good": { icon: iconHappy },
        "Neutral": { icon: iconNeutral },
        "Bad": { icon: iconSad },
        "Terrible": { icon: iconVerySad }
    };

    const moodConfig = moods[mood] || moods["Neutral"];

    return (
        <img 
            src={moodConfig.icon} 
            alt={`${mood} mood icon`} 
            className={sizeClasses[size]}
        />
    );
};