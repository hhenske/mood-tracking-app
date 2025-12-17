

export default function ProfilePopover({ user, onSettings, onLogout }) {

    return (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg p-4 z-50">
            <div className="mb-3">
                <p className="fonte-bold text-sm">
                    {user.name}
                </p>
                <p className="text-s text-neutral6">
                    {user.email}
                </p>
            </div>

            <button
                onCLick={onSettings}
                className="flex items-center ap-2 w-full text-sm py-2 hover:bg-neutral6 rounded"
            >
            </button>

            <button
                onClick={onLogout}
                className="flex items-center gap-2 w-full text-sm py-2 hover:bg-neutral6 rounded text-red-600"
            >
                <LogoutIcon />
                Logout
            </button>
        </div>
    )
}