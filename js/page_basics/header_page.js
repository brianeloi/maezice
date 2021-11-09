import { callCss } from '../../modules/call_css.js'

export const headerPage = () => {
    callCss('header_page')

    let header =    '<header id="header" class="header">' + 
                        '<div id=header_text class="header_text">' +
                            'maezice' +
                        '</div>' +
                    '</header>'

    return header
}
