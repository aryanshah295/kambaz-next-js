// Quiz API client 
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api`;

export const findQuizzesForCourse = async (courseId: string) => {
  const res = await axiosWithCredentials.get(
    `${QUIZZES_API}/courses/${courseId}/quizzes`
  );
  return res.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const res = await axiosWithCredentials.post(
    `${QUIZZES_API}/courses/${courseId}/quizzes`,
    quiz
  );
  return res.data;
};

export const updateQuiz = async (quizId: string, updates: any) => {
  const res = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quizId}`,
    updates
  );
  return res.data;
};

export const deleteQuiz = async (quizId: string) => {
  const res = await axiosWithCredentials.delete(
    `${QUIZZES_API}/quizzes/${quizId}`
  );
  return res.data;
};

export const findQuizById = async (quizId: string) => {
    const res = await axiosWithCredentials.get(`${QUIZZES_API}/quizzes/${quizId}`);
    return res.data;
  };

// Quiz Attempts API
export const findAttemptsByQuizAndUser = async (quizId: string, userId: string) => {
  const res = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/users/${userId}/attempts`
  );
  return res.data;
};

export const findLatestAttempt = async (quizId: string, userId: string) => {
  const res = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/users/${userId}/latest`
  );
  return res.data;
};

export const createAttempt = async (attempt: any) => {
  const res = await axiosWithCredentials.post(
    `${QUIZZES_API}/quiz-attempts`,
    attempt
  );
  return res.data;
};

export const updateAttempt = async (attemptId: string, updates: any) => {
  const res = await axiosWithCredentials.put(
    `${QUIZZES_API}/quiz-attempts/${attemptId}`,
    updates
  );
  return res.data;
};

export const getAttemptCount = async (quizId: string, userId: string) => {
  const res = await axiosWithCredentials.get(
    `${QUIZZES_API}/quizzes/${quizId}/users/${userId}/count`
  );
  return res.data;
};