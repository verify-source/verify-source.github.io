import fetch from 'whatwg-fetch'

function hearMe() {
  fetch('/index.html').then(response => {
    console.log(response)
  })
}
