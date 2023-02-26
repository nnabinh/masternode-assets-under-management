import {createSlice} from '@reduxjs/toolkit';
import {Masternode} from './types';

const initialState = {
  masternodes: [] as Masternode[],
};

export const masternodesSlice = createSlice({
  name: 'masternodes',
  initialState,
  reducers: {},
});

export const {} = masternodesSlice.actions;

export default masternodesSlice.reducer;
