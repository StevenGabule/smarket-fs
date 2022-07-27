import {Document, Model, model, Schema} from 'mongoose'
import {BarangayDoc} from "./Barangay.model";
import {ISetIdDate} from "./Helper";

interface StreetAttrs {
  name: string;
  estimatedDistance: number;
  timeTravel: number;
  deliveryFee: number;
  barangay: BarangayDoc;
}

export interface StreetDoc extends Document, StreetAttrs, ISetIdDate {
  id: string;
}

interface StreetModel extends Model<StreetDoc>{
  build(attrs: StreetAttrs) : StreetDoc
}

const streetSchema = new Schema({
  name: { type: String, required: true},
  estimatedDistance: { type: Number, required: true, default: 0},
  timeTravel: { type: Number, required: true, default: 0},
  deliveryFee: { type: Number, required: true, default: 0},
  barangay: {type: Schema.Types.ObjectId, ref: 'Barangay'}
}, {
  timestamps: true,
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})

streetSchema.statics.build = (attrs: StreetAttrs) => {
  return new Street(attrs)
}

const Street = model<StreetDoc, StreetModel>('Street', streetSchema)

export {Street}