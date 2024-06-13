import './css/reset.css'
import './index.css'
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Calculator from "./pages/Calculator.jsx";
import Nature from "./pages/Nature.jsx";
import NotFound from "./pages/NotFound.jsx";
import BaseStats from "./pages/BaseStats.jsx";
import {StyledNav} from "./css/StyledNav.js";


function App() {

    return (
        <>
            <BrowserRouter>
                <StyledNav>
                    <img src={`logo.png`} alt="logo"/>
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
                </StyledNav>

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
