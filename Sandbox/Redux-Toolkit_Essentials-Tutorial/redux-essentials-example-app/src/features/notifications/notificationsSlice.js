import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from '../../api/client'

const notificationsAdapter = createEntityAdapter({
  sortComparer: ( a, b ) => b.date.localeCompare( a.date )
})

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async ( _, { getState } ) => {  // Object destructuring
    const allNotifications        = selectAllNotifications( getState() )
    const [ latestNotification ]  = allNotifications // Array Destructuring
    const latestTimestamp         = latestNotification ? latestNotification.date : ''
    const response                = await client.get( `/fakeApi/notifications?since=${latestTimestamp}` )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {},
  extraReducers( builder ) {
    builder.addCase( fetchNotifications.fulfilled, ( state, action ) => {
      notificationsAdapter.upsertMany( state, action.payload )
    })
  }
})

export default notificationsSlice.reducer
export const { selectAll: selectAllNotifications }  = notificationsAdapter.getSelectors( state => state.notifications )
