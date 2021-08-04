// importing an express module
const mongoose=require("mongoose")

const express=require("express");
const { number } = require("prop-types");

var session=require("express-session");
var cookieParser=require("cookie-parser");

// storing session into db
var MongoSession = require("connect-mongodb-session")(session);


// importing bcrypt for hashing the password
const bcrypt=require("bcrypt");

// initiating an express object

const app =express();
const port=process.env.PORT || 8000;
// useremail=[{user: "vika@jsj",pass:"jdsnj"}]

// importing mongoose
// const mongoose=require("mongoose");

//connecting to the database

var db=mongoose.connect('mongodb+srv://VIKAS1:vikas@cluster0.yu7pa.mongodb.net/covid?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true},()=>{
    console.log("connected to database")
    // mongodb://VIKAS:Apdu5HxRSFudXYz@admin:port/database
    // mongodb+srv://VIKAS:Apdu5HxRSFudXYz@cluster0.37n8w.mongodb.net/covid?retryWrites=true&w=majority
})

const store= new MongoSession({
    uri:"mongodb+srv://VIKAS1:vikas@cluster0.yu7pa.mongodb.net/covid?retryWrites=true&w=majority",
    collection:"Session"
})

//creating registered Schema

// var schema =mongoose.Schema({
    
//     username:String,
//     useremail:String,
//     password:String
    
// })
var schema =mongoose.Schema({
    
    name:String,
    AdhaarNo:Number,
    gender:String,
    district:String,
    mobile:String,
    useremail:String,
    password:String,
    vaccinated:String
    
})

// session
app.use(session({
    key:"user_email",
    secret:"secerts",
    resave:false,
    saveUninitialized:false,
    store: store,
    cookie:{
        maxAge:60000
    }
}))

var isAuthAdmin=(req,res,next)=>{
    if(req.session.isAuth==true){
        next()
    } else{
        res.redirect("admin.ejs")
    }
}

var isAuthUser=(req,res,next)=>{
    if(req.session.isAuthUser==true){
        next()
    } else{
        res.redirect("login.ejs")
    }
}

// converting a schema into a model
var register=mongoose.model("Register",schema);

// register.insertMany([
//     {
//         "name":"Raghavendra Pandey",
//         "AdhaarNo":380345380721,
//         "gender":"male",
//         "district":"Palghar",
//         "mobile":7262871022,
//         "useremail":"erynf@att.net",
//         "password":"33jdkbM7c2S"
//     },
//     {
//         "name":"Aditi Musunur",
//         "AdhaarNo":666499439799,
//         "gender":"female",
//         "district":"Thane ",
//         "mobile":7093466521,
//         "useremail":"gregh@msn.com",
//         "password":"cFut3UFwZn0"

//     },
//     {
//         "name":"Advitiya Sujeet",
//         "AdhaarNo":463266168506,
//         "gender":"male",
//         "district":"Thane",
//         "mobile":8075330302,
//         "useremail":"sabren@msn.com",
//         "password":"K5X81Z3gjc8" 
//     },
//     {
//         "name":"Kriti Poduri",
//         "AdhaarNo":617866055789,
//         "gender":"female",
//         "district":"Mumbai",
//         "mobile":7922762467,
//         "useremail":"dialworld@sbcglobal.net",
//         "password":"8LZal7qI73l"
 
//     },
//     {
//         "name":"Amrish Ilyas",
//         "AdhaarNo":880876696030,
//         "gender":"male",
//         "district":"Thane",
//         "mobile":9822924168,
//         "useremail":"geoffr@hotmail.com",
//         "password":"37133PkAeXk"
    
//     },
//     {
//         "name":"Priti Seshan",
//         "AdhaarNo":516751107914,
//         "gender":"female",
//         "district":"Mumbai Suburban",
//         "mobile":9965067563,
//         "useremail":"gumpish@outlook.com",
//         "password":"2q6RZTh0L" 
//     },
//     {
//         "name":"Devasru Subramanyan",
//         "AdhaarNo":947610889316,
//         "gender":"male",
//         "district":"Palghar",
//         "mobile":9893515104,
//         "useremail":"hstiles@mac.com",
//         "password":"LwFNE9l4W" 
//     },
//     {
//         "name":"Hardeep Sharma",
//         "AdhaarNo":978616233771,
//         "gender":"male",
//         "district":"Mumbai",
//         "mobile":989113666,
//         "useremail":"campware@yahoo.com",
//         "password":"Ik2rY29lr" 
//     },
//     {
//         "name":"Mitali Jayadev",
//         "AdhaarNo":901260180680,
//         "gender":"female",
//         "district":"Mumbai",
//         "mobile":9294039991,
//         "useremail":"crandall@gmail.com",
//         "password":"SG0Q1TxOg"

    
//     },
//     {
//         "name":"Jitendra Choudhary",
//         "AdhaarNo":730484282661,
//         "gender":"male",
//         "district":"Mumbai",
//         "mobile":8822876681,
//         "useremail":"fwitness@yahoo.com",
//         "password":"51r3sKrQ0"
    
