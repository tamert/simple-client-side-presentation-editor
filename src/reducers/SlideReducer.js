import { SlideConstants } from '../constants';

export function slides(state = {data: [{
        id: 1,
        image: false,
        elements: []
    }]}, action) {
    switch (action.type) {
        case SlideConstants.UPDATE_ALL:
            return {
                data: action.items
            };
        case SlideConstants.CLEAR_ALL:
            return {
                data: [{
                    id: 1,
                    image: false,
                    elements: []
                }]
            };
        default:
            return state
    }
}



export function slide(state = {data: false}, action) {
    switch (action.type) {
        case SlideConstants.UPDATE:
            return {
                data: action.item
            };
        case SlideConstants.CLEAR:
            return {
                data: false
            };
        default:
            return state
    }
}
