import fetch from 'whatwg-fetch'

document.getElementById('begin-button').addEventListener('click', hearMe);

function hearMe() {
  fetch('/index.html').then(response => {
    console.log(response)
  })
}


