const {ipcRenderer}=require('electron');


module.exports=function(id){
    return new Promise((onResolved,onRejected)=>{
        ipcRenderer.invoke('get-latest-url',id)
        .then(videoid=>{
            return onResolved(videoid);
        })
        .catch(err=>{
            onRejected(err);
        });
    });
}
