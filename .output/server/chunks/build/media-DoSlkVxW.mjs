import { l as useRuntimeConfig } from '../virtual/entry.mjs';

// app/utils/media.ts
var PLACEHOLDER = "/images/placeholder.svg";
function mediaUrl(path) {
	if (!path) return PLACEHOLDER;
	const value = String(path).trim();
	if (!value) return PLACEHOLDER;
	if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
	const config = useRuntimeConfig();
	return `${String(config.public.mediaUrl || "").replace(/\/+$/, "")}/${value.replace(/^\/+/, "")}`;
}
function imageFallback(event) {
	const target = event.target;
	if (target && target.src && !target.src.endsWith(PLACEHOLDER)) target.src = PLACEHOLDER;
}
function productImage(product, variant) {
	const variantImage = variant?.images?.find(Boolean)?.url;
	if (variantImage) return mediaUrl(variantImage);
	return mediaUrl((product.images?.find((image) => image.is_featured) ?? product.images?.[0])?.url);
}

export { imageFallback as i, mediaUrl as m, productImage as p };
//# sourceMappingURL=media-DoSlkVxW.mjs.map
