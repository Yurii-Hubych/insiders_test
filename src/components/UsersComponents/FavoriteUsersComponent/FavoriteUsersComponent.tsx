import {FC} from "react";
import {usersService} from "../../../services/users.service.ts";
import {useAppSelector} from "../../../store/store.ts";

const FavoriteUsersComponent:FC = () => {

    const {favoriteUsers:users} = useAppSelector(state => state.usersSlice)

    return (
        <div className={""}>
            <ul>
                {users.map((user, index) => (
                    <li key={index} className={"mt-2 border-2 pt-4 pb-4 flex items-center mr-3 ml-3"}>
                        <span className={"ml-2.5"}>{user.firstName} {user.lastName}</span>
                        <button
                            className={"ml-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"}
                            onClick={() => usersService.removeFavorite(user.id)}
                        >remove from favorite
                        </button>
                    </li>

                ))}
            </ul>

        </div>
    );
};

export default FavoriteUsersComponent;