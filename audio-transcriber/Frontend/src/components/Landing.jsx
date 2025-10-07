// LandingPage.jsx
import React, { useState } from 'react';
import { Mic, FileText, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/audio/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const text = await response.text();
      setTranscription(text);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-800 text-white">
      {/* Header */}
      <header className="relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AudioText</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                onClick={() => navigate("/admin")}
                className="text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Admin
              </a>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-2 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                <Mic className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-20 animate-ping"></div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            AUDEX
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-100">
            Audio To Text Transcriber
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your audio into perfect text with AI precision. Fast, accurate, and effortless transcription for all your needs.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Start Transcribing Now
            <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose AudioText?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Experience the future of audio transcription with our cutting-edge AI technology
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureCard icon={<Mic className="w-8 h-8 text-white" />} title="AI-Powered Accuracy" description="Our advanced AI models ensure 99%+ accuracy for clear audio, understanding context and technical terms with precision." color="from-blue-400 to-blue-600" />
          <FeatureCard icon={<FileText className="w-8 h-8 text-white" />} title="Multiple Formats" description="Support for MP3, WAV, M4A, and more. Export your transcriptions in various formats including TXT, DOCX, and SRT." color="from-purple-400 to-purple-600" />
          <FeatureCard icon={<CheckCircle className="w-8 h-8 text-white" />} title="Lightning Fast" description="Process hours of audio in minutes. Our optimized infrastructure delivers results faster than real-time playback." color="from-green-400 to-green-600" />
        </div>
      </section>
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, description, color }) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 border border-white/20`}>
      <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-blue-100 leading-relaxed">{description}</p>
    </div>
  );
}
