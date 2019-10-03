import React, { Component } from 'react';
import { connect } from "react-redux";
import CopyToClipboard from '../CopyToClipboard';

class Save extends Component {
    constructor(props) {
        super(props);
    }

    callbackFunction = (e) => {
        e.preventDefault();
        this.props.callbackFunction(e, false);
    };

    render() {
        let slides = this.props.slides;
        let active = this.props.active;
        return (
            <div className={"modal fade" + ((active) ? ' show': null)} style={((active) ? {display:'block'}: {})} id="loadModal" tabIndex={-1} role="dialog" aria-labelledby="loadModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loadModalLabel">Save Desc</h5>
                            <button type="button" onClick={(e) => this.callbackFunction(e)} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {(active) ?
                                <CopyToClipboard text={JSON.stringify(slides.data)} />
                                :
                                null
                                }
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

export default connect(mapStateToProps)(Save);
