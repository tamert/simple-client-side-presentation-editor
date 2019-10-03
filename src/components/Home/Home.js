import React, { Component, useEffect } from 'react';
import { connect } from "react-redux";
import FileInputComponent from 'react-file-input-previews-base64'
import Draggable from 'react-draggable';
import Lists from "./Lists";
import Save from "./Save";
import Load from "./Load";
import { SlideAction } from '../../actions';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            save : false,
            load : false,
            width : 0
        };
    }

    componentDidMount() {
        this.setState({
                width: this.container.offsetWidth
        });
        if (!this.props.slide.data) {
            if(this.props.slides.data) {
                const firstSlide = this.props.slides.data[0];
                this.props.dispatch(SlideAction.selectSlide(firstSlide));
            }
        }
    }

    getFile = (file) => {
        let slide = this.props.slide.data;
        slide.image = file.base64;
        this.props.dispatch(SlideAction.selectSlide(slide));
    };

    addText = (e) => {
        e.preventDefault();
        let slide = this.props.slide.data;
        slide.elements.push({
            id: (slide.elements.length+1)+"-"+slide.id,
            x: 0,
            y: 0,
            text: null
        }) ;
        this.props.dispatch(SlideAction.updateSlide(slide, this.props.slides.data));
    };

    changeText = (e, id) => {
        e.preventDefault();
        let slide = this.props.slide.data;
        if(slide.elements.length) {
            const index = slide.elements.map(function(el) {
                return el.id
            }).indexOf(id);
            slide.elements[index].text = e.target.value;
            this.props.dispatch(SlideAction.updateSlide(slide, this.props.slides.data));
        }
    };

    handleStop = (e, data, id) => {
        e.preventDefault();
        let slide = this.props.slide.data;
        if(slide.elements.length) {
            const index = slide.elements.map(function(el) {
                return el.id
            }).indexOf(id);
            slide.elements[index].x = data.x;
            slide.elements[index].y = data.y;
            this.props.dispatch(SlideAction.updateSlide(slide, this.props.slides.data));
        }
    };

    createSlide = (e) => {
        e.preventDefault();
        let tmp = this.props.slides.data;
        this.props.dispatch(SlideAction.createSlide(tmp));
    };

    setSave = (e, active) => {
        e.preventDefault();
        this.setState({save: active});
    };

    setLoad = (e, active) => {
        e.preventDefault();
        this.setState({load: active});
    };

    getSlide = (slide) => {
        return (
                <div>
                    {(slide.image) ?
                        <div className="text-center mask" style={{position:'relative'}}>
                            {(slide.elements.length) &&
                                <>
                                    {slide.elements.map((element, i) => (
                                        <Draggable
                                            key={element.id}
                                            defaultPosition={{x: element.x, y: element.y}}
                                            position={null}
                                            handle=".handle"
                                            bounds={{top: 0, left: 0, right: (this.state.width - 243), bottom: (400 - 62)}}
                                            grid={[1, 1]}
                                            zIndex={200}
                                            onStop={(e, data) => this.handleStop(e, data, element.id)}>
                                            <div>
                                                <div className="handle">Drag from here</div>
                                                <div><input type="text" defaultValue={element.text} onChange={(e) => this.changeText(e, element.id)} placeholder="Enter Text" className="form-control"/>
                                                </div>
                                            </div>
                                        </Draggable>
                                    ))
                                }
                                </>
                            }
                            <img src={slide.image} className="img-fill" alt={slide.id} />
                        </div>
                        :
                        <div>Please Upload A New Image</div>
                    }
                </div>
        )
    };

    render() {
        let slide = this.props.slide.data;
        return (
            <div className="row">
                <div className="col-md-3">
                    <Lists/>
                </div>
                <div className="col-md-9">
                    <div id="image-area">
                        <div className="card card-body" ref={el => (this.container = el)}>
                            {this.getSlide(slide)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 p-2 text-center text-md-left">
                            <FileInputComponent
                                imagePreview={false}
                                buttonComponent={(<button className="btn btn-outline-dark btn-sm ml-2">Upload Image</button>)}
                                labelStyle={{display:'none'}}
                                parentStyle={{display:'inline-block'}}
                                multiple={false}
                                callbackFunction={(file_arr)=>{this.getFile(file_arr)}}
                                accept="image/*"
                            />
                            <a href="#" onClick={(e)=>{this.addText(e)}} className="btn btn-sm ml-2 btn-outline-dark">Add Text</a>
                        </div>
                        <div className="col-md-6 p-2 text-center text-md-right">
                            <a href="#" className="btn btn-sm mr-2  btn-primary" onClick={(e) => this.createSlide(e)}>Add New Slide</a>
                            <a href="#" className="btn btn-sm mr-2  btn-success" onClick={(e) => this.setSave(e, true)}>Save Deck</a>
                            <a href="#" className="btn btn-sm mr-2  btn-success" onClick={(e) => this.setLoad(e, true)}>Load Deck</a>
                        </div>
                    </div>
                </div>
                <Save active={this.state.save} callbackFunction={(e, active)=>{this.setSave(e, active)}} />
                <Load active={this.state.load} callbackFunction={(e, active)=>{this.setLoad(e, active)}} />
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

export default connect(mapStateToProps)(Home);
