import { Types } from 'mongoose';

export type AuthUser = {
  id: Types.ObjectId;
  username: string;
  iat?: number;
  exp?: number;
};
