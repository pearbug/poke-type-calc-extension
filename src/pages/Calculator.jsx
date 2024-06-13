import TypeCard from "../components/TypeCard/index.jsx";
import {krTypes, typeColors, usTypes} from "../data/types.js";
import {useEffect, useRef, useState} from "react";
import {calculateAtkTypeEffectiveness, calculateDefTypeEffectiveness} from "../index.js";
import {StyledResult} from "../css/StyledResult.js";

const Calculator = () => {
    const [selectedTypes, setSelectedTypes] = useState(() => {
        const storedValue = localStorage.getItem('mySet');
        if (storedValue !== null) {
            const parsedArray = JSON.parse(storedValue);
            return new Set(parsedArray);
        }
        return new Set();
    });  // 타입 선택
    const [selectedMode, setSelectedMode] = useState('DEF');   // 공격할껀지 선택
    const [resultData, setResultData] = useState();   // 결과 데이터
    const [i18nLanguage, setI18nLanguage] = useState('ko-KR');  // 'ko-KR' or 'en-US'
    const [types, setTypes] = useState();   // 언어 데이터
    const resultScrollRef = useRef(null);      // 스크롤 초기화를 위한 ref

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

    // language button event
    // function onClickLanguageButton(e) {
    //     setI18nLanguage(e.target.value)
    // }

    // 공격 모드에 따라 계산 후 출력
    useEffect(function displayCalculateResult() {
        if (selectedMode === "DEF") {
            const data = calculateDefTypeEffectiveness(selectedTypes);
            setResultData(data)
        } else if (selectedMode === "ATK") {
            const data = calculateAtkTypeEffectiveness(selectedTypes);
            setResultData(data)
        }
        if (resultScrollRef.current) {
            resultScrollRef.current.scrollTop = 0; // 수직 스크롤 위치를 0으로 설정
        }
    }, [selectedTypes, selectedMode]);

    // 언어변경
    useEffect(function displayLanguageResult() {
        if (i18nLanguage === 'ko-KR') {
            setTypes(krTypes);
        } else if (i18nLanguage === 'en-US') {
            setTypes(usTypes);
        }
    }, [i18nLanguage]);

    useEffect(() => {
        const array = Array.from(selectedTypes); // Set을 배열로 변환
        localStorage.setItem('mySet', JSON.stringify(array)); // 배열을 JSON 문자열로 저장
    }, [selectedTypes]);

    return <div className="flex-container">
        <div id="checkboxContainer">
            <div className="checkbox-grid">
                {types && types.map((type, index) =>
                    <TypeCard
                        className={selectedTypes.has(index) ? 'checked' : ''}
                        onClick={() => onClickTypeCard(index)}
                        index={index}
                        text={type}
                        style={selectedTypes.has(index) ? {
                            backgroundColor: typeColors[index],
                            boxShadow: `0 0 8px ${typeColors[index]}70`
                        } : {}}
                        key={type}/>)}
            </div>
        </div>

        <hr/>

        <div id="midContainer">
            <div id="buttonLabel">
                {types && selectedTypes.size >= 0 && [...selectedTypes].map((typeIdx) => (
                        <TypeCard
                            className={selectedTypes.has(typeIdx) ? 'checked' : ''}
                            onClick={() => onClickTypeCard(typeIdx)}
                            index={typeIdx}
                            text={`${types[typeIdx]}`}
                            key={typeIdx}/>
                    )
                )}
            </div>
            &nbsp;
            <button onClick={() => setSelectedMode("DEF")} className={selectedMode === "DEF" ? 'active' : ''}>타입을 팰 때
            </button>
            &nbsp;
            <button onClick={() => setSelectedMode("ATK")} className={selectedMode === "ATK" ? 'active' : ''}>타입한테 처맞을
                때
            </button>
        </div>

        <hr/>

        <StyledResult ref={resultScrollRef}>
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
        </StyledResult>
        {/*<select id="dropdown" name="dropdown" onChange={onClickLanguageButton}>*/}
        {/*    <option value="ko-KR">Korean</option>*/}
        {/*    <option value="en-US">English</option>*/}
        {/*</select>*/}
    </div>
}

export default Calculator