import axios from "axios";
import { ACCESS_TOKEN, API_URL } from "../constants/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		if (ACCESS_TOKEN) {
			config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