//     },
//     {
//         "name":"Kalyanavata Veerender",
//         "AdhaarNo":739721772999,
//         "gender":"male",
//         "district":"Mumbai Suburban",
//         "mobile":1123861169,
//         "useremail":"baveja@sbcglobal.net",
//         "password":"8ibRyB165"
   
//     },
//     {
//         "name":"Barsati Sandipa",
//         "AdhaarNo":603912851619,
//         "gender":"female",
//         "district":"Mumbai Suburban",
//         "mobile":7442817324,
//         "useremail":"ylchang@yahoo.ca",
//         "password":"sQFh4Z759"

//     },
//     {
//         "name":"Naveen Tikaram",
//         "AdhaarNo":299481975243,
//         "gender":"male",
//         "district":"Mumbai Suburban",
//         "mobile":2333211,
//         "useremail":"bahwi@mac.com",
//         "password":"pAqmJiQRT"
    
//     },
//     {
//         "name":"Vijai Sritharan",
//         "AdhaarNo":192294891135,
//         "gender":"male",
//         "district":"Mumbai Suburban",
//         "mobile":2224449567,
//         "useremail":"eminence@hotmail.com",
//         "password":"226KFpw6L"
    
//     },
//     {
//         "name":"Gopa Trilochana",
//         "AdhaarNo":318315078557,
//         "gender":"male",
//         "district":"Mumbai Suburban",
//         "mobile":41204428,
//         "useremail":"dimensio@mac.com",
//         "password":"4Kg5RQU0d"

//     }]).then(function(){
//         console.log("Data inserted")  // Success
//     }).catch(function(error){
//         console.log(error)      // Failure
//     })


var schema1 =mongoose.Schema({
    title:String,
    author:String,
    isbn:Number,
    link:String

})

var books=mongoose.model("books",schema1);

// admin page schema
var adminschema=mongoose.Schema({
    useremail:String,
    password:String
})

var adminmod=mongoose.model("Admin",adminschema)
// var admin1=new adminmod({useremail:"vikas@123",password:"1234"})
// admin1.save().then(()=>{
//     console.log("added")
// }).catch(()=>{
//     console.log("not")
// })

//fetching or excessing form 
app.use(express.urlencoded({extended:false})) 

// routing 

// set template engine "ejs"
app.set('view engine', 'ejs');



// app.get("./views/libraryuser.ejs",(req,res)=>{
//     res.render("./views/libraryuser.ejs")
// })

//adding style to ejs file by first creating a public folder and then making it static

app.use(express.static("public"))


app.get("/",(req,res)=>{
    res.render('index.ejs')
    
})
app.get("/aboutus.ejs",(req,res)=>{
    res.render('aboutus.ejs')
})


app.get("/msg.ejs",isAuthUser,(req,res)=>{
     register.find({},(err,data)=>{
        if (err){
            console.log(err)
        }
        else{
            // console.log(data)
            res.render("msg.ejs",{datas:data})
        }   
    })


    // res.render("libraryuser.ejs")
    // res.render("libraryuser.ejs",{datas:data})
})

//admin page
app.get("/admin.ejs",(req,res)=>{
    res.render('admin.ejs')
})

app.get("/login.ejs",(req,res)=>{
    res.render('login.ejs')
})  

app.get("/register.ejs",(req,res)=>{
    res.render('register.ejs')
})

// userlibrary page
app.get("/userlibrary.ejs",isAuthAdmin,(req,res)=>{
    register.find({},(err,data)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log(data)
            res.render("userlibrary.ejs",{datas:data})
        }   
    })

})



msg=""
var loginFlag=0;
var usercorrect=0


app.post("/login.ejs", async (req,res)=>{
    console.log(req.body.useremail,req.body.pass)
    

    try{
       const email=await register.findOne({useremail:req.body.useremail}).catch(()=>{
       });
       console.log(email,"jfbjd")
       console.log("entered email",req.body.useremail,"entered")
       let checkpass= await bcrypt.compare(req.body.pass,email.password)
      
       if (checkpass){
            console.log('u haved logged in')
            loginFlag=1
            req.session.isAuthUser=true;
            req.session.isAuth=false
           
            // res.render('libraryuser.ejs')
            // res.render("login.ejs")
            
                    console.log(email)
                    res.render("msg.ejs",{datas:email})
               
       }
       else if (req.body.useremail==email.useremail){
        usercorrect=1
       }


        }
        catch(e){
        
            res.render('login',{msg:"You have not registered"})

        }


    if (usercorrect==1){
        usercorrect=0;
        res.render('login',{msg:"password incorrect"})

    }
   
})

