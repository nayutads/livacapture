const {ipcRenderer}=require('electron');

module.exports=function(){
    console.log('method called');
    const target=document.getElementsByTagName('iframe')[0];
    console.log('target');
    console.log(target);
    const clientRect=target.getBoundingClientRect();

    const _x=clientRect.top+window.pageYOffset;
    const _y=clientRect.left+window.pageXOffset;
    const _width=isNaN(parseInt(target.width,10))?0:parseInt(target.width,10);
    const _height=isNaN(parseInt(target.height,10))?0:parseInt(target.height,10);

    const rect={
        x: _x,
        y: _y,
        width:_width,
        height:_height
    };

    ipcRenderer.invoke('set-capture-to-clipboard',rect)
    .then(cap=>{
        console.log('capture scceed');
        console.log(cap);
    })
    .catch(err=>{
        console.error(err);
    });
}