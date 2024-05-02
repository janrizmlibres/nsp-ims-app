import { useAuthStore } from '@/stores/auth.js'

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

/**
 * This is designed to get the error message from the error response. And does the necessary actions.
 * If the error response is "jwt expired", it will log out the user and redirect to the login page.
 * Otherwise, it will display the error message in a toast. This function can be used in the catch block of an axios request.
 * for example:
 * ```javascript
 * try {
 *     const response = await axios.get('http://localhost:8080/api/endpoint')
 *   } catch (error) {
 *     errorChecker(error.response.data.message, router, toast)
 *   }
 *    ```
 * @param errorResponse - the error response from an axios request
 * @param router - the router object from vue-router
 * @param toast - the toast object from PrimeVue
 */
export function errorChecker(errorResponse, router, toast, summary =  "Error", severity = "error") {
    const authStore = useAuthStore()
    
    if (errorResponse  === "jwt expired") {
        authStore.logout()
        toast.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Session expired. Please log in again.',
            life: 3000
        })
        router.push({ name: 'login' })
    } else {
        toast.add({
            severity: severity,
            summary: summary,
            detail: errorResponse,
            life: 3000
        })
    }
}