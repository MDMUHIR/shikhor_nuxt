// app/composables/useInitials.ts
function useInitials() {
	function initial(name) {
		if (!name) return "?";
		return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
	}
	return { initial };
}

export { useInitials as u };
//# sourceMappingURL=useInitials-C477l6Rh.mjs.map
