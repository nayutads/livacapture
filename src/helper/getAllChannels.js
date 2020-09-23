getAllChannels=function(filename){
    const channels=(function(){
        const fs=require('fs');
        const data=JSON.parse(fs.readFileSync(filename));
        return data;
    })();

    return channels;
}

module.exports=getAllChannels;