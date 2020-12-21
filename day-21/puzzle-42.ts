import { realIngredients } from './ingredients';

export const puzzle42 = () => {
  const allergies = new Set<string>();
  const ingredients = new Set<string>();
  for (const line of realIngredients) {
    const parts = line.split(' (contains ');
    for (const ingr of parts[0].split(' ')) {
      ingredients.add(ingr);
    }
    for (const aller of parts[1].replace(')', ' ').trim().split(', ')) {
      allergies.add(aller.trim());
    }
  }

  const possible = new Map<string, Set<string>>();
  for (const aller of allergies) {
    possible.set(aller, new Set(ingredients));
  }

  for (const line of realIngredients) {
    const parts = line.split(' (contains ');
    const ingrs = parts[0].split(' ');
    for (const aller of parts[1].replace(')', ' ').trim().split(', ')) {
      for (const ingr of ingredients) {
        if (ingrs.indexOf(ingr) < 0) {
          const possibleSet = possible.get(aller);
          if (possibleSet) {
            possibleSet.delete(ingr);
            possible.set(aller, possibleSet);
          }
        }
      }
    }
  }

  const complete = new Set<string>();
  while (complete.size < allergies.size) {
    for (const aller of allergies) {
      if (possible.get(aller)?.size === 1 && !complete.has(aller)) {
        complete.add(aller);
        const v = Array.from(possible.get(aller)?.values() ?? [])[0];
        for (const b of allergies) {
          const possibleSet = possible.get(b);
          if (!(aller === b) && possibleSet) {
            possibleSet.delete(v);
            possible.set(b, possibleSet);
          }
        }
      }
    }
  }

  let ans = '';
  const sortedAllergies = Array.from(allergies.values()).sort();
  for (const a of sortedAllergies) {
    const ansHasPreviousValue = ans.length !== 0;
    ans +=
      (ansHasPreviousValue ? ',' : '') +
      Array.from(possible.get(a)?.values() ?? [])[0];
  }
  return ans;
};
