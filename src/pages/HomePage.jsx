import { useState } from "react";

const HomePage = () => {
  const [video, setVideo] = useState(null);

  return (
    <div className="flex flex-col items-center py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">
        Remove Subtitles from Videos
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-xl">
        Upload a video and automatically remove hardcoded subtitles using AI.
      </p>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        className="mb-6"
      />

      {video && (
        <video
          controls
          className="w-full max-w-lg rounded-lg shadow mb-6"
          src={URL.createObjectURL(video)}
        />
      )}

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
        Remove Subtitles
      </button>
    </div>
  );
};

export default HomePage;
