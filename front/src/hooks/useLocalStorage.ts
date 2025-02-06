import { useEffect, useState } from "react";

const useLocalStorage = (
    key: string,
    defaultValue?: object | string | null
) => {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);
        return jsonValue !== null ? JSON.parse(jsonValue) : defaultValue;
    });

    useEffect(() => {
        try {
            if (value !== null && value !== undefined) {
                localStorage.setItem(key, JSON.stringify(value));
            } else {
                localStorage.removeItem(key);
            }
        } catch (e) {
            console.log("Error saving to localStorage", e);
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
