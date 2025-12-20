function Home() {
    return (
        <div className="min-h-screen bg-emerald-400 relative">

            {/* Main Card */}
            <div className="absolute inset-[10%] bg-white rounded-2xl shadow-2xl overflow-auto">

                {/* Navbar */}
                <div className="mx-[5%] mt-[3%] mb-[2%] bg-emerald-600 rounded-xl shadow-lg p-4 flex items-center">
                    <h1 className="text-xl font-bold text-white">Subtitle Remover</h1>

                    <ul className="flex gap-8 font-medium text-white absolute left-1/2 -translate-x-1/2">
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">Features</li>
                        <li className="cursor-pointer">Contact</li>
                    </ul>

                    <div className="ml-auto flex gap-3">
                        <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium">
                            Sign In
                        </button>
                        <button className="bg-yellow-400 text-emerald-900 px-4 py-2 rounded-lg font-semibold">
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Content + Aside */}
                <div className="mx-[5%] mb-[5%]  gap-6">

                    {/* Main Content */}
                    <div className="col-span-2 bg-gray-100 rounded-xl p-6 flex items-center gap-20">

                        {/* Left Image */}
                        <img
                            src="hero.webp"
                            alt="Sample"
                            style={{ width: "40%", height: "auto" }}
                            className="object-cover rounded-xl shadow"
                        />


                        {/* Right Content */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-2xl font-bold">Remove Subtitles from Video Easily</h2>
                            <p className="text-gray-700">
                                Effortlessly remove subtitles from video with our AI-powered tool. It erases captions while preserving video quality — fast, simple, and highly effective.
                            </p>

                            <button className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg w-fit">
                                Upload
                            </button>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
}

export default Home;
