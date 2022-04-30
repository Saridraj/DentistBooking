const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    yearsExperience:{
        type: String,
        required: [true,'Please add a years of experience']
    },
    areaExpertise:{
        type: String,
        required: [true,'Please add an area of expertise']
    }
},
{
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
});

DentistSchema.pre('remove' ,async function(next) {
    console.log(`Appointments being removed from hospital ${this.id}`);

    await this.model('Appointment').deleteMany({dentist: this._id});

    next();
});

DentistSchema.virtual('appointments',{
    ref:'Appointment',
    localField: '_id',
    foreignField: 'hospital',
    justOne:false
});

module.exports=mongoose.model('Dentist',DentistSchema);