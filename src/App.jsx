import { useState, useEffect } from 'react'
import './index.css'
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ProfileCard from './components/onboarding/ProfileCard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [todayMood, setTodayMood] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  // NOTE: Don't call state setters like `setUser(...)` directly during render.
  // Calling a state setter unconditionally in the component body causes an
  // immediate state update and triggers a re-render loop (Too many re-renders).
  // Initialize default/mock state here or use `useEffect(..., [])` for one-time setup.
  const [user, setUser] = useState({
    name: "Sarah",
    email: "sarah@mail.com"
  });

  useEffect(() => {
    const todayKey = new Date().toISOString().split("T")[0];

    const moodForToday =
      moodEntries.find(m =>
        // guard missing createdAt and use correct method name
        m?.createdAt?.startsWith(todayKey)
      ) ?? null;

    setTodayMood(moodForToday);
  }, [moodEntries]);

  const currentScreen = !isAuthenticated
    ? "auth"
    : needsOnboarding
    ? "onboarding"
    : showProfileCard
    ? "profile-edit"
    : "home";

  const handleAuthSuccess = (mode) => {
    setIsAuthenticated(true);

    if (mode === "signup") {
      setNeedsOnboarding(true);
    } else {
      setNeedsOnboarding(false);
    }
  };

  const handleMoodSubmit = (moodLog) => {
    setMoodEntries(prev => [...prev, moodLog]);
  };

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setNeedsOnboarding(false);
    setShowProfileCard(false);
  };

  return (
    <>
      {currentScreen === "auth" && (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}

      {currentScreen === "onboarding" && (
        <ProfileCard
          variant="onboarding"
          onClose={handleOnboardingComplete}
          onSubmit={(profileData) => {
            setUser({ ...user, name: profileData.name });
            handleOnboardingComplete();
          }}
        />
      )}

      {currentScreen === "profile-edit" && (
        <ProfileCard
          variant="edit"
          onClose={() => setShowProfileCard(false)}
        />
      )}

      {currentScreen === "home" && (
        <Home
          user={user}
          onOpenProfile={() => setShowProfileCard(true)}
          onLogout={handleLogout}
          todayMood={todayMood}
          onSubmitMood={handleMoodSubmit}
        />
      )}
    </>
  );
}

export default App;