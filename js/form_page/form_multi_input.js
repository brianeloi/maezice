export const formMultiInput = ({ formContentFunction, questionChoices = [], inputListenterFunction,
                                 questionDescription, backButtonFunction }) => {
    let choiceContents = ''
    for(let i = 0; i < questionChoices.length; i++) {
        choiceContents +='<div id="md_choice_'+i+'" class="md_choice">'+
                            '<div id="md_choice_square_'+i+'" class="md_choice_square"></div>'+
                            '<label class="md_choice_label">'+questionChoices[i]+'</label>'+
                          '</div>'
    }
    
    const content = '<div id="md_input_container" class="multi_md_input_container">' +
                        '<input required id="md_input" hidden></input>' +
                        '<label id="multi_md_label" class="multi_md_label"> Selecione uma opção </label>'+
                        '<div id="md_choices_container" class="md_choices_container">'+
                            choiceContents +
                        '</div>'+
                    '</div>'

    const chosenChoice = choice => {
        const input = document.getElementById('md_input')
        if(!input) { return null }

        for(let i = 0; i < questionChoices.length; i++) {
            if(i == choice){
                $('#md_choice_square_'+i).addClass('md_choice_square_active')
                input.value = questionChoices[choice]
            } else {
                $('#md_choice_square_'+i).removeClass('md_choice_square_active')
            }
        }
    }

    window.onload = initPage;
    function initPage(){
        for(let i = 0; i < questionChoices.length; i++) {
            const choiceElement = document.getElementById('md_choice_'+i);
            if(!choiceElement) { continue }
            choiceElement.onclick = function(event) {
                chosenChoice(i)
                inputListenterFunction()
            }
        }

        formContentFunction()
    }

    return content
}