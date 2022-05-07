# Browser Fetch and Flexbox Cards

A Quick learning exercise to refresh how to use a fetch request to access an API and how to add elements programmatically to the DOM with JS.
Also implementing a somewhat good-looking image gallery using flex-box.

## How to use

Just access the index.html file with your favourite piece of technology (http.server, VSCode LiveView etc.)

## Implementation details

### Fetch request when clicking the submit input of a form:

```js
const section2 = document.querySelector('#section-2')
const form = document.querySelector('#form')
form.addEventListener('submit', fetchUser)

function fetchUser(e) {
  e.preventDefault() // to prevent the screen from refreshing

  fetch(`https://YourApiAddress.here`).then((data) => {
    let pictureUrl = data.url

    const card = document.createElement('div')
    card.style.backgroundImage = `url("${pictureUrl}")`
    card.classList.add('card')
    section2.append(card)
  })
}
```

### Flexbox Gallery

```css
.parent-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  gap: 5px;
}
```

```css
.card-element {
  flex-grow: 1;
  width: 20%;
  height: 300px;
  padding: 5px;
  border: 2px solid darkslategrey;
  border-radius: 5px;
  object-fit: scale-down;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}

@media screen and (max-width: 800px) {
  .card {
    width: 48%;
  }
}
```

## Interesting fact

When pressing the button and adding a card I came across an **unexpected behaviour** 😫: despite firing a new fetch request every time the button was pressed, I was presented with the same picture over and over again.
Looking into it 🧐 I came across [this article](https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/) that talks about **HTTP cache**.
Basically HTTP tries to minimise the data passed back and forth client and server by using a **cached version of the data** if it thinks you are requesting the same data:

- If you are fetching a url containing some dynamic data there won't be any problem as you'll get a different result everytime

  ```js
  fetch(`https://cataas.com/cat`).then((data) => {
    // this version will fetch the same picture everytime due to the response being cached
  })
  ```

- If using the same url with no dynamic data you might face the problem, but there is a solution!

  - Just add `?cache-bust=${Date.now()}` to the end of the url and you'll get an updated response every time

  ```js
  fetch(`https://cataas.com/cat?cache-bust=${Date.now()}`).then((data) => {
    // with this version you'll get a new picture every time as you are
    // dynamicaly changing the url string with each fetch request
  })
  ```
