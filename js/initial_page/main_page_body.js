import { formContent } from '../../js/form_page/form_content.js'

export const mainPageBody = ({ formButtonFunction, formParams }) => {

    let body =   '<div id="main_page_body" class="main_page_body">' +
                    '<div id="card_container" class="card_container">' +
                        '<div id="card_content" class="card_content">' +
                            formContent({ formButtonFunction, formParams })
                        '</div>' +
                    '</div>' +
                '</div>'

    return body
}
