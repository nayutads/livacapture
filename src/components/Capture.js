import React from 'react';

class Capture extends React.Component{

    _setCapture(){
        const CaptureToClipboard=require('./../rendererHelper/CaptureToClipboard');
        CaptureToClipboard();
    }

    render(){
        return(
            <div className='btn btn-primary' onClick={()=>{this._setCapture()}}>
                <h6>キャプチャ</h6>
            </div>
        );
    }
}

export default Capture;