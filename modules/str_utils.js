export const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

export const removeAcents = str => {
    const com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ"
    const sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr"
    let newStr = "";
    for(let i = 0; i < str.length; i++) {
        let ind = com_acento.indexOf(str[i])
        if(ind != -1){
            newStr += sem_acento[ind]
        } else {
            newStr += str[i]
        }
    }
    return newStr
}

export const capitalize = str =>
  str && str.charAt(0).toUpperCase() + str.slice(1);

export const breakLine = (str = '', limit) => {
  const lastSpaceIndex = str.slice(0,limit).lastIndexOf(' ') //last space inside limit will be a line breaker
  return str.length < limit ? str : (str.slice(0,lastSpaceIndex) + '\n' + str.slice(lastSpaceIndex+1, str.length))
}
