import type { Localized } from "./i18n";

export type TrainingExercise = {
  id: string;
  name: Localized;
  category: "strength" | "power" | "specific" | "conditioning" | "recovery";
  equipment: string[];
  instructions: Localized<string[]>;
  cues: Localized<string[]>;
  mistakes: Localized<string[]>;
  easier: Localized;
  harder: Localized;
  alternative: Localized;
  safety: Localized;
};

export type ProgramPrescription = {
  exerciseId: string;
  sets: number;
  reps: Localized;
  restSeconds: number;
  tempo?: string;
  note?: Localized;
};

export type ProgramWorkout = {
  id: string;
  title: Localized;
  day: number;
  duration: number;
  goal: Localized;
  environment: Localized;
  equipment: string[];
  warmup: Localized<string[]>;
  blocks: Array<{
    type: "strength" | "function" | "specific";
    title: Localized;
    rounds?: number;
    exercises: ProgramPrescription[];
  }>;
  cooldown: Localized<string[]>;
  coachNote: Localized;
};

export type ProgramWeek = {
  number: number;
  phase: 1 | 2 | 3;
  title: Localized;
  focus: Localized;
  intent: Localized;
  progression: Localized;
  recovery: Localized;
  workouts: ProgramWorkout[];
};

export const exerciseLibrary: TrainingExercise[] = [
  {
    id: "front-squat",
    name: { ru: "Фронтальный присед", en: "Front squat" },
    category: "strength",
    equipment: ["barbell", "rack"],
    instructions: {
      ru: ["Поставь гриф на передние дельты и подними локти.", "Вдохни и собери корпус до начала спуска.", "Сядь между стопами, сохраняя всю стопу на полу.", "Встань, одновременно толкая пол и поднимая грудь."],
      en: ["Rest the bar on the front delts and lift the elbows.", "Breathe and brace before the descent begins.", "Sit between the feet while keeping the whole foot planted.", "Stand by driving the floor and lifting the chest together."],
    },
    cues: { ru: ["Локти высоко", "Колени следуют за носками", "Толкай пол"], en: ["Elbows high", "Knees track the toes", "Drive the floor"] },
    mistakes: { ru: ["Локти падают раньше таза", "Вес уходит на носки", "Добавление веса ценой глубины"], en: ["Elbows drop before the hips rise", "Weight shifts onto the toes", "Adding load at the cost of depth"] },
    easier: { ru: "Гоблет-присед к ящику", en: "Goblet squat to a box" },
    harder: { ru: "Фронтальный присед с паузой 2 секунды", en: "Two-second paused front squat" },
    alternative: { ru: "Сплит-присед с гантелями", en: "Dumbbell split squat" },
    safety: { ru: "Используй стойки и ограничители. Не продолжай, если не можешь удерживать гриф безопасно.", en: "Use a rack and safety arms. Stop if you cannot hold the bar securely." },
  },
  {
    id: "romanian-deadlift",
    name: { ru: "Румынская тяга", en: "Romanian deadlift" },
    category: "strength",
    equipment: ["barbell"],
    instructions: { ru: ["Начни стоя с грифом у бёдер.", "Отведи таз назад, сохраняя мягкие колени.", "Опусти гриф вдоль ног до натяжения задней поверхности бедра.", "Вернись, сжимая ягодицы, без отклонения назад."], en: ["Start standing with the bar at the thighs.", "Send the hips back with soft knees.", "Keep the bar close until the hamstrings are loaded.", "Return by squeezing the glutes without leaning back."] },
    cues: { ru: ["Таз назад", "Гриф близко", "Длинная спина"], en: ["Hips back", "Bar close", "Long spine"] },
    mistakes: { ru: ["Превращать движение в присед", "Тянуть гриф от ног", "Искать пол ценой спины"], en: ["Turning the hinge into a squat", "Letting the bar drift", "Chasing the floor with the spine"] },
    easier: { ru: "Тяга с гантелями от блоков", en: "Dumbbell hinge from blocks" },
    harder: { ru: "Медленное опускание 4 секунды", en: "Four-second eccentric" },
    alternative: { ru: "Одноногая тяга с опорой", en: "Supported single-leg hinge" },
    safety: { ru: "Останови амплитуду там, где таз перестаёт двигаться назад.", en: "End the range when the hips can no longer travel back." },
  },
  {
    id: "floor-press",
    name: { ru: "Жим гантелей лёжа на полу", en: "Dumbbell floor press" },
    category: "strength",
    equipment: ["dumbbells"],
    instructions: { ru: ["Ляг, согни колени и поставь стопы.", "Опусти локти под контролем до лёгкого касания пола.", "Сохрани лопатки собранными.", "Выжми гантели без столкновения наверху."], en: ["Lie down with knees bent and feet planted.", "Lower under control until the upper arms touch softly.", "Keep the shoulder blades set.", "Press without crashing the dumbbells together."] },
    cues: { ru: ["Предплечья вертикально", "Рёбра собраны", "Контроль внизу"], en: ["Forearms vertical", "Ribs down", "Control the bottom"] },
    mistakes: { ru: ["Удар локтями о пол", "Пожимать плечами", "Терять положение кисти"], en: ["Bouncing the arms off the floor", "Shrugging", "Losing wrist position"] },
    easier: { ru: "Односторонний жим лёгкой гантели", en: "Light single-arm floor press" },
    harder: { ru: "Односторонний жим с паузой", en: "Paused single-arm floor press" },
    alternative: { ru: "Отжимания от возвышения", en: "Incline push-up" },
    safety: { ru: "Выбирай вес, который можешь безопасно поставить на пол после подхода.", en: "Choose a load you can return safely to the floor after the set." },
  },
  {
    id: "pull-up",
    name: { ru: "Подтягивание нейтральным хватом", en: "Neutral-grip pull-up" },
    category: "strength",
    equipment: ["pull-up bar"],
    instructions: { ru: ["Начни с активных плеч, не провисая пассивно.", "Тяни локти к рёбрам.", "Подними грудь к перекладине без рывка.", "Опустись полностью под контролем."], en: ["Start with active shoulders rather than a passive hang.", "Pull the elbows toward the ribs.", "Lift the chest without kicking.", "Lower through the full range under control."] },
    cues: { ru: ["Плечи от ушей", "Локти вниз", "Без раскачки"], en: ["Shoulders away from ears", "Elbows down", "No swing"] },
    mistakes: { ru: ["Рывок ногами", "Подбородок вместо груди", "Падение в нижнюю точку"], en: ["Kicking", "Reaching with the chin", "Dropping into the bottom"] },
    easier: { ru: "Тяга резины сверху", en: "Band pulldown" },
    harder: { ru: "Подтягивание с дополнительным весом", en: "Weighted pull-up" },
    alternative: { ru: "Тяга гантели с опорой", en: "Supported dumbbell row" },
    safety: { ru: "Избегай пассивного виса при боли или нестабильности плеча.", en: "Avoid passive hanging if the shoulder is painful or unstable." },
  },
  {
    id: "split-squat",
    name: { ru: "Сплит-присед", en: "Split squat" },
    category: "strength",
    equipment: ["dumbbells"],
    instructions: { ru: ["Поставь стопы на рельсы, не на одну линию.", "Опусти заднее колено вертикально.", "Сохрани давление через всю переднюю стопу.", "Встань без толчка задней ногой."], en: ["Set the feet on railroad tracks, not a tightrope.", "Drop the back knee vertically.", "Keep pressure through the whole front foot.", "Stand without pushing off the rear leg."] },
    cues: { ru: ["Таз ровно", "Передняя стопа тяжёлая", "Колено стабильно"], en: ["Hips square", "Heavy front foot", "Stable knee"] },
    mistakes: { ru: ["Слишком узкая стойка", "Падение колена внутрь", "Отталкивание задней стопой"], en: ["Stance too narrow", "Knee collapsing inward", "Pushing from the back foot"] },
    easier: { ru: "Сплит-присед с опорой рукой", en: "Hand-supported split squat" },
    harder: { ru: "Сплит-присед с передней ногой на возвышении", en: "Front-foot-elevated split squat" },
    alternative: { ru: "Обратный выпад", en: "Reverse lunge" },
    safety: { ru: "Сократи амплитуду, если не можешь удерживать колено над стопой.", en: "Shorten the range if the knee cannot stay aligned over the foot." },
  },
  {
    id: "dumbbell-swing",
    name: { ru: "Мах гантелью", en: "Dumbbell swing" },
    category: "power",
    equipment: ["dumbbell"],
    instructions: { ru: ["Начни с гантелью перед стопами.", "Отведи таз назад и направь вес между ног.", "Резко выпрями таз, не поднимая руками.", "Позволь весу вернуться и снова поймай тазом."], en: ["Start with the dumbbell just ahead of the feet.", "Hike it back as the hips move behind you.", "Snap the hips without lifting with the arms.", "Let the weight return and catch it with the hips."] },
    cues: { ru: ["Таз создаёт скорость", "Руки как канаты", "Стойка наверху"], en: ["Hips make the speed", "Arms are ropes", "Stand tall at the top"] },
    mistakes: { ru: ["Присед вместо шарнира", "Подъём плечами", "Переразгибание спины"], en: ["Squatting the swing", "Shrugging the load", "Overextending the back"] },
    easier: { ru: "Взрывная тяга гантели от пола", en: "Explosive dumbbell deadlift" },
    harder: { ru: "Тяжёлый мах двумя руками", en: "Heavier two-hand swing" },
    alternative: { ru: "Прыжок в длину с места", en: "Standing broad jump" },
    safety: { ru: "Прекрати подход, когда скорость или положение спины заметно меняются.", en: "End the set when speed or spinal position changes noticeably." },
  },
  {
    id: "high-pull",
    name: { ru: "Высокая тяга гантелей", en: "Dumbbell high pull" },
    category: "power",
    equipment: ["dumbbells"],
    instructions: { ru: ["Начни из положения шарнира.", "Резко выпрями колени и таз.", "Направь локти вверх после разгибания.", "Опусти вес под контролем и перестрой позицию."], en: ["Begin from a loaded hinge.", "Extend knees and hips rapidly.", "Guide elbows upward after extension.", "Lower under control and rebuild the position."] },
    cues: { ru: ["Ноги сначала", "Локти после", "Вес близко"], en: ["Legs first", "Elbows second", "Load stays close"] },
    mistakes: { ru: ["Ранняя тяга руками", "Вес уходит вперёд", "Погоня за высотой"], en: ["Pulling early with the arms", "Load drifting forward", "Chasing height"] },
    easier: { ru: "Шраг с быстрым разгибанием", en: "Jump shrug" },
    harder: { ru: "Высокая тяга из виса со штангой", en: "Barbell hang high pull" },
    alternative: { ru: "Мах гантелью", en: "Dumbbell swing" },
    safety: { ru: "Используй только амплитуду плеча, которая остаётся комфортной.", en: "Use only the shoulder range that remains comfortable." },
  },
  {
    id: "band-pummel",
    name: { ru: "Борьба за захват с резиной", en: "Band hand-fighting drill" },
    category: "specific",
    equipment: ["resistance band"],
    instructions: { ru: ["Закрепи резину на уровне груди.", "Прими устойчивую борцовскую стойку.", "Чередуй короткие проносы, захваты и возвраты рук.", "Сохраняй одинаковую позицию от первого повторения до последнего."], en: ["Anchor the band at chest height.", "Build a stable wrestling stance.", "Alternate short swims, grips, and hand returns.", "Keep the same position from first repetition to last."] },
    cues: { ru: ["Короткие руки", "Тяжёлые стопы", "Рёбра над тазом"], en: ["Short arms", "Heavy feet", "Ribs over hips"] },
    mistakes: { ru: ["Длинные махи", "Потеря стойки", "Скорость без контроля"], en: ["Long arm swings", "Losing stance", "Speed without control"] },
    easier: { ru: "Лёгкая резина и 20 секунд", en: "Light band for 20 seconds" },
    harder: { ru: "Шаги в стороны во время серии", en: "Add lateral steps during the round" },
    alternative: { ru: "Изометрическая тяга полотенца", en: "Towel-row isometric" },
    safety: { ru: "Проверь крепление и поверхность резины перед каждым подходом.", en: "Check the anchor and band surface before every set." },
  },
  {
    id: "band-entry",
    name: { ru: "Вход с сопротивлением", en: "Band-resisted entry" },
    category: "power",
    equipment: ["resistance band"],
    instructions: { ru: ["Закрепи резину за тазом.", "Начни из высокой греко-римской стойки.", "Сделай короткий мощный шаг к позиции корпуса.", "Вернись под контролем, не позволяя резине тянуть поясницу."], en: ["Anchor the band behind the hips.", "Begin in a tall Greco-Roman stance.", "Make a short, powerful step toward body position.", "Return under control without letting the band pull the low back."] },
    cues: { ru: ["Грудь над тазом", "Шаг короткий", "Быстро вперёд, спокойно назад"], en: ["Chest over hips", "Short step", "Fast forward, calm return"] },
    mistakes: { ru: ["Нырять головой", "Слишком длинный шаг", "Падать назад при возврате"], en: ["Leading with the head", "Overstriding", "Falling backward on return"] },
    easier: { ru: "Вход без сопротивления", en: "Unresisted stance entry" },
    harder: { ru: "Серия из двух входов", en: "Double-entry combination" },
    alternative: { ru: "Короткий старт в стену", en: "Wall-drive acceleration" },
    safety: { ru: "Освободи пространство позади и проверь крепление резины.", en: "Clear the area behind you and verify the band anchor." },
  },
  {
    id: "towel-carry",
    name: { ru: "Переноска с полотенцем", en: "Towel-grip carry" },
    category: "specific",
    equipment: ["dumbbells", "towels"],
    instructions: { ru: ["Продень полотенце через ручку веса.", "Зажми концы и выпрями корпус.", "Иди короткими спокойными шагами.", "Остановись до полного раскрытия пальцев."], en: ["Thread a towel through each weight handle.", "Grip the ends and stand tall.", "Walk with short, calm steps.", "Stop before the fingers fully open."] },
    cues: { ru: ["Кисть ровная", "Плечи вниз", "Тихие шаги"], en: ["Neutral wrist", "Shoulders down", "Quiet steps"] },
    mistakes: { ru: ["Сгибать кисть", "Задерживать дыхание", "Продолжать после потери хвата"], en: ["Curling the wrist", "Holding the breath", "Continuing after grip fails"] },
    easier: { ru: "Обычная фермерская переноска", en: "Standard farmer carry" },
    harder: { ru: "Более толстое полотенце", en: "Thicker towel grip" },
    alternative: { ru: "Изометрическое удержание блинов", en: "Plate-pinch hold" },
    safety: { ru: "Используй свободный проход и обувь с закрытым носком.", en: "Use a clear walking lane and closed-toe footwear." },
  },
  {
    id: "neck-isometric",
    name: { ru: "Изометрия шеи руками", en: "Self-resisted neck isometric" },
    category: "specific",
    equipment: ["bodyweight"],
    instructions: { ru: ["Сядь или встань с нейтральной шеей.", "Приложи ладонь ко лбу, затылку или виску.", "Постепенно создай умеренное давление без движения головы.", "Дыши спокойно и полностью отпусти между направлениями."], en: ["Sit or stand with a neutral neck.", "Place a hand on the forehead, back, or side of the head.", "Build moderate pressure gradually without moving the head.", "Breathe normally and fully release between directions."] },
    cues: { ru: ["Давление постепенно", "Голова не движется", "Челюсть расслаблена"], en: ["Build pressure gradually", "Head stays still", "Jaw relaxed"] },
    mistakes: { ru: ["Максимальное усилие сразу", "Задержка дыхания", "Движение через боль"], en: ["Jumping to maximal effort", "Holding the breath", "Pushing through pain"] },
    easier: { ru: "5 секунд при лёгком давлении", en: "Five seconds at light pressure" },
    harder: { ru: "15 секунд при умеренном давлении", en: "Fifteen seconds at moderate pressure" },
    alternative: { ru: "Пропусти упражнение и обратись к специалисту при симптомах", en: "Skip and consult a clinician if symptoms are present" },
    safety: { ru: "Никаких мостов и резких движений. Прекрати при боли, онемении, головокружении или отдаче в руку.", en: "No bridging or rapid motion. Stop for pain, numbness, dizziness, or symptoms into the arm." },
  },
  {
    id: "dead-bug",
    name: { ru: "Мёртвый жук с выдохом", en: "Breathing dead bug" },
    category: "specific",
    equipment: ["bodyweight"],
    instructions: { ru: ["Ляг, подними колени и руки.", "Сделай полный выдох и мягко прижми поясницу.", "Медленно вытяни противоположные руку и ногу.", "Вернись без потери положения рёбер."], en: ["Lie down with knees and arms raised.", "Exhale fully and gently set the low back.", "Reach the opposite arm and leg slowly.", "Return without losing rib position."] },
    cues: { ru: ["Длинный выдох", "Рёбра вниз", "Двигайся медленно"], en: ["Long exhale", "Ribs down", "Move slowly"] },
    mistakes: { ru: ["Спешить", "Отрывать поясницу", "Напрягать шею"], en: ["Rushing", "Arching the low back", "Tensing the neck"] },
    easier: { ru: "Только движения пяткой", en: "Heel taps only" },
    harder: { ru: "Лёгкая резина в руках", en: "Light band pulldown hold" },
    alternative: { ru: "Планка на возвышении", en: "Elevated plank" },
    safety: { ru: "Уменьши амплитуду, если поясница теряет комфортное положение.", en: "Reduce the range if the low back cannot stay comfortable." },
  },
  {
    id: "bear-crawl",
    name: { ru: "Медвежья ходьба", en: "Bear crawl" },
    category: "conditioning",
    equipment: ["bodyweight"],
    instructions: { ru: ["Поставь ладони под плечи и колени под таз.", "Подними колени на несколько сантиметров.", "Двигай противоположные руку и ногу короткими шагами.", "Сохраняй таз на одной высоте."], en: ["Set hands under shoulders and knees under hips.", "Lift the knees a few centimetres.", "Move opposite hand and foot with short steps.", "Keep the hips at one height."] },
    cues: { ru: ["Колени низко", "Шаг короткий", "Тихий корпус"], en: ["Knees low", "Short steps", "Quiet trunk"] },
    mistakes: { ru: ["Высокий таз", "Перекрёст рук", "Гонка за скоростью"], en: ["Hips too high", "Crossing the hands", "Chasing speed"] },
    easier: { ru: "Статическое удержание", en: "Static bear hold" },
    harder: { ru: "Движение назад и в стороны", en: "Backward and lateral crawl" },
    alternative: { ru: "Высокая планка с касанием плеч", en: "High-plank shoulder tap" },
    safety: { ru: "Освободи пол и остановись при боли в запястьях или плечах.", en: "Clear the floor and stop for wrist or shoulder pain." },
  },
  {
    id: "shuttle",
    name: { ru: "Челночный бег", en: "Shuttle run" },
    category: "conditioning",
    equipment: ["open space"],
    instructions: { ru: ["Разметь короткий безопасный отрезок.", "Разгоняйся постепенно в первых шагах.", "Снизь центр тяжести до линии.", "Развернись без скручивания колена внутрь."], en: ["Mark a short, safe lane.", "Build speed over the first steps.", "Lower the centre of mass before the line.", "Turn without collapsing the knee inward."] },
    cues: { ru: ["Тормози до линии", "Стопа под тазом", "Качество разворота"], en: ["Brake before the line", "Foot under the hip", "Own the turn"] },
    mistakes: { ru: ["Торможение на прямой ноге", "Слишком скользкая поверхность", "Максимальная скорость без разминки"], en: ["Braking on a straight leg", "Using a slippery surface", "Max speed without preparation"] },
    easier: { ru: "Быстрая ходьба между линиями", en: "Fast walk between lines" },
    harder: { ru: "Более длинная серия, не более высокая скорость", en: "Longer round, not higher speed" },
    alternative: { ru: "Велотренажёр 20/40", en: "Bike intervals 20/40" },
    safety: { ru: "Выбирай ровную нескользкую поверхность и обувь по покрытию.", en: "Use a level, non-slip surface and suitable footwear." },
  },
  {
    id: "recovery-flow",
    name: { ru: "Поток восстановления", en: "Recovery flow" },
    category: "recovery",
    equipment: ["bodyweight"],
    instructions: { ru: ["Дыши через нос в спокойном темпе.", "Чередуй мягкие движения грудного отдела, таза и голеностопа.", "Не ищи максимальную растяжку.", "Заверши двумя минутами спокойного дыхания лёжа."], en: ["Breathe through the nose at an easy pace.", "Alternate gentle thoracic, hip, and ankle movement.", "Do not chase maximal stretch.", "Finish with two minutes of calm breathing on the floor."] },
    cues: { ru: ["Без боли", "Медленный выдох", "Оставь запас"], en: ["Pain-free", "Slow exhale", "Leave range in reserve"] },
    mistakes: { ru: ["Считать восстановление тренировкой", "Сильная растяжка уставшей ткани", "Задерживать дыхание"], en: ["Turning recovery into training", "Forcing fatigued tissue", "Holding the breath"] },
    easier: { ru: "Пять минут дыхания и ходьбы", en: "Five minutes of breathing and walking" },
    harder: { ru: "Не требуется", en: "Not required" },
    alternative: { ru: "Лёгкая прогулка", en: "Easy walk" },
    safety: { ru: "Восстановление должно уменьшать напряжение, а не создавать симптомы.", en: "Recovery work should reduce tension, not create symptoms." },
  },
];

