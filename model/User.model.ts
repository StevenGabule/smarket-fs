import {Document, Model, model, Schema} from 'mongoose'
import {VendorDoc} from "./Vendor.model";
import {StreetDoc} from "./Street.model";
import {BarangayDoc} from "./Barangay.model";
import {MunicipalityDoc} from "./Municipality.model";
import {ProvinceDoc} from "./Province.model";
import {Password} from "../services/password";
import {ISetIdDate} from "./Helper";

interface UserAttrs {
  vendor: VendorDoc;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: string;
  birthday?: Date;
  avatar?: string;
  street?: StreetDoc;
  barangay?: BarangayDoc;
  municipality?: MunicipalityDoc;
  province?: ProvinceDoc;
  userType?: string;
  emailVerifiedAt?: Date;
  accountStatus: number;
  accountType: number;
}

export interface UserDoc extends Document, UserAttrs, ISetIdDate {
  id: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  password: {type: String, required: true},
  gender: {type: String, required: true, default: 'm', enum: ['m', 'f']},
  birthday: {type: Date},
  avatar: {type: String},
  street: { type: Schema.Types.ObjectId, ref: 'Street'},
  barangay: { type: Schema.Types.ObjectId, ref: 'Barangay'},
  municipality: { type: Schema.Types.ObjectId, ref: 'Municipality'},
  province: { type: Schema.Types.ObjectId, ref: 'Province'},
  userType: {type: Number, required: true, default: 7},
  emailVerifiedAt: {type: Date},
  accountStatus: {type: Number, required: true, default: 1},
  accountType: {type: Number, required: true, default: 2},
}, {
  timestamps: true,
  toJSON: {
    transform(_,ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed);
  }
  done();
})

const User = model<UserDoc, UserModel>('User', userSchema);

export {User}




