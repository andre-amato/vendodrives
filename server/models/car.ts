import mongoose, { Document, Schema, Model } from 'mongoose';

export interface CarInterface extends Document {
  title: string;
  price: number;
  zipCode: string;
  photo: string;
  user: mongoose.Types.ObjectId;
}

const carSchema: Schema<CarInterface> = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  zipCode: { type: String, required: true },
  photo: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});

const Car: Model<CarInterface> = mongoose.model<CarInterface>('Car', carSchema);

module.exports = Car;