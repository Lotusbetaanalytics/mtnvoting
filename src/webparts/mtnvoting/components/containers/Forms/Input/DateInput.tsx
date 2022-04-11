import * as React from 'react';


const DateInput = ({ onChange, value, type, title, readOnly = false, required = false, size = "mtn__child" }) => {
    return <div className={`mtn__InputContainer ${size}`}>
        <input
            type={type}
            onChange={onChange}
            value={value}
            placeholder={title}
            readOnly={readOnly}
            onFocus={(e) => (e.currentTarget.type = "date")}
            onBlur={(e) => (e.currentTarget.type = "text")}
            required={required}

        />
        <label>{title}</label>
    </div>;
};

export default DateInput;
