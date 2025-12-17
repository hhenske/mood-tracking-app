import { useState } from 'react'
import './index.css'
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ProfileCard from './components/onboarding/ProfileCard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);

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
      console.log("Setting needsOnboarding to TRUE")
      setNeedsOnboarding(true);
    } else {
      setNeedsOnboarding(false);
      console.log("Setting needsOnboarding to FALSE")
    }
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
          onOpenProfile={() => setShowProfileCard(true)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;