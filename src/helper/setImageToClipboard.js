const {clipboard,BrowserWindow,NativeImage,ipcRenderer} = require('electron');

module.exports=function(win){
    return new Promise((onResolved,onRejected)=>{
        if(!(win instanceof BrowserWindow)){
            return onRejected(new Error('win is not BrowserWindow'));
        }
        //NativeImageをIPCでやりとりするか
        ipcRenderer.send('get-youtube-capture',null);

        ipcRenderer.on()
        
    });
}