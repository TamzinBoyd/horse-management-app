// The horses on the yard. Adding a horse is one line here.
export const HORSES = {
  gem: { label: 'Gem' },
  cookie: { label: 'Cookie' },
} as const;

export type HorseId = keyof typeof HORSES;
export const HORSE_IDS = Object.keys(HORSES) as HorseId[];

/** What the horse picker offers: one horse, or both. */
export type HorseChoice = HorseId | 'both';

export function horsesFromChoice(choice: HorseChoice): HorseId[] {
  return choice === 'both' ? [...HORSE_IDS] : [choice];
}

export function choiceFromHorses(horses: HorseId[]): HorseChoice {
  if (horses.length !== 1) return 'both';
  return horses[0];
}

export function horseLabel(horses: HorseId[]): string {
  if (horses.length !== 1) return 'Both';
  return HORSES[horses[0]].label;
}
