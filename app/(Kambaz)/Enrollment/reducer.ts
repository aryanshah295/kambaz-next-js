import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment = {
                _id: uuidv4(),
                user: enrollment.user,
                course: enrollment.course,
            }
            state.enrollments = [...state.enrollments, newEnrollment];
        },

        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter((e) => e._id !== enrollmentId)
        },

        setEnrollments: (state, {payload: enrollments}) => {
            state.enrollments = enrollments;
        }

    },
});

export const { addEnrollment, deleteEnrollment, setEnrollments } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;