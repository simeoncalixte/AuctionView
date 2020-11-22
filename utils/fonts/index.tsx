import { createGlobalStyle } from "styled-components";

interface IFontLocation {
  format: "otf" | "ttf" | "woff";
  sourceType: "url" | "local";
  source: string;
}

interface IFonts {
  fontFamily: string;
  src: IFontLocation[];
  unicodeRange?: string;
  fontVariant?: string;
  fontFeatureSettings?: string;
  fontVariationSettings?: string;
  fontStretch?: string;
  fontWeight?: string;
  fontStyle?: string;
}

export const buildFontFamilies = (props: IFonts[]) => `
  ${(props) =>
    props
      .map((font) => fontFamily(font))
      .reduce((string, currentString) => string.concat(currentString))}
`;

const fontFamily = (font: IFonts) => `
    @font-face {
        font-family: ${font.fontFamily};
        src: ${
          font.src
            ? font.src
                .map(
                  (indiSrc) =>
                    `${indiSrc.sourceType}(${indiSrc.source}) ${
                      indiSrc.format ? `format(${indiSrc.format})` : ``
                    } `
                )
                .reduce((string, currentString) =>
                  string.concat("," + currentString)
                )
            : ``
        };
    ${font.unicodeRange ? `unicode-range:${font.unicodeRange};` : ``}
    ${font.fontVariant ? `font-variant:${font.fontVariant};` : ``}
    ${
      font.fontFeatureSettings
        ? `font-feature-settings:${font.fontFeatureSettings};`
        : ``
    }
    ${
      font.fontVariationSettings
        ? `font-variation-settings:${font.fontVariationSettings};`
        : ``
    }
    ${font.fontStretch ? `font-stretch:${font.fontStretch};` : ``}
    ${font.fontWeight ? `font-weight:${font.fontWeight};` : ``}
    ${font.fontStyle ? `font-style:${font.fontStyle};` : ``}
   }
`;
