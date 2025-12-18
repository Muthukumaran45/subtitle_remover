const HowItWorks = () => {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">How It Works</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Upload your video</li>
        <li>AI detects subtitles frame by frame</li>
        <li>Subtitles are removed using smart inpainting</li>
        <li>Download clean video</li>
      </ul>
    </div>
  );
};

export default HowItWorks;
