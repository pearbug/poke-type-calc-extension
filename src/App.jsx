import './css/reset.css'
import './css/global.css'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import BaseStats from "./pages/BaseStats/index.jsx";
import Calculator from "./pages/Calculator/index.jsx";
import Nature from "./pages/Nature/index.jsx";
import logo from "../public/logo.png";
import {NavContainer} from "./css/NavStyle.js";

function App() {

    return (
        <>
            <BrowserRouter>
                <NavContainer>
                    <img src={logo} alt="logo"/>
                    <div>
                        <NavLink to="/" className={({isActive}) => (isActive ? 'active' : '')}>
                            상성계산기
                        </NavLink>
                        <NavLink to="/nature" className={({isActive}) => (isActive ? 'active' : '')}>
                            성격표
                        </NavLink>
                        <NavLink to="/base-stats" className={({isActive}) => (isActive ? 'active' : '')}>
                            종족값검색
                        </NavLink>
                    </div>
                </NavContainer>

                <Routes>
                    <Route path={'/'} element={<Calculator/>}/>
                    <Route path={'/index.html'} element={<Calculator/>}/>
                    <Route path={'/nature'} element={<Nature/>}/>
                    <Route path={'/base-stats'} element={<BaseStats/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
