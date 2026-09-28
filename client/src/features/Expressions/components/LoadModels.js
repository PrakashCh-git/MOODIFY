import * as faceapi from "face-api.js";
const loadModels = async (params) => {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

        await faceapi.nets.faceExpressionNet.loadFromUri("/models");

        params.setModelsLoaded(true);
}

export default loadModels