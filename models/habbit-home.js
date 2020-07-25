const mongoose=require('mongoose');
const habbitSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    track:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TrackHabbit"
    },
});

const Habbit=mongoose.model('Habbit',habbitSchema);
module.exports=Habbit;
