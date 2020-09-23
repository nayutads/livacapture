const {ipcMain}=require('electron');

module.exports=function(){
    return new Promise((onResolved,onRejected)=>{
        ipcMain.once('wait-key',(ev,arg)=>{
            return onResolved(arg);
        });
    });
}