import React from 'react';
import {Link} from 'react-router-dom'

class Channel extends React.Component{
    
    _openExternalSite(site){
        const OpenExternalSite=require('./../rendererHelper/OpenExternalSite');
        OpenExternalSite(site);
    }

    render(){
        const chdata=this.props.channel;
        return(
            <div className='channel-view card col-sm-6'>
                <div className='card-body'>
                    <img src={chdata.sumbnail} className='card-img-top' />
                    <h5 className='card-title'>{chdata.liverName}</h5>
                        <div className='btn btn-primary' onClick={()=>{this._openExternalSite(chdata.url)}}>
                            <p>YouTube</p>
                        </div>
                        <div className='btn btn-primary' onClick={()=>{this._openExternalSite(chdata.twitter)}}>
                            <p>Twitter</p>
                        </div>
                        <Link to={'/live/'+chdata.id} className='btn btn-primary'>
                            <p>実況</p>
                        </Link>
                </div>
                
            </div>
        );
    }
}

export default Channel;