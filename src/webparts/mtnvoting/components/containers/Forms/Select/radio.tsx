import * as React from 'react';


const Radio = ({ onChange, title, options,size = "mtn__child" }) => {
    return <div className="radioContainer">
        <label>{title}</label>
        {options.map((item) => (
            <span> <input
                type="radio"
                onChange={onChange}
                value={item.value}
                name={title}
            />{item.value}</span>
        ))}

    </div>;
};

export default Radio;