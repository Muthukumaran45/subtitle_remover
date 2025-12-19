import { useState } from "react";

const HomePage = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId] = useState(null);

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", video);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/remove-subtitles",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setFileId(data.file_id);
    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4">
      {/* HERO */}
      <div className="text-center mt-20 mb-12">
        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
          ✨ AI-Powered Video Processing
        </span>

        <h1 className="text-4xl font-extrabold text-slate-900 mt-4">
          Remove Subtitles from Videos
        </h1>

        <p className="text-slate-600 max-w-xl mx-auto mt-4">
          Upload a video and automatically remove hardcoded subtitles using
          advanced AI technology. Fast, accurate, and easy to use.
        </p>
      </div>

      {/* UPLOAD CARD */}
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">
        <label className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 transition">
          <div className="text-5xl text-slate-400 mb-4">⬆️</div>

          <p className="font-semibold text-slate-700">
            Drop your video here
          </p>
          <p className="text-sm text-slate-500 mt-1">
            or click to browse from your device
          </p>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="hidden"
          />

          <span className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition">
            Select Video
          </span>

          <p className="text-xs text-slate-400 mt-4">
            Supports MP4, MOV, AVI and more
          </p>
        </label>

        {/* VIDEO PREVIEW */}
        {video && (
          <video
            controls
            src={URL.createObjectURL(video)}
            className="w-full max-h-[320px] mt-6 rounded-lg shadow"
          />
        )}

        {/* ACTION BUTTON */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Processing..." : "Remove Subtitles"}
          </button>
        </div>

        {/* DOWNLOAD */}
        {fileId && (
          <div className="text-center mt-6">
            <a
              href={`http://127.0.0.1:8000/download/${fileId}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold underline"
            >
              Download Processed Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
