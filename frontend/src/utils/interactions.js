export function checkInputEmpty(input, isInvalid) {
    /** 
     * This is designed to check if an input field is empty or not. 
     * It takes one argument, input, which can be
     * either a Vue ref object or a DOM element.
     * @param {VueRefObject | HTMLElement} input - The input field to check
     * @returns {Boolean} - True if the input is empty, false otherwise
    */
  
    const inputValue = input.value || '';
    
    if (inputValue.trim() === '') {
        isInvalid.value = true;
        return true;
    } else {
        isInvalid.value = false
        return false;
    }
}