import React from "react";

const stopVideo = (videoRef, intervalRef) => {
  //Clearing the interval
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  //If the webcam is on
  if (videoRef.current?.srcObject) {
    const tracks = videoRef.current.srcObject.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
  }
};

export default stopVideo;
