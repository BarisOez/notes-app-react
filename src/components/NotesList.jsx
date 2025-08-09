// Simple list with edit/delete actions
export default function NotesList({ notes, onEdit, onDelete }) {
    if (!notes?.length) return <p className="muted">No notes yet.</p>;
    return (
        <ul className="grid">
            {notes.map((n) => (
                <li key={n.id} className="card">
                    <h3 className="title">{n.title}</h3>
                    {n.content && <p className="muted">{n.content}</p>}
                    <div className="row">
                        <button className="btn" onClick={() => onEdit(n)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => onDelete(n.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
