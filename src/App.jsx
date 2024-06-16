import './css/reset.css'
import './css/global.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import BaseStats from "./pages/BaseStats/index.jsx";
import Calculator from "./pages/Calculator/index.jsx";
import Nature from "./pages/Nature/index.jsx";
import {LanguageContextProvider} from "./contexts/LanguageContextProvider.jsx";
import Nav from "./components/Nav/index.jsx";

function App() {

    return (
        <LanguageContextProvider>
            <BrowserRouter>
                <Nav/>

                <Routes>
                    <Route path={'/'} element={<Calculator/>}/>
                    <Route path={'/index.html'} element={<Calculator/>}/>
                    <Route path={'/nature'} element={<Nature/>}/>
                    <Route path={'/base-stats'} element={<BaseStats/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </LanguageContextProvider>
    )
}

export default App
