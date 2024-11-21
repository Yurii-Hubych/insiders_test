import {FC, memo} from "react";
import {usersService} from "../../../services/users.service.ts";
import {IUser} from "../../../models/IUser.ts";

type IUserLineComponentProps = {
    user: IUser;
    isFavorite: boolean;
    setFavoriteUsers: (users: number[]) => void;
}

const UserInlineComponent:FC<IUserLineComponentProps> = ({user, isFavorite, setFavoriteUsers}) => {
    const handleAddToFavorite = (userId: number) => {
        usersService.addToFavorite(userId);
        setFavoriteUsers(usersService.getFavoriteUsersFromStorage());
    }

    const handleRemoveFromFavorite = (userId: number) => {
        usersService.removeFavorite(userId);
        setFavoriteUsers(usersService.getFavoriteUsersFromStorage());
    }

    return (
        <div className={"mt-2 border-2 pt-4 pb-4 flex items-center mr-3 ml-3 cursor-move select-none bg-white"}>
            <span className={"ml-2.5"}>
                {user.firstName} {user.lastName}
            </span>
            <button
                onClick={() => handleAddToFavorite(user.id)}
                className={"ml-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"}
            >
                add to favorite
            </button>
            {
                isFavorite &&
                <button
                    className={"ml-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"}
                    onClick={() => handleRemoveFromFavorite(user.id)}
                >remove from favorite</button>
            }
        </div>
    );
}

export default memo(UserInlineComponent);