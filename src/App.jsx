import { useEffect, useState } from "react";
import { listNotes, createNote, updateNote, deleteNote } from "./api";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    // Initial fetch
    (async () => {
      try {
        setLoading(true);
        setNotes(await listNotes());
      } catch (e) {
        setErr(String(e.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleCreate(input) {
    try {
      const created = await createNote(input);
      setNotes((prev) => [created, ...prev]);
    } catch (e) { setErr(String(e.message || e)); }
  }

  async function handleUpdate(input) {
    try {
      const saved = await updateNote(editing.id, input);
      setNotes((prev) => prev.map((n) => (n.id === saved.id ? saved : n)));
      setEditing(null);
    } catch (e) { setErr(String(e.message || e)); }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (e) { setErr(String(e.message || e)); }
  }

  return (
    <main className="container">
      <header className="header">
        <h1>Notes</h1>

      </header>

      {err && <div className="alert">Error: {err}</div>}

      {editing
        ? <NoteForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        : <NoteForm onSubmit={handleCreate} />}

      {loading ? <p className="muted">Loading…</p> :
        <NotesList notes={notes} onEdit={setEditing} onDelete={handleDelete} />}
    </main>
  );
}
