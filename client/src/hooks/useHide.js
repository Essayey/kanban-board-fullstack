import { useEffect } from "react";

export const useHide = (onHide, ref) => {
    useEffect(() => {
        const handleClickOutside = e => {
            if (ref.current && !ref.current.contains(e.target))
                onHide();
        }

        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [onHide, ref]);

    useEffect(() => {
        const handleEscape = e => {
            if (e.which === 27)
                onHide();
        }
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onHide])
}