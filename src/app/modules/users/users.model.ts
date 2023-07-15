import mongoose, { Schema } from 'mongoose';
import { IUser, IUserModel } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.static('isUserExist', async function (username: string): Promise<
  Partial<IUser | null>
> {
  return UserModel.findOne(
    { username },
    {
      username: 1,
      password: 1,
    }
  );
});

userSchema.static(
  'isPasswordMatched',
  async function (givenPass: string, savedPass: string): Promise<boolean> {
    return bcrypt.compare(givenPass, savedPass);
  }
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

const UserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default UserModel;
