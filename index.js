// getting the references of the elements
const section2 = document.querySelector('#section-2')
const form = document.querySelector('#form')
const search = document.querySelector('#form-input')
const btn = document.querySelector('#form-btn')

// console.log(section2)
// console.log(form)
// console.log(search)
// console.log(btn)

form.addEventListener('submit', fetchUser)

function fetchUser(e) {
  e.preventDefault()

  fetch(`https://cataas.com/cat?cache-bust=${Date.now()}`).then((data) => {
    // console.log('data.url', data.url)
    let catPictureUrl = data.url

    const card = document.createElement('div')
    card.style.backgroundImage = `url("${catPictureUrl}")`
    card.classList.add('card')
    section2.append(card)
  })
}
