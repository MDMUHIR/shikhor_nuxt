import { b as useApi, u as useAuth, t as useCart, c as useSeoMeta, N as NuxtLink, s as ssrRenderList$2, B as BaseIcon_default, o as productImage, m as mediaUrl, v as useRuntimeConfig } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { b as formatMoney } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, reactive, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'unhead/utils';

// app/utils/bd-locations.ts
/**
* Bangladesh districts (64) with their upazilas and city thanas / areas.
* Used by the checkout address dropdowns. "Dhaka" is the only district treated as
* "Inside Dhaka" for delivery pricing (the API decides the zone from the district name).
*/
var BD_LOCATIONS = {
	Barguna: [
		"Amtali",
		"Bamna",
		"Barguna Sadar",
		"Betagi",
		"Patharghata",
		"Taltali"
	],
	Barishal: [
		"Agailjhara",
		"Babuganj",
		"Bakerganj",
		"Banaripara",
		"Barishal Sadar",
		"Gournadi",
		"Hizla",
		"Mehendiganj",
		"Muladi",
		"Wazirpur"
	],
	Bhola: [
		"Bhola Sadar",
		"Burhanuddin",
		"Char Fasson",
		"Daulatkhan",
		"Lalmohan",
		"Manpura",
		"Tazumuddin"
	],
	Jhalokati: [
		"Jhalokati Sadar",
		"Kathalia",
		"Nalchity",
		"Rajapur"
	],
	Patuakhali: [
		"Bauphal",
		"Dashmina",
		"Dumki",
		"Galachipa",
		"Kalapara",
		"Mirzaganj",
		"Patuakhali Sadar",
		"Rangabali"
	],
	Pirojpur: [
		"Bhandaria",
		"Kawkhali",
		"Mathbaria",
		"Nazirpur",
		"Nesarabad",
		"Pirojpur Sadar",
		"Zianagar"
	],
	Bandarban: [
		"Alikadam",
		"Bandarban Sadar",
		"Lama",
		"Naikhongchhari",
		"Rowangchhari",
		"Ruma",
		"Thanchi"
	],
	Brahmanbaria: [
		"Akhaura",
		"Ashuganj",
		"Bancharampur",
		"Bijoynagar",
		"Brahmanbaria Sadar",
		"Kasba",
		"Nabinagar",
		"Nasirnagar",
		"Sarail"
	],
	Chandpur: [
		"Chandpur Sadar",
		"Faridganj",
		"Haimchar",
		"Haziganj",
		"Kachua",
		"Matlab Dakshin",
		"Matlab Uttar",
		"Shahrasti"
	],
	Chattogram: [
		"Kotwali",
		"Panchlaish",
		"Double Mooring",
		"Pahartali",
		"Bayazid Bostami",
		"Khulshi",
		"Chandgaon",
		"Halishahar",
		"Bakalia",
		"Karnaphuli",
		"Patenga",
		"Bandar",
		"Akbar Shah",
		"EPZ",
		"Anwara",
		"Banshkhali",
		"Boalkhali",
		"Chandanaish",
		"Fatikchhari",
		"Hathazari",
		"Lohagara",
		"Mirsharai",
		"Patiya",
		"Rangunia",
		"Raozan",
		"Sandwip",
		"Satkania",
		"Sitakunda"
	],
	Cumilla: [
		"Barura",
		"Brahmanpara",
		"Burichang",
		"Chandina",
		"Chauddagram",
		"Cumilla Sadar",
		"Cumilla Sadar Dakshin",
		"Daudkandi",
		"Debidwar",
		"Homna",
		"Laksam",
		"Lalmai",
		"Meghna",
		"Monohargonj",
		"Muradnagar",
		"Nangalkot",
		"Titas"
	],
	"Cox's Bazar": [
		"Chakaria",
		"Cox's Bazar Sadar",
		"Kutubdia",
		"Maheshkhali",
		"Pekua",
		"Ramu",
		"Teknaf",
		"Ukhia"
	],
	Feni: [
		"Chhagalnaiya",
		"Daganbhuiyan",
		"Feni Sadar",
		"Fulgazi",
		"Parshuram",
		"Sonagazi"
	],
	Khagrachhari: [
		"Dighinala",
		"Guimara",
		"Khagrachhari Sadar",
		"Lakshmichhari",
		"Mahalchhari",
		"Manikchhari",
		"Matiranga",
		"Panchhari",
		"Ramgarh"
	],
	Lakshmipur: [
		"Kamalnagar",
		"Lakshmipur Sadar",
		"Raipur",
		"Ramganj",
		"Ramgati"
	],
	Noakhali: [
		"Begumganj",
		"Chatkhil",
		"Companiganj",
		"Hatiya",
		"Kabirhat",
		"Noakhali Sadar",
		"Senbagh",
		"Sonaimuri",
		"Subarnachar"
	],
	Rangamati: [
		"Baghaichhari",
		"Barkal",
		"Belaichhari",
		"Juraichhari",
		"Kaptai",
		"Kawkhali",
		"Langadu",
		"Naniarchar",
		"Rajasthali",
		"Rangamati Sadar"
	],
	Dhaka: [
		"Adabor",
		"Badda",
		"Banani",
		"Bangshal",
		"Bhashantek",
		"Cantonment",
		"Chawkbazar",
		"Dakshinkhan",
		"Darus Salam",
		"Demra",
		"Dhanmondi",
		"Gendaria",
		"Gulshan",
		"Hazaribagh",
		"Jatrabari",
		"Kadamtali",
		"Kafrul",
		"Kalabagan",
		"Kamrangirchar",
		"Khilgaon",
		"Khilkhet",
		"Kotwali",
		"Lalbagh",
		"Mirpur",
		"Mohammadpur",
		"Motijheel",
		"Mugda",
		"New Market",
		"Pallabi",
		"Paltan",
		"Ramna",
		"Rampura",
		"Sabujbagh",
		"Shah Ali",
		"Shahbagh",
		"Sher-e-Bangla Nagar",
		"Shyampur",
		"Sutrapur",
		"Tejgaon",
		"Turag",
		"Uttara",
		"Uttar Khan",
		"Wari",
		"Vatara",
		"Dhamrai",
		"Dohar",
		"Keraniganj",
		"Nawabganj",
		"Savar"
	],
	Faridpur: [
		"Alfadanga",
		"Bhanga",
		"Boalmari",
		"Charbhadrasan",
		"Faridpur Sadar",
		"Madhukhali",
		"Nagarkanda",
		"Sadarpur",
		"Saltha"
	],
	Gazipur: [
		"Gazipur Sadar",
		"Kaliakair",
		"Kaliganj",
		"Kapasia",
		"Sreepur",
		"Tongi"
	],
	Gopalganj: [
		"Gopalganj Sadar",
		"Kashiani",
		"Kotalipara",
		"Muksudpur",
		"Tungipara"
	],
	Kishoreganj: [
		"Austagram",
		"Bajitpur",
		"Bhairab",
		"Hossainpur",
		"Itna",
		"Karimganj",
		"Katiadi",
		"Kishoreganj Sadar",
		"Kuliarchar",
		"Mithamain",
		"Nikli",
		"Pakundia",
		"Tarail"
	],
	Madaripur: [
		"Dasar",
		"Kalkini",
		"Madaripur Sadar",
		"Rajoir",
		"Shibchar"
	],
	Manikganj: [
		"Daulatpur",
		"Ghior",
		"Harirampur",
		"Manikganj Sadar",
		"Saturia",
		"Shivalaya",
		"Singair"
	],
	Munshiganj: [
		"Gazaria",
		"Lohajang",
		"Munshiganj Sadar",
		"Sirajdikhan",
		"Sreenagar",
		"Tongibari"
	],
	Narayanganj: [
		"Araihazar",
		"Bandar",
		"Fatullah",
		"Narayanganj Sadar",
		"Rupganj",
		"Siddhirganj",
		"Sonargaon"
	],
	Narsingdi: [
		"Belabo",
		"Monohardi",
		"Narsingdi Sadar",
		"Palash",
		"Raipura",
		"Shibpur"
	],
	Rajbari: [
		"Baliakandi",
		"Goalanda",
		"Kalukhali",
		"Pangsha",
		"Rajbari Sadar"
	],
	Shariatpur: [
		"Bhedarganj",
		"Damudya",
		"Gosairhat",
		"Naria",
		"Shariatpur Sadar",
		"Zajira"
	],
	Tangail: [
		"Basail",
		"Bhuapur",
		"Delduar",
		"Dhanbari",
		"Ghatail",
		"Gopalpur",
		"Kalihati",
		"Madhupur",
		"Mirzapur",
		"Nagarpur",
		"Sakhipur",
		"Tangail Sadar"
	],
	Bagerhat: [
		"Bagerhat Sadar",
		"Chitalmari",
		"Fakirhat",
		"Kachua",
		"Mollahat",
		"Mongla",
		"Morrelganj",
		"Rampal",
		"Sarankhola"
	],
	Chuadanga: [
		"Alamdanga",
		"Chuadanga Sadar",
		"Damurhuda",
		"Jibannagar"
	],
	Jashore: [
		"Abhaynagar",
		"Bagherpara",
		"Chaugachha",
		"Jashore Sadar",
		"Jhikargachha",
		"Keshabpur",
		"Manirampur",
		"Sharsha"
	],
	Jhenaidah: [
		"Harinakunda",
		"Jhenaidah Sadar",
		"Kaliganj",
		"Kotchandpur",
		"Maheshpur",
		"Shailkupa"
	],
	Khulna: [
		"Khulna Sadar",
		"Sonadanga",
		"Khalishpur",
		"Daulatpur",
		"Khan Jahan Ali",
		"Harintana",
		"Labanchara",
		"Aranghata",
		"Batiaghata",
		"Dacope",
		"Dighalia",
		"Dumuria",
		"Koyra",
		"Paikgachha",
		"Phultala",
		"Rupsha",
		"Terokhada"
	],
	Kushtia: [
		"Bheramara",
		"Daulatpur",
		"Khoksa",
		"Kumarkhali",
		"Kushtia Sadar",
		"Mirpur"
	],
	Magura: [
		"Magura Sadar",
		"Mohammadpur",
		"Shalikha",
		"Sreepur"
	],
	Meherpur: [
		"Gangni",
		"Meherpur Sadar",
		"Mujibnagar"
	],
	Narail: [
		"Kalia",
		"Lohagara",
		"Narail Sadar"
	],
	Satkhira: [
		"Assasuni",
		"Debhata",
		"Kalaroa",
		"Kaliganj",
		"Satkhira Sadar",
		"Shyamnagar",
		"Tala"
	],
	Jamalpur: [
		"Bakshiganj",
		"Dewanganj",
		"Islampur",
		"Jamalpur Sadar",
		"Madarganj",
		"Melandaha",
		"Sarishabari"
	],
	Mymensingh: [
		"Bhaluka",
		"Dhobaura",
		"Fulbaria",
		"Gaffargaon",
		"Gauripur",
		"Haluaghat",
		"Ishwarganj",
		"Muktagachha",
		"Mymensingh Sadar",
		"Nandail",
		"Phulpur",
		"Tarakanda",
		"Trishal"
	],
	Netrokona: [
		"Atpara",
		"Barhatta",
		"Durgapur",
		"Kalmakanda",
		"Kendua",
		"Khaliajuri",
		"Madan",
		"Mohanganj",
		"Netrokona Sadar",
		"Purbadhala"
	],
	Sherpur: [
		"Jhenaigati",
		"Nakla",
		"Nalitabari",
		"Sherpur Sadar",
		"Sreebardi"
	],
	Bogura: [
		"Adamdighi",
		"Bogura Sadar",
		"Dhunat",
		"Dhupchanchia",
		"Gabtali",
		"Kahaloo",
		"Nandigram",
		"Sariakandi",
		"Shajahanpur",
		"Sherpur",
		"Shibganj",
		"Sonatola"
	],
	Chapainawabganj: [
		"Bholahat",
		"Chapainawabganj Sadar",
		"Gomastapur",
		"Nachole",
		"Shibganj"
	],
	Joypurhat: [
		"Akkelpur",
		"Joypurhat Sadar",
		"Kalai",
		"Khetlal",
		"Panchbibi"
	],
	Naogaon: [
		"Atrai",
		"Badalgachhi",
		"Dhamoirhat",
		"Manda",
		"Mohadevpur",
		"Naogaon Sadar",
		"Niamatpur",
		"Patnitala",
		"Porsha",
		"Raninagar",
		"Sapahar"
	],
	Natore: [
		"Bagatipara",
		"Baraigram",
		"Gurudaspur",
		"Lalpur",
		"Naldanga",
		"Natore Sadar",
		"Singra"
	],
	Pabna: [
		"Atgharia",
		"Bera",
		"Bhangura",
		"Chatmohar",
		"Faridpur",
		"Ishwardi",
		"Pabna Sadar",
		"Santhia",
		"Sujanagar"
	],
	Rajshahi: [
		"Boalia",
		"Motihar",
		"Rajpara",
		"Shah Makhdum",
		"Bagha",
		"Bagmara",
		"Charghat",
		"Durgapur",
		"Godagari",
		"Mohanpur",
		"Paba",
		"Puthia",
		"Tanore"
	],
	Sirajganj: [
		"Belkuchi",
		"Chauhali",
		"Kamarkhanda",
		"Kazipur",
		"Raiganj",
		"Shahjadpur",
		"Sirajganj Sadar",
		"Tarash",
		"Ullahpara"
	],
	Dinajpur: [
		"Birampur",
		"Birganj",
		"Biral",
		"Bochaganj",
		"Chirirbandar",
		"Dinajpur Sadar",
		"Fulbari",
		"Ghoraghat",
		"Hakimpur",
		"Kaharole",
		"Khansama",
		"Nawabganj",
		"Parbatipur"
	],
	Gaibandha: [
		"Fulchhari",
		"Gaibandha Sadar",
		"Gobindaganj",
		"Palashbari",
		"Sadullapur",
		"Saghata",
		"Sundarganj"
	],
	Kurigram: [
		"Bhurungamari",
		"Char Rajibpur",
		"Chilmari",
		"Kurigram Sadar",
		"Nageshwari",
		"Phulbari",
		"Rajarhat",
		"Raomari",
		"Ulipur"
	],
	Lalmonirhat: [
		"Aditmari",
		"Hatibandha",
		"Kaliganj",
		"Lalmonirhat Sadar",
		"Patgram"
	],
	Nilphamari: [
		"Dimla",
		"Domar",
		"Jaldhaka",
		"Kishoreganj",
		"Nilphamari Sadar",
		"Saidpur"
	],
	Panchagarh: [
		"Atwari",
		"Boda",
		"Debiganj",
		"Panchagarh Sadar",
		"Tetulia"
	],
	Rangpur: [
		"Badarganj",
		"Gangachara",
		"Kaunia",
		"Mithapukur",
		"Pirgachha",
		"Pirganj",
		"Rangpur Sadar",
		"Taraganj"
	],
	Thakurgaon: [
		"Baliadangi",
		"Haripur",
		"Pirganj",
		"Ranisankail",
		"Thakurgaon Sadar"
	],
	Habiganj: [
		"Ajmiriganj",
		"Bahubal",
		"Baniachong",
		"Chunarughat",
		"Habiganj Sadar",
		"Lakhai",
		"Madhabpur",
		"Nabiganj",
		"Shayestaganj"
	],
	Moulvibazar: [
		"Barlekha",
		"Juri",
		"Kamalganj",
		"Kulaura",
		"Moulvibazar Sadar",
		"Rajnagar",
		"Sreemangal"
	],
	Sunamganj: [
		"Bishwamvarpur",
		"Chhatak",
		"Dakshin Sunamganj",
		"Derai",
		"Dharampasha",
		"Dowarabazar",
		"Jagannathpur",
		"Jamalganj",
		"Sullah",
		"Sunamganj Sadar",
		"Tahirpur"
	],
	Sylhet: [
		"Balaganj",
		"Beanibazar",
		"Bishwanath",
		"Companiganj",
		"Dakshin Surma",
		"Fenchuganj",
		"Golapganj",
		"Gowainghat",
		"Jaintiapur",
		"Kanaighat",
		"Osmani Nagar",
		"Sylhet Sadar",
		"Zakiganj"
	]
};
var BD_DISTRICTS = Object.keys(BD_LOCATIONS).sort((a, b) => a.localeCompare(b));
function areasOf(district) {
	return [...BD_LOCATIONS[district] ?? []].sort((a, b) => a.localeCompare(b));
}
// app/pages/checkout.vue?vue&type=script&setup=true&lang.ts
var OTHER = "__other__";
var senderLabel = "Sending number";
var senderPlaceholder = "The number you sent the payment from";
var checkout_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "checkout",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiData} = useApi();
		const { user } = useAuth();
		useCart();
		useToast();
		const runtimeConfig = useRuntimeConfig();
		ref(typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("checkout-page", async () => {
			const [items, courses] = await Promise.all([apiData("/cart"), apiData("/cart/courses")]);
			return {
				items: items ?? [],
				courses
			};
		})), __temp = await __temp, __restore(), __temp);
		const productItems = computed(() => (data.value?.items ?? []).filter((item) => item.is_selected));
		const courseItems = computed(() => (data.value?.courses?.items ?? []).filter((item) => item.is_selected));
		const hasProducts = computed(() => productItems.value.length > 0);
		computed(() => courseItems.value.length > 0);
		const isEmpty = computed(() => !productItems.value.length && !courseItems.value.length);
		const quote = ref(null);
		const quoting = ref(false);
		const deliveryCharge = computed(() => hasProducts.value ? Number(quote.value?.charge ?? 0) : 0);
		function unitPrice(item) {
			const variant = item.variant;
			const product = item.product;
			return Number(variant?.offer_price ?? variant?.price ?? product?.offer_price ?? product?.price ?? item.price ?? 0);
		}
		function attributes(item) {
			return (item.variant?.attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(" · ");
		}
		const productsSubtotal = computed(() => productItems.value.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0));
		const coursesSubtotal = computed(() => courseItems.value.reduce((sum, item) => sum + Number(item.price ?? item.course.effective_price ?? 0), 0));
		const subtotal = computed(() => productsSubtotal.value + coursesSubtotal.value);
		async function loadQuote() {
			if (!hasProducts.value || !form.district) {
				quote.value = null;
				return;
			}
			quoting.value = true;
			try {
				quote.value = await apiData("/delivery-charges/quote", { query: {
					district: form.district,
					subtotal: productsSubtotal.value
				} });
			} catch {
				quote.value = null;
			} finally {
				quoting.value = false;
			}
		}
		const couponCode = ref("");
		const coupon = ref(null);
		const couponError = ref("");
		const checkingCoupon = ref(false);
		const discount = computed(() => Number(coupon.value?.discount_amount ?? 0));
		const total = computed(() => Math.max(subtotal.value - discount.value, 0) + deliveryCharge.value);
		const form = reactive({
			name: user.value?.name || "",
			email: user.value?.email || "",
			phone: "",
			phone_alt: "",
			line1: "",
			line2: "",
			district: "",
			city: "",
			city_other: "",
			country: "Bangladesh",
			payment_method: runtimeConfig.public.onlinePayments ? "stripe" : "bkash",
			payment_sender: "",
			notes: "",
			shipping_method: ""
		});
		const areas = computed(() => areasOf(form.district));
		watch(() => form.district, () => {
			form.city = "";
			form.city_other = "";
			delete errors.city;
			loadQuote();
		});
		watch(productsSubtotal, loadQuote);
		computed(() => form.city === OTHER ? form.city_other.trim() : form.city);
		const errors = reactive({});
		const submitting = ref(false);
		const formError = ref("");
		const paymentMethods = [
			...runtimeConfig.public.onlinePayments ? [{
				value: "stripe",
				label: "Card / online payment",
				hint: "Pay securely online. An admin then approves your order and enrolls you."
			}] : [],
			{
				value: "cod",
				label: "Cash on delivery",
				hint: "For physical products delivered to your address."
			},
			{
				value: "bkash",
				label: "bKash (manual)",
				hint: "Send the amount, then an admin confirms your payment."
			},
			{
				value: "nagad",
				label: "Nagad (manual)",
				hint: "Send the amount, then an admin confirms your payment."
			}
		];
		const isManualPayment = computed(() => ["bkash", "nagad"].includes(form.payment_method));
		const availablePaymentMethods = computed(() => hasProducts.value ? paymentMethods : paymentMethods.filter((method) => method.value !== "cod"));
		watch(availablePaymentMethods, (methods) => {
			if (!methods.some((method) => method.value === form.payment_method)) form.payment_method = methods[0]?.value ?? "";
		}, { immediate: true });
		watch(() => form.payment_method, () => {
			delete errors.payment_sender;
		});
		useSeoMeta({
			title: "Checkout — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Home`);
					else return [createTextVNode("Home")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/cart",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Cart`);
					else return [createTextVNode("Cart")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Checkout</span></nav><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Checkout</h1><p class="mt-1 text-sm text-gray-500">Review your order and confirm your details. Totals and discounts are confirmed by our server when you place the order.</p>`);
			if (unref(pending)) _push(`<div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><div class="card h-96 animate-pulse bg-gray-100"></div><div class="card h-96 animate-pulse bg-gray-100"></div></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not start checkout",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(isEmpty)) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "cart",
				title: "Nothing selected for checkout",
				message: "Go back to your cart and select the items you want to order.",
				"action-label": "Back to cart",
				"action-to": "/cart"
			}, null, _parent));
			else {
				_push(`<form class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><div class="space-y-6"><section class="card p-5"><h2 class="text-base font-bold text-gray-900">Contact details</h2><div class="mt-4 grid gap-4 sm:grid-cols-2"><div><label class="field-label" for="checkout-name">Full name</label><input id="checkout-name"${ssrRenderAttr("value", unref(form).name)} class="field-input" autocomplete="name" placeholder="Your name">`);
				if (unref(errors).name) _push(`<p class="field-error">${ssrInterpolate(unref(errors).name)}</p>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="field-label" for="checkout-email">Email</label><input id="checkout-email"${ssrRenderAttr("value", unref(form).email)} type="email" class="field-input" autocomplete="email" placeholder="you@example.com">`);
				if (unref(errors).email) _push(`<p class="field-error">${ssrInterpolate(unref(errors).email)}</p>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="field-label" for="checkout-phone">Phone</label><input id="checkout-phone"${ssrRenderAttr("value", unref(form).phone)} class="field-input" autocomplete="tel" placeholder="01XXXXXXXXX">`);
				if (unref(errors).phone) _push(`<p class="field-error">${ssrInterpolate(unref(errors).phone)}</p>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="field-label" for="checkout-phone-alt">Alternate phone (optional)</label><input id="checkout-phone-alt"${ssrRenderAttr("value", unref(form).phone_alt)} class="field-input" autocomplete="tel" placeholder="Optional"></div></div></section>`);
				if (unref(hasProducts)) {
					_push(`<section class="card p-5"><h2 class="text-base font-bold text-gray-900">Shipping address</h2><div class="mt-4 grid gap-4 sm:grid-cols-2"><div class="sm:col-span-2"><label class="field-label" for="checkout-line1">Street address</label><input id="checkout-line1"${ssrRenderAttr("value", unref(form).line1)} class="field-input" autocomplete="address-line1" placeholder="House, road, area">`);
					if (unref(errors).line1) _push(`<p class="field-error">${ssrInterpolate(unref(errors).line1)}</p>`);
					else _push(`<!---->`);
					_push(`</div><div class="sm:col-span-2"><label class="field-label" for="checkout-line2">Apartment, landmark (optional)</label><input id="checkout-line2"${ssrRenderAttr("value", unref(form).line2)} class="field-input" autocomplete="address-line2" placeholder="Optional"></div><div><label class="field-label" for="checkout-district">District</label><select id="checkout-district" class="field-input" autocomplete="address-level1"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).district) ? ssrLooseContain(unref(form).district, "") : ssrLooseEqual(unref(form).district, "")) ? " selected" : ""}>Select district</option><!--[-->`);
					ssrRenderList$2(unref(BD_DISTRICTS), (district) => {
						_push(`<option${ssrRenderAttr("value", district)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).district) ? ssrLooseContain(unref(form).district, district) : ssrLooseEqual(unref(form).district, district)) ? " selected" : ""}>${ssrInterpolate(district)}</option>`);
					});
					_push(`<!--]--></select>`);
					if (unref(errors).district) _push(`<p class="field-error">${ssrInterpolate(unref(errors).district)}</p>`);
					else _push(`<!---->`);
					_push(`</div><div><label class="field-label" for="checkout-city">City / area</label><select id="checkout-city" class="field-input"${ssrIncludeBooleanAttr(!unref(form).district) ? " disabled" : ""} autocomplete="address-level2"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).city) ? ssrLooseContain(unref(form).city, "") : ssrLooseEqual(unref(form).city, "")) ? " selected" : ""}>${ssrInterpolate(unref(form).district ? "Select city / area" : "Select a district first")}</option><!--[-->`);
					ssrRenderList$2(unref(areas), (area) => {
						_push(`<option${ssrRenderAttr("value", area)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).city) ? ssrLooseContain(unref(form).city, area) : ssrLooseEqual(unref(form).city, area)) ? " selected" : ""}>${ssrInterpolate(area)}</option>`);
					});
					_push(`<!--]-->`);
					if (unref(form).district) _push(`<option${ssrRenderAttr("value", OTHER)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).city) ? ssrLooseContain(unref(form).city, OTHER) : ssrLooseEqual(unref(form).city, OTHER)) ? " selected" : ""}>My area is not listed</option>`);
					else _push(`<!---->`);
					_push(`</select>`);
					if (unref(form).city === OTHER) _push(`<input${ssrRenderAttr("value", unref(form).city_other)} class="field-input mt-2" placeholder="Type your area / thana" maxlength="100">`);
					else _push(`<!---->`);
					if (unref(errors).city) _push(`<p class="field-error">${ssrInterpolate(unref(errors).city)}</p>`);
					else _push(`<!---->`);
					_push(`</div><div><label class="field-label" for="checkout-country">Country</label><input id="checkout-country"${ssrRenderAttr("value", unref(form).country)} class="field-input" autocomplete="country-name"></div></div></section>`);
				} else _push(`<!---->`);
				_push(`<section class="card p-5"><h2 class="text-base font-bold text-gray-900">Payment method</h2><p class="mt-1 text-xs text-gray-500">Course access starts after your payment is verified and an admin approves and enrolls you.</p><div class="mt-4 grid gap-2"><!--[-->`);
				ssrRenderList$2(unref(availablePaymentMethods), (method) => {
					_push(`<label class="${ssrRenderClass([unref(form).payment_method === method.value ? "border-oc-primary bg-brand-light" : "border-gray-200 hover:border-gray-300", "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition"])}"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).payment_method, method.value)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", method.value)} class="mt-1 h-4 w-4 border-gray-300 text-oc-primary focus:ring-oc-primary"><span><span class="block text-sm font-semibold text-gray-800">${ssrInterpolate(method.label)}</span><span class="block text-xs text-gray-500">${ssrInterpolate(method.hint)}</span></span></label>`);
				});
				_push(`<!--]--></div>`);
				if (unref(isManualPayment)) {
					_push(`<div class="mt-4"><label class="field-label" for="checkout-payment-sender">${ssrInterpolate(senderLabel)}</label><input id="checkout-payment-sender"${ssrRenderAttr("value", unref(form).payment_sender)} class="field-input"${ssrRenderAttr("placeholder", senderPlaceholder)}><p class="mt-1 text-[11px] text-gray-400">Used by our team to verify your payment manually.</p>`);
					if (unref(errors).payment_sender) _push(`<p class="field-error">${ssrInterpolate(unref(errors).payment_sender)}</p>`);
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`<div class="mt-4"><label class="field-label" for="checkout-notes">Order notes (optional)</label><textarea id="checkout-notes" class="field-input" rows="3" placeholder="Anything we should know?">${ssrInterpolate(unref(form).notes)}</textarea></div></section>`);
				if (unref(hasProducts)) {
					_push(`<section class="card p-5"><h2 class="text-base font-bold text-gray-900">Delivery</h2>`);
					if (!unref(form).district) _push(`<p class="mt-2 text-sm text-gray-500">Select your district above — the delivery charge is applied automatically.</p>`);
					else if (unref(quote)) {
						_push(`<div class="mt-3 flex items-center justify-between gap-3 rounded-xl border border-oc-primary bg-brand-light p-3 text-sm"><span class="flex items-center gap-2 font-semibold text-gray-800">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "truck",
							size: 16,
							class: "text-oc-primary"
						}, null, _parent));
						_push(` ${ssrInterpolate(unref(quote).zone === "inside_dhaka" ? "Inside Dhaka" : "Outside Dhaka")} delivery </span><span class="font-bold text-oc-primary">${ssrInterpolate(unref(quote).free_delivery ? "Free" : ("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(quote).charge))}</span></div>`);
					} else _push(`<!---->`);
					if (unref(quote) && !unref(quote).free_delivery && unref(quote).free_over) _push(`<p class="mt-2 text-xs text-gray-500">Free delivery on product orders of ${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(quote).free_over))} or more.</p>`);
					else _push(`<!---->`);
					_push(`</section>`);
				} else _push(`<!---->`);
				_push(`</div><aside class="lg:sticky lg:top-24 lg:self-start"><div class="card p-5"><h2 class="text-base font-bold text-gray-900">Your order</h2><ul class="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1"><!--[-->`);
				ssrRenderList$2(unref(productItems), (item) => {
					_push(`<li class="flex gap-3"><div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50"><img${ssrRenderAttr("src", ("productImage" in _ctx ? _ctx.productImage : unref(productImage))(item.product, item.variant))}${ssrRenderAttr("alt", item.product?.name || "Product")} class="h-full w-full object-cover"></div><div class="min-w-0 flex-1"><p class="line-clamp-2 text-xs font-semibold text-gray-800">${ssrInterpolate(item.product?.name)}</p>`);
					if (attributes(item)) _push(`<p class="truncate text-[11px] text-gray-400">${ssrInterpolate(attributes(item))}</p>`);
					else _push(`<!---->`);
					_push(`<p class="text-[11px] text-gray-500">Qty ${ssrInterpolate(item.quantity)}</p></div><span class="text-xs font-bold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unitPrice(item) * item.quantity))}</span></li>`);
				});
				_push(`<!--]--><!--[-->`);
				ssrRenderList$2(unref(courseItems), (item) => {
					_push(`<li class="flex gap-3"><div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(item.course.thumbnail))}${ssrRenderAttr("alt", item.course.title)} class="h-full w-full object-cover"></div><div class="min-w-0 flex-1"><p class="line-clamp-2 text-xs font-semibold text-gray-800">${ssrInterpolate(item.course.title)}</p><p class="text-[11px] text-gray-500">Course access</p></div><span class="text-xs font-bold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.price ?? item.course.effective_price))}</span></li>`);
				});
				_push(`<!--]--></ul><div class="mt-4 border-t border-gray-100 pt-4"><label class="field-label" for="checkout-coupon">Coupon code</label>`);
				if (unref(coupon)) _push(`<div class="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm"><span class="font-semibold text-emerald-700">${ssrInterpolate(unref(coupon).code)}</span><button type="button" class="text-xs font-semibold text-emerald-700 hover:underline">Remove</button></div>`);
				else _push(`<div class="flex gap-2"><input id="checkout-coupon"${ssrRenderAttr("value", unref(couponCode))} class="field-input" placeholder="Coupon code" autocomplete="off"><button type="button" class="btn-secondary shrink-0"${ssrIncludeBooleanAttr(unref(checkingCoupon)) ? " disabled" : ""}>${ssrInterpolate(unref(checkingCoupon) ? "Checking…" : "Apply")}</button></div>`);
				if (unref(couponError)) _push(`<p class="field-error">${ssrInterpolate(unref(couponError))}</p>`);
				else _push(`<!---->`);
				_push(`</div><dl class="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600"><div class="flex justify-between gap-3"><dt>Subtotal</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(subtotal)))}</dd></div>`);
				if (unref(discount)) _push(`<div class="flex justify-between gap-3 text-emerald-600"><dt>Discount</dt><dd class="font-semibold">−${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(discount)))}</dd></div>`);
				else _push(`<!---->`);
				_push(`<div class="flex justify-between gap-3"><dt>Delivery</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(!unref(hasProducts) ? "—" : !unref(form).district ? "Select district" : unref(deliveryCharge) ? ("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(deliveryCharge)) : "Free")}</dd></div><div class="flex items-baseline justify-between gap-3 border-t border-gray-100 pt-3"><dt class="font-semibold text-gray-700">Total</dt><dd class="text-2xl font-extrabold text-oc-primary">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(total)))}</dd></div></dl>`);
				if (unref(formError)) _push(`<p class="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">${ssrInterpolate(unref(formError))}</p>`);
				else _push(`<!---->`);
				_push(`<button type="submit" class="btn-primary mt-4 w-full"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "shield",
					size: 16
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(submitting) ? "Placing order…" : "Place order")}</button>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/cart",
					class: "btn-secondary mt-2 w-full"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Back to cart`);
						else return [createTextVNode("Back to cart")];
					}),
					_: 1
				}, _parent));
				_push(`<p class="mt-3 text-center text-[11px] text-gray-400">By placing this order you agree to be contacted about payment confirmation.</p></div></aside></form>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/checkout.vue
var _sfc_setup = checkout_vue_vue_type_script_setup_true_lang_default.setup;
checkout_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var checkout_default = checkout_vue_vue_type_script_setup_true_lang_default;

export { checkout_default as default };
//# sourceMappingURL=checkout-DM93dV9D.mjs.map
