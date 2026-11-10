import { useState, type FormEvent, type ReactNode } from 'react';
import { ACTIVITY_TYPES, type ActivityType } from '../activityTypes';
import type { ActivityValues } from '../data/activities';

type Props = {
  type: ActivityType;
  initialValues?: ActivityValues;
  /** Rendered above the type-specific fields (e.g. a date picker). */
  header?: ReactNode;
  submitLabel: string;
  busy?: boolean;
  onSubmit: (values: ActivityValues) => void;
  onCancel?: () => void;
};

export function DynamicForm({ type, initialValues, header, submitLabel, busy, onSubmit, onCancel }: Props) {
  const fields = ACTIVITY_TYPES[type].fields;

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(Object.entries(initialValues ?? {}).map(([k, v]) => [k, String(v)])),
  );

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const out: ActivityValues = {};
    for (const f of fields) {
      const raw = (values[f.key] ?? '').trim();
      if (raw === '') continue;
      if (f.input === 'number') {
        const n = Number(raw);
        if (Number.isNaN(n)) continue;
        out[f.key] = n;
      } else {
        out[f.key] = raw;
      }
    }
    onSubmit(out);
  }

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {header}

      {fields.map((f) => {
        const id = `${type}-${f.key}`;
        const value = values[f.key] ?? '';
        return (
          <div className="field" key={f.key}>
            <label htmlFor={id}>{f.label}</label>
            {f.input === 'textarea' ? (
              <textarea id={id} rows={3} value={value} onChange={(e) => setValue(f.key, e.target.value)} />
            ) : f.input === 'select' ? (
              <select id={id} value={value} onChange={(e) => setValue(f.key, e.target.value)}>
                <option value="">Choose…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                type={f.input}
                value={value}
                onChange={(e) => setValue(f.key, e.target.value)}
              />
            )}
          </div>
        );
      })}

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
