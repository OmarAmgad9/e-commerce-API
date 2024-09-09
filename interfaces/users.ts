import { Document } from "mongoose";


export interface Users extends Document{
    name: string,
    email: string,
    password: string,
    phone: string,
    role : UserRole,
    active: boolean,
    image: string,
    restCode: string;
    passwordChangedAt: Date | number,
    restCodeExpireTime: Date | number | undefined,
    restCodeVerify: Boolean | undefined
}

type UserRole = 'manger' | 'admin' | 'user'