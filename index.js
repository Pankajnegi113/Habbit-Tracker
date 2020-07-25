var express=require("express");
var app=express();
const path=require('path');
var port=8000;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('assets'));
app.use(express.urlencoded({extended:true}));
const db=require('./config/mongoose');
const Habbit=require('./models/habbit-home');
const TrackHabbit=require('./models/trackHabbit');

//redirect to home page
app.get('/homePage',function(req,res){
    res.redirect('/');
})

//To show all habbits from db
app.get('/',function(req,res){

       Habbit.find({},function(err,habbits){
           if(err){
               console.log('Error in fetching habbit from db');
               return;
           }

            return res.render('home',{
                title:"Habbit Tracker",
                habbit_list:habbits
            });
    });
    
});

//if user adds new habbit
app.post('/create-habbit',function(req,res){
    Habbit.create(
        req.body,function(err,newHabbit){
            if(err)
            {
                console.log('Error in adding new habbit');
            }

            return res.redirect('back');
        });
});

//delete a habbit from list
app.get('/deleteHabbit/',function(req,res){
    Habbit.findByIdAndDelete(req.query.id,function(err){
        if(err)
        {
            console.log('Error in deleting habbit');
            return;
        }
        TrackHabbit.deleteMany({habbit:req.query.id},function(err)
        {
            if(err)
             {
                console.log('Error in deleting habbit');
                return;
            }
        })
        return res.redirect('back');
    })
})

//track habbit on click of calender icon
app.get('/trackHabbit/',function(req,res)
{
        Habbit.findById(req.query.id,function(err,habbit)
        {
            if(err)
            {
                console.log('Error in fetching habbit from db');
                return;
            }
            TrackHabbit.find({},function(err,details)
            {
                return res.render('trackHabbit',
                {
                    title:"Habbit Tracker",
                    trackHabbit:habbit,
                    details:details
                });
            })    
        })
})

//save checkbox habbit
app.post('/save-task/',function(req,res){
    var habbitId=req.query.id;
    Habbit.findById(habbitId,function(err,habbit){
        //if for the first time storing then save all fields data
        if(!habbit.track)
        {
            TrackHabbit.create({
                habbit:habbit,
                day1:req.body.day1,
                day2:req.body.day2,
                day3:req.body.day3,
                day4:req.body.day4,
                day5:req.body.day5,
                day6:req.body.day6,
                day7:req.body.day7
            },function(err,track)
            {
                habbit.track=track;
                habbit.save();
                if(err)
                {
                    console.log('error in creating new habbit');
                    return;
                }
               return res.redirect('back');
                
            })
        }

        //if already have once updated then update only current one for which value is defined
        else
        {
            TrackHabbit.findById(habbit.track,function(err,track)
            {
                if(req.body.day1!=undefined)
                {
                    track.day1=req.body.day1;
                }
                if(req.body.day2!=undefined)
                {
                    track.day2=req.body.day2;
                }
                if(req.body.day3!=undefined)
                {
                    track.day3=req.body.day3;
                }
                if(req.body.day4!=undefined)
                {
                    track.day4=req.body.day4;
                }
                if(req.body.day5!=undefined)
                {
                    track.day5=req.body.day5;
                }
                if(req.body.day6!=undefined)
                {
                    track.day6=req.body.day6;
                }
                if(req.body.day7!=undefined)
                {
                    track.day7=req.body.day7;
                }
                track.save();
                return res.redirect('back');
            })   
        }
        
    })
    
})

//running app on port 8000
app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error");
        return;
    }
    console.log("Setted up Server correctly at post:",port);
})

