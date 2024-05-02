import { useAuthStore } from '@/stores/auth.js'

/**
 * This is designed to replace the standard error handling in axios requests. where the error response is displayed in a toast.
 * If the error response is "jwt expired", it will log out the user and redirect to the login page.
 * Otherwise, it will display the error message in a toast. This function can be used in the catch block of an axios request.
 * The router and toast objects are from vue-router and PrimeVue respectively. The router parameter is needed to redirect the user to the login page,
 * if the error response is "jwt expired".
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
 * @param severity - the severity of the toast message. Default is "error"
 * @param summary - the summary of the toast message. Default is "Error"
 */
export function errorChecker(errorResponse, router, toast, severity = "error", summary =  "Error", ) {
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