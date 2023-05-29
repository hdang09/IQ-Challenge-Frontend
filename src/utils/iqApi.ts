import { get, post, put } from './apiCaller';

// Token API
// export const checkValidToken = () => {
//     const url = `/check/${token}`;
//     return get(url);
// };

// export const resetToken = () => {
//     const url = `/reset/?token=${token}`;
//     return get(url);
// };

// User API
export const register = (name: string, studentID: string) => {
    const url = '/user/register';
    return post(url, { name, studentID });
};

export const startTheTest = (name: string, studentID: string) => {
    const url = `/user/start/${name}/${studentID}`;
    return get(url);
};

export const submitTheTest = (name: string, studentID: string, answer: number[]) => {
    const url = '/user/end';
    return put(url, { name, studentID, answer });
};

export const seeScoreBoard = (studentID: string) => {
    const url = '/user/scoreboard';
    return get(url, {}, { studentID });
};

export const getStudentResult = (studentID: string) => {
    const url = `/user/${studentID}`;
    return get(url);
};
