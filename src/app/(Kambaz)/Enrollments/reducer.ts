import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = {
  _id?: string;
  user: string;
  course: string;
};

type EnrollmentsState = {
  enrollments: Enrollment[];
};

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }: PayloadAction<Enrollment[]>) => {
      state.enrollments = payload;
    },
    enrollCourse: (state, { payload }: PayloadAction<{ user: string; course: string }>) => {
      const alreadyEnrolled = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!alreadyEnrolled) {
        state.enrollments.push(payload);
      }
    },
    unenrollCourse: (state, { payload }: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
