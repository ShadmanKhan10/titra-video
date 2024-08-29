import React, { useEffect, useState, useRef } from "react";
import "./Video.css";
import sample from "../assets/sample.mp4";
import sample1 from "../assets/sample1.mp4";
import sample2 from "../assets/sample2.mp4";
import { io } from "socket.io-client";

export default function Video() {
  const [videoName, setVideoName] = useState("");
  const videoRef = useRef(null);

  const socket = io("192.168.1.34:4000");

  useEffect(() => {
    socket.on("play_video", (msg) => {
      setVideoName(msg);
    });

    socket.on("stop_video", (msg) => {
      setVideoName(msg);
    });

    return () => {
      socket.off("play_video");
      socket.off("stop_video");
    };
  }, [socket]);

  const handleVideoEnd = () => {
    socket.emit("play_video", "Video Removed from screen");
    console.log("Video has ended and emitted 'videoStatus: paused'");
    setVideoName("");
  };

  return (
    <>
      {videoName === "sample" && (
        <div className="video-container">
          <video
            ref={videoRef}
            className="video-sample"
            src={sample}
            muted={true}
            autoPlay={true}
            onEnded={handleVideoEnd}
          />
        </div>
      )}
      {videoName === "sample1" && (
        <div className="video-container">
          <video
            ref={videoRef}
            className="video-sample"
            src={sample1}
            muted={true}
            autoPlay={true}
            onEnded={handleVideoEnd}
          />
        </div>
      )}
      {videoName === "sample2" && (
        <div className="video-container">
          <video
            ref={videoRef}
            className="video-sample"
            src={sample2}
            muted={true}
            autoPlay={true}
            onEnded={handleVideoEnd}
          />
        </div>
      )}
    </>
  );
}
