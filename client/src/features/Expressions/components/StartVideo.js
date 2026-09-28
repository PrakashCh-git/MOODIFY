import detectFace from "./DetectFace";

const startVideo = async (videoRef, setEmotion, intervalRef) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRef.current.srcObject = stream;
    videoRef.current.addEventListener("play", () => {
      intervalRef.current = setInterval(() => {
        detectFace(videoRef, setEmotion);
      }, 100);    
    },{ once: true });
  } catch (err) {
    console.log(err);
  }
};

export default startVideo;
