
var  express = require("express");
var app=express();

var path=require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

const seq = require("sequelize");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const handle = require("express-handlebars");

app.use(express.static(path.join(__dirname, 'public')));

app.engine(".hbs", handle({ extname: ".hbs"}));
app.set("view engine", ".hbs");

app.engine(".html", handle({ extname: ".html"}));
app.set("view engine", ".html");

.
const sequelize_obj = new seq(
    "d6rjgle3rg8sjc", //name of database
    "hrphzcyhxcnbde", //username
    "f630add266dbfbc12dc7d83de983291d01f3e8f87271c0d2541eba318a11aa1d",//pass
    {
          host:"ec2-54-156-24-159.compute-1.amazonaws.com",
          dialect: 'postgres',
          port: 5432,
          dialectOptions: { ssl: {rejectUnauthorized: false}}
    }
);

const customers = sequelize_obj.define(
    "customers2",
    {   
        
        fname: seq.STRING,
        lname: seq.STRING,
        email: {
             type: seq.STRING,
             allowNull: false,
             unique: true
            },
            pnum:seq.INTEGER,
            streetadd:seq.STRING,
            streetadd2:seq.STRING,
            city:seq.STRING,
            Country:seq.STRING,
            password:seq.STRING,
            conmyPsw:seq.STRING,

    }
    
    );

    app.get("/", function (req,res)  {
        let data= {};
        res.render("home.html",{layout:false});
    });
    

app.post("/register",function(req,res){
    let fname=req.body.fname;
    let lname =req.body.lname;
    let email= req.body.mail;
    let pnum = req.body.pnum;
   let streetadd=req.body.streetadd;
   let streetadd2=req.body.streetadd2;
   let city=req.body.city;
   let Country=req.body.Country;
   let password=req.body.password;
   let conmyPsw=req.body.conmyPsw;
    let data={value:{
        fname:fname,
        lname:lname,
        email:email,
        pnum:pnum,
        streetadd:streetadd,
        streetadd2:streetadd2,
        city:city,
        Country:Country,
        password:password,
        conmyPsw:conmyPsw,

    },
     errors:{
    fname:"",
    lname:"",
    email:"",
    pnum:"",
    streetadd:"",
    streetadd2:"",
    city:"",
    Country:"",
    password:"",
    conmyPsw:"",
    }
};

if(!fname){
   data.errors.fname= "please enter first name";
}else if (fname.length < 3){
    data.errors.fname = "length should be more than 3 characters."
} else{
    customers.create({
        firstname:fname,
        lastname:lname,
        email:email,
        pnum:pnum,
        streetadd:streetadd,
        streetadd2:streetadd2,
        city:city,
        Country:Country,
        password:password,
        conmyPsw:conmyPsw,

    }).then((obj)=>{
        res.render("/views/home.html",{data:data, layout:false})
    });
}

});

app.get("/", function (req,res)  {
    res.sendFile(path.join(__dirname,"/public/home.html"));
});


app.get("/dashboard", function (req,res)  {
    res.sendFile(path.join(__dirname,"/public/dashboard.html"));
});


app.post("/login_post", function (req, res)  {
    
    let UserName= req.body.username;
    let Password= req.body.password;
    if (userName == null || userName== "" || userName== /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
{
    res.redirect("/public/error.html");}
else
{
    console.log("the username is"+ UserName);
    console.log("the pass is"+ Password);
   
  // res.send(UserName +Password);
    
  res.redirect("/public/dashboard");
}
});

app.get("/cwh",(req,res) => {
    res.sendFile(path.join(__dirname,"/public/cwh.html"));
});

app.use(function (req,res)
{
    res.status(404).sendFile(path.join(__dirname,"/public/pageNotFound.html"))
});


app.get("/plan", (req, res) => {
    if (req.session.isLoggedIn) {
      res.render("dashboard", {user: req.session.user, isLoggedIn: req.session.isLoggedIn});
    } else {
      res.redirect('Login,html')
    }
  })


sequelize_obj.sync().then(() => {
    var port = process.env.PORT || 8000;
    app.listen(port);
})

