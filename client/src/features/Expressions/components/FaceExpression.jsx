import { useRef, useEffect, useState } from "react";

import loadModels from "./LoadModels";
import startVideo from "./StartVideo";
import stopVideo from "./stopVideo";


const FaceExpression = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [emotion, setEmotion] = useState("Waiting...");

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    loadModels({setModelsLoaded:setModelsLoaded});
  }, []);

  return(
    <center className="relative flex flex-col items-center justify-center gap-5  rounded-2xl text-white backdrop-blur-xl min-h-screen">
      <h1 className="absolute top-2 text-5xl">How are you feeling today ?</h1>
      <div className="flex space-x-10 ">
        <div><h1 className="text-4xl">😊</h1><p className="text-3xl ">Happy</p></div>
        <div><h1 className="text-4xl">😔</h1><p className="text-3xl ">Sad</p></div>
        <div><h1 className="text-4xl">😡</h1><p className="text-3xl ">Angry</p></div>
        <div><h1 className="text-4xl">😮</h1><p className="text-3xl ">Surprised</p></div>
        <div><h1 className="text-4xl">😖</h1><p className="text-3xl ">Disgusted</p></div>
      </div>
      <button
          onClick={()=>{startVideo(videoRef,setEmotion,intervalRef)}}
          disabled={!modelsLoaded}
          className="px-8 py-2 bg-emerald-700 text-white text-sm tracking-[1.5px] rounded cursor-pointer"
      >
          START
      </button>

      <video
        ref={videoRef}
        width="500"
        height="300"
        autoPlay
        muted
        className="border-2 rounded-2xl"
      />

      <h2 className="text-2xl ">Current Mood: <span className="uppercase">{emotion}</span></h2>

      <button
      onClick={()=>{
        stopVideo(videoRef,intervalRef)
      }}
      className="px-8 py-2 bg-red-600 text-white text-sm tracking-[1.5px] rounded cursor-pointer"
      >STOP</button>
    </center>
  );
};

export default FaceExpression;