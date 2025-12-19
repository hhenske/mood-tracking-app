import { useState } from "react";
import avatar from "../../assets/images/avatar-placeholder.svg";
import logo from "../../assets/images/logo.svg";
import dropdownArrow from "../../assets/images/icon-dropdown-arrow.svg";
import settingsIcon from "../../assets/images/icon-settings.svg";
import logoutIcon from "../../assets/images/icon-logout.svg";

export default function Header({ onOpenProfile, onLogout }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="py-3 lg:py-4 px-4 lg:px-6 flex items-center justify-between relative">
      <img src={logo} alt="Mood Tracker Logo" className="h-8 lg:h-10" />

      {/* Avatar + dropdown */}
      <div className="relative flex items-center gap-1 lg:gap-2">
        <img
          src={avatar}
          alt="User avatar"
          className="h-8 w-8 lg:h-10 lg:w-10 rounded-full"
        />

        <button
          type="button"
          onClick={() => setIsProfileMenuOpen(prev => !prev)}
          aria-label="Open profile menu"
          className="flex items-center justify-center p-1"
        >
          <img
            src={dropdownArrow}
            alt=""
            className={`transition-transform duration-200 ${
              isProfileMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Popover */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 top-10 lg:top-12 w-48 lg:w-56 rounded-xl bg-white shadow-lg border border-neutral2 p-3 lg:p-4 z-500">
            {/* User info */}
            <div className="mb-2 lg:mb-3">
              <p className="font-semibold text-sm lg:text-base text-neutral9">Sarah</p>
              <p className="text-xs lg:text-sm text-neutral6">sarah@email.com</p>
            </div>

            <div className="border-t border-neutral2 my-2 lg:my-3" />

            {/* Settings */}
            <button
              onClick={() => {
                setIsProfileMenuOpen(false);
                onOpenProfile();
              }}
              className="flex items-center gap-2 lg:gap-3 w-full py-1.5 lg:py-2 text-xs lg:text-sm text-neutral9 hover:bg-neutral1 rounded-lg px-2"
            >
              <img src={settingsIcon} alt="" className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              Settings
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 lg:gap-3 w-full py-1.5 lg:py-2 text-xs lg:text-sm text-neutral9 hover:bg-neutral1 rounded-lg px-2"
            >
              <img src={logoutIcon} alt="" className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
