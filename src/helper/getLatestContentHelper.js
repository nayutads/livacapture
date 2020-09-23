const {JSDOM}=require('jsdom');
const feederurl='https://www.youtube.com/feeds/videos.xml?channel_id=';


exports.getLatestContent=function(id,proc){
    const url=feederurl+id;
    JSDOM.fromURL(url).then(dom=>{
        const foo=dom.window.document.getElementsByTagName('entry')[0].getElementsByTagName('yt:videoId')[0].textContent;
        proc(foo);
    });
}