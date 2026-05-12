export type Status = 'all' | 'active' | 'completed';
setStatus: (state, action: PayloadAction<Status>) => {
  state.status = action.payload;
},