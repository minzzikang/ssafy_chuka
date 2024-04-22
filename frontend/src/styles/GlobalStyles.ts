import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { colors, sizes } from "./theme";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :root {
        font-family: 'Pretendard', Arial, Helvetica, sans-serif, 'NanumGgocNaeEum', 'NanumNaMuJeongWeon';
        font-size: 16px;
    }
    * {
        padding: 0;
        box-sizing: border-box;
        font-family: 'Pretendard', Arial, Helvetica, sans-serif, 'NanumGgocNaeEum', 'NanumNaMuJeongWeon';
    }
    html, body {
        margin: 0;
        padding: 0;
        font-weight: 400;
        line-height: 1.1;
        background: linear-gradient(#e2e3ff, #eadeff);
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
            background: transparent;
            -webkit-appearance: none;
        }
    }

    #root {
        width: 100%;
        min-width: ${sizes.minWidth};
        max-width: ${sizes.maxWidth};
        min-height: 100dvh;
        margin: 0 auto;
        @media only screen and (min-width: 430px) {
            width: 430px;
        }
        @media only screen and (min-width: 600px) {
            width: 375px;
        }
    }
    a {
        outline: none;
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
    button {
        font-size: 16px;
        border: none;
        cursor: pointer;
        background: none;
        border-radius: 10px;
        &:disabled {
            background-color: #CACFD9;
        }
    }
    label {
        &:focus {
            color: ${colors.pink01};
            outline: none;
        }

    }
    input {
        font-size: 12px;
        outline: none;
        border-radius: 10px;
        &:focus {
            border-color: ${colors.mainPink};
            outline: none;
        }
        &::placeholder {
            color: ${colors.gray};
            font-weight: 500;
        }
    }
`;
