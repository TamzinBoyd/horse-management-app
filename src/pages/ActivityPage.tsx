import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ACTIVITY_TYPES } from '../activityTypes';
import {
  deleteActivity,
  subscribeActivity,
  updateActivity,
  type Activity,
  type ActivityValues,
} from '../data/activities';
import { DynamicForm } from '../components/DynamicForm';

export function ActivityPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  // undefined = loading, null = not found
  const [activity, setActivity] = useState<Activity | null | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const [editDate, setEditDate] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => subscribeActivity(id, setActivity, (e) => setError(e.message)), [id]);

  if (error) return <p className="error">Could not load activity: {error}</p>;
  if (activity === undefined) return <p>Loading…</p>;
  if (activity === null) {
    return (
      <div className="card">
        <p>This activity no longer exists.</p>
        <Link to="/">Back to calendar</Link>
      </div>
    );
  }

  const def = ACTIVITY_TYPES[activity.type];

  function startEdit() {
    setEditDate(activity!.date);
    setEditing(true);
  }

  async function handleSave(values: ActivityValues) {
    setBusy(true);
    setError(null);
    try {
      await updateActivity(activity!.id, editDate, values);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save changes.');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this activity? This cannot be undone.')) return;
    setBusy(true);
    try {
      await deleteActivity(activity!.id);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete activity.');
      setBusy(false);
    }
  }

  return (
    <div className="activity-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Calendar
        </Link>
      </div>

      <div className="card">
        <div className="activity-title">
          <span className="type-badge" style={{ background: def.color }}>
            {def.label}
          </span>
          {!editing && <span className="muted">{format(parseISO(activity.date), 'EEEE d MMMM yyyy')}</span>}
        </div>

        {error && <p className="error">{error}</p>}

        {editing ? (
          <DynamicForm
            type={activity.type}
            initialValues={activity.data}
            submitLabel="Save changes"
            busy={busy}
            onSubmit={handleSave}
            onCancel={() => setEditing(false)}
            header={
              <div className="field">
                <label htmlFor="edit-date">Date</label>
                <input id="edit-date" type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
              </div>
            }
          />
        ) : (
          <>
            <dl className="summary">
              {def.fields.map((f) => {
                const v = activity.data[f.key];
                const empty = v === undefined || v === '';
                return (
                  <div className="summary-row" key={f.key}>
                    <dt>{f.label}</dt>
                    <dd className={f.input === 'textarea' ? 'pre' : undefined}>
                      {empty ? (
                        '—'
                      ) : f.input === 'image' ? (
                        <img className="summary-photo" src={String(v)} alt={f.label} />
                      ) : (
                        String(v)
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="form-actions">
              <button className="btn btn-danger" onClick={handleDelete} disabled={busy}>
                Delete
              </button>
              <button className="btn btn-primary" onClick={startEdit} disabled={busy}>
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
