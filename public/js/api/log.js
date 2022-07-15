import { request } from ".";

const requestGetLogs = () => request("/log", "GET");

export { requestGetLogs };
