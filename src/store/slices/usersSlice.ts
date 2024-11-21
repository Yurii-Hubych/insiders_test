import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser.ts";
import {IUsersPaginated} from "../../models/IUsersPaginated.ts";
import {AxiosError} from "axios";
import {usersService} from "../../services/users.service.ts";
import {localStorageUtils} from "../../services/utils/localStorageUtils.ts";


type UsersSlice = {
    usersPaginated: IUsersPaginated;
    favoriteUsers: IUser[];
}

const initialState: UsersSlice = {
    usersPaginated: {
        users: [],
        skip: 0,
        limit: 0,
        total: 0
    },
    favoriteUsers: []
}

const loadUsers = createAsyncThunk<IUsersPaginated, void, {rejectValue: string}>(
    "usersSlice/loadUsers",
    async (_, ThunkAPI) => {
        try {
            const response = await usersService.getAll();
            return ThunkAPI.fulfillWithValue(response);
        } catch (e) {
            const error = e as AxiosError;
            return ThunkAPI.rejectWithValue(error.message);
        }
    }
);

const loadFavoriteUsers = createAsyncThunk<IUser[], void, {rejectValue: string}>(
    "usersSlice/loadFavoriteUsers",
    async (_, ThunkAPI) => {
        try {
            const response = await usersService.getFavoriteUsersEntities();
            return ThunkAPI.fulfillWithValue(response);
        } catch (e) {
            const error = e as AxiosError;
            return ThunkAPI.rejectWithValue(error.message);
        }
    }
)

export const usersSlice = createSlice({
    name: "usersSlice",
    initialState: initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(loadUsers.fulfilled, (state, action) => {
                const savedUsersPositions = localStorageUtils.getArray<IUser>("positions");
                if (savedUsersPositions && savedUsersPositions.length > 0) {
                    const sortedUsers = savedUsersPositions.map((savedUser: IUser) =>
                        state.usersPaginated.users.find((user: IUser) => user.id === savedUser.id) || savedUser
                    )
                    state.usersPaginated.users = sortedUsers;
                }else state.usersPaginated = action.payload;
            })
            .addCase(loadFavoriteUsers.fulfilled, (state, action) => {
                state.favoriteUsers = action.payload;
            })
})

export const userActions = {
    ...usersSlice.actions,
    loadUsers,
    loadFavoriteUsers
}