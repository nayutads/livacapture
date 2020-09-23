const {ipcRenderer}=require('electron');

function onButtonClick(){
    let text=document.pintypeform.pincode_textarea.value;
    console.log(text);
    ipcRenderer.send('wait-key',text);
    ipcRenderer.send('close-pintype');
    
    setTimeout(()=>{
        ipcRenderer.send('twitter-info-changed');
    },10000);


}

