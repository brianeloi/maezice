
import { formContent } from '../../js/form_page/form_content.js'
import { callCss } from '../../modules/call_css.js'
import { switchPage } from '../../modules/switch_page.js'
import { generatePdf } from '../../modules/jspdf.js'
import { mainTable } from '../../db/main_table2.js'
//import axios from 'axios';

export const formPage = ({ formParams }) => {
    callCss('form_page')
    const formDescription = 'Complete os campos ao lado para que possamos personalizar a lista de enxoval do seu bebê'
    const formQuestions = ['number', 'date', 'weather', 'room', 'have_car', 'go_out', 'email']
    
    const pdfRequest = answers => {
      console.log(JSON.stringify(answers))
      axios.get(`http://localhost:3001/pdf/${JSON.stringify(answers)}`).then((response) => {
        console.log(response)
      })
    }

    const formButtonFunction = () => {
      if(formParams['question']  != formQuestions[formQuestions.length-1]) {
        const indexOfQuestion = formQuestions.indexOf(formParams['question'])
        const question = formQuestions[indexOfQuestion+1]
        switchPage({ newPage: formPage, params: {formParams: { question }} })
      } else if(true){
        const answers = JSON.parse(localStorage.getItem('answers'))
        const table = mainTable
        //generatePdf({ table, answers })
        pdfRequest(answers)
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
                            formContent({ formButtonFunction, formParams })
                        '</div>' +
                    '</div>'
    
    $('#fullscreen').append(body)
    dispatchEvent(new Event('load'));
}