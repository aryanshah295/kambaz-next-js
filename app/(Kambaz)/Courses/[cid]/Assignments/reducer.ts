import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: { assignments: any[] } = {
    assignments: assignments,
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment(state, action) {
            state.assignments.push(action.payload);
        },
        updateAssignment(state, action) {
            const index = state.assignments.findIndex(
                (assignment) => assignment._id === action.payload._id
            );
            if (index !== -1) {
                state.assignments[index] = action.payload;
            }
        },
        deleteAssignment(state, action) {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload._id
            );
        },
    },
});

export const {
    addAssignment,
    updateAssignment,
    deleteAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;