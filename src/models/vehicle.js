import mongoose, { Schema } from 'mongoose';

const VehicleSchema = new Schema({
  id: { type: String, unique: true },
  manufacturer: { type: String },
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

export default Vehicle;
