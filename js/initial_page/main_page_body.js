import { formContent } from '../../js/form_page/form_content.js'

export const mainPageBody = ({ formButtonFunction, formParams }) => {

    let body =   '<div id="main_page_body" class="main_page_body mpb">' +
                    '<div id="main_page_text" class="title_text main_page_title"> Aqui, a lista de enxoval do<br> seu bebê é totalmente<br> pensada para vocês. </div>' +
                    '<div id="card_container" class="card_container">' +
                        '<div id="card_content" class="card_content">' +
                            formContent({ formButtonFunction, formParams }) +
                        '</div>' +
                    '</div>' +
                '</div>' +
                
                '<div id="main_page_second_sector" class="main_page_second_sector">' +
                    '<div class="frames frame_1"></div>' +
                    '<div class="frames frame_2"></div>' +
                    '<div class="frames frame_3"></div>' +
                    '<div class="frames frame_4">' +
                        '<div class="title_text second_sector_title"> Mais praticidade e economia </div>' +
                        '<div class="second_sector_text">' +
                            'A ferramenta que você precisava para descobrir exatamente quais os itens que o seu bebê irá usar. É o fim das listas genéricas, do dinheiro mal utilizado e das dúvidas sobre o que comprar. '+
                        '</div>' +
                    '</div>' +
                    '<div class="frames frame_5"></div>'
                '</div>'
    return body
}
