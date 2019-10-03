import { SlideConstants } from '../constants';

export const SlideAction = {
    selectSlide,
    createSlide,
    uploadSlides,
    updateSlide,
    clearSlide,
    clearSlides
};

function reID(slides, remove = false) {
    let arr = [];
    slides.filter(function(item) {
        return !(remove && remove === parseInt(item.id));
    }).map((item, i) => {
            item.id = (i+1);
            arr.push(item);
    });
    return arr;
}

function selectSlide(item) {
    return { type: SlideConstants.UPDATE, item };
}

function updateSlide(item, items) {
    const index = items.map(function(el) {
        return el.id
    }).indexOf(item.id);
    items[index] = item;
    return { type: SlideConstants.UPDATE_ALL, items };
}

function uploadSlides(items) {
    return { type: SlideConstants.UPDATE_ALL, items };
}

function createSlide(items) {
    items = reID(items);
    const item = {
        id: (items.length+1),
        image: false,
        elements: []
    };
    items.push(item);
    return dispatch => {
        dispatch({type: SlideConstants.UPDATE_ALL, items});
        dispatch({type: SlideConstants.UPDATE, item});
    }
}

function clearSlide() {
    return { type: SlideConstants.CLEAR };
}

function clearSlides() {
    return { type: SlideConstants.CLEAR_ALL };
}
