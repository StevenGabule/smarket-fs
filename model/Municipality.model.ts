import {Document, Model, model, Schema} from 'mongoose'
import {ProvinceDoc} from "./Province.model";
import {ISetIdDate} from "./Helper";

interface MunicipalityAttrs {
  name: string;
  province: ProvinceDoc
}

export interface MunicipalityDoc extends Document, MunicipalityAttrs, ISetIdDate {
  id: string;
}

interface MunicipalityModel extends Model<MunicipalityDoc>{
  build(attrs: MunicipalityAttrs) : MunicipalityDoc
}

const municipalitySchema = new Schema({
  name: { type: String, required: true},
  province: {type: Schema.Types.ObjectId, ref: 'Province'}
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

municipalitySchema.statics.build = (attrs: MunicipalityAttrs) => {
  return new Municipality(attrs)
}

const Municipality = model<MunicipalityDoc, MunicipalityModel>('Municipality', municipalitySchema)

export {Municipality}