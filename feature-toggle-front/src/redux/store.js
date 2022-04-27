import { configureStore } from '@reduxjs/toolkit'
import phoneReducer from './phone/phone';

export default configureStore({
  reducer: {
      user: phoneReducer
  }
});
