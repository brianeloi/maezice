import { headerPage } from '../../js/page_basics/header_page.js'
import { mainPageBody } from '../../js/initial_page/main_page_body.js'
import { switchPage } from '../../modules/switch_page.js'
import { formPage } from '../../js/form_page/form_page.js'
import { callCss } from '../../modules/call_css.js'

export const mainPage = () => {
  callCss('main_page')
  callCss('form_content')
  const formButtonFunction = () => {
    switchPage({ newPage: formPage, params: {formParams: { question: 'number' }} })
  }

  let header = headerPage()
  let body   = mainPageBody({ formButtonFunction, formParams: { question: 'name' } })
  let main_page = header + body

  $('#fullscreen').append(main_page)
  dispatchEvent(new Event('load'));

  //switchPage({ newPage: formPage, params: {formParams: { question: 'email' }} }) //TAKE IT OFF
}