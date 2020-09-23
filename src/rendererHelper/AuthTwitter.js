const {ipcRenderer}=require('electron');

module.exports=function(){
    ipcRenderer.send('twitter-auth');
    ipcRenderer.send('gen-pintype');
    
}