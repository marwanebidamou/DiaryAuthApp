import { Schema, model, InferSchemaType, pluralize } from 'mongoose';

pluralize(null);

const userSchema = new Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String,
    picture_url: String
})


export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>('user', userSchema);