export function checkInputEmpty(input) {
    /*
    * This is designed to check if an input field is empty or not. 
    * It takes one argument, input, which can be
    * either a Vue ref object or a DOM element.
    * 
    * @param {VueRefObject | HTMLElement} input - The input field to check
    * @returns {void}
    */
    let inputElement;
  
    // Check if the input is a Vue ref object
    if (typeof input.value === 'object' && input.value !== null) {
      inputElement = input.value.$el || input.value;
    } else {
      // Assume it's a DOM element
      inputElement = input;
    }
  
    const inputValue = inputElement.value || '';
  
    if (inputValue.trim() === '' || inputValue === null) {
      inputElement.style.borderColor = 'red';
    } else {
      inputElement.style.borderColor = ''; // Reset border color when there is input
    }
}