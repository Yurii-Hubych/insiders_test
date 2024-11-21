import {IUser} from "./IUser.ts";

export interface IUsersPaginated {
    limit: number,
    total: number,
    skip: number,
    users: IUser[]
}