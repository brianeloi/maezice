export const callCss = (elementStyle) => {
    $('head').append('<link rel="stylesheet" href="css/'+ elementStyle +'.css">')
}