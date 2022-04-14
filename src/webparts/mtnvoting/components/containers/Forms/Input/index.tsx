import * as React from 'react';


const Input = ({ onChange, value, type, title, readOnly = false, required = false, onBlur = null, size = "mtn__child" }) => {
    return <div className={`mtn__InputContainer ${size}`}>

        <input
            type={type}
            onChange={onChange}
            value={value}
            placeholder={title}
            readOnly={readOnly}
            required={required}
            onBlur={onBlur}
        />
        <label>{title}</label>
    </div>;
};

export default Input;
