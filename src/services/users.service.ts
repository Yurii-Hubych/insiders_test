import axios from "axios";
import {IUsersPaginated} from "../models/IUsersPaginated.ts";
import {localStorageUtils} from "./utils/localStorageUtils.ts";
import {IUser} from "../models/IUser.ts";

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/users"
});

const usersService = {
    //TODO toasts for errors
    getAll: async (): Promise<IUsersPaginated> => {
        try {
            const response = await axiosInstance.get("");
            return response.data;
        } catch (e) {
            console.error(e);
            return {
                users: [],
                skip: 0,
                limit: 0,
                total: 0
            };
        }
    },

    addToFavorite: (userId: number):void => {
        let favoriteUsersSet = new Set(localStorageUtils.getArray<number>("favoriteUsers"));
        favoriteUsersSet.add(userId);
        localStorageUtils.setArray("favoriteUsers", Array.from(favoriteUsersSet));
    },

    getFavoriteUsersFromStorage: ():number[] => {
        return localStorageUtils.getArray<number>("favoriteUsers");
    },

    getFavoriteUsersEntities:async ():Promise<IUser[]> => {
        const favoriteUsersFromStorage = localStorageUtils.getArray<number>("favoriteUsers");
        return await Promise.all(
            favoriteUsersFromStorage.map(async (userId: number) => {
                return await usersService.getUser(userId);
            })
        );
    },

    getUser: async (id: number) => {
        try {
            const response = await axiosInstance.get(`/${id}`);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    },

    removeFavorite: (userId: number):void => {
        let favoriteUsers = localStorageUtils.getArray<number>("favoriteUsers");
        favoriteUsers.splice(favoriteUsers.indexOf(userId), 1);
        localStorageUtils.setArray("favoriteUsers", favoriteUsers);
    }
}

export {
    usersService
}
