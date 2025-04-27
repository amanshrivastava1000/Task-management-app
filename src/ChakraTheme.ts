import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
            100: "#DEE8F2",
            200: "#174773",
            300: "#42739E",
            400: "#296BA6",
            500: "#5F84A6",
            600: "#C6DBED",
            700: "#8e9eb7",
            800: "#a5b1c5",
            900: "#bbc5d4",
        },

        yellow: {
            100: "#FF881B",
            200: "#FAF3E6",
            300: "#FFA800",
            400: "#EFEFEF",
            500: "#fdfdfd",
            600: "#DDDDDD",
            700: "#F5F5F5",
        },
        red: {
            100: "#EB5757",
            200: "#E23A45",
            300: "#E05A33",
            400: "#F3800D",
            500: "#EB5757",
            600: "#FF0000"
        },
        green: {
            100: "#219653",
            200: "#dcfce7",
            300: "#245663",
            400: "#2B6777",
            500: "#4CBB6C",
            600: "#00B69B"
        },
        grey: {
            100: "#717583",
            200: "#5A5A5A",
            300: "#A8A8A8",
            400: "#D1D5DB",
            500: "#374151",
            600: "#D9D9D9",
            700: "#EBECF6",
            800: "#9FB2B6",
            900: "#8E8E8E",
            950: "#707070"
            
        },
        brown: {
            100: "#4F504C",
            200: "#424242",
            300: "#f0f0f0",
            400: "#555555",
            500: "#373737"
        },
        purple: {
            100: "#7367F0",
            200:"#8280FF"
        },
        Blue: '#F5F8FA',
        white: "#ffffff",
        black: "#000000",
        slate: "#F5F4F5",
    },

    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },

    breakpoints: {
        sm: "30em",  // 480px
        md: "48em",  // 768px
        lg: "62em",  // 992px
        xl: "80em",  // 1280px
        "2xl": "96em",  // 1536px
        "3xl": "120em", // 1920px (example custom breakpoint)
        "4xl": "160em"  // 2560px (example custom breakpoint)
    },

    spacing: {
        px: '1px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        12: '3rem',
        13: '3.2rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
    },

    fonts: {
        extraLargeFont: {
           size : ["x-large"] 
        },
        largeFont: {
            size: ["lg"],
        },
        mediumFont: {
            size: ["md"],
        },
        smallFont: {
            size: ["sm"],
        },
        extraSmall: {
            size: ["xs",],
        },
        leastSmallFont: {
            size: ["xx-small",],
        },
    },


});
export default theme;