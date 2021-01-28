import axios from "axios";

const instance = axios.create({
    baseURL: "your_cloud_function_url"
});

export default instance;

// 'http://localhost:5001/clone-ff04b/us-central1/api' - Localhost emulator
