import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme{
        bgColor: string;
        contentBgColor: string;
        btnColor: string;
        inputColor: string;
        accentColor: string;
        textColor: string;
    }
}