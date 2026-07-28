import { describe, expect, it } from "vitest";
import { curriculum, workouts } from "../content/platform";

describe("platform fixtures", () => {
  it("keeps every core content label bilingual", () => {
    for (const [, title] of curriculum) {
      expect(title.ru.length).toBeGreaterThan(0);
      expect(title.en.length).toBeGreaterThan(0);
    }
  });

  it("provides substitutions for every seeded workout exercise", () => {
    for (const exercise of workouts.flatMap((workout) => workout.exercises)) {
      expect(exercise.easier.en).toBeTruthy();
      expect(exercise.harder.en).toBeTruthy();
    }
  });
});
