import {createBrowserRouter, RouteObject} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import UsersPage from "../pages/UsersPage.tsx";
import FavoriteUsersPage from "../pages/FavoriteUsersPage.tsx";

const routes: RouteObject[] = [
    {path: "/", element: <MainLayout/>, children: [
            {index: true, element: <div>Home</div>},
            {path: "users", element: <UsersPage/>},
            {path: "favorite-users", element: <FavoriteUsersPage/>}
        ]}
]

export const router = createBrowserRouter(routes);