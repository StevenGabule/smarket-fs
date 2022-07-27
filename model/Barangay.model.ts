import {Document, Model, model, Schema} from 'mongoose'
import {MunicipalityDoc} from "./Municipality.model";
import {ISetIdDate} from "./Helper";

interface BarangayAttrs {
  name: string;
  deliveryFee: number;
  minimumOrder: number;
  municipality: MunicipalityDoc;
}

export interface BarangayDoc extends Document, BarangayAttrs, ISetIdDate {
  id: string;
}

interface BarangayModel extends Model<BarangayDoc>{
  build(attrs: BarangayAttrs) : BarangayDoc
}

const barangaySchema = new Schema({
  name: { type: String, required: true},
  deliveryFee: { type: Number, required: true, default: 0},
  minimumOrder: { type: Number, required: true, default: 0},
  municipality: {type: Schema.Types.ObjectId, ref: 'Municipality'}
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

barangaySchema.statics.build = (attrs: BarangayAttrs) => {
  return new Barangay(attrs);
}

const Barangay = model<BarangayDoc, BarangayModel>('Barangay', barangaySchema)

export {Barangay}