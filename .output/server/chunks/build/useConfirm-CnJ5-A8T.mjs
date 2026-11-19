import { ref } from 'vue';

// app/composables/useConfirm.ts
var state = ref({
	open: false,
	title: "Please confirm",
	message: "",
	confirmLabel: "Confirm",
	cancelLabel: "Cancel",
	tone: "danger"
});
var resolver = null;
/**
* Promise based confirmation dialog used by the admin console.
*/
function useConfirm() {
	function ask(options) {
		resolver?.(false);
		state.value = {
			open: true,
			title: options.title || "Please confirm",
			message: options.message,
			confirmLabel: options.confirmLabel || "Confirm",
			cancelLabel: options.cancelLabel || "Cancel",
			tone: options.tone || "danger"
		};
		return new Promise((resolve) => {
			resolver = resolve;
		});
	}
	function close(result) {
		state.value = {
			...state.value,
			open: false
		};
		const resolve = resolver;
		resolver = null;
		resolve?.(result);
	}
	return {
		state,
		ask,
		close
	};
}

export { useConfirm as u };
//# sourceMappingURL=useConfirm-CnJ5-A8T.mjs.map
