import { configureStore } from '@reduxjs/toolkit';
import navibarReducer from './components/Navibar/navibarSlice'
import suggestListReducer from './components/SuggestBox/suggestBoxSlice'


export default configureStore({
  reducer: {
    route: navibarReducer,
    suggestlists: suggestListReducer
  },
});
