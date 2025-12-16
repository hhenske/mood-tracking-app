import logo from '../../assets/images/logo.svg';

export default function AuthCard({ mode = "signup" }) {
    const isLogin = mode === "signup";

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

                {/* Title */}
                <h2 className="text-3xl font-bold text-neutral9 mb-2">
                    {isLogin ? "Welcome back!" : "Create an account"}
                </h2>

                {/* Subtitle */}
                <p className="text-md text-neutral6 mb-6">
                    {isLogin 
                        ? "Log in to continue tracking your daily mood and sleep." 
                        : "Join to track your daily mood and sleep with ease."}
                </p>

                <form className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-md font-medium text-neutral9 mb-1" htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full border border-neutral3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue6" 
                            placeholder="name@mail.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-md font-medium text-neutral9 mb-1" htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                className="w-full border border-neutral3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue6 mb-3"
                            />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue6 text-lg text-white py-2 rounded-lg hover:bg-blue7 transition-colors mt-4"
                    >
                        {isLogin ? "Sign up" : "Log in"}            
                    </button>

                </form>
                    
                {/* Footer */}
                <p className="text-md text-neutral6 text-center mt-6">
                    {isLogin ? "Haven't got an account?" : "Already got an account?"}{" "}
                    <button className="text-blue3 font-medium hover:underline">
                        {isLogin ? "Sign up" : "Log in"}
                    </button>
                </p>
                
            </div>
        </div>
    );
}