import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const transportSlice = createSlice({
  name: "transport",
  initialState: {
    selectedMode: null as string | null, // Stores selected transport mode
  },
  reducers: {
    selectTransportMode: (state, action: PayloadAction<string>) => {
      state.selectedMode = action.payload;
    },
  },
});

export const { selectTransportMode } = transportSlice.actions;
export default transportSlice.reducer;
