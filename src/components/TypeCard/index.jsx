import {usTypes} from "../../data/types.js";

const TypeCard = ({text, index, ...rest}) => {
    return <button {...rest}>
        <img src={`types/${usTypes[index]}.png`} alt="Type Image"/>
        <div className="flex">
            <label>{text}</label>
        </div>
    </button>
}

export default TypeCard;