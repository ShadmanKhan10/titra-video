import React, { useEffect, useState, useRef } from "react";
import "./Video.css";
import sample from "../assets/sample.mp4";
import sample1 from "../assets/sample1.mp4";
import sample2 from "../assets/sample2.mp4";
import { io } from "socket.io-client";

export default function Video() {
  const [videoStatus, setVideoStatus] = useState("");
  const [angle, setAngle] = useState();
  const videoRef = useRef(null);
  // const socket = io("http://192.168.1.8:3000");
  const socket = io("http://192.168.43.175:3000");

  useEffect(() => {
    const socketCallForAngle = () => {
      socket.on("angleStatus", (msg) => {
        console.log(msg);
        setAngle(msg);
      });
      socketCallForVideoStatus();
    };

    const socketCallForVideoStatus = () =>
      socket.on("videoStatus", (msg) => {
        console.log(msg);
        setVideoStatus(msg);

        if (msg === "play") {
          if (videoRef.current) {
            videoRef.current.play();
          }
        }
      });

    // socketCallForVideoStatus();
    socketCallForAngle();

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.off("videoStatus");
    };
  }, [socket]);

  const handleVideoEnd = () => {
    socket.emit("videoStatus", "paused");
    console.log("Video has ended and emitted 'videoStatus: paused'");
    setVideoStatus("paused");
    setAngle();
  };

  return (
    <>
      {videoStatus === "play" && angle === 18 && (
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
      {videoStatus === "play" && angle === 36 && (
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
      {videoStatus === "play" && angle === 54 && (
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
