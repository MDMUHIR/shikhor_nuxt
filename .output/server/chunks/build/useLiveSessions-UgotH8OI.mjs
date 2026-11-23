import { b as useApi, l as useState } from '../virtual/entry.mjs';
import { computed } from 'vue';

// app/utils/community.ts
/** Split plain text into text / https-link segments so it can be rendered safely without v-html. */
function linkSegments(text) {
	const out = [];
	const pattern = /https:\/\/[^\s<>"']+/g;
	let last = 0;
	for (const match of text.matchAll(pattern)) {
		const index = match.index ?? 0;
		if (index > last) out.push({ text: text.slice(last, index) });
		const raw = match[0];
		const clean = raw.replace(/[.,;:!?)\]]+$/, "");
		out.push({
			text: clean,
			url: clean
		});
		if (clean.length < raw.length) out.push({ text: raw.slice(clean.length) });
		last = index + raw.length;
	}
	if (last < text.length) out.push({ text: text.slice(last) });
	return out;
}
function timeAgo(value) {
	if (!value) return "";
	const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1e3));
	if (seconds < 45) return "just now";
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `${days}d`;
	return new Date(value).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
}
var PROVIDERS = {
	zoom: {
		label: "Zoom",
		cls: "bg-blue-100 text-blue-700",
		short: "Z"
	},
	meet: {
		label: "Google Meet",
		cls: "bg-emerald-100 text-emerald-700",
		short: "M"
	},
	youtube: {
		label: "YouTube",
		cls: "bg-red-100 text-red-600",
		short: "YT"
	},
	facebook: {
		label: "Facebook",
		cls: "bg-indigo-100 text-indigo-700",
		short: "f"
	},
	teams: {
		label: "Microsoft Teams",
		cls: "bg-violet-100 text-violet-700",
		short: "T"
	},
	telegram: {
		label: "Telegram",
		cls: "bg-sky-100 text-sky-700",
		short: "TG"
	},
	whatsapp: {
		label: "WhatsApp",
		cls: "bg-green-100 text-green-700",
		short: "WA"
	},
	discord: {
		label: "Discord",
		cls: "bg-purple-100 text-purple-700",
		short: "D"
	},
	other: {
		label: "Link",
		cls: "bg-gray-100 text-gray-600",
		short: "↗"
	},
	link: {
		label: "Link",
		cls: "bg-gray-100 text-gray-600",
		short: "↗"
	}
};
function providerOf(key) {
	return PROVIDERS[key ?? "link"] ?? PROVIDERS.link;
}
function hostOf(url) {
	try {
		return new URL(url ?? "").hostname.replace(/^www\./, "");
	} catch {
		return "";
	}
}
/** "Add to Google Calendar" link for a class. */
function calendarLink(session) {
	const fmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
	const start = new Date(session.scheduled_at);
	const end = new Date(start.getTime() + session.duration_minutes * 6e4);
	return `https://calendar.google.com/calendar/render?${new URLSearchParams({
		action: "TEMPLATE",
		text: session.title,
		dates: `${fmt(start)}/${fmt(end)}`,
		details: `${session.description ?? ""}\n${session.join_url ?? ""}`.trim()
	}).toString()}`;
}
function countdown(target, now) {
	const diff = Math.floor((new Date(target).getTime() - now) / 1e3);
	if (diff <= 0) return "Starting now";
	const d = Math.floor(diff / 86400);
	const h = Math.floor(diff % 86400 / 3600);
	const m = Math.floor(diff % 3600 / 60);
	const s = diff % 60;
	if (d > 0) return `${d}d ${h}h ${m}m`;
	if (h > 0) return `${h}h ${m}m ${String(s).padStart(2, "0")}s`;
	return `${m}m ${String(s).padStart(2, "0")}s`;
}
// app/composables/useLiveSessions.ts
/** Shared live-class state for a course (used by the live panel and the schedule list). */
function useLiveSessions(slug) {
	const { apiData } = useApi();
	const sessions = useState(`live-sessions-${slug}`, () => []);
	const role = useState(`live-role-${slug}`, () => null);
	const loading = useState(`live-loading-${slug}`, () => false);
	const error = useState(`live-error-${slug}`, () => "");
	const live = computed(() => sessions.value.find((s) => s.status === "live") ?? null);
	const next = computed(() => sessions.value.filter((s) => s.status === "scheduled").sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())[0] ?? null);
	const upcoming = computed(() => sessions.value.filter((s) => s.status === "scheduled").sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()));
	const past = computed(() => sessions.value.filter((s) => s.status === "ended" || s.status === "cancelled"));
	async function load() {
		loading.value = true;
		error.value = "";
		try {
			const data = await apiData(`/courses/${slug}/live-sessions`);
			sessions.value = data.sessions;
			role.value = data.role;
		} catch (err) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	}
	function patch(session) {
		const index = sessions.value.findIndex((s) => s.id === session.id);
		if (index >= 0) sessions.value[index] = {
			...sessions.value[index],
			...session
		};
	}
	return {
		sessions,
		role,
		loading,
		error,
		live,
		next,
		upcoming,
		past,
		load,
		patch
	};
}

export { calendarLink as a, countdown as c, hostOf as h, linkSegments as l, providerOf as p, timeAgo as t, useLiveSessions as u };
//# sourceMappingURL=useLiveSessions-UgotH8OI.mjs.map
