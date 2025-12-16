import logo from "../../assets/images/logo.svg";
import emptyAvatar from "../../assets/images/avatar-empty.svg";


export default function ProfileCard({ 
    variant = "onboarding",
    onClose,
    avatar
 }) {
    const isEdit = variant === "edit";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral1 px-4">
        
            {/* Logo */}
            <img 
                src={logo} 
                alt="Mood Tracker Logo" 
                className="w-25 h-25 mx-auto mb-12" 
            />

            {/* White Card */}
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">

                {/* Close button (edit only) */}
                {isEdit && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-neutral6 hover:text-neutral9"
                    >X</button>
                )}

                {/* Title */}
                <h2 className="text-3xl font-bold text-neutral9 mb-2">
                    {isEdit ? "Updata your profile" 
                    : "Personalize your experience"}
                </h2>

                {/* Subtitle */}
                <p className="text-md text-neutral6 mb-6">
                    {isEdit 
                        ? "Personalize your account with your name and photo." 
                        : "Add your name and a profile picture to make Mood yours."}
                </p>

                <form className="space-y-4">

                    {/* Name*/}
                    <div>
                        <label className="block text-md font-medium text-neutral9 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Jane Appleseed"
                            className="w-full border border-neutral3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue6"
                        />
                    </div>

                   {/* Avatar Upload */}
                   <div className="flex items-center gap-4 border border-neutral3 rounded-lg p-4">
                        
                         {/* Avatar */}
                        <img
                            src={avatar || emptyAvatar}
                            alt="Profile avatar"
                            className="w-14 h-14 rounded-full object-cover"
                        />
                   

                    {/* Upload Info */}
                    <div className="flex-1">
                            <p className="text-md font-medium text-neutral9">
                                Upload Image
                            </p>
                            <p className="text-sm text-neutral6 mb-2">
                                Max 250kb, PNG or JPEG
                            </p>
                            <button
                                type="button"
                                className="text-sm px-4 py-1.5 rounded-lg border border-blue6 text-blue6 hover:bg-blue1 transition"
                                >
                                Upload
                            </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue6 text-lg text-white py-2 rounded-lg hover:bg-blue7 transition-colors mt-4"
                    >
                        {isEdit ? "Save changes" : "Start tracking"}            
                    </button>

                </form>
                
            </div>
        </div>
    );
}