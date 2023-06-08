import { Variants } from "framer-motion";

export const loginBgVariant: Variants = {
    start: {
        rotate: 2,
        opacity: 0,
        filter: "blur(5px)"
    },
    end: {
        rotate: 0,
        opacity: 1,
        filter: "none",
        transition: {
            delay: 3,
            duration: 2,
        }
    },
}

export const loginSloganVariant: Variants = {
    start: {
        y: "20vh",
        scale: 1.5,
    },
    end: {
        y: 0,
        scale: 1,
        transition: {
            delay: 2.5,
            duration: 1.5,
        }
    },
}
export const loginButtonVariant: Variants = {
    start: {
        opacity: 0,
    },
    end: {
        opacity: 1,
        transition: {
            delay: 5,
            duration: 1,
        }
    },
}