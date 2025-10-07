import React, { useState } from "react";
import axios from "axios";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const token = localStorage.getItem("token"); // JWT saved on login
            const res = await axios.post(
                "http://localhost:8080/api/audio/transcribe",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const text = res.data;
            setTranscription(text);

            // add to history
            setHistory((prev) => [
                ...prev,
                { filename: file.name, transcription: text },
            ]);
        } catch (err) {
            console.error(err);
            setTranscription("❌ Failed to transcribe audio.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left column - history */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
                <h2 className="text-lg font-bold mb-2">Upload History</h2>
                {history.length === 0 && <p>No files yet.</p>}
                {history.map((item, idx) => (
                    <div key={idx} className="mb-4 p-2 border rounded bg-white">
                        <p className="font-semibold">{item.filename}</p>
                        <p className="text-sm text-gray-600">{item.transcription}</p>
                    </div>
                ))}
            </div>

            {/* Right column - upload + transcription */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome to Audex!</h1>

                <input type="file" accept="audio/*" onChange={handleFileChange} />
                <button
                    onClick={handleUpload}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={loading}
                >
                    {loading ? "Transcribing..." : "Upload & Transcribe"}
                </button>

                {transcription && (
                    <div className="mt-6 w-full max-w-lg bg-gray-50 p-4 rounded shadow">
                        <h2 className="font-semibold">Latest Transcription:</h2>
                        <p className="mt-2 text-gray-800">{transcription}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPage;