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
    const browser = await puppeteer.launch({args: [
      'no-sandbox',
      'disable-setuid-sandbox',
    ]});
    const page = await browser.newPage();
    // await page.setCookie(cookie);
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

const job = new CronJob('* * */8 * * *', () => {

    urlDb.find({}, (err, data) => {
        
        (async () => {
            let docsCount = await urlDb.countDocuments()
            for (i = 0; i < docsCount; i++) {

                const browser = await puppeteer.launch();
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
