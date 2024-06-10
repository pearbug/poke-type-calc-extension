import {useEffect, useState} from 'react'
import './css/reset.css'
import './index.css'
import TypeCard from "./components/TypeCard/index.jsx";
import {calculateAtkTypeEffectiveness, calculateDefTypeEffectiveness} from "./index.js";
import {krTypes, usTypes} from "./data/types.js";

function App() {
    const [selectedTypes, setSelectedTypes] = useState(new Set());  // 타입 선택
    const [isSelectedDef, setIsSelectedDef] = useState(true);   // 공격할껀지 선택
    const [resultData, setResultData] = useState();   // 결과 데이터
    const [language, setLanguage] = useState('ko-KR');   // 결과 데이터
    const [types, setTypes] = useState();   // 결과 데이터

    // 타입 카드를 눌렀을 때 이벤트
    function onClickTypeCard(index) {
        setSelectedTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    }

    // 공격 모드 변경시 누르는 중앙 버튼의 이벤트
    function onClickAtkButton() {
        setIsSelectedDef(!isSelectedDef)
    }

    // language button event
    function onClickLanguageButton(e) {
        setLanguage(e.target.value)
    }

    // 공격 모드에 따라 계산 후 출력
    useEffect(function displayResult() {
        if (isSelectedDef) {
            const data = calculateAtkTypeEffectiveness(selectedTypes);
            setResultData(data)
        } else {
            const data = calculateDefTypeEffectiveness(selectedTypes);
            setResultData(data)
        }
    }, [selectedTypes, isSelectedDef]);

    useEffect(function displayResult() {
        if (language === 'ko-KR') {
            setTypes(krTypes);
        } else if (language === 'en-US') {
            setTypes(usTypes);
        }
    }, [language]);

    return (
        <>
            <div className="flex-container">
                <div id="checkboxContainer">
                    <div className="checkbox-grid">
                        {types && types.map((type, index) =>
                            <TypeCard
                                className={selectedTypes.has(index) ? 'checked' : ''}
                                onClick={() => onClickTypeCard(index)}
                                index={index}
                                text={type}
                                key={type}/>)}
                    </div>
                </div>

                <hr/>

                <div id="midContainer">
                    <div id="buttonLabel">
                        {[...selectedTypes].map((typeIdx) => (
                                <TypeCard
                                    className={selectedTypes.has(typeIdx) ? 'checked' : ''}
                                    onClick={() => onClickTypeCard(typeIdx)}
                                    index={typeIdx}
                                    text={`${types[typeIdx]}`}
                                    key={typeIdx}/>
                            )
                        )}
                    </div>
                    <button onClick={onClickAtkButton} className={isSelectedDef ? 'active' : ''}>타입을 팰 때
                    </button>
                    &nbsp;
                    <button onClick={onClickAtkButton} className={isSelectedDef ? '' : 'active'}>타입한테 처맞을 때
                    </button>
                </div>

                <hr/>

                {selectedTypes.size > 0 && resultData &&
                    <div id="resultContainer">
                        {Object.keys(resultData).map((key) =>
                            <ul key={key}>
                                <h3>{key}</h3>
                                {resultData[key].map((index) =>
                                    <li key={index}><TypeCard
                                        index={index}
                                        text={`${types[index]}`}
                                    /></li>
                                )}
                            </ul>)
                        }
                    </div>
                }

                <select id="dropdown" name="dropdown" onChange={onClickLanguageButton}>
                    <option value="ko-KR">Korean</option>
                    <option value="en-US">English</option>
                </select>
            </div>

        </>
    )
}

export default App
