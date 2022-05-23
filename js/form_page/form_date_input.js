export const formDateInput = ({ formContentFunction, inputListenterFunction,
                                backButtonFunction }) => {
    //const dateComponent = (options, )
    
    const yearComponent = () => {
        const d = new Date()
        const years = [d.getFullYear(), d.getFullYear()+1]
        const yearSelect =  '<select name="year_select" id="year_select" class="select_button">'+
                            '<option value="" default hidden > Ano </option>'+
                            '<option value="'+years[0]+'">'+years[0]+'</option>'+
                            '<option value="'+years[1]+'">'+years[1]+'</option>'+
                        '</select>'

        return yearSelect || ''
    }

    const monthComponent = () => {
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

        let monthElements = ''
        for(let i = 0; i < months.length; i++) {
            monthElements += '<option value="'+(i+1)+'">'+months[i]+'</option>'
        }

        const monthSelect = '<select name="month_select" id="month_select" class="select_button">'+
                                '<option value="" default hidden > Mês </option>'+
                                monthElements +
                            '</select>'
        
        return monthSelect || ''
    }

    const  daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    }

    const twoAlgorismNumber = n => {
        return n < 10 ? '0'+ n : ''+n
    }

    const daysOptions = (month = null, year = null) => {
        let dayElements = ''
        if(month && year) {
            const daysLenght = daysInMonth(month, year)
            for(let i = 0; i < daysLenght; i++) {
                dayElements += '<option value="'+(i+1)+'">'+twoAlgorismNumber(i+1)+'</option>'
            }
        }

        return '<option value="" default hidden > Dia </option>'+ dayElements
    }

    const daysComponent = (month = null, year = null) => {
        const daySelect =   '<select name="day_select" id="day_select" class="select_button">'+
                                daysOptions(month, year) +
                            '</select>'
        
        return daySelect || ''
    }

    const content = '<div id="md_input_container" class="multi_md_input_container">' +
                        '<input required id="md_input" hidden></input>' +
                        '<label id="date_md_label" class="date_md_label"> Selecione uma opção </label>'+
                        '<div id="md_select_container" class="md_select_container">'+
                            yearComponent() + monthComponent() + daysComponent() +
                        '</div>'+
                    '</div>'

    const changeDays = (month, year) => {
        if(!month || !year || !month.value || !year.value) { return }

        document.getElementById('day_select').replaceChildren('')
        $('#day_select').append(daysOptions(month.value, year.value))
    }

    const setInputValue = (year, month, day) => {
        const input = document.getElementById('md_input')
        if(day) {
            input.value = [year, twoAlgorismNumber(month), twoAlgorismNumber(day)].join('-')
        } else {
            input.value = ''
        }
        inputListenterFunction()
    }

    window.onload = initPage;
    function initPage(){
        const month = document.getElementById('month_select')
        const year = document.getElementById('year_select')
        const day = document.getElementById('day_select')
        
        month.addEventListener('change', () => {
            changeDays(month, year)
            setInputValue(year.value, month.value, day.value)
        })
        year.addEventListener('change', () => {
            changeDays(month, year)
            setInputValue(year.value, month.value, day.value)
        })

        day.addEventListener('change', () => {
            setInputValue(year.value, month.value, day.value)
        })

        formContentFunction()
    }

    return content
}