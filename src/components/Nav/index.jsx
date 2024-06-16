import {NavLink} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageContextProvider.jsx";
import {NavContainer} from "../../css/NavStyle.js";
import {LANGUAGES, NATIVES, NAV_LANGUAGE} from "../../data/languages.js";

const Nav = () => {
    const {language, setLanguage} = useLanguage();

    return <NavContainer>
        <img src={'/logo.png'} alt="logo"/>
        <div>
            <NavLink to="/" className={({isActive}) => (isActive ? 'active' : '')}>
                {NAV_LANGUAGE[language][0]}
            </NavLink>
            <NavLink to="/nature" className={({isActive}) => (isActive ? 'active' : '')}>
                {NAV_LANGUAGE[language][1]}
            </NavLink>
            <NavLink to="/base-stats" className={({isActive}) => (isActive ? 'active' : '')}>
                {NAV_LANGUAGE[language][2]}
            </NavLink>
            <select id="dropdown" name="dropdown" onChange={(e) => setLanguage(e.target.value)}>
                {LANGUAGES.map((l, idx) => <option key={l} value={l}>{NATIVES[idx]}</option>)}
            </select>
        </div>
    </NavContainer>
}

export default Nav