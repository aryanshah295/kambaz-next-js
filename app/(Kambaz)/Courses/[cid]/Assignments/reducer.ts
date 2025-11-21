// addAssignment, deleteAssignment, updateAssignment
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "@/app/(Kambaz)/Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    assignments: assignments,
}

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        addAssignment: (state, { payload: assignment }) => {
            const newAssignment = {
                _id: uuidv4(),
                title: assignment.title,
                course: assignment.course,
                points: assignment.points,
                available: assignment.available,
                due: assignment.due,
                until: assignment.until,
                description: assignment.description
            }
            state.assignments = [ ...state.assignments, newAssignment ];
        },

        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter((a) => 
                a._id !== assignmentId)
        },

        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a) => 
                a._id === assignment._id ? assignment : a)
        },

        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a) => 
                a._id === assignmentId ? { ...a, editing: true} : a)
        },

    },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment, editAssignment } = 
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;