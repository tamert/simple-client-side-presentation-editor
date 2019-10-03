import React, { Component } from 'react';
import { connect } from "react-redux";
import {SlideAction} from "../../actions";

class Load extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desk: ''
        }
    }

    handleLoad = (e) => {
        e.preventDefault();
        try {
            const arr = JSON.parse(this.state.desk);
            // upload
            this.props.dispatch(SlideAction.uploadSlides(arr));
            const firstSlide = arr[0];
            this.props.dispatch(SlideAction.selectSlide(firstSlide));
            // close modal
            this.props.callbackFunction(e, false);
            this.setState({ desk: ''});
        } catch (e) {
            return console.error(e);
        }
    };

    setDesc = (e) => {
        e.preventDefault();
        this.setState({desk: e.target.value})
    };

    callbackFunction = (e) => {
        e.preventDefault();
        this.props.callbackFunction(e, false);
    };

    render() {
        //let slides = this.props.slides;
        let active = this.props.active;
        return (
            <div className={"modal fade" + ((active) ? ' show': null)} style={((active) ? {display:'block'}: {})} id="saveModal" tabIndex={-1} role="dialog" aria-labelledby="saveModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="saveModalLabel">Load Desc</h5>
                            <button type="button" onClick={(e) => this.callbackFunction(e)} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {(active) ?
                                <textarea  className="form-control" onChange={(e) => this.setDesc(e)} value={this.state.desk} id="" cols="30" rows="10" />
                                :
                                null
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={(e) => this.callbackFunction(e)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => this.handleLoad(e)}>Update Deck</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { slides } = state;
    return {
        slides
    };
}

export default connect(mapStateToProps)(Load);
