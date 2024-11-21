import {useEffect} from "react";
import FavoriteUsersComponent from "../components/UsersComponents/FavoriteUsersComponent/FavoriteUsersComponent.tsx";
import {useAppDispatch} from "../store/store.ts";
import {userActions} from "../store/slices/usersSlice.ts";

const FavoriteUsersPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.loadFavoriteUsers());
    }, []);

    return (
        <div>
            <FavoriteUsersComponent/>
        </div>
    );
};

export default FavoriteUsersPage;