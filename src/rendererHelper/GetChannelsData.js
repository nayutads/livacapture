const {ipcRenderer}=require('electron');

module.exports=function(){
    return new Promise((onResolved,onRejected)=>{
        ipcRenderer.invoke('get-channels-data','./channels.json')
        .then(channels=>{
            return onResolved(channels);
        })
        .catch(err=>{
            return onRejected(err);
        });
    });
}


// module.exports=function(){
//     return new Promise((onResolved,onRejected)=>{
//         ipcRenderer.send('get-channels-data','./channels.json');
//         ipcRenderer.once('get-channels-data',(ev,arg)=>{
//             onResolved(arg);
//             return arg;
//         });
//     });
// }