const baseWarmup: Localized<string[]> = {
  ru: ["3 минуты лёгкого движения", "Дыхание 90/90: 5 циклов", "Мобилизация голеностопа: 8/сторона", "Два разминочных подхода первого упражнения"],
  en: ["3 minutes easy movement", "90/90 breathing: 5 cycles", "Ankle rocks: 8/side", "Two ramp-up sets of the first exercise"],
};

const powerWarmup: Localized<string[]> = {
  ru: ["3 минуты лёгкого движения", "Медвежье удержание: 2×20 секунд", "Пружинящие прыжки: 2×12", "Три постепенных ускорения"],
  en: ["3 minutes easy movement", "Bear hold: 2×20 seconds", "Pogo jumps: 2×12", "Three progressive accelerations"],
};

const cooldown: Localized<string[]> = {
  ru: ["Ходьба до восстановления дыхания", "Мягкая мобилизация грудного отдела", "Запиши нагрузку и одну техническую заметку"],
  en: ["Walk until breathing settles", "Gentle thoracic mobility", "Log the load and one technique note"],
};

function workout(id: string, day: number, title: Localized, goal: Localized, duration: number, equipment: string[], blocks: ProgramWorkout["blocks"], coachNote: Localized, warmup = baseWarmup): ProgramWorkout {
  return { id, day, title, goal, duration, equipment, environment: { ru: "Зал или адаптированный домашний путь", en: "Gym or adapted home pathway" }, warmup, blocks, cooldown, coachNote };
}

