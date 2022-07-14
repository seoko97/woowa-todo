import { request } from ".";

const requestGetSections = () => request("/section", "GET");

const requestGetSection = (id) => request(`/section/${id}`, "GET");

export { requestGetSection, requestGetSections };
