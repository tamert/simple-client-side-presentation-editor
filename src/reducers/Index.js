import { combineReducers } from 'redux';

import { alert } from './AlertReducer';
import { slide, slides } from './SlideReducer';

const rootReducer = combineReducers({
    alert,
    slide,
    slides
});

export default rootReducer;
