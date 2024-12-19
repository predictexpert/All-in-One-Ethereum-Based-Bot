import { useEffect, useState } from 'react';

const format = num => {
    num = num.toString();
    return num.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '0.0');
};

const removeExtraChars = (num, maxNum) => {
    return num.slice(0, maxNum);
};

const formatFloat = (num, maxNum) => {
    let formattedNum = format(num);
    if (formattedNum.length > maxNum) return removeExtraChars(formattedNum, maxNum);
    return formattedNum;
};

export default function useFloat(num, maxNum = 12) {
    const [value, setValue] = useState(() => formatFloat(num, maxNum));

    useEffect(() => {
        setValue(() => formatFloat(value, maxNum));
    }, [value]);

    return [value, setValue];
}