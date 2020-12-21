import { realIngredients } from './ingredients';

export const puzzle41 = () => {
  const allergies = new Set<string>();
  const ingredients = new Set<string>();
  const counts = new Map<string, number>();
  for (const ingredient of realIngredients) {
    const parts = ingredient.split(' (contains ');
    for (const ingr of parts[0].split(' ')) {
      ingredients.add(ingr);
      const existingValue = counts.get(ingr);
      if (!existingValue) {
        counts.set(ingr, 1);
      } else {
        counts.set(ingr, existingValue + 1);
      }
    }
    const value = parts[1].replace(')', ' ').trim().split(', ');
    for (const aller of value) {
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

  let count = 0;
  outer: for (const ingr of ingredients) {
    for (const poss of possible.values()) {
      if (poss.has(ingr)) {
        continue outer;
      }
    }
    count += counts.get(ingr) ?? 0;
  }
  return count;
};
