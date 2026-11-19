import { k as useState } from '../virtual/entry.mjs';

// app/composables/useToast.ts
var counter = 0;
function useToast() {
	const toasts = useState("shikhor-toasts", () => []);
	function remove(id) {
		toasts.value = toasts.value.filter((toast) => toast.id !== id);
	}
	function push(message, type = "info", title) {
		const id = ++counter;
		toasts.value = [...toasts.value, {
			id,
			message,
			type,
			title
		}];
		return id;
	}
	const success = (message, title) => push(message, "success", title);
	const error = (message, title) => push(message, "error", title);
	const info = (message, title) => push(message, "info", title);
	return {
		toasts,
		push,
		remove,
		success,
		error,
		info
	};
}

export { useToast as u };
//# sourceMappingURL=useToast-BG2fH8c_.mjs.map
