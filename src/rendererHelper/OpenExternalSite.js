const {ipcRenderer}=require('electron');

module.exports=function(url){
    ipcRenderer.send('open-ex-browse',url);
    ipcRenderer.send('twitter-info-changed');
}