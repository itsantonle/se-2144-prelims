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
        throw new Error('unexpected fault')
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
        throw new Error('unexpected fault')
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
        throw new Error('unexpeced fault')
    }
  }
})
// special button functions
function appendToDisplayString(display: string, character: string) {
  return display + ' ' + character || ''
}

function goodbyeSequence() {
  console.log('Goodbye')
}

function randomHello(event: MouseEvent) {
  inputBox.value = ''
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

  // console.log('Hello')
}

// operator button functions

function allClear() {
  console.log('all cleaer')
  // if inputbox has a class of inactive set it to active else disregard
}

function backSpace() {
  console.log('backspace')
  // try-catch block to make sure that the string doesn't go out of range
}

//add to display to evaluate

function addToDisplay(event: MouseEvent) {
  if (event.target instanceof HTMLButtonElement) {
    const button = event.target
    inputBox.value = appendToDisplayString(inputBox.value, button.innerText)
  }
}

function evaluateDisplay(event: MouseEvent) {
  if (event.target instanceof HTMLButtonElement) {
    const button = event.target
    console.log(button.innerHTML)
    //   try {
    //   } catch {}
    // }
  }
}
