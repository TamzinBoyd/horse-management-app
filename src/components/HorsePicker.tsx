import { HORSE_IDS, HORSES, type HorseChoice } from '../horses';

type Props = {
  value: HorseChoice | null;
  onChange: (choice: HorseChoice) => void;
};

export function HorsePicker({ value, onChange }: Props) {
  const options: HorseChoice[] = [...HORSE_IDS, 'both'];
  return (
    <fieldset className="field">
      <legend>Horse</legend>
      <div className="chip-group">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            className="chip neutral"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
          >
            {o === 'both' ? 'Both' : HORSES[o].label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