// post request for admin

app.post("/admin.ejs", async (req,res)=>{
    console.log(req.body.useremail,req.body.pass)
    

    try{
        adminmod.find({},(err,data)=>{
            console.log(data,"h")
        })
       const email=await adminmod.findOne({useremail:req.body.useremail}).catch(()=>{
       });
       console.log(email.password,"hii")
       console.log("entered email",req.body.useremail,"entered")
       let checkpass= email.password==req.body.pass;
    
       if (checkpass){
            console.log('u haved logged in')
            loginFlag=1
            req.session.isAuthUser=false;
            req.session.isAuth=true
           
            // res.render('libraryuser.ejs')
            // res.render("login.ejs")
            // books.find({},(err,data)=>{
            //     if (err){
            //         console.log(err)
            //     }
            //     else{
            //         console.log(data)
            //         res.render("libraryuser.ejs",{datas:data})
            //     }   
            // })
            res.redirect("userlibrary.ejs")

       }
       else if (req.body.useremail==email.useremail){
        usercorrect=1
       }


        }
        catch(e){
        
            res.render('admin',{msg:"You are not a Admin"})

        }


    if (usercorrect==1){
        usercorrect=0;
        res.render('admin',{msg:"password incorrect"})

    }
   
})


// console.log(regester.length);
app.post("/register.ejs",async (req,res)=>{
    console.log("reg")

    //checking is the email address already exists in data base
    const newUser= await register.findOne({useremail:req.body.useremail}).catch((err)=>{
        
    }) 
    const newAdhaar= await register.findOne({AdhaarNo:req.body.adhaarNo}).catch((err)=>{
        
    }) 
    
    console.log(newUser,"jjs")
    if (newUser==undefined && newAdhaar==undefined){
        
        
    let match=req.body.pass==req.body.pass1;
    console.log("   ",req.body.pass1,' hi  ',req.body.pass)
    
    console.log(match,"ashag")
    if (match){
        try{

            let password1=await bcrypt.hash(req.body.pass1,10)
            // useremail.push({ username:req.body.username, user:req.body.useremail ,pass:password})
            // console.log(useremail)
            let user1=new register({
            name:req.body.fname,
                AdhaarNo:req.body.adhaarNo,
    gender:req.body.gender,
    district:req.body.country,
    mobile:req.body.mobile,
    useremail:req.body.useremail ,
    password:password1,
    
    
    
            });
            
            user1.save().then(()=>{console.log("saved")}).catch(()=>{console.log("not saved")});
            console.log("jdjdsj")
            
            res.redirect('login.ejs');
        }
        catch{
            res.redirect('register.ejs');
        }
    }
    else{
        res.render('register.ejs',{msg:"password do not matched"});
    }


    }
    else{
        res.render('register.ejs',{msg:"email/Adhaar Number already Registered"});
    }
   


    
})

app.post("/libraryuser.ejs",async (req,res)=>{
    console.log("post")
    
    let book=new books({title:req.body.title,author:req.body.author,isbn:req.body.isbn,link:req.body.link})
    let t1=book.title;
    let a1=book.author;
    let i=String(book.isbn);
    let linkk=book.link
    
    
    
    if (t1.trim().length==0 ||a1.trim().length==0 || i.trim().length==0 ||linkk.trim().length==0){
       return res.redirect("libraryuser.ejs")
    }
    else{
        var found= await books.findOne({isbn:req.body.isbn}).catch((err)=>{})
    }

    
    if (found==null){
        

            book.save().then(()=>{
                console.log("added")
            }).catch(()=>{
                console.log("not")
            })
            req.body.title="";
            req.body.author="";
            req.body.isbn="";
            req.body.link="";
        
    }
    res.redirect("libraryuser.ejs")
})
// deleteing particular record from the book
app.get("/delete/:id", (req,res)=>{
    let id=req.params.id;
    try{

         register.updateOne({_id:id},{vaccinated:"yes"}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                // console.log("Updated Docs : ", docs);
            }
        }).then(()=>{
            // console.log("updated")
            res.redirect("/userlibrary.ejs")
        }).catch(()=>{console.log("not updated")})
        

        
            
        
    }
    catch{
        //jgxhsg
    }
    
})


app.listen(8000);
