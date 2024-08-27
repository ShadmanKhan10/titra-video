import React, { useState } from "react";
import "./Video.css";
import sample from "../assets/sample.mp4";
import { io } from "socket.io-client";

export default function Video() {
  const [videoStatus, setVideoStatus] = useState("");

  const socket = io("http://192.168.1.8:3000");

  socket.on("videoStatus", (msg) => {
    console.log(msg);
    setVideoStatus(msg);
  });

  // setTimeout(() => {
  //   console.log("request sent");
  // }, 10000);

  return (
    <>
      {videoStatus === "play" && (
        <div className="video-container">
          <video
            className="video-sample"
            src={sample}
            muted={true}
            autoPlay={true}
          />
        </div>
      )}
    </>
  );
}