const strengthA = (week: number, sets: number): ProgramWorkout => workout(
  `w${week}-strength-a`, 1,
  { ru: "Силовая база A", en: "Strength Foundation A" },
  { ru: "Производить силу всем телом без потери позиции.", en: "Produce whole-body force without losing position." },
  48, ["barbell", "dumbbells", "band"],
  [
    { type: "strength", title: { ru: "База", en: "Foundation" }, exercises: [{ exerciseId: "front-squat", sets, reps: { ru: "5 повторов", en: "5 reps" }, restSeconds: 120, tempo: "31X0" }, { exerciseId: "floor-press", sets, reps: { ru: "8 повторов", en: "8 reps" }, restSeconds: 75 }] },
    { type: "function", title: { ru: "Мощность", en: "Power" }, exercises: [{ exerciseId: "dumbbell-swing", sets: 5, reps: { ru: "8 повторов", en: "8 reps" }, restSeconds: 45 }] },
    { type: "specific", title: { ru: "Связь", en: "Connection" }, exercises: [{ exerciseId: "band-pummel", sets: 4, reps: { ru: "30 секунд", en: "30 seconds" }, restSeconds: 30 }, { exerciseId: "dead-bug", sets: 3, reps: { ru: "6/сторона", en: "6/side" }, restSeconds: 30 }] },
  ],
  { ru: "Последнее повторение должно выглядеть как первое. Если нет, вес слишком большой.", en: "The final repetition should resemble the first. If it does not, the load is too high." },
);

