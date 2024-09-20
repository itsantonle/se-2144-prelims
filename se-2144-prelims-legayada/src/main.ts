//write main functionality here

/**
 * Input will not be invokign the  active
 * if active then change teh display
 * get teh value of teh display and run an eval when clicking the equal button
 * the hello wll display from an array using choice
 * the goodbye will turn the input background to black and will run a settimeout function that
 * replacaes the value of it to 'goodbye'
 * if you click on the ac and it's active it will clear the display
 * if it's inactive will turn the calculator on
 */

const specialButtons: NodeList = document.querySelectorAll('.special')!
const operatorButtons: NodeList = document.querySelectorAll('.operator')!
const digitButtons: NodeList = document.querySelectorAll('.digit')!
const inputBox: HTMLInputElement = document.querySelector('#inputBox')!

specialButtons.forEach((button) => {
  if (button instanceof HTMLButtonElement) {
    switch (button.innerText) {
      case 'Goodbye':
        button.addEventListener('click', goodbyeSequence)
        break
      case 'Hello':
        button.addEventListener('click', randomHello)
        break
      default:
        errorMessage('Unexpected input!')
    }
  }
})

operatorButtons.forEach((button) => {
  if (button instanceof HTMLButtonElement) {
    switch (button.innerHTML) {
      case 'AC':
        button.addEventListener('click', allClear)
        break
      case 'DEL':
        button.addEventListener('click', backSpace)
        break
      case '=':
        button.addEventListener('click', evaluateDisplay)
        break
      case '*':
      case '/':
      case '+':
      case '-':
        button.addEventListener('click', addToDisplay)
        break
      // the equal button should change the input box value

      default:
        errorMessage('Unexpected input!')
    }
  }
})

digitButtons.forEach((button) => {
  if (button instanceof HTMLButtonElement) {
    switch (button.innerText) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
        button.addEventListener('click', addToDisplay)
        break
      default:
        errorMessage('Unexpected input!')
    }
  }
})
// special button functions
function appendToDisplayString(display: string, character: string) {
  return display + character || ''
}

function goodbyeSequence() {
  inputBox.value = ''
  if (inputBox.classList.contains('active')) {
    textTyped(inputBox, 'Goodbye!')
    setTimeout(() => {
      inputBox.value = ''
      inputBox.classList.remove('active')
      inputBox.classList.add('inactive')
    }, 2000)
  }
}

// this is a recursive function
function textTyped(
  element: HTMLInputElement,
  text: string,
  i: number = 0
): void {
  element.value += text[i]
  if (i === text.length - 1) {
    return
  }
  setTimeout(() => {
    textTyped(element, text, i + 1)
  }, 80)
}

function randomHello(event: MouseEvent) {
  if (inputBox.classList.contains('active')) {
    const hellos = ['Hello', 'Hola', 'Kamusta', 'こんにちは', '你好']
    if (event.target instanceof HTMLButtonElement) {
      if (!hellos.includes(inputBox.value)) {
        inputBox.value = hellos[0]
      } else if (hellos.indexOf(inputBox.value) === hellos.length - 1) {
        inputBox.value = hellos[0]
      } else {
        inputBox.value = hellos[hellos.indexOf(inputBox.value) + 1]
      }
    }
  }
}

// operator button functions

function allClear() {
  if (inputBox.classList.contains('active')) {
    console.log('all clear')
    inputBox.value = ''
  } else {
    inputBox.classList.remove('inactive')
    inputBox.classList.add('active')
  }
}

function backSpace() {
  if (inputBox.classList.contains('active')) {
    console.log('backspace')
    if (inputBox.value.length > 0) {
      inputBox.value = inputBox.value.slice(0, -1)
    } else {
      inputBox.value = ''
    }
  }
}

//add to display to evaluate

function addToDisplay(event: MouseEvent) {
  if (inputBox.classList.contains('active')) {
    if (event.target instanceof HTMLButtonElement) {
      const button = event.target
      console.log(button.innerText)
      const hellos = ['Hello', 'Hola', 'Kamusta', 'こんにちは', '你好']
      if (hellos.includes(inputBox.value)) {
        allClear()
      }
      inputBox.value = appendToDisplayString(inputBox.value, button.innerText)
    }
  }
}

function evaluateDisplay(event: MouseEvent) {
  if (inputBox.classList.contains('active')) {
    if (event.target instanceof HTMLButtonElement) {
      const button = event.target
      console.log(button.innerHTML)
      try {
        const answer = eval(inputBox.value)
        if (answer == Infinity) {
          errorMessage()
        } else {
          inputBox.value = answer
        }
      } catch {
        errorMessage()
      }
    }
  }
}

function errorMessage(message: string = 'Something went wrong!') {
  alert(message)
}
