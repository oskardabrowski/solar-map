import { createSlice } from "@reduxjs/toolkit";

const mapLayersSlice = createSlice({
  name: "mapLayersManagement",
  initialState: [{ code: "Roofs", index: 1000 }],
  reducers: {
    addLayer: (state, layer) => {
      state.push(layer);
    },
  },
});

export default mapLayersSlice.reducer;
