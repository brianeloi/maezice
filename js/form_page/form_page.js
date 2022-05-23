
import { formContent } from '../../js/form_page/form_content.js'
import { callCss } from '../../modules/call_css.js'
import { switchPage } from '../../modules/switch_page.js'
import { generatePdf } from '../../modules/jspdf.js'

export const formPage = ({ formParams }) => {
    callCss('form_page')
    const formDescription = 'Complete os campos ao lado para que possamos personalizar a lista de enxoval do seu bebê'
    const formQuestions = ['number', 'date', 'weather', 'room', 'have_car', 'go_out', 'email']
    
    const pdfContentRequest = answers => {
      console.log(JSON.stringify(answers))
      axios.get(`http://15.228.3.119:3001/pdf/${JSON.stringify(answers)}`).then((response) => {
        generatePdf({ answers, pdfContent: response.data })
      })
    }

    const backButtonFunction = () => {
      if(formParams['question'] != formQuestions[0]) {
        const indexOfQuestion = formQuestions.indexOf(formParams['question'])
        const question = formQuestions[indexOfQuestion-1]
        switchPage({ newPage: formPage, params: {formParams: { question }} })
      } else {
        window.location.reload()
      }
    }

    const formButtonFunction = () => {
      if(formParams['question']  != formQuestions[formQuestions.length-1]) {
        const indexOfQuestion = formQuestions.indexOf(formParams['question'])
        const question = formQuestions[indexOfQuestion+1]
        switchPage({ newPage: formPage, params: {formParams: { question }} })
      } else if(true){
        const answers = JSON.parse(localStorage.getItem('answers'))
        pdfContentRequest(answers)
        //switchPage({ newPage: formEndedPage }) // implement this page
      } else {
        alert('Digite um email válido') // implement email validation logic
      }
    }

    const body =    '<div id="form_page" class="form_page">' +
                        '<div id="first_half" class="first_half">' +
                            '<header id="form_description" class="form_description">'+formDescription+'</header>'+
                        '</div>' +
                        '<div id="second_half" class="second_half">' +
                            formContent({ formButtonFunction, formParams, backButtonFunction })
                        '</div>' +
                    '</div>'
    
    $('#fullscreen').append(body)
    dispatchEvent(new Event('load'));
}