import { useEffect, useState } from "react";

// Controlled form used for both create & edit
export default function NoteForm({ initial, onSubmit, onCancel }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (initial) {
            setTitle(initial.title ?? "");
            setContent(initial.content ?? "");
        }
    }, [initial]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return; // backend requires title
        onSubmit({ title: title.trim(), content });
    }

    return (
        <form className="card" onSubmit={handleSubmit}>
            <h3>{initial ? "Edit Note" : "New Note"}</h3>

            <label>
                Title
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            </label>

            <label>
                Content
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something..." />
            </label>

            <div className="row">
                <button className="btn" type="submit">{initial ? "Save" : "Create"}</button>
                {onCancel && <button className="btn btn-ghost" type="button" onClick={onCancel}>Cancel</button>}
            </div>
        </form>
    );
}
