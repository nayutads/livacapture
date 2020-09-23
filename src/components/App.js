import React from 'react';
import Channel from './Channel';
import {BrowserRouter,Route} from 'react-router-dom';
import Live from './Live';

class App extends React.Component{

    render(){
        return(
            <div className='channels'>

                <BrowserRouter>
                    <Route path='/live/:id' component={Live} />

                    <h4 className='channels-title'>チャンネル一覧</h4>
                    <div className='row'>
                            {
                                this.props.channels.map((c)=>{
                                    return(
                                        <Channel channel={c} />
                                    );
                                })
                            }
                    </div>
                        
                </BrowserRouter>
            </div>
        );
    }
}

export default App;