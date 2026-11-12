import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  ACTIVITY_TYPES,
  ACTIVITY_TYPE_KEYS,
  SHARED_ACTIVITY_TYPES,
  type ActivityType,
} from '../activityTypes';
import { addActivity, type ActivityValues } from '../data/activities';
import { horsesFromChoice, type HorseChoice } from '../horses';
import { DynamicForm } from './DynamicForm';
import { HorsePicker } from './HorsePicker';

type Props = {
  /** Pre-filled date (YYYY-MM-DD), e.g. the day clicked on the calendar. */
  initialDate?: string;
  onClose: () => void;
};

export function LogNewModal({ initialDate, onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [horse, setHorse] = useState<HorseChoice | null>(null);
  const [date, setDate] = useState(() => initialDate ?? format(new Date(), 'yyyy-MM-dd'));
  const [type, setType] = useState<ActivityType | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function chooseType(k: ActivityType) {
    setType(k);
    // Shared types default to Both, unless a horse was already picked.
    if (horse === null && SHARED_ACTIVITY_TYPES.includes(k)) setHorse('both');
  }

  async function handleSave(values: ActivityValues) {
    if (!type || !horse) return;
    setBusy(true);
    setError(null);
    try {
      await addActivity(date, type, horsesFromChoice(horse), values);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save activity.');
      setBusy(false);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-new-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="log-new-title">{step === 1 ? 'Log new activity' : `New ${type ? ACTIVITY_TYPES[type].label : ''}`}</h2>
          <button className="btn btn-icon" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {step === 1 && (
          <div className="step">
            <HorsePicker value={horse} onChange={setHorse} />

            <div className="field">
              <label htmlFor="log-date">Date</label>
              <input id="log-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <fieldset className="field">
              <legend>Activity type</legend>
              <div className="chip-group activity-modal">
                {ACTIVITY_TYPE_KEYS.map((k) => (
                  <button
                    type="button"
                    key={k}
                    className="chip"
                    aria-pressed={type === k}
                    style={{ background: ACTIVITY_TYPES[k].color }}
                    onClick={() => chooseType(k)}
                  >
                    {ACTIVITY_TYPES[k].label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!type || !date || !horse}
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && type && (
          <>
            {error && <p className="error">{error}</p>}
            <DynamicForm
              type={type}
              submitLabel="Save"
              busy={busy}
              onSubmit={handleSave}
              onCancel={() => setStep(1)}
            />
          </>
        )}
      </div>
    </div>
  );
}
