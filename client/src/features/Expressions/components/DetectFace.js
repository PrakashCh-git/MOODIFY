import * as faceapi from "face-api.js";


const detectFace = async (videoRef,setEmotion) => {
      const detection = await faceapi
          .detectSingleFace(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
          ).withFaceLandmarks()
            .withFaceExpressions();

      if(!detection) return;

        const expressions = detection.expressions;

        const emotion = Object.keys(expressions).reduce((a,b)=>
            expressions[a] > expressions[b] ? a : b
        );

        setEmotion(emotion);
};

export default detectFace;