const express = require("express");
const path = require("path");
const app = express();
var mongoose =require("mongoose");
const { resourceUsage } = require("process");
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true, useUnifiedTopology: true})
const port = 80;


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    message: String
  });
const contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static')) 
app.use(express.urlencoded())


app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views')) 


app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData =new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been savewd to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved tothe database ")
    })
});
    


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});