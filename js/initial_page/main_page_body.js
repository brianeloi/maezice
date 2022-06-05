import { formContent } from '../../js/form_page/form_content.js'

export const mainPageBody = ({ formButtonFunction, formParams }) => {

    let body =   '<div id="main_page_body" class="main_page_body mpb">' +
                    '<div id="main_page_text" class="title_text main_page_title"> Aqui, a lista de enxoval do<br> seu bebê é totalmente<br> pensada para vocês. </div>' +
                    '<div id="card_container" class="card_container">' +
                        '<div id="card_content" class="card_content card_border">' +
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
                        '<div class="paragraph second_sector_text">' +
                            'A ferramenta que você precisava para descobrir exatamente quais os itens que o seu bebê irá usar. É o fim das listas genéricas, do dinheiro mal utilizado e das dúvidas sobre o que comprar. '+
                        '</div>' +
                    '</div>' +
                    '<div class="frames frame_5"></div>'+
                '</div>' +

                '<div id="main_page_third_sector" class="main_page_third_sector">' +
                    '<div class="title_text third_sector_title"> Moderno, simples e acessível </div>' +
                    '<div class="card_grid_container">' +
                        '<div class="card_border cards frames card_1"></div>' +
                        '<div class="card_border cards card_2">' +
                            '<div class="card_title"> Personalização </div>' +
                            '<div class="card_text"> Dificuldades específicas<br> merecem uma atenção<br> especial. <br><br>' +
                            'Nós desenvolvemos <br> uma lista de enxoval<br> totalmente pensada <br>' +
                            'para as necessidades e<br> desejos específicos da<br> família do bebê.' +
                            '</div>' +
                        '</div>' +
                        '<div class="card_border cards frames card_3"></div>' +
                        '<div class="card_border cards card_4">' +
                            '<div class="card_title"> Guia Completo </div>' +
                            '<div class="card_text"> Tudo para deixar o<br> controle com você<br><br>' +
                            'Informações<br> organizadas e<br> centralizadas, para que <br>' +
                            'você possa se preocupar<br> com o que realmente<br> importa: o seu filho' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="paragraph third_sector_text">' +
                        'Um sistema completo com um <br>' +
                        'único objetivo: conectar pais e mães <br>' +
                        'à tecnologia e tornar o processo de <br>' +
                        'preparação para a chegada do bebê <br>' +
                        'muito mais leve.</div>' +
                    '<div class="third_sector_buy_button_grid">' +
                        '<div class="title_text buy_button_title"> O fim da complexidade </div>' +
                        '<div class="paragraph buy_button_text">' +
                            'Tudo aquilo que você se pergunta todos <br>' +
                            'os dias: como saber quais itens <br>' +
                            'são essenciais para a rotina do seu bebê, <br>' +
                            'como otimizar os gastos com o enxoval, <br>' +
                            'como criar uma lista de um jeito fácil e <br>' +
                            'eficiente...<br>' +
                            '<br> Está tudo aqui!' +
                        '</div>' +
                        '<button class="pattern_button buy_button"> Começar agora! </button>' +
                        '<div class="card_border frames buy_button_card"></div>' +
                    '</div>' +
                '</div>' +

                '<div id="main_page_fourth_sector" class="main_page_fourth_sector">' +
                '</div>'

    return body
}
