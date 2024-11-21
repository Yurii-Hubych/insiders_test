import {FC} from "react";
import {usersService} from "../../../services/users.service.ts";
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {userActions} from "../../../store/slices/usersSlice.ts";

const FavoriteUsersComponent:FC = () => {

    const {favoriteUsers:users} = useAppSelector(state => state.usersSlice);

    const dispatch = useAppDispatch();

    const handleRemoveFavorite = (id: number) => {
        usersService.removeFavorite(id);
        dispatch(userActions.loadFavoriteUsers());
    }

    return (
        <div className={""}>
            <ul>
                {users.map((user, index) => (
                    <li key={index} className={"mt-2 border-2 pt-4 pb-4 flex items-center mr-3 ml-3"}>
                        <span className={"ml-2.5"}>{user.firstName} {user.lastName}</span>
                        <button
                            className={"ml-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"}
                            onClick={() => handleRemoveFavorite(user.id)}
                        >remove from favorite
                        </button>
                    </li>

                ))}
            </ul>

        </div>
    );
};

export default FavoriteUsersComponent;