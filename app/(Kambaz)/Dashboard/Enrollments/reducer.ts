import { createSlice } from '@reduxjs/toolkit';
import {enrollments} from '../../Database';
const initialState = {
  enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: 'enrollments',
    initialState,
    reducers: {
        addEnrollment: (state, {payload: enrollment}) => {
            state.enrollments.push(enrollment);
        },
        removeEnrollment: (state, {payload: enrollment}) => {
            state.enrollments = state.enrollments.filter(e => e._id !== enrollment._id);
        }
    }
});
export const { addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;