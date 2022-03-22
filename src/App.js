import { useState } from 'react'

function App() {
  const [calc, setCalc] = useState("") // set as string
  const [result, setResult] = useState("") // set as string

  const ops = ['/', '*', '+', '-', '-', '.'] // operators
  const updateCalc = value => {
    // if the user presses an operator (ops) and there is nothing or if an operator was
    // already pressed then do nothing
    if (
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ) {
      return; // here's the do nothing :D
    }

    // apply the value clicked (operators) to the calculator
    setCalc(calc + value)

    if (!ops.includes(value)) {
      // if the last value was not an operator...
      setResult(eval(calc + value).toString())
    }
  }

  // function to create 1-9 digit buttons
  const createDigits = () => {
    const digits = [] // digits array

    for (let i=1; i < 10; i++){
      // loop from 1 to 9 to draw out the digit buttons by pushing a button
      // with the i variable as the value into the digits array
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
      )
    }

    return digits
  }

  const calculate = () => {
    // returns calculation
    setCalc(eval(calc).toString())
  }

  const deleteLast = () => {
    // deletes that last key pressed
    if (calc == '') {
      // do nothing if there's nothing to delete
      return;
    }

    const value = calc.slice(0, -1) // removes last value
    setCalc(value) // set calc to be the new value
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {/* if there's a value then draw the span otherwise nothing, display calc OR 0 */}
          {result ? <span>({result})</span> : ''} { calc || "0" }
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
        </div>
        <div className="digits">
          { createDigits() }
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
