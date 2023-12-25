import mongoose, {
    Schema
} from "mongoose";

const ISchema = new mongoose.Schema({
    
    identificationNumber:{
        type: String,
    },
    image:{
        type : String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    identificationNumber: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    dateOfExpiry: {
    },
    dateOfIssue: {
        type: String,
    },

});

export default mongoose.model("Info", ISchema);