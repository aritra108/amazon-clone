import axios from "axios";

const instance = axios.create({
    baseURL: "https://us-central1-clone-ff04b.cloudfunctions.net/api"
});

export default instance;

// 'http://localhost:5001/clone-ff04b/us-central1/api' - Localhost emulator