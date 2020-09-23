const {ipcRenderer}=require('electron');

module.exports=function(textContent){
    ipcRenderer.send('tweet-capture',textContent);
}