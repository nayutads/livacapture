const Twitter=require('twitter');
const fs=require('fs');
const {clipboard}=require('electron');

module.exports=function(textContent){
    const twi_conf=JSON.parse(fs.readFileSync('./twitter_settings.json'));

    const img=clipboard.readImage();
    const png=img.toPNG();


    const client=new Twitter({
        consumer_key:twi_conf.API_Key,
        consumer_secret:twi_conf.API_Key_secret,
        access_token_key:twi_conf.Access_token,
        access_token_secret:twi_conf.Access_token_secret
    });

    client.post('media/upload',{media:png},(e,m,r)=>{
        if(!e){
            const status={
                status:textContent,
                media_ids:m.media_id_string
            }
            client.post('statuses/update',status,(err,tw,res)=>{
                if(!err) console.log('tweeted');
            });
        }
    });
}