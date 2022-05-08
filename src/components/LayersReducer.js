import { createSlice } from "@reduxjs/toolkit";

const mapLayersSlice = createSlice({
  name: "mapLayersManagement",
  initialState: {
    array: [{ code: "Roofs", index: 1000 }],
  },
  reducers: {
    addLayer: (state, action) => {
      state.array = [...state.array, action.payload];
    },
    removeLayer: (state, action) => {
      state.array = [...action.payload];
    },
  },
});

export const MapLayerActions = mapLayersSlice.actions;

export default mapLayersSlice.reducer;
