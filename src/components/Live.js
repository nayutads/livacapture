import React from 'react';
import YouTube from 'react-youtube';
import GetLatestContent from './../rendererHelper/GetLatestContent';
import Capture from './Capture';
import Tweet from './Tweet';


class Live extends React.Component{
    
    constructor(props){
        super(props);
        this.state={ video_id :undefined};
        const id=this.props.match.params.id;
        console.log('constructor '+id);
        GetLatestContent(id)
        .then(res=>{
            this.setState({video_id:res});
        })
        .catch(e=>{
            console.log('error');
            console.error(e);
        });
    }

    componentDidUpdate(prev){
        if(this.props.match.params.id!==prev.match.params.id){
            const id=this.props.match.params.id;
            GetLatestContent(id)
            .then(res=>{
                this.setState({video_id:res});
            })
            .catch(e=>{
                console.log('error');
                console.error(e);
            });
        }
    }

    _onReady(ev){
        ev.target.pauseVideo();
    }

    _setCapture(){
        const CaptureToClipboard=require('./../rendererHelper/CaptureToClipboard');
        CaptureToClipboard();
    }

    render(){
        
        const opts = {
            height: '612',
            width: '1089',
            playerVars: {
              autoplay: 1,
            },
        };
        
        console.log('return');
        
        return(
            <div className='live-container'>
                <div className='row'>
                    <div className='col'>
                    <YouTube    videoId={this.state.video_id}
                            opts={opts}
                            onReady={this._onReady} />
                    <Capture />
                    </div>
                    <div className='col'>
                        <Tweet Id={this.props.match.params.id}/>
                    </div>
                </div>
            </div>
        );
        
    }
};

export default Live;