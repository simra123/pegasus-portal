import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "portalData",
  initialState: {
    notification_data: [],
    notification_number: 0,
    allData: [],
    selected: null,
  },
  reducers: {
    setNotificationNumber: (state, action) => {
      if (action.payload === null) {
        state.selected = null;
      } else {
        state.notification_number = action.payload;
      }
    },
  },
});
export const { setNotificationNumber } = dataSlice.actions;


export default dataSlice.reducer;

