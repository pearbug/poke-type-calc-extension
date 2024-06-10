var typeList = [
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
    var checkboxContainer = document.querySelector(".checkbox-grid");

    for (var i = 0; i < typeList.length; i++) {
        var label = document.createElement("label");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = i;
        checkbox.name = "typeCheckbox";
        checkbox.onchange = calculateTypeEffectiveness; // 체크박스 변경 시 효과 계산
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(typeList[i][0])); // 첫 번째 텍스트 추가
        label.appendChild(document.createElement("br")); // 줄 바꿈 요소 추가
        label.appendChild(document.createTextNode(typeList[i][1])); // 두 번째 텍스트 추가
        checkboxContainer.appendChild(label);
    }
}

function calculateAtkTypeEffectiveness() {
    var checkboxes = document.getElementsByName("typeCheckbox");
    var effectiveness = new Array(typeList.length).fill(1);

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            var typeIndex = checkboxes[i].value;
            for (var j = 0; j < typeList.length; j++) {
                effectiveness[j] *= typeChart[typeIndex][j];
            }
        }
    }

    displayEffectivenessResult(effectiveness, "atkEffectivenessResult");
}

function calculateDefTypeEffectiveness() {
    var checkboxes = document.getElementsByName("typeCheckbox");
    var effectiveness = new Array(typeList.length).fill(1);

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            var typeIndex = checkboxes[i].value;
            for (var j = 0; j < typeList.length; j++) {
                effectiveness[j] *= typeChart[j][typeIndex]; // 인덱스를 반대로 사용
            }
        }
    }

    displayEffectivenessResult(effectiveness, "defEffectivenessResult");
}

function displayEffectivenessResult(effectiveness, containerId) {
    var resultMap = {
        "4배": [],
        "2배": [],
        "1배": [],
        "0.5배": [],
        "0.25배": [],
        "0배": []
    };

    for (var i = 0; i < effectiveness.length; i++) {
        var value = effectiveness[i];
        var typeName = `${typeList[i][0]}`; //(${typeList[i][1]})`

        if (value === 4) resultMap["4배"].push(typeName);
        else if (value === 2) resultMap["2배"].push(typeName);
        else if (value === 1) resultMap["1배"].push(typeName);
        else if (value === 0.5) resultMap["0.5배"].push(typeName);
        else if (value === 0.25) resultMap["0.25배"].push(typeName);
        else if (value === 0) resultMap["0배"].push(typeName);
    }

    var resultHtml = "<table><tr><th>4배</th><th>2배</th><th>1배</th><th>0.5배</th><th>0.25배</th><th>0배</th></tr>";
    resultHtml += "<tr>";

    for (var key in resultMap) {
        resultHtml += "<td>" + (resultMap[key].length ? resultMap[key].join("<br>") : "&nbsp;") + "</td>";
    }

    resultHtml += "</tr></table>";
    document.getElementById(containerId).innerHTML = resultHtml;
}

function calculateTypeEffectiveness() {
    calculateAtkTypeEffectiveness();
    calculateDefTypeEffectiveness();

    var checkboxes = document.getElementsByName("typeCheckbox");
    var selectedTypes = [];

    var anyCheckboxChecked = Array.from(checkboxes).some(function(checkbox) {
        return checkbox.checked;
    });

    if (!anyCheckboxChecked) {
        document.getElementById("atkEffectivenessResult").innerHTML = "";
        document.getElementById("defEffectivenessResult").innerHTML = "";
    }

    // 체크된 체크박스의 값을 가져와 배열에 추가
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedTypes.push(typeList[i][0]); // 첫 번째 값 추가
        }
    }

    // 버튼 앞에 새로운 라벨 설정
    var buttonLabel = selectedTypes.join(", ");
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