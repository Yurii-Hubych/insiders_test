import {createRoot} from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";


//TODO - Add the StrictMode component to wrap the Provider component ( find fix for the dnd error with strict )
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
