import mongoose, { Mongoose }  from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  address: {
    type: Array,
  },
  phone: { 
    type : String, 
    required: [true, "phone number is required"] },
  userType: {
    type: String,
    required: [true, "user type is required"],
    default: "client",
    enum: ["client", "admin", "vendor", "driver"],
  },
  profile: {
    type: String,
    default:
      "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT-_VWWLluyeq_32DaRkuSHHTlF52Z6Jz2NXSttjGZ7RDuj2dLzfzgPCrvhbBB6cT1DtjiTaxV2WfA0pdlMpXOczfia9sQTanC6F_znQ8voAVRM1KriWqmSm0XDavaYQTGZKzpp5vD3mrs",
  },
  answer : {
    type : String,
    required : [true, 'Answer is required'],
  }
}, {timeStamps : true});


export const User = mongoose.model('User', userSchema);