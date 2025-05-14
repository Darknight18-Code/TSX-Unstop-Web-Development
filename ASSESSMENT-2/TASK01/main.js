// Console log when page loads
console.log('Welcome to Web Fundamentals! Page loaded successfully.')

// Counter functionality
const counterBtn = document.querySelector('#counter')
let count = 0

counterBtn.addEventListener('click', () => {
  count++
  counterBtn.textContent = `Count: ${count}`
  console.log(`Counter increased to: ${count}`)
})

// Greeting functionality
const greetingBtn = document.querySelector('#greeting')
const messageBox = document.querySelector('#message-box')

greetingBtn.addEventListener('click', () => {
  const currentHour = new Date().getHours()
  let greeting = ''
  
  if (currentHour < 12) {
    greeting = 'Good morning'
  } else if (currentHour < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good evening'
  }
  
  console.log(`${greeting}, web developer!`)
  messageBox.innerHTML = `<p>${greeting}, web developer!</p>`
})