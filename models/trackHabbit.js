const mongoose=require('mongoose');
const trackHabbitSchema=new mongoose.Schema({

    day1:{
        type:String
    },
    day2:{
        type:String
    },
    day3:{
        type:String
    },
    day4:{
        type:String
    },
    day5:{
        type:String
    },
    day6:{
        type:String
    },
    day7:{
        type:String
    },
    habbit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Habbit"
    },
});

const TrackHabbit=mongoose.model('TrackHabbit',trackHabbitSchema);
module.exports=TrackHabbit;
