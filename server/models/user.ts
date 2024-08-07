import mongoose, { Document, Schema, Model, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  cars: mongoose.Types.ObjectId[];
  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<UserInterface> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
    },
  ],
});

userSchema.pre<UserInterface>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User: Model<UserInterface> = mongoose.model<UserInterface>('User', userSchema);
export default User;