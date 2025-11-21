import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true});
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENT_API = `${HTTP_SERVER}/api/assignments`;
const ENROLLMENT_API = `${HTTP_SERVER}/api/enrollments`;

export const fetchAllCourses = async () => {
    const { data } = await axios.get(COURSES_API);
    return data;
}

export const getAllEnrollments = async () => {
    const { data } = await axios.get(ENROLLMENT_API);
    return data;
}

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
}

export const findNotMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/notcourses`);
    return data;
}

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
}

export const createEnrollment = async (enrollment: any, courseId: string) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/enrollments/${courseId}`, enrollment);
    return data;
}

export const deleteEnrollment = async (enrollmentId: string) => {
    const { data } = await axios.delete(`${ENROLLMENT_API}/${enrollmentId}`);
    return data;
}

export const deleteCourse = async (id: string) => {
    const { data } = await axios.delete(`${COURSES_API}/${id}`);
    return data;
}

export const updateCourse = async (course: any) => {
    const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
    return data;
}

export const findModulesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
}

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};

export const deleteModule = async (moduleId: string) => {
    const response = await axios.delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};

export const updateModule = async (module: any) => {
    const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
    return data;
}

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
}

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
}

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentId}`);
    return response.data;
}

export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
    return data;
}

export const findAssignmentById = async (assignmentId: string) => {
    const response = await axios.get(`${ASSIGNMENT_API}/${assignmentId}`);
    return response.data;
}

export const getSpecificCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    return response.data;
}