import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { ref } from 'vue';

// app/composables/useFormHandler.ts
/**
* Small wrapper shared by admin forms: tracks busy/validation state and
* surfaces the backend message through a toast.
*/
function useFormHandler() {
	const busy = ref(false);
	const errors = ref({});
	const toast = useToast();
	async function run(task, successMessage) {
		busy.value = true;
		errors.value = {};
		try {
			const result = await task();
			if (successMessage) toast.success(successMessage);
			return result;
		} catch (error) {
			const apiError = error;
			errors.value = apiError?.errors || {};
			toast.error(apiError?.message || "Something went wrong. Please try again.");
			return;
		} finally {
			busy.value = false;
		}
	}
	function fieldError(name) {
		return errors.value[name]?.[0];
	}
	function resetErrors() {
		errors.value = {};
	}
	return {
		busy,
		errors,
		run,
		fieldError,
		resetErrors
	};
}

export { useFormHandler as u };
//# sourceMappingURL=useFormHandler-BxN2lZMT.mjs.map
