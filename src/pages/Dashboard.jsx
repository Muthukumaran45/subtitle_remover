import { useState, useRef } from "react";
import axios from "axios";

const Dashboard = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [inputKey, setInputKey] = useState(0); // forces file input remount

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video first");
      return;
    }
    setLoading(true);
    setProcessedUrl(null);
    try {
      const formData = new FormData();
      formData.append("file", video);
      const res = await axios.post(
        "http://localhost:8000/generate-subtitles",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProcessedUrl(res.data.video_url);
    } catch (error) {
      console.error(error);
      alert("Upload or processing failed");
    } finally {
      setLoading(false);
    }
  };

  // Fix 1: Fetch blob and trigger download to avoid cross-origin open-in-tab behavior
  const handleDownload = async () => {
    if (!processedUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(processedUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "video_with_subtitles.mp4";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  // Fix 2: Reset all state + remount file input via key change
  const handleReset = () => {
    setVideo(null);
    setProcessedUrl(null);
    setInputKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4">
      <div className="text-center mt-20 mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Generate Subtitles for Videos
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto mt-4">
          Upload a video and automatically generate hardcoded subtitles using AI.
        </p>
      </div>

      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">
        {/* Show upload area only if no processed video yet */}
        {!processedUrl ? (
          <>
            <label className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 transition">
              <div className="text-5xl text-slate-400 mb-4">⬆️</div>
              <p className="font-semibold text-slate-700">Drop your video here</p>
              <p className="text-sm text-slate-500 mt-1">
                or click to browse from your device
              </p>
              {/* key prop forces remount, clearing selected file */}
              <input
                key={inputKey}
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className="hidden"
              />
              <span className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold">
                Select Video
              </span>
            </label>

            {video && (
              <video
                controls
                src={URL.createObjectURL(video)}
                className="w-full max-h-[320px] mt-6 rounded-lg shadow"
              />
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={handleUpload}
                disabled={loading || !video}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                {loading ? "Processing..." : "Generate Subtitles"}
              </button>
            </div>
          </>
        ) : (
          /* Show result area after processing */
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Processed Video</h2>
            <video
              src={processedUrl}
              controls
              className="w-full rounded-lg shadow mb-6"
            />
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {downloading ? "Downloading..." : "⬇ Download Video"}
              </button>
              <button
                onClick={handleReset}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                ↩ Select Another Video
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;