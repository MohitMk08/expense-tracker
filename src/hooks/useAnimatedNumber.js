import { useEffect, useState } from "react";

export const useAnimatedNumber = (value, duration = 400) => {
    const [animatedValue, setAnimatedValue] = useState(value);

    useEffect(() => {
        let start = animatedValue;
        let startTime = null;

        const animate = (time) => {
            if (!startTime) startTime = time;

            const progress = Math.min((time - startTime) / duration, 1);

            const current = start + (value - start) * progress;
            setAnimatedValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value]);

    return animatedValue;
};