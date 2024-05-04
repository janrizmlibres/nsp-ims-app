/**
 * This is designed to check if an input field is empty or not.
 * It takes one argument, input, which is the v-model of the input field.
 * @param {ref} input - the v-model of the input to check
 * @param {ref} isInvalid - the ref variable that will be set to true or false if the input is empty
 * @returns {Boolean} - True if the input is empty, false otherwise
 */
export function checkInputEmpty(input, isInvalid) {
    const inputValue = input.value || '';
    
    if (inputValue.trim() === '') {
        isInvalid.value = true;
        return true;
    } else {
        isInvalid.value = false
        return false;
    }
}