const {TwitterOAuth} = require('twitter-auth-await');
const fs=require('fs');
const url=require('url');
const queryString=require('querystring');


module.exports=function(readPinFunc,notifyUrlFunc,twitterconffile){
    
    return new Promise((onResolved,onRejected)=>{
        const twitter_auth_data=JSON.parse(fs.readFileSync(twitterconffile));

        let result;
        console.log(twitter_auth_data);
        const twitterClient=new TwitterOAuth({
            consumerKey:twitter_auth_data.API_Key,
            consumerSecret:twitter_auth_data.API_Key_secret,
            callback:'oob'  
        });
        let redirectUri;
        let pin,token;

        twitterClient.getRedirectAuthURI()
        .then(r=>{
            redirectUri=r;
            notifyUrlFunc(redirectUri);
            return readPinFunc();
        })
        .then(code=>{
            pin=code;
            token=(queryString.parse((url.parse(redirectUri)).query)).oauth_token;
            return twitterClient.getAccessToken(token,pin);
        })
        .then(res=>{
            return onResolved(res);
        })
        .catch(err=>{
            return onRejected(err);
        });
    });

}