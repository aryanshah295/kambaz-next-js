import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  availableOn?: string | null;
  dueOn?: string | null;
  availableUntil?: string | null;
  points?: number | null;
  description?: string | null;
  editing?: boolean;
};

export type AssignmentDraft = Partial<Omit<Assignment, "_id">> & {
  course: string;
};

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }: PayloadAction<Assignment[]>) => {
      state.assignments = payload;
    },
    addAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = [...state.assignments, payload];
    },
    deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === payload._id ? { ...payload } : assignment
      );
    },
    editAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, editing: true }
          : assignment
      );
    },
    cancelEditAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, editing: false }
          : assignment
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  cancelEditAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
