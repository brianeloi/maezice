export const formTextInput = ({ formContentFunction, inputLabel, backButtonFunction }) => {
    const content =     '<div id="md_input_container" class="md_input_container">' +
                            '<input required id="md_input" class="md_input"></input>' +
                            '<label id="md_label" class="md_label noselect"> '+inputLabel+' </label>' +
                        '</div>'

    const getInputValue = () => {
        const input = document.querySelector('#md_input')
        
        return !input ? '' : input.value
    }

    window.onload = initPage;
    function initPage(){
        const input = document.querySelector('#md_input')
        if(!input){ return }
        input.addEventListener('input', () => {
            if(input.value){
                input.value = input.value.replace(/[^A-Za-z\s]/g,'')
            }
        })

        input.addEventListener('blur', () => {
            if(input.value) {
                $('#md_label').css('top', '0%');
                $('#md_label').css('left', '0%');
                $('#md_label').css('font-size', '10px');
            } else {
                $('#md_label').css('top', '');
                $('#md_label').css('left', '');
                $('#md_label').css('font-size', '');
            }
        })

        formContentFunction(getInputValue)
    }

    return content
}