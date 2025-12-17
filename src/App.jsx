import { useState } from 'react'
import './index.css'
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ProfileCard from './components/onboarding/ProfileCard';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

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
  }


  return (
    <>
      {!isAuthenticated && (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}

      {isAuthenticated && needsOnboarding && (
      <ProfileCard
        variant="onboarding"
        onClose={() => setNeedsOnboarding(false)}
      />
    )}

    {isAuthenticated && !needsOnboarding && (
      <Home />
    )}
  </>
);

}

export default App