const strengthB = (week: number, sets: number): ProgramWorkout => workout(
  `w${week}-strength-b`, 3,
  { ru: "Задняя цепь и хват", en: "Posterior Chain & Grip" },
  { ru: "Укрепить шарнир, тягу и способность сохранять захват.", en: "Build the hinge, pulling strength, and the ability to maintain a grip." },
  45, ["barbell", "dumbbells", "towels"],
  [
    { type: "strength", title: { ru: "Сила", en: "Strength" }, exercises: [{ exerciseId: "romanian-deadlift", sets, reps: { ru: "6 повторов", en: "6 reps" }, restSeconds: 105, tempo: "31X0" }, { exerciseId: "pull-up", sets: 4, reps: { ru: "оставь 2 повтора в запасе", en: "leave 2 reps in reserve" }, restSeconds: 90 }] },
    { type: "function", title: { ru: "Односторонняя работа", en: "Unilateral work" }, exercises: [{ exerciseId: "split-squat", sets: 3, reps: { ru: "8/сторона", en: "8/side" }, restSeconds: 60 }] },
    { type: "specific", title: { ru: "Хват и шея", en: "Grip and neck" }, exercises: [{ exerciseId: "towel-carry", sets: 4, reps: { ru: "25 метров", en: "25 metres" }, restSeconds: 45 }, { exerciseId: "neck-isometric", sets: 2, reps: { ru: "8 секунд/направление", en: "8 seconds/direction" }, restSeconds: 30 }] },
  ],
  { ru: "Хват тренируется до качественного утомления, не до падения веса.", en: "Train grip to controlled fatigue, not until the load falls." },
);

const powerC = (week: number, rounds: number): ProgramWorkout => workout(
  `w${week}-power-c`, 5,
  { ru: "Мощность под усталостью", en: "Power Under Fatigue" },
  { ru: "Повторять быстрые усилия, сохраняя стойку и контроль торможения.", en: "Repeat fast efforts while keeping stance and braking control." },
  38, ["dumbbells", "band", "open space"],
  [
    { type: "function", title: { ru: "Взрывной блок", en: "Explosive block" }, rounds, exercises: [{ exerciseId: "high-pull", sets: rounds, reps: { ru: "5 повторов", en: "5 reps" }, restSeconds: 45 }, { exerciseId: "band-entry", sets: rounds, reps: { ru: "6/сторона", en: "6/side" }, restSeconds: 30 }] },
    { type: "specific", title: { ru: "Координация", en: "Coordination" }, exercises: [{ exerciseId: "bear-crawl", sets: 4, reps: { ru: "20 метров", en: "20 metres" }, restSeconds: 30 }] },
    { type: "specific", title: { ru: "Финиш", en: "Finish" }, exercises: [{ exerciseId: "shuttle", sets: 6, reps: { ru: "20 секунд работа / 40 отдых", en: "20 seconds work / 40 rest" }, restSeconds: 40 }] },
  ],
  { ru: "Когда скорость заметно падает, блок мощности закончен. Медленные повторы не строят взрывность.", en: "When speed drops visibly, the power block is over. Slow repetitions do not build explosiveness." },
  powerWarmup,
);

export const programWeeks: ProgramWeek[] = [
  { number: 1, phase: 1, title: { ru: "Точка отсчёта", en: "The Baseline" }, focus: { ru: "Техника и рабочий ритм", en: "Technique and working rhythm" }, intent: { ru: "Найти нагрузку, которую можно повторить чисто.", en: "Find loads you can repeat cleanly." }, progression: { ru: "Оставляй 3 повтора в запасе. Записывай каждую нагрузку.", en: "Leave 3 reps in reserve. Record every working load." }, recovery: { ru: "Один полный день между сессиями.", en: "Take one full day between sessions." }, workouts: [strengthA(1, 3), strengthB(1, 3), powerC(1, 3)] },
  { number: 2, phase: 1, title: { ru: "Закрепление позиции", en: "Own the Position" }, focus: { ru: "Повторяемость", en: "Repeatability" }, intent: { ru: "Сделать каждое повторение предсказуемым.", en: "Make every repetition predictable." }, progression: { ru: "Добавь 1–2 повтора в последних подходах, если техника стабильна.", en: "Add 1–2 reps to final sets if technique is stable." }, recovery: { ru: "Лёгкая прогулка и 7–9 часов сна.", en: "Use easy walking and target 7–9 hours of sleep." }, workouts: [strengthA(2, 3), strengthB(2, 3), powerC(2, 3)] },
  { number: 3, phase: 1, title: { ru: "Силовая база", en: "Strength Foundation" }, focus: { ru: "Контролируемая нагрузка", en: "Controlled loading" }, intent: { ru: "Поднять больше без изменения позиции.", en: "Lift more without changing position." }, progression: { ru: "Добавь 2,5–5% только при одинаковой скорости повторов.", en: "Add 2.5–5% only when repetition speed remains consistent." }, recovery: { ru: "Не добавляй кондиционную работу между сессиями.", en: "Do not add extra conditioning between sessions." }, workouts: [strengthA(3, 4), strengthB(3, 4), powerC(3, 4)] },
  { number: 4, phase: 2, title: { ru: "Производство силы", en: "Force Production" }, focus: { ru: "Сила плюс скорость", en: "Strength plus speed" }, intent: { ru: "Сохранять тяжёлую базу и ускорять лёгкие нагрузки.", en: "Keep the heavy base and accelerate lighter loads." }, progression: { ru: "Сократи отдых в специфическом блоке на 5–10 секунд.", en: "Reduce rest in the specific block by 5–10 seconds." }, recovery: { ru: "Оцени готовность до разминки: сон, напряжение, желание тренироваться.", en: "Check readiness before warm-up: sleep, soreness, and willingness to train." }, workouts: [strengthA(4, 4), strengthB(4, 4), powerC(4, 4)] },
  { number: 5, phase: 2, title: { ru: "Взрывное намерение", en: "Explosive Intent" }, focus: { ru: "Высокая сила быстро", en: "High force quickly" }, intent: { ru: "Остановить подход раньше, чем скорость станет медленной.", en: "End sets before speed becomes slow." }, progression: { ru: "Добавь один раунд мощности, а не вес, если скорость чистая.", en: "Add one power round rather than load when speed is clean." }, recovery: { ru: "48 часов до следующего взрывного блока.", en: "Allow 48 hours before the next explosive block." }, workouts: [strengthA(5, 4), strengthB(5, 4), powerC(5, 5)] },
  { number: 6, phase: 2, title: { ru: "Связать систему", en: "Connect the System" }, focus: { ru: "Хват, корпус, перемещение", en: "Grip, trunk, movement" }, intent: { ru: "Передавать усилие от пола через корпус в руки.", en: "Transfer force from the floor through the trunk to the hands." }, progression: { ru: "Усложни вариант только в одном упражнении за сессию.", en: "Progress only one exercise variation per session." }, recovery: { ru: "Снизь дополнительную работу хвата вне программы.", en: "Reduce extra grip work outside the program." }, workouts: [strengthA(6, 4), strengthB(6, 4), powerC(6, 5)] },
  { number: 7, phase: 3, title: { ru: "Работа под усталостью", en: "Work Under Fatigue" }, focus: { ru: "Сохранять качество", en: "Preserve quality" }, intent: { ru: "Держать позицию, когда дыхание становится тяжёлым.", en: "Hold position when breathing becomes difficult." }, progression: { ru: "Сократи отдых, но верни его, если техника распадается.", en: "Reduce rest, but restore it if technique breaks down." }, recovery: { ru: "Дополнительная лёгкая сессия только при хорошем восстановлении.", en: "Add easy work only when recovery is clearly good." }, workouts: [strengthA(7, 3), strengthB(7, 3), powerC(7, 5)] },
  { number: 8, phase: 3, title: { ru: "Закрепить результат", en: "Consolidate" }, focus: { ru: "Проверка и следующий шаг", en: "Review and next step" }, intent: { ru: "Повторить стартовые тесты без погони за рекордом.", en: "Repeat baseline tests without chasing a record." }, progression: { ru: "Уменьши объём на 25–30%, сохрани намерение.", en: "Reduce volume by 25–30% while keeping intent." }, recovery: { ru: "После недели возьми 3–5 лёгких дней перед новым блоком.", en: "Take 3–5 easy days before beginning another block." }, workouts: [strengthA(8, 3), strengthB(8, 3), powerC(8, 3)] },
];

export const nutritionLessons = [
  {
    id: "plate",
    title: { ru: "Тарелка тренировочного дня", en: "The training-day plate" },
    summary: { ru: "Простой способ собрать еду без подсчёта каждой цифры.", en: "A practical way to build meals without tracking every number." },
    sections: [
      { heading: { ru: "Белок", en: "Protein" }, body: { ru: "Добавляй порцию белковой еды в каждый основной приём пищи. Это поддерживает восстановление и помогает распределить питание по дню.", en: "Include a protein-rich food in each main meal. This supports recovery and distributes intake across the day." } },
      { heading: { ru: "Углеводы", en: "Carbohydrate" }, body: { ru: "Рис, картофель, овёс, хлеб и фрукты помогают обеспечивать интенсивную работу. Больше вокруг тяжёлых сессий, меньше в спокойные дни.", en: "Rice, potatoes, oats, bread, and fruit help fuel hard work. Use more around demanding sessions and less on quiet days." } },
      { heading: { ru: "Цвет и жиры", en: "Colour and fats" }, body: { ru: "Добавляй овощи или фрукты и умеренную порцию жиров. Не делай предтренировочную еду слишком тяжёлой.", en: "Add vegetables or fruit and a moderate fat source. Avoid making the pre-training meal excessively heavy." } },
    ],
  },
  {
    id: "timing",
    title: { ru: "До и после тренировки", en: "Before and after training" },
    summary: { ru: "Ешь достаточно рано, чтобы тренироваться, а не переваривать.", en: "Eat early enough to train rather than digest." },
    sections: [
      { heading: { ru: "За 2–3 часа", en: "2–3 hours before" }, body: { ru: "Обычная еда с углеводами, белком и умеренным количеством жира. Выбирай знакомые продукты.", en: "A normal meal with carbohydrate, protein, and moderate fat. Choose familiar foods." } },
      { heading: { ru: "Если осталось мало времени", en: "When time is short" }, body: { ru: "Небольшой легко перевариваемый перекус, например банан и йогурт. Индивидуальная переносимость важнее идеального списка.", en: "Use a small, easy-to-digest snack such as a banana and yogurt. Individual tolerance matters more than a perfect list." } },
      { heading: { ru: "После", en: "After" }, body: { ru: "В течение следующих часов съешь полноценную еду и восполни жидкость. Срочное окно в несколько минут не требуется.", en: "Eat a complete meal and replace fluids over the following hours. A frantic few-minute window is unnecessary." } },
    ],
  },
  {
    id: "hydration",
    title: { ru: "Вода, соль и пот", en: "Water, sodium, and sweat" },
    summary: { ru: "Гидратация начинается до того, как ты вышел на ковёр.", en: "Hydration starts before you reach the mat." },
    sections: [
      { heading: { ru: "Базовая привычка", en: "The baseline habit" }, body: { ru: "Пей регулярно в течение дня. Светлая моча обычно указывает на достаточную гидратацию, но лекарства и добавки могут менять цвет.", en: "Drink regularly through the day. Pale urine often suggests adequate hydration, though medication and supplements can alter colour." } },
      { heading: { ru: "Длинные и жаркие сессии", en: "Long or hot sessions" }, body: { ru: "При большом потоотделении напиток с натрием может помогать удерживать жидкость. Не копируй чужие дозировки без специалиста.", en: "During heavy sweating, a sodium-containing drink may help retain fluid. Do not copy another athlete's dosing without professional guidance." } },
    ],
  },
  {
    id: "weight",
    title: { ru: "Весовая категория без опасных сокращений", en: "Weight class without dangerous shortcuts" },
    summary: { ru: "Сгонка веса не является самостоятельным заданием из интернета.", en: "Weight cutting is not a do-it-yourself internet protocol." },
    sections: [
      { heading: { ru: "Планируй раньше", en: "Plan earlier" }, body: { ru: "Изменение состава тела происходит постепенно, вне соревновательной недели. Срочное обезвоживание несёт риск и требует медицинского и тренерского контроля.", en: "Body-composition change happens gradually, outside competition week. Acute dehydration carries risk and requires medical and coaching oversight." } },
      { heading: { ru: "Красные флаги", en: "Red flags" }, body: { ru: "Спутанность, обморок, отсутствие мочи, сильная слабость, боль в груди или необычная одышка требуют прекращения нагрузки и срочной помощи.", en: "Confusion, fainting, absent urination, severe weakness, chest pain, or unusual breathlessness require stopping and urgent assessment." } },
    ],
  },
];

export const recoveryGuide = {
  sleep: { ru: "Стремись к регулярному времени сна и 7–9 часам возможности для сна. Последний час сделай тише и темнее.", en: "Keep a regular sleep window and allow 7–9 hours for sleep. Make the final hour quieter and darker." },
  soreness: { ru: "Лёгкая скованность допустима. Острая боль, растущая от подхода к подходу, изменение походки или потеря силы требуют остановки и оценки.", en: "Mild stiffness can be normal. Sharp pain, worsening symptoms, altered gait, or loss of strength require stopping and assessment." },
  readiness: { ru: "Перед тренировкой оцени сон, желание тренироваться и общую тяжесть тела от 1 до 5. Два низких показателя означают: сократи один подход в каждом упражнении.", en: "Before training, rate sleep, willingness, and body heaviness from 1 to 5. Two low scores mean remove one set from each exercise." },
};

export function findWorkout(id: string) {
  return programWeeks.flatMap((week) => week.workouts).find((item) => item.id === id);
}

export function findExercise(id: string) {
  return exerciseLibrary.find((item) => item.id === id);
}
