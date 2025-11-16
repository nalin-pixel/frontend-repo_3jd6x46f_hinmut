export const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

async function http(method, path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getContent: () => http("GET", "/api/content"),
  createEra: (data) => http("POST", "/api/eras", { data }),
  createProject: (data) => http("POST", "/api/projects", { data }),
  createSkill: (data) => http("POST", "/api/skills", { data }),
  createAchievement: (data) => http("POST", "/api/achievements", { data }),
  setProfile: (data) => http("POST", "/api/profile", { data }),
  setStyles: (data) => http("POST", "/api/styles", { data }),
  seed: () => http("POST", "/api/seed"),
};
