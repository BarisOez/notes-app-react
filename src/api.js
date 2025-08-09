// Tiny API client for the Spring Boot backend
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

export async function listNotes() {
    const r = await fetch(`${BASE}/notes`);
    if (!r.ok) throw new Error("Failed to fetch notes");
    return r.json();
}

export async function createNote(input) {
    const r = await fetch(`${BASE}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!r.ok) throw new Error("Failed to create note");
    return r.json();
}

export async function updateNote(id, input) {
    const r = await fetch(`${BASE}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!r.ok) throw new Error("Failed to update note");
    return r.json();
}

export async function deleteNote(id) {
    const r = await fetch(`${BASE}/notes/${id}`, { method: "DELETE" });
    if (!r.ok) throw new Error("Failed to delete note");
}
