import mongoose from 'mongoose';
import bcryot from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcryot.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;