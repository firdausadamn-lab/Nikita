import { describe, expect, it } from "vitest";
import { exerciseLibrary, nutritionLessons, programWeeks } from "../content/training-program";

describe("eight-week training program", () => {
  it("contains eight weeks and twenty-four complete sessions", () => {
    expect(programWeeks).toHaveLength(8);
    expect(programWeeks.flatMap((week) => week.workouts)).toHaveLength(24);
    for (const week of programWeeks) {
      expect(week.workouts).toHaveLength(3);
      expect(week.progression.ru).toBeTruthy();
      expect(week.progression.en).toBeTruthy();
      expect(week.recovery.ru).toBeTruthy();
      expect(week.recovery.en).toBeTruthy();
    }
  });

  it("references only documented exercises", () => {
    const ids = new Set(exerciseLibrary.map((exercise) => exercise.id));
    for (const prescription of programWeeks.flatMap((week) => week.workouts).flatMap((workout) => workout.blocks).flatMap((block) => block.exercises)) {
      expect(ids.has(prescription.exerciseId), prescription.exerciseId).toBe(true);
    }
  });

  it("gives every exercise technique, mistakes, options, and a safety boundary", () => {
    for (const exercise of exerciseLibrary) {
      expect(exercise.instructions.ru.length).toBeGreaterThanOrEqual(4);
      expect(exercise.instructions.en.length).toBeGreaterThanOrEqual(4);
      expect(exercise.mistakes.ru.length).toBeGreaterThanOrEqual(3);
      expect(exercise.mistakes.en.length).toBeGreaterThanOrEqual(3);
      expect(exercise.easier.en).toBeTruthy();
      expect(exercise.harder.en).toBeTruthy();
      expect(exercise.alternative.en).toBeTruthy();
      expect(exercise.safety.en).toBeTruthy();
    }
  });

  it("keeps nutrition guidance bilingual and substantive", () => {
    expect(nutritionLessons.length).toBeGreaterThanOrEqual(4);
    for (const lesson of nutritionLessons) {
      expect(lesson.title.ru).toBeTruthy();
      expect(lesson.title.en).toBeTruthy();
      expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
    }
  });
});
