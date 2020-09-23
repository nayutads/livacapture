const {ipcRenderer}=require('electron');

module.exports=function(){
    return new Promise((onResolved,onRejected)=>{
        ipcRenderer.invoke('get-twitter-info')
        .then(res=>{
            onResolved(res);
        })
        .catch(err=>{
            onRejected(err);
        });
    });
}