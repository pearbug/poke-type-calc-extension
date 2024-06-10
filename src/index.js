// 이차원 배열로 상성 가중치 정의
import {usTypes} from "./data/types.js";

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


export function calculateAtkTypeEffectiveness(isSelectedTypeSet) {
    let effectiveness = new Array(usTypes.length).fill(1);

    isSelectedTypeSet.forEach((typeIndex) => {
        usTypes.forEach((_, j) => {
            effectiveness[j] *= typeChart[typeIndex][j];
        })
    })

    return displayEffectivenessResult(effectiveness);
}

export function calculateDefTypeEffectiveness(isSelectedTypeSet) {
    const effectiveness = new Array(usTypes.length).fill(1);

    isSelectedTypeSet.forEach((typeIndex) => {
        usTypes.forEach((_, j) => {
            effectiveness[j] *= typeChart[j][typeIndex];
        })
    })

    return displayEffectivenessResult(effectiveness);
}

export function displayEffectivenessResult(effectiveness) {
    const resultMap = {
        "x4": [],
        "x2": [],
        "x1": [],
        "x0.5": [],
        "x0.25": [],
        "x0": []
    };

    for (let i = 0; i < effectiveness.length; i++) {
        let value = effectiveness[i];

        if (value === 4) resultMap["x4"].push(i);
        else if (value === 2) resultMap["x2"].push(i);
        else if (value === 1) resultMap["x1"].push(i);
        else if (value === 0.5) resultMap["x0.5"].push(i);
        else if (value === 0.25) resultMap["x0.25"].push(i);
        else if (value === 0) resultMap["x0"].push(i);
    }

    return resultMap
}