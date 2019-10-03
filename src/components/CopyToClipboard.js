import React from 'react'

class CopyToClipboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        }

    }
    copyClipBoard = () => {
        this.textArea.select();
        document.execCommand('copy')
    };

    render() {
        return (
            <>
                <input readOnly className="form-control" value={this.state.text} type="text" ref={(textarea) => this.textArea = textarea}  />
                <button className="btn btn-success btn-block mt-2" onClick={this.copyClipBoard}>
                    COPY TO CLIPBOARD
                </button>
            </>

        )
    }
}

export default CopyToClipboard
