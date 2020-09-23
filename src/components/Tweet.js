import React from 'react';
import GetChannelsData from './../rendererHelper/GetChannelsData';
import Auth from './Auth';

class Tweet extends React.Component{

    constructor(props){
        super(props);
        this.state={
            tweetContent:''
        }
    }

    _openInBrowser(){
        const OpenExternalSite=require('./../rendererHelper/OpenExternalSite');
        const GetChannelsData=require('./../rendererHelper/GetChannelsData');
        GetChannelsData()
        .then(data=>{
            let res={};
            for(let d of data){
                if(d['id']===this.props.Id) res=d; 
                console.log('found'+res.liverName);
            }

            const hashtag=res.hashtag;
            const url='https://twitter.com/hashtag/';
            OpenExternalSite(url+hashtag);
        })
        .catch(err=>{
            console.error(err);
        });
        
    }

    _tweet(text){
        const GetChannelsData=require('./../rendererHelper/GetChannelsData');
        const TweetWithCapture=require('./../rendererHelper/TweetWithCapture');

        GetChannelsData()
        .then(data=>{
            let res={};
            for(let d of data){
                if(d['id']===this.props.Id) res=d; 
                console.log('found'+res.liverName);
            }
            const hashtag=res.hashtag;
            TweetWithCapture(text+'\n'+'#'+hashtag);
            this.setState({tweetContent:''});
        })
    }

    _handleChange(e){
        this.setState({tweetContent:e.target.value});
    }

    render(){
        return(
            <div className='tweet-container'>
                <Auth />
                <div className='btn btn-primary' onClick={()=>this._openInBrowser()}>
                    <p>ハッシュタグ</p>
                </div>
                <div className='btn btn-warning' onClick={()=>this._tweet(this.state.tweetContent)}>
                    <p>ツイート</p>
                </div>

                <form>
                    <label>
                        <p>ツイート</p>
                        <textarea rows="5" cols="50" value={this.state.tweetContent} onChange={e=>this._handleChange(e)} />

                    </label>
                </form>
            </div>
        );
    }
}

export default Tweet;