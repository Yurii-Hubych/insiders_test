import {FC, useEffect, useState} from "react";
import {usersService} from "../../../services/users.service.ts";
import {useAppSelector} from "../../../store/store.ts";
import UserInlineComponent from "./UserInlineComponent.tsx";
import {IUser} from "../../../models/IUser.ts";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {localStorageUtils} from "../../../services/utils/localStorageUtils.ts";

const UsersComponent: FC = () => {

    const [favoriteUsers, setFavoriteUsers] = useState<number[]>([]);
    const [userList, setUserList] = useState<IUser[]>([]);

    useEffect(() => {
        setFavoriteUsers(usersService.getFavoriteUsersFromStorage());
    }, []);

    const {users} = useAppSelector(state => state.usersSlice.usersPaginated);


    useEffect(() => {
        setUserList(users);
    }, [users]);

    const onDragEnd = (result: any) => {
        const { destination, source } = result;
        if (!destination) return;
        if (destination.index === source.index) return;

        const reorderedUsers = Array.from(userList);
        const [removed] = reorderedUsers.splice(source.index, 1);
        reorderedUsers.splice(destination.index, 0, removed);

        setUserList(reorderedUsers);
    };

    const handleSavePositions = () => {
        localStorageUtils.setArray("positions", userList);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="usersList">
                {(provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {userList.map((user, index) => (
                            <Draggable key={user.id.toString()} draggableId={user.id.toString()} index={index}>
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <UserInlineComponent
                                            user={user}
                                            isFavorite={favoriteUsers.includes(user.id)}
                                            setFavoriteUsers={setFavoriteUsers}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
            <button
                className={"ml-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-10 mt-5"}
                onClick={handleSavePositions}
            >
                Save positions
            </button>
        </DragDropContext>
    );
};

export default UsersComponent;