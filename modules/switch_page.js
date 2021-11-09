export const switchPage = ({ newPage, params = {} }) => {
  if(typeof(newPage) == 'function') {
    const page = document.getElementById('fullscreen')
    page.innerHTML = ''

    newPage(params)
  }
}