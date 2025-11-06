import { useState } from "react";
import { Play } from "lucide-react";

export default function InstaVideoGrid() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    { id: 1, thumbnail: "/thumbs/thumb1.jpg", videoUrl: "/videos/video1.mp4" },
    { id: 2, thumbnail: "/thumbs/thumb2.jpg", videoUrl: "/videos/video2.mp4" },
    { id: 3, thumbnail: "/thumbs/thumb3.jpg", videoUrl: "/videos/video3.mp4" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
      {videos.map((vid) => (
        <div
          key={vid.id}
          className="relative cursor-pointer group overflow-hidden rounded-xl"
          onClick={() => setActiveVideo(vid.videoUrl)}
        >
          <img
            src={vid.thumbnail}
            alt="Video Thumbnail"
             loading="lazy"
            className="w-full h-60 object-cover group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
            <Play className="text-white w-10 h-10" />
          </div>
        </div>
      ))}

      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setActiveVideo(null)}
        >
          <video src={activeVideo} controls autoPlay className="max-w-3xl rounded-xl" />
        </div>
      )}
    </div>
  );
}
