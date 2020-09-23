const {app,BrowserWindow,ipcMain,clipboard, shell}=require('electron');
const Twitter = require('twitter');
const getAllChannels = require('./helper/getAllChannels');
const TwitterAOuthAuthentication = require('./helper/TwitterAOuthAuthentication');
const fs=require('fs');

let winMain=null;
let entryURL=`file://${__dirname}/index.html`;
app.on(
    'window-all-closed',
    ()=>{
        app.quit();
    }
);

app.on(
    'closed',
    ()=>{
        app.quit();
    }
);

app.on(
    'ready',
    ()=>{
        winMain=new BrowserWindow({
            width:1200,
            height:800,
            webPreferences:{
                nodeIntegration:true
            }
        });
//        winMain.setMenu(null);
        winMain.loadURL(entryURL);
    }
);

ipcMain.on('get-win-id',(ev,arg)=>{
    if(arg=='main'){
        ev.sender.send('get-win-id',winMain.id);
    }
});

ipcMain.handle('get-channels-data',(ev,arg)=>{
    return new Promise((onResolved,onRejected)=>{
        const filename=arg;
        if(arg==='') filename='./channels.json';
        const channels=getAllChannels(filename);
        return onResolved(channels);
    });
});

ipcMain.handle('get-latest-url',(ev,arg)=>{
    return new Promise((onResolved,onRejected)=>{
        const getLatestContentHelper=require('./helper/getLatestContentHelper');
        const id=arg;
        getLatestContentHelper.getLatestContent(id,videoid=>{
            return onResolved(videoid);
        });
    });
});



ipcMain.handle('set-capture-to-clipboard',(ev,arg)=>{
    rect=arg
    winMain.capturePage(rect)
    .then(image=>{
        clipboard.writeImage(image);
        return image.toPNG;
    })
    .catch(err=>{
        return new Error(err.message);
    });
});

ipcMain.on('open-ex-browse',(ev,arg)=>{
    const url=arg;
    shell.openExternal(url);
});

ipcMain.on('tweet-capture',(ev,arg)=>{
    const text=arg;
    const tweetCapture=require('./helper/tweetCapture');
    tweetCapture(text);
});

ipcMain.on('gen-pintype',()=>{
    let win_pintype=new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        }
    });
    
    win_pintype.loadURL(`file://${__dirname}/PINType.html`);

    ipcMain.once('close-pintype',()=>{
        win_pintype.close();
    });
});

ipcMain.on('twitter-auth',()=>{
    const twitter_conf='./twitter_settings.json'
    const TwitterAOuthAuthentication=require('./helper/TwitterAOuthAuthentication');
    const waitPIN=require('./helper/waitPIN');
    TwitterAOuthAuthentication(waitPIN,shell.openExternal,twitter_conf)
    .then(res=>{
        console.log(res);
        const data=JSON.parse(fs.readFileSync(twitter_conf));
        data.Access_token=res.accessToken;
        data.Access_token_secret=res.accessTokenSecret;
        data.User_Id=res.userId;
        data.ScreenName=res.screenName;

        fs.writeFileSync(twitter_conf,JSON.stringify(data));
        
    })
    .catch(err=>{
        console.log(err);
    })
});