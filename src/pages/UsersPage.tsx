import {useEffect} from "react";
import UsersComponent from "../components/UsersComponents/UsersComponent/UsersComponent.tsx";
import {useAppDispatch} from "../store/store.ts";
import {userActions} from "../store/slices/usersSlice.ts";


const UsersPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.loadUsers());
    }, []);

    return (
        <div>
            <UsersComponent/>
        </div>
    );
};

export default UsersPage;