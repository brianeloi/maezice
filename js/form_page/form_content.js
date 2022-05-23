import { formTextInput } from './form_text_input.js'
import { formDateInput } from './form_date_input.js'
import { formMultiInput } from './form_multi_input.js'

export const formContent = ({ formButtonFunction, formParams, backButtonFunction }) => {
    const question = formParams['question']
    const questionSettings = {
        'name': {
            'name': 'nome',
            'desc': 'Crie a sua lista de enxoval personalizada!',
            'label': 'Digite o nome do(s) bebê(s)',
            'type': 'text'
        },
        'number': {
            'name': 'número',
            'desc': 'Quantos bebês você está esperando?',
            'type': 'multi',
            'choices': [1,2,3,4]
        }, 
        /*'sex': {
            'name': 'sexo',
            'desc': 'Qual o sexo do(s) bebê(s)?',
            'type': 'multi',
            'choices': ['feminino','masculino']
        },*/ 
        'date': {
            'name': 'data prevista',
            'desc': 'Qual a data prevista para o parto?',
            'type': 'date'
        }, 
        'weather': {
            'name': 'clima no período',
            'desc': 'N:season, como você considera o clima da sua região?',
            'type': 'multi',
            'choices': ['Frio','Quente','Ameno']
        },
        'room': {
            'name': 'quarto compartilhado',
            'desc': 'O quarto do bebê será compartilhado?',
            'type': 'multi',
            'choices': ['sim','não']
        }, 
        'have_car': {
            'name': 'possui carro',
            'desc': 'Você possui carro ou haverá algum que o bebê usará com frequência?',
            'type': 'multi',
            'choices': ['sim','não']
        }, 
        'go_out': {
            'name': 'sai muito a pé',
            'desc': 'Pretende sair de casa com o bebê com muita frequência?',
            'type': 'multi',
            'choices': ['sim','não']
        },
        'email': {
            'name': 'email',
            'desc': 'Para que possa receber a sua lista personalizada, por favor, nos informe um endereço de e-mail válido',
            'label': 'Digite o seu melhor e-mail',
            'type': 'text'
        }
    }

    const formQuestion = () => {
        switch (questionSettings[question]['type']) {
          case 'text':
            return formTextInput({
                formContentFunction,
                inputLabel: (questionSettings[question]['label'] || ''),
                backButtonFunction
            })
          case 'date':
            return formDateInput({ formContentFunction, inputListenterFunction, backButtonFunction })
          case 'multi':
            return formMultiInput({
                formContentFunction,
                questionChoices: questionSettings[question]['choices'],
                inputListenterFunction,
                backButtonFunction
            })
        }
    }

    const inputListenterFunction = () => {
        const input = document.querySelector('#md_input')

        if(input.value){
            $('#form_button').addClass('form_button_active')
            $('#button_label').addClass('button_label_active')
            $('#fa-arrow-right').addClass('fa-arrow-right_active')
        } else {
            $('#form_button').removeClass('form_button_active')
            $('#button_label').removeClass('button_label_active')
            $('#fa-arrow-right').removeClass('fa-arrow-right_active')
        }
    }

    const deleteUselessKeys = answers => {
        const questionNames = Object.keys(questionSettings).map((key) => questionSettings[key]['name'])
        Object.keys(answers).forEach((key) => {
            if(!questionNames.includes(key)) { delete answers[key] }
        })

        return answers
    }

    if(!formButtonFunction) { formButtonFunction = () => {} }
    const formContentFunction = () => {
        const input = document.querySelector('#md_input')

        const formButton = document.querySelector('#form_button')
        if(!formButton || !input) { return }

        input.addEventListener('input', () => {
            inputListenterFunction()
        })

        formButton.addEventListener('click', () => {
            if(input.value){
                let answers = JSON.parse(localStorage.getItem('answers') || JSON.stringify({question: ''}))
                answers[questionSettings[question]['name']] = input.value
                answers = deleteUselessKeys(answers)
                localStorage.setItem('answers', JSON.stringify(answers))
                
                formButtonFunction()
            }
        })

        if(backButtonFunction) {
            const backButton = document.getElementById('back_button')
            const restartButton = document.getElementById('restart_button');
            if(backButton) {
                backButton.onclick = function(event) { backButtonFunction() }
            }

            if(restartButton) {
                restartButton.onclick = function(event) { window.location.reload() }
            }
        }
    }

    const mainSeason = date => {
        const monthDay = date.slice(5)
        if(monthDay >= '11-21' || monthDay <= '02-06') {
            return 'o verão'
        } else if(monthDay >= '05-21' && monthDay <= '08-06'){
            return 'o inverno'
        } else if(monthDay > '08-06'){
            return 'a primavera'
        } else {
            return 'o outono'
        }
    }

    const processDescription = () => {
        if(question != 'weather') { return questionSettings[question]['desc'] }

        const answers = JSON.parse(localStorage.getItem('answers'))
        if(answers['data prevista']){
            const season = mainSeason(answers['data prevista'])
            return questionSettings[question]['desc'].replace(':season', season)
        }
        return questionSettings[question]['desc'].replace(':season', 'a época do nascimento')
    }

    const renderBackButons = () => {
        if(!backButtonFunction) return ''

        const buttons = '<button id="back_button" class="back_button circle_button">' +
                            '<img src="images/arrow-left.png" width="40vw" height="40vw" style="margin-top: 0.5vw;">' +
                        '</button>' +
                        '<button id="restart_button" class="restart_button circle_button"> X </button>'
        return buttons
    }

    const content = renderBackButons() +
                    `<div id="form_content" class="form_content ${backButtonFunction ? 'form_content_padding' : ''}">` +
                        '<div id="form_title" class="form_title"> '+(processDescription() || '')+' </div>' +
                        formQuestion() +
                        '<button id="form_button" class="form_button">' +
                            '<label id="button_label" class="button_label"> Continuar </label>' +
                            '<i class="fa fa-arrow-right" id="fa-arrow-right"></i>' +
                        '</button>' +
                    '</div>'

    return content
}
