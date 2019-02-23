const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const exphbs = require('express-handlebars');
const member = require('./Members')


const logger = require('./middleware/logger')

//app.get('/api/member', (req,res)=> res.json(member))



//normal middlewire

//handlebars
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.use('/', (req,res)=>{
    res.render('index',{
    title: 'Memberss',
    member: member})
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger)

// app.get('/', function(req,res){
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

app.use('/api/members', require('./router/api/members'));



//set directory
app.use(express.static(path.join(__dirname, 'public')));




const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Successfully run on PORT ${PORT}`))