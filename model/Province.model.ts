import {Document, Model, model, Schema} from 'mongoose'
import {ISetIdDate} from "./Helper";

interface ProvinceAttrs {
  name: string;
}

export interface ProvinceDoc extends Document, ProvinceAttrs, ISetIdDate {
  id: string;
}

interface ProvinceModel extends Model<ProvinceDoc>{
  build(attrs: ProvinceAttrs) : ProvinceDoc
}

const provinceSchema = new Schema({
  name: { type: String, required: true}
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

provinceSchema.statics.build = (attrs: ProvinceAttrs) => {
  return new Province(attrs)
}

const Province = model<ProvinceDoc, ProvinceModel>('Province', provinceSchema)

export {Province}