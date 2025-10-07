import React, { useState } from "react";
import axios from "axios";

const AudioUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setTranscription("");
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an audio file first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", localStorage.getItem("username")); // Optional: pass username if needed

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
          "http://localhost:8080/api/audio/transcribe",  // Updated endpoint
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            }
          }
      );

      const transcriptionText = res.data.transcription || res.data;  // Depending on API response structure
      setTranscription(transcriptionText);

      // Add to history
      setHistory((prev) => [
        ...prev,
        { filename: file.name, transcription: transcriptionText },
      ]);
    } catch (err) {
      console.error("Error uploading/transcribing audio:", err);
      setError("❌ Failed to transcribe audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6 relative">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              Audio To Text
            </h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Transcriber
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform your audio into perfect text with AI precision
            </p>
          </div>

          {/* Upload & Transcription Card */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-700/50 relative overflow-hidden">
            <div className="bg-gray-700/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300">
              <label className="block text-lg font-semibold text-gray-200 mb-4 text-center">
                Choose Your Audio File
              </label>

              <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="w-full px-6 py-4 bg-gray-800/50 border-2 border-dashed border-gray-500 hover:border-blue-400 rounded-xl text-white"
              />

              {file && (
                  <p className="mt-4 text-green-300 font-medium">
                    Selected: {file.name}
                  </p>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex justify-center mt-8">
              <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg disabled:opacity-50"
              >
                {loading ? "Transcribing..." : "Upload and Transcribe"}
              </button>
            </div>

            {/* Error */}
            {error && (
                <p className="text-red-400 text-center mt-6 font-semibold">
                  {error}
                </p>
            )}

            {/* Latest Transcription */}
            {transcription && (
                <div className="bg-gray-900/70 border border-green-400/40 rounded-xl mt-8 p-6 text-white">
                  <h2 className="text-xl font-bold mb-4">Latest Transcription:</h2>
                  <p className="whitespace-pre-wrap">{transcription}</p>
                </div>
            )}
          </div>

          {/* Upload History */}
          {history.length > 0 && (
              <div className="mt-12 bg-gray-700/30 rounded-2xl p-6 border border-gray-600/50">
                <h2 className="text-2xl font-bold text-white mb-4">Upload History</h2>
                {history.map((item, idx) => (
                    <div
                        key={idx}
                        className="mb-4 p-3 border rounded bg-gray-800 text-gray-100"
                    >
                      <p className="font-semibold">{item.filename}</p>
                      <p className="text-sm text-gray-300">
                        {item.transcription}
                      </p>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default AudioUploader;