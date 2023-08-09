import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataState {
  data: string | null | undefined;
}

const initialState: DataState = {
  data: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    dataChecked: (state, action: PayloadAction<DataState>) => {
      state.data = action.payload.data;
    },
  },
});

export const { dataChecked } = dataSlice.actions;
export default dataSlice.reducer;
