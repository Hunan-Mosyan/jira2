import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../core/utilis/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../services/firebase";
import { transformIssueData } from "../../../core/helpers/transformIssueData";
const initialState = {
  data: {},
  isLoading: false,
  error: null,
};
export const fetchIssueData = createAsyncThunk(
  "data/fetchIssueData",
  async () => {
    const queryData = await getDocs(
      collection(db, FIRESTORE_PATH_NAMES.ISSUES)
    );
    const resultData = queryData.docs.map((doc) => doc.data());
    return transformIssueData(resultData);
  }
);
const issueSlice = createSlice({
  name: "issueSlice",
  initialState,
  reducers: {
    changeIssueColumns: (state, action) => {
      const columns = state.data;
      const { source, destination } = action.payload;
      const sourceColumnItems = [...columns[source.droppableId]];
      const destinationColumnItems = [...columns[destination.droppableId]];
      const [removeItem] = sourceColumnItems.splice(source.index, 1);
      destinationColumnItems.splice(destination.index, 0, removeItem);
      let changedColumns = {};
      if (source.droppableId !== destination.droppableId) {
        changedColumns = {
          ...columns,
          [source.droppableId]: sourceColumnItems,
          [destination.droppableId]: destinationColumnItems,
        };
      } else {
        sourceColumnItems.splice(destination.index, 0, removeItem);
        changedColumns = {
          ...columns,
          [source.droppableId]: sourceColumnItems,
        };
      }
      state.data = changedColumns;
    },
  },
  extraReducers: (promise) => {
    promise
      .addCase(fetchIssueData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssueData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIssueData.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});
export const { changeIssueColumns } = issueSlice.actions;
export default issueSlice.reducer;
