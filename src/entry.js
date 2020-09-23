import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const GetChannelsData=require('./rendererHelper/GetChannelsData');


GetChannelsData()
    .then(res=>{
        ReactDOM.render(
            <App channels={res} />
            ,
            document.getElementById('root')
        );
    }
);