import React, { Component } from 'react';
import { connect } from "react-redux";
import { SlideAction } from '../../actions';

class Lists extends Component {
    constructor(props) {
        super(props);
    }

    handleSelect = (e, slide) => {
        e.preventDefault();
        this.props.dispatch(SlideAction.selectSlide(slide));
    };

    render() {
        let slides = this.props.slides;
        let selectSlide = this.props.slide.data;
        return (
            <div className="card">
                <div className="card-body">
                    <h4>Slide List</h4>
                    <div className="list-group list-group-flush">
                        {(slides.data) &&
                            <>
                            {slides.data.map((slide, i) => (
                                <a href="#" key={i}
                                   onClick={(e) => this.handleSelect(e, slide)}
                                   className={"list-group-item list-group-item-action " + ((selectSlide.id === slide.id) ? 'active' : null)}>Slide {(i+1)}</a>
                            ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { slide, slides } = state;
    return {
        slide,
        slides
    };
}

export default connect(mapStateToProps)(Lists);
