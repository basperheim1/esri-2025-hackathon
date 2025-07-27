import { css } from 'jimu-core';
export function getStyle(theme) {
    return css `
    .widget-setting-explorecompose{
      font-weight: lighter;
      font-size: 13px;

      .warning-tooltip{
        .jimu-icon-component {
          color: ${theme.colors.palette.warning[600]}
        }
      }
    }
  `;
}
//# sourceMappingURL=style.js.map