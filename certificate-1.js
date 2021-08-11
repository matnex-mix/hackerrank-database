'use strict';

const https = require('https');

function doRequest(url) {
  return new Promise ((resolve, reject) => {
    https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            resolve(JSON.parse(data));
        });
    }).on("error", (err) => {
        reject(err.message);
    });
  });
}

async function getNumTransactions(username) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/article_users?username=<username>
    // API endpoint: https://jsonmock.hackerrank.com/api/transactions?&userId=<userId>
    
    const res = await doRequest("https://jsonmock.hackerrank.com/api/article_users?username="+username);
    if( res.data.length ){
        const res2 = await doRequest("https://jsonmock.hackerrank.com/api/transactions?&userId="+res.data[0].id);
        console.log(res2.total);
    } else {
        console.log("Username Not Found");
    }
}

getNumTransactions("epaga").catch((e)=>{
    console.log(e);
});