class TypeState{
    isSelectedTypeSet = new Set();

    getSelectedTypesToText(){
        return [...this.isSelectedTypeSet].map(typeIdx => typeList[typeIdx][0]);
    }
}
const typeState = new TypeState();

let typeList = [
    ["노말", "Normal"], ["불꽃", "Fire"], ["물", "Water"], ["풀", "Grass"], ["전기", "Electric"], ["얼음", "Ice"], 
    ["격투", "Fighting"], ["독", "Poison"], ["땅", "Ground"], ["비행", "Flying"], ["에스퍼", "Psychic"], ["벌레", "Bug"], 
    ["바위", "Rock"], ["고스트", "Ghost"], ["드래곤", "Dragon"], ["악", "Dark"], ["강철", "Steel"], ["페어리", "Fairy"]
];

// 이차원 배열로 상성 가중치 정의
const typeChart = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1], // Normal
    [1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1], // Fire
    [1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1], // Water
    [1, 0.5, 2, 0.5, 1, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1], // Grass
    [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1], // Electric
    [1, 0.5, 0.5, 2, 1, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1], // Ice
    [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5], // Fighting
    [1, 1, 1, 2, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2], // Poison
    [1, 2, 1, 0.5, 2, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1], // Ground
    [1, 1, 1, 2, 0.5, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1], // Flying
    [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1], // Psychic
    [1, 0.5, 1, 2, 1, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5], // Bug
    [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1], // Rock
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1], // Ghost
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0], // Dragon
    [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5], // Dark
    [1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2], // Steel
    [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1] // Fairy
];

function createCheckboxList() {
    const checkboxContainer = document.querySelector(".checkbox-grid");

    for (let i = 0; i < typeList.length; i++) {
        const button = document.createElement("button");
        const label = document.createElement("label");
        const img = document.createElement('img'); // 이미지 요소 생성
        img.src = '../images/types/stone.png';
        img.alt = 'Type Image'; // 대체 텍스트 설정

        button.addEventListener('click', function (){
            if (typeState.isSelectedTypeSet.has(i)){
                typeState.isSelectedTypeSet.delete(i); // 체크 해제된 경우, 값 삭제
            }else{
                typeState.isSelectedTypeSet.add(i); // 체크된 경우, 값 추가
            }
            this.classList.toggle('checked');
            calculateTypeEffectiveness(); // 계산
        });

        label.appendChild(document.createTextNode(typeList[i][0])); // 첫 번째 텍스트 추가
        // label.appendChild(document.createElement("br")); // 줄 바꿈 요소 추가
        // label.appendChild(document.createTextNode(typeList[i][1])); // 두 번째 텍스트 추가

        button.appendChild(img);
        const flex = document.createElement("div");
        flex.classList.toggle('flex');
        flex.appendChild(label);
        button.appendChild(flex);

        checkboxContainer.appendChild(button);
    }
}

function calculateAtkTypeEffectiveness() {
    let effectiveness = new Array(typeList.length).fill(1);

    typeState.isSelectedTypeSet.forEach((typeIndex)=>{
        typeList.forEach((_, j)=>{
            effectiveness[j] *= typeChart[typeIndex][j];
        })
    })

    displayEffectivenessResult(effectiveness, "atkEffectivenessResult");
}

function calculateDefTypeEffectiveness() {
    let effectiveness = new Array(typeList.length).fill(1);

    typeState.isSelectedTypeSet.forEach((typeIndex)=>{
        typeList.forEach((_, j)=>{
            effectiveness[j] *= typeChart[j][typeIndex];
        })
    })

    displayEffectivenessResult(effectiveness, "defEffectivenessResult");
}

function displayEffectivenessResult(effectiveness, containerId) {
    const resultMap = {
        "4배": [],
        "2배": [],
        "1배": [],
        "0.5배": [],
        "0.25배": [],
        "0배": []
    };

    for (let i = 0; i < effectiveness.length; i++) {
        let value = effectiveness[i];
        let typeName = `${typeList[i][0]}`; //(${typeList[i][1]})`

        if (value === 4) resultMap["4배"].push(typeName);
        else if (value === 2) resultMap["2배"].push(typeName);
        else if (value === 1) resultMap["1배"].push(typeName);
        else if (value === 0.5) resultMap["0.5배"].push(typeName);
        else if (value === 0.25) resultMap["0.25배"].push(typeName);
        else if (value === 0) resultMap["0배"].push(typeName);
    }

    let resultHtml = "<table><tr><th>4배</th><th>2배</th><th>1배</th><th>0.5배</th><th>0.25배</th><th>0배</th></tr>";
    resultHtml += "<tr>";

    for (let key in resultMap) {
        resultHtml += "<td>" + (resultMap[key].length ? resultMap[key].join("<br>") : "&nbsp;") + "</td>";
    }

    resultHtml += "</tr></table>";
    document.getElementById(containerId).innerHTML = resultHtml;
}

function calculateTypeEffectiveness() {
    calculateAtkTypeEffectiveness();
    calculateDefTypeEffectiveness();
    console.log(typeState.isSelectedTypeSet);
    if (typeState.isSelectedTypeSet.size === 0) {
        document.getElementById("atkEffectivenessResult").innerHTML = "";
        document.getElementById("defEffectivenessResult").innerHTML = "";
    }

    const selectedTypes = typeState.getSelectedTypesToText();

    // 버튼 앞에 새로운 라벨 설정
    const buttonLabel = selectedTypes.join(", ");
    document.getElementById("buttonLabel").textContent = buttonLabel;
}

function toggleEffectiveness(type) {
    document.getElementById("atkContainer").classList.toggle("active", type === "atk");
    document.getElementById("defContainer").classList.toggle("active", type === "def");
    document.getElementById("atkContainer").classList.toggle("hidden", type !== "atk");
    document.getElementById("defContainer").classList.toggle("hidden", type !== "def");

    // 버튼 스타일 변경
    document.getElementById("atkButton").classList.toggle("active", type === "atk");
    document.getElementById("defButton").classList.toggle("active", type === "def");
}

document.getElementById("atkButton").addEventListener("click", function() {
    toggleEffectiveness("atk");
    calculateAtkTypeEffectiveness();
});

document.getElementById("defButton").addEventListener("click", function() {
    toggleEffectiveness("def");
    calculateDefTypeEffectiveness();
});

createCheckboxList();