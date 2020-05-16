const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const puppeteer = require('puppeteer')
const CronJob = require('cron').CronJob
const sgMail = require('@sendgrid/mail')


const cookie = process.env.COOKIE
const port = process.env.PORT || 3000 
const url = process.env.urlDbProd
const sendGridApiKey = process.env.sendGrid_api_key
sgMail.setApiKey(sendGridApiKey)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
const db = mongoose.connection;
db.on('error', (err)=> {
   console.log(err);
})
db.once('open', () => {
   console.log('Connection opened on:', url);
})

const Schema = mongoose.Schema
const messageSchema = new Schema({ url: String, pageLength: Number})
const urlDb = mongoose.model('Url', messageSchema)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/url', (req, res) => {

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setCookie({"domain":".google.com","expirationDate":1652669343.447665,"hostOnly":false,"httpOnly":false,"name":"__Secure-3PAPISID","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"1","value":"WwVKgbfFLoCzjZg9/AIL1Ea53uh4Kq0kY1","id":1},{"domain":".google.com","expirationDate":1652669343.447448,"hostOnly":false,"httpOnly":true,"name":"__Secure-3PSID","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"1","value":"xAfwFEXKNEA89fml4v5s69PEv6Ez0sUIWPzkrMOSmq1C9nFZJDYfn6sDqwW2pCdR3LFrVQ.","id":2},{"domain":".google.com","expirationDate":1596265199.447644,"hostOnly":false,"httpOnly":false,"name":"__Secure-APISID","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"1","value":"PzV-f3XGYIMenbys/AYWTer1mk7_Jc5GtT","id":3},{"domain":".google.com","expirationDate":1596265199.447603,"hostOnly":false,"httpOnly":true,"name":"__Secure-HSID","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"1","value":"AHw1NSC0C3ONkHKXf","id":4},{"domain":".google.com","expirationDate":1596265199.447625,"hostOnly":false,"httpOnly":true,"name":"__Secure-SSID","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"1","value":"A70ZmUZA6gcpkD6kT","id":5},{"domain":".google.com","expirationDate":1592189429,"hostOnly":false,"httpOnly":false,"name":"1P_JAR","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"1","value":"2020-5-16-2","id":6},{"domain":".google.com","expirationDate":1623293415.058961,"hostOnly":false,"httpOnly":true,"name":"ANID","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"1","value":"AHWqTUmy-FCv4q6iSqyWGQEKo06pt4E51l4antoAPSUxdZffgnm208YfofzL3mBn","id":7},{"domain":".google.com","expirationDate":1652669343.447562,"hostOnly":false,"httpOnly":false,"name":"APISID","path":"/","sameSite":"unspecified","secure":false,"session":false,"storeId":"1","value":"PzV-f3XGYIMenbys/AYWTer1mk7_Jc5GtT","id":8},{"domain":".google.com","expirationDate":1652669343.447521,"hostOnly":false,"httpOnly":true,"name":"HSID","path":"/","sameSite":"unspecified","secure":false,"session":false,"storeId":"1","value":"AHw1NSC0C3ONkHKXf","id":9},{"domain":".google.com","expirationDate":1605408603.172351,"hostOnly":false,"httpOnly":true,"name":"NID","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"1","value":"204=qsdl7QG4UpvpnGH9Cn--Yx2w5LSOXSkLNsL-r0urkeICmqq9Sa1mmkfr2576C_XaT0tYvL5Iyqat2yp0JCoc_9VlNPrt7Tea5xXYHBNAKzdw_sIBU0NStFO24xXz7hbeM9TpxpQ8EomKm93rk4vFDRWKcacfPGXlr-fQ2LKDSTVVPOhsmQy8mvBnFqLkHN-HO_IzyPJ1mpoDffrwroWkivLUVrSpT4XxzUa4M-s-ZaaXKvRNUI9xw6JnnTeJx0k","id":10},{"domain":".google.com","expirationDate":1652669343.447583,"hostOnly":false,"httpOnly":false,"name":"SAPISID","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"1","value":"WwVKgbfFLoCzjZg9/AIL1Ea53uh4Kq0kY1","id":11},{"domain":".google.com","expirationDate":1605149347.446762,"hostOnly":false,"httpOnly":false,"name":"SEARCH_SAMESITE","path":"/","sameSite":"strict","secure":false,"session":false,"storeId":"1","value":"CgQI3o8B","id":12},{"domain":".google.com","expirationDate":1652669343.447383,"hostOnly":false,"httpOnly":false,"name":"SID","path":"/","sameSite":"unspecified","secure":false,"session":false,"storeId":"1","value":"xAfwFEXKNEA89fml4v5s69PEv6Ez0sUIWPzkrMOSmq1C9nFZduglx4M7KmvGYszUmxOCyQ.","id":13},{"domain":".google.com","expirationDate":1621133431.976359,"hostOnly":false,"httpOnly":false,"name":"SIDCC","path":"/","sameSite":"unspecified","secure":false,"session":false,"storeId":"1","value":"AJi4QfFswzVyKiFWTU1iRheRnyiucdDNjx07ZAfSXSqyIzliZl827Rzo43bL_FBqEKtr3c5FAQ","id":14},{"domain":".google.com","expirationDate":1652669343.447542,"hostOnly":false,"httpOnly":true,"name":"SSID","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"1","value":"A70ZmUZA6gcpkD6kT","id":15},{"domain":"accounts.google.com","expirationDate":1652669388.566761,"hostOnly":true,"httpOnly":true,"name":"__Host-3PLSID","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"1","value":"o.mail.google.com|o.myaccount.google.com|s.DZ|s.ES|s.youtube:xAfwFBfXhao3wWesJlpFsjDgGvDJsWNegFdAg91hJj2rHif9q4UzBpyJkfMpCL-Ymo2Ivw.","id":16},{"domain":"accounts.google.com","expirationDate":1652669431.976307,"hostOnly":true,"httpOnly":true,"name":"__Host-GAPS","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"1","value":"1:xzWhwwDNx0PAPBTv-ahpDGrNS9Kqhd1eUINhNIDvyFB3m5xAViyeo9yHSu7neV1vLl-T2-Obkd7bUWaTbfPDz0xMHFaGRw:BJk6KCADFA5gTDft","id":17},{"domain":"accounts.google.com","expirationDate":1652669388.566862,"hostOnly":true,"httpOnly":true,"name":"ACCOUNT_CHOOSER","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"1","value":"AFx_qI5OHuwo6OktsmLAbd6hhvtb45f7mSUveUbgcHPARqBXwLFd_JRyDxmOXoncwTsHiGkFoADIeL4JfJmbBL_jnykhHeFLdaDxKWp_PH-7i0jsqCHopCD8STaJKXGmiblPG04k7JhSDDO7by9lVJSaSNk_Hev1Cg","id":18},{"domain":"accounts.google.com","expirationDate":1652669431.976224,"hostOnly":true,"httpOnly":true,"name":"GAPS","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"1","value":"1:xzWhwwDNx0PAPBTv-ahpDGrNS9Kqhd1eUINhNIDvyFB3m5xAViyeo9yHSu7neV1vLl-T2-Obkd7bUWaTbfPDz0xMHFaGRw:BJk6KCADFA5gTDft","id":19},{"domain":"accounts.google.com","expirationDate":1652669388.566636,"hostOnly":true,"httpOnly":true,"name":"LSID","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"1","value":"o.mail.google.com|o.myaccount.google.com|s.DZ|s.ES|s.youtube:xAfwFBfXhao3wWesJlpFsjDgGvDJsWNegFdAg91hJj2rHif9yJDTucyxSd1qCAtsVIx6rg.","id":20});
    // const cookie = await page.cookies('http://google.com');
    const request = await page.goto(req.body.url)
    const bufferContent =  await request.buffer()
    const contentLength =  request.headers()['content-length']
    console.log(contentLength, bufferContent.length)
    //console.log(cookie)
    const url = new urlDb({ url: req.body.url, pageLength: contentLength ? contentLength : bufferContent.length})
    try {
        await url.save()
        console.log('url has been added to Database')
        res.redirect('/')
      } catch (e) {
        console.log(e)
        res.redirect('/')
      }
    // setTimeout(() => { res.redirect('/') }, 2000);
    await browser.close();
  })();

})

const job = new CronJob('* * */6 * * *', () => {

    urlDb.find({}, (err, data) => {
        
        (async () => {
            let docsCount = await urlDb.countDocuments()
            for (i = 0; i < docsCount; i++) {

                const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
                const page = await browser.newPage();
                const request = await page.goto(data[i].url);
                if (request.headers()['content-length'] != data[i].pageLength ) {
                  sgMail.send({
                    to: 'missoumozil@gmail.com',
                    from: 'missoumxss@gmail.com',
                    subject: 'New desing has been pushed!',
                    text: `A change has been made on ${data[i].url} from ${data[i].pageLength} to ${request.headers()['content-length']}`
                  })
                  console.log(`A change has been made on ${data[i].url} from ${data[i].pageLength} to ${request.headers()['content-length']}`)
                  await urlDb.updateOne({url: data[i].url}, {pageLength: request.headers()['content-length']});
                }
                await browser.close();
                
            }
          })();
 
    })

}, null, true, 'America/Los_Angeles');
job.start();


app.listen(port, () => {
    console.log('app running on ', port)
})
