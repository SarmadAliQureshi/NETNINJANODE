var fs = require('fs')
var http = require('http');
var express = require('express')
// var events = require('events');
// var util = require('util');

// var person = function(name){
//     this.name=name;
// }

// util.inherits(person,events.EventEmitter);

// // var sarmad = new person('sarmad')
// // var ali = new person('ali')
// // var qureshi = new person('qureshi')

// // var people = [sarmad,ali,qureshi]

// // people.forEach(function(person) {
// //     person.on('speak',function(msg){
// //         console.log(person.name + ' said '+msg)
// //     })
// // });

// // sarmad.emit('speak','my name is sarmad')

// var abdul = new person('abdul')
// abdul.on('say',function(msg){
//     console.log('abdul is saying ', msg)
// })
// abdul.emit('say','i need new perfume')


// var fs = require('fs')
// var read_me = fs.readFile('readme.txt','utf8',function(err,data){

// })

// console.log(read_me)

// fs.writeFileSync('newfile.txt',read_me)

// fs.unlink('newFile.txt');

// creating directories


// var fs = require('fs')
// fs.mkdir('stuff',function(){
//     setTimeout(function(){},3000)
//     console.log('1')
//     fs.readFile('readme.txt','utf8',function(err,data){
//     console.log('6')
    
//     fs.writeFileSync('./stuff/writeme.txt',data)
//     console.log('2')
//     // console.log(data)
//     console.log('3')    
//     })
// })
// console.log('4')
// fs.unlink('./stuff/writeme.txt',function(){
//     console.log('file deletion done')
// })
// console.log('5')
// fs.rmdir('stuff',function(){
//     console.log('folder deleted')
// })

// fs.mkdirSync('stuff')

// fs.unlink('./stuff/writeMe.txt',function(){
//     fs.rmdir('stuff',function(){})
// })

// creating server and sending request and getting response

/* 
var http = require('http')

var server = http.createServer(function(req,res){
    console.log('req was made',req.url)
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('hy ninjas'); 
});

server.listen(8080,'127.0.1.1')
console.log('Now listining to port 8080') */

//reading and writing data in from of streams


/* 
var myReadStream = fs.createReadStream(__dirname+'/readme.txt','utf8')
var myWriteStream = fs.createWriteStream(__dirname+'/writeMe.txt')

myReadStream.on('data',function(chunk){
    console.log('new chunk received:')
    myWriteStream.write(chunk)
});

console.log(__dirname)
 */
 //pipes
//  var myReadStream = fs.createReadStream(__dirname+'/readme.txt','utf8')
//  var myWriteStream = fs.createWriteStream(__dirname+'/writeMe.txt')

//  myReadStream.pipe(myWriteStream)
//  resp.end(myReadStream)



/* var server = http.createServer(function(req,resp){
    var myReadStream = fs.createReadStream(__dirname+'/readme.txt','utf8')
    // var myWriteStream = fs.createWriteStream(__dirname+'/writeMe.txt')

    myReadStream.pipe(resp)
    // resp.end(myReadStream)
})
server.listen(8080,'127.0.1.1')

 */

 var app = express();
 app.set('view engine','ejs')
 app.use('/assets',express.static('assets'));

 app.listen(3000);
 app.get('/',function(req,res){
     res.sendFile(__dirname+"/index.html")
 })

 app.get('/home',function(req,res){
    //  res.sendFile(__dirname+'/index.html')
    res.render('index')
 })

 app.get('/contact',function(req,res){
     console.log(req.query)
     res.render('contact',{qs:req.query})
 })

 app.get('/profile/:name',function(req,res){
    // res.send("Your name is "+req.params.name)
    data = {age:'20',hobbies : ['eating','sleeping', 'hiking']}
    res.render('profile',{person:req.params.name,data:data})
})
console.log('serving...')