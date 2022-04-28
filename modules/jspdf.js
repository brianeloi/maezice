import { toSnakeCase, removeAcents, capitalize } from "./str_utils.js";

export const generatePdf = ({ answers = {}, pdfContent = {}}) => {
  const projName_h = 12
  const projName_w = 5
  const start_h = 10
  const group_w = 10
  const group_h = 10
  const klass_w = 15
  const klass2_w = 100
  const klass_h = 6
  const klass_end_h = 2
  const item_w = 20
  const item_h = 5
  const line_h = 1
  const comment_h = 3
  const page_h = 280
  const page_w = 210

  const projNameSize = 24
  const title_size = 16
  const group_size = 14
  const klass_size = 13
  const item_size = 12
  const comment_size = 8

  let current_h = 0
  let item_max_h = null

  const name = answers['nome'] || 'meu Bebê'

  const grouped_content = pdfContent

  const writeText = (text, width, height, { size = item_size, color = '#000000', font = '', center = false, type = "normal" }, style) => {
    doc.setTextColor(color)
    doc.setFontSize(size)
    if (type) { doc.setFontType(type) }
    if(font) { doc.setFont(font) }
    const textWidth = !center ? width : page_w/2 - text.length*3.2/2
    doc.text(text, textWidth, height, style)

    doc.setTextColor('#000000')
    if (type) { doc.setFontType('normal') }
  }

  const check_page_break = (tolerance = 0) => {
    if((current_h + tolerance) > page_h) {
      doc.addPage();
      item_max_h = null
      return start_h
    }
    return current_h
  }

  const add_group = group_name => {
    current_h += group_h
    current_h = check_page_break(20)
    doc.setFontSize(group_size);
    doc.text(capitalize(group_name), group_w, current_h);
    current_h += line_h
    doc.setTextColor(150,150,150)
    doc.text('_________________________________________________', group_w, current_h);
    doc.setTextColor(0,0,0)
    current_h += line_h
  }

  const add_klass = (klass_name) => {
    const isEssencial = klass_name.toLowerCase() == 'essencial'
    const current_w = isEssencial ? klass_w : klass2_w
    const color = isEssencial ? '#F27507' : '#233A8A'
    current_h += klass_h
    doc.setFontSize(klass_size)
    writeText(capitalize(klass_name), current_w, current_h, { color })
    //add_comment(item['Obs'], current_w) para itens da estação minoritária: Considerando que o bb vai nascer a x dias
    current_h += klass_end_h // da próxima estação, talvez seja necessários considerar alguns destes itens
    return current_w
  }

  const breakLines = str =>
    (str.match(/\n/g) || []).length

  const add_comment = (comment, current_w) => {
    if (comment) {
      current_h += comment_h
      doc.setFontSize(comment_size);
      doc.text('('+comment+')', current_w, current_h);
      current_h += comment_h*breakLines(comment)
    }
  }

  const add_item = (item, current_w) => {
    current_h += item_h
    doc.setFontSize(item_size);
    doc.circle(current_w-3, current_h-1.5, 1)
    doc.text(item['Itens'], current_w, current_h);
    current_h += item_h*breakLines(item['Itens'])
    add_comment(item['Obs'], current_w)
  }

  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  const projName = 'maezice'
  current_h += projName_h
  writeText(projName, projName_w, current_h, { color: '#233A8A', size: projNameSize, type: 'bold' })

  const title = 'Enxoval de ' + name
  current_h += start_h
  writeText(title, group_w, current_h, { center: true, color: '#F27507', size: title_size })
  
  for(var group in grouped_content) {
    current_h = item_max_h ? item_max_h : current_h
    add_group(capitalize(group))
    const current_group_h = current_h
    let klasses = grouped_content[group]

    for(var klass in klasses) {
      current_h = current_group_h
      let current_w = add_klass(klass)
      let itens = klasses[klass]
      let itens_lenght = Object.keys(itens).length

      for(let j = 0; j < itens_lenght; j++){
        add_item(itens[j], current_w + (item_w - klass_w))
        item_max_h = current_h > item_max_h ? current_h : item_max_h
        current_h = check_page_break()
      }
    }
  }

  // regra dos 3 meses: nascimento no 1o mes da estação => mostra só os itens da estação
  //                    nascimento no 2o mes => itens da estação como essencial, itens da próxima opcional
  //                    nascimento no 3o mes => itens da estação como opcional, itens da próxima essencial

  /*doc.addPage(); Add new page
  
  doc.text(20, 55, '20 x axis, 55 is y axis.'); insert text

  doc.setFont("courier"); setting font
  doc.setFont("times");
  doc.setFont("helvetica");

  doc.setFontType("normal"); setting style
  doc.setFontType("italic");
  doc.setFontType("bold");
  doc.setFontType("bolditalic");
  
  doc.setFontSize(24); set size

  doc.setTextColor(255,0,0); red 
  doc.setTextColor(0,255,0); green
  doc.setTextColor(0,0,255); blue
  doc.setTextColor(200,200,200); grey
  doc.setTextColor(0,0,0); black
  */

  doc.save(toSnakeCase(removeAcents(title)) + '.pdf');
}
