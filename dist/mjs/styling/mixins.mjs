import { colorGrey300, colorGrey500, colorWhite } from "./colors.mjs";
import { env } from "./environment.mjs";
export const centeredContentsStyle = {
    width: '90%',
    maxWidth: '120rem',
    marginLeft: 'auto',
    marginRight: 'auto'
};
export const cardStyle = {
    backgroundColor: colorWhite,
    borderRadius: '3px',
    border: `1px solid ${colorGrey300}`,
    boxShadow: `0 1px 2px ${colorGrey500}`
};
export function debugClassName($debugName, force) {
    try {
        return (typeof force !== 'undefined' && !force) || env === 'production' ? {} : { $debugName };
    }
    catch (e) {
        return { $debugName };
    }
}
export function linkStyle(normalStyle, hoverStyle, normalNestSelector = '&:focus, &:active, &:visited', hoverNestSelector = '&:hover') {
    if (typeof normalStyle === 'string') {
        normalStyle = { color: normalStyle };
    }
    if (typeof hoverStyle === 'string') {
        hoverStyle = { color: hoverStyle };
    }
    return {
        ...normalStyle,
        $nest: {
            [normalNestSelector]: normalStyle,
            [hoverNestSelector]: hoverStyle
        }
    };
}