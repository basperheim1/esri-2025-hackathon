import { IMThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: IMThemeVariables): SerializedStyles {
  return css`
    .widget-setting-explorecompose{
      font-weight: lighter;
      font-size: 13px;

      .warning-tooltip{
        .jimu-icon-component {
          color: ${theme.colors.palette.warning[600]}
        }
      }
    }
  `
}


