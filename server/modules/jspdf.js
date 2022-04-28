import { breakLine } from "./str_utils.js";

export const generatePdf = ({ table = [], answers = {}}) => {
  const boolFields = ["quarto compartilhado", "sai muito a pé", "possui carro"]
  const multiFields = ["clima no período"]
  const groupItems = ['itens', 'grupo', 'classificação', 'obs']

  const lowerHash = hash => {
    let new_hash = {}
    
    for(var key in hash) {
      new_hash[key.toLowerCase()] = hash[key]
    }

    return new_hash
  }

  answers = lowerHash(answers)

  const processTerms = (field, condition) => {
    if(boolFields.includes(field)){
      return condition.toLowerCase().match('não') ? ['não'] : ['sim']
    } else if(multiFields.includes(field)){
      return condition.split(':')[+ !!condition.match(':')].split('ou')
    }
  } 

  const processFields = (condition, isLastCondition, itemField = null) => {
    const field = (itemField || condition.toLowerCase().replace('não','').split(':')[0].trim()).toLowerCase()
    if(!answers[field]) { return true }
    const terms = processTerms(field, condition) || []
    if(terms.length){
      if(!(terms.some(t => t.trim().toLowerCase() == answers[field].toLowerCase()))){
        return false
      } else if(isLastCondition) {
        return true
      }
    }
    return null
  }

  const conditional_klass = (klass_name) => {
    if(!klass_name.match('=>')) { return klass_name }

    const prepositions = klass_name.split(',')
    let isTrue = null
    for(let i = 0; i < prepositions.length; i++) {
      const conditions = prepositions[i].split('=>')[0].split('&')
      const resolution = prepositions[i].split('=>')[1].trim()
      for(let j = 0; j < conditions.length; j++) {
        const isLastCondition = ((j + 1) == conditions.length)
        isTrue = processFields(conditions[j], isLastCondition)
        if(isTrue == false) {
          break
        } else if(isTrue == true) {
          return resolution
        }
      }
    }
    return 'Opcional error'
  }

  const itemDemanded = tableItem => {
    let itemConditions = Object.assign({}, tableItem)
    for(var item in itemConditions) {
      if(groupItems.includes(item.toLowerCase())){ delete itemConditions[item] }
    }
    if(Object.keys(itemConditions).length == 0) { return true }

    for(var item in itemConditions) {
      const response = processFields(itemConditions[item], true, item)
      if(!response) { return false }
    }
    return true
  }

  //const groups = table[0]['Grupo'].replace(' ', '').split(',')
  let grouped_content = {}
  for(let i = 1; i < table.length; i++){
    if(table[i]['Grupo'] != undefined && table[i]['Classificação'] && itemDemanded(table[i])) {
      let group_name = table[i]['Grupo'].toLowerCase()
      let klass_name = conditional_klass(table[i]['Classificação'].toLowerCase())
      if(!grouped_content[group_name]){
        grouped_content[group_name] = {}
      }
      if(!grouped_content[group_name][klass_name]){
        grouped_content[group_name][klass_name] = {}
      }
      let klass_length = Object.keys(grouped_content[group_name][klass_name]).length
      grouped_content[group_name][klass_name][klass_length] = {
        'Itens': breakLine(table[i]['Itens'], 35),
        'Obs': breakLine(table[i]['Obs'], 55)
      }
    }
  }

  return grouped_content

  // regra dos 3 meses: nascimento no 1o mes da estação => mostra só os itens da estação
  //                    nascimento no 2o mes => itens da estação como essencial, itens da próxima opcional
  //                    nascimento no 3o mes => itens da estação como opcional, itens da próxima essencial
}
