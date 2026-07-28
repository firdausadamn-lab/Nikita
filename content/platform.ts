import type { Localized } from "./i18n";

export type Difficulty = "foundation" | "build" | "perform";

export type Exercise = {
  id: string;
  name: Localized;
  sets: number;
  reps: Localized;
  rest: number;
  equipment: string[];
  cues: Localized<string[]>;
  easier: Localized;
  harder: Localized;
};

export type Workout = {
  id: string;
  week: number;
  day: number;
  title: Localized;
  goal: Localized;
  duration: number;
  equipment: string[];
  exercises: Exercise[];
};

export const platform = {
  brand: {
    name: { ru: "ДОМ БОРЦА", en: "THE WRESTLER'S HOME" },
    shortName: { ru: "ДБ", en: "WH" },
    tagline: { ru: "Сила обрела дом.", en: "Strength has a home." },
    supportEmail: "{{SUPPORT_EMAIL}}",
    locale: "ru",
    currency: "{{CURRENCY}}",
  },
  athlete: {
    name: "Nikita",
    experienceYears: 12,
    biography: {
      ru: "Никита вышел на ковёр в шесть лет. Эта программа переводит годы повторений, силовой работы и соревновательной дисциплины в систему, доступную вне борцовского зала.",
      en: "Nikita first stepped onto the mat at six. This program turns years of repetition, strength work, and competitive discipline into a system you can use beyond the wrestling room.",
    },
    philosophy: {
      ru: "Техника начинается с внимания. Сила начинается с повторения.",
      en: "Technique begins with attention. Strength begins with repetition.",
    },
    credentials: [
      { label: { ru: "12 лет на ковре", en: "12 years on the mat" }, verified: true },
      { label: { ru: "Член сборной России", en: "Team Russia athlete" }, verified: false },
      { label: { ru: "КМС / МС", en: "Candidate / Master of Sport" }, verified: false },
    ],
  },
  product: {
    id: "wrestlers-home-foundation",
    name: { ru: "Борцовская база", en: "The Wrestling Foundation" },
    subtitle: { ru: "8 недель силы, мощности и контроля", en: "8 weeks of strength, power, and control" },
    price: { ru: "{{PRICE}}", en: "{{PRICE}}" },
    accessType: { ru: "Единоразовая покупка", en: "One-time purchase" },
    commerceProductId: "{{COMMERCE_PRODUCT_ID}}",
    status: "development" as const,
  },
};

export const methodBlocks = [
  {
    number: "01",
    title: { ru: "База", en: "Foundation" },
    eyebrow: { ru: "Сила", en: "Strength" },
    body: {
      ru: "Тяжёлые составные движения, управляемый темп и нагрузка, которую можно повторить чисто.",
      en: "Heavy compound work, controlled tempo, and loads you can repeat with clean intent.",
    },
  },
  {
    number: "02",
    title: { ru: "Движение", en: "Movement" },
    eyebrow: { ru: "Мощность и выносливость", en: "Power and endurance" },
    body: {
      ru: "Взрывные повторения, резина и интервалы учат производить силу даже под усталостью.",
      en: "Explosive repetitions, bands, and intervals teach you to produce force under fatigue.",
    },
  },
  {
    number: "03",
    title: { ru: "Контроль", en: "Control" },
    eyebrow: { ru: "Хват, шея, корпус", en: "Grip, neck, trunk" },
    body: {
      ru: "Изометрия и координация связывают тело в одну рабочую систему.",
      en: "Isometrics and coordination connect the body into one working system.",
    },
  },
];

export const curriculum = [
  ["01", { ru: "Добро пожаловать на ковёр", en: "Welcome to the Mat" }, "12 min", true],
  ["02", { ru: "Определи свою базу", en: "Establish Your Baseline" }, "18 min", true],
  ["03", { ru: "Силовой фундамент", en: "Strength Foundations" }, "4 workouts", false],
  ["04", { ru: "Борцовская резина", en: "Wrestling Resistance" }, "3 workouts", false],
  ["05", { ru: "Взрывная мощность", en: "Explosive Power" }, "4 workouts", false],
  ["06", { ru: "Хват, шея и корпус", en: "Grip, Neck and Core" }, "3 workouts", false],
  ["07", { ru: "Работа под усталостью", en: "Conditioning Under Fatigue" }, "4 workouts", false],
  ["08", { ru: "Питание и восстановление", en: "Nutrition and Recovery" }, "6 lessons", false],
] as const;

export const workouts: Workout[] = [
  {
    id: "foundation-a",
    week: 3,
    day: 1,
    title: { ru: "Силовая база A", en: "Strength Foundation A" },
    goal: { ru: "Производить силу всем телом без потери позиции.", en: "Produce whole-body force without losing position." },
    duration: 48,
    equipment: ["barbell", "bench", "bands"],
    exercises: [
      {
        id: "front-squat",
        name: { ru: "Фронтальный присед", en: "Front squat" },
        sets: 4,
        reps: { ru: "5 повторов", en: "5 reps" },
        rest: 120,
        equipment: ["barbell"],
        cues: { ru: ["Локти высоко", "Дави пол", "Корпус собран"], en: ["Elbows high", "Drive the floor", "Brace before descent"] },
        easier: { ru: "Гоблет-присед", en: "Goblet squat" },
        harder: { ru: "Пауза 2 секунды внизу", en: "Two-second pause at depth" },
      },
      {
        id: "bench-row",
        name: { ru: "Тяга гантелей на скамье", en: "Bench-supported dumbbell row" },
        sets: 4,
        reps: { ru: "8 / сторона", en: "8 / side" },
        rest: 75,
        equipment: ["dumbbells", "bench"],
        cues: { ru: ["Плечо вниз", "Тяни локтем", "Не вращай корпус"], en: ["Shoulder down", "Pull with the elbow", "Keep the trunk square"] },
        easier: { ru: "Тяга резины сидя", en: "Seated band row" },
        harder: { ru: "Трёхсекундное опускание", en: "Three-second lowering" },
      },
      {
        id: "band-pummel",
        name: { ru: "Борьба за захват с резиной", en: "Band hand-fighting drill" },
        sets: 5,
        reps: { ru: "30 секунд", en: "30 seconds" },
        rest: 30,
        equipment: ["bands"],
        cues: { ru: ["Короткие движения", "Сохраняй стойку", "Максимальное намерение"], en: ["Short movements", "Keep stance", "Maximum intent"] },
        easier: { ru: "Лёгкая резина", en: "Lighter band" },
        harder: { ru: "45 секунд", en: "45-second round" },
      },
    ],
  },
];

export const faqs = [
  {
    q: { ru: "Нужен ли опыт в борьбе?", en: "Do I need wrestling experience?" },
    a: { ru: "Нет. Стартовый путь объясняет позиции, нагрузку и варианты без борцовского опыта.", en: "No. The foundation path explains positions, loading, and substitutions without assuming wrestling experience." },
  },
  {
    q: { ru: "Можно тренироваться дома?", en: "Can I train at home?" },
    a: { ru: "Да. Для каждой недели предусмотрен путь с резиной, гантелями и собственным весом.", en: "Yes. Every week includes a band, dumbbell, and bodyweight pathway." },
  },
  {
    q: { ru: "Это персональный план?", en: "Is this personalized coaching?" },
    a: { ru: "Нет. Курс даёт структуру и варианты. Индивидуальные корректировки относятся к будущей услуге тренера.", en: "No. The course gives you structure and options. Individual adjustment belongs to the future coaching service." },
  },
  {
    q: { ru: "Что делать при травме?", en: "What if I have an injury?" },
    a: { ru: "Курс не диагностирует и не лечит травмы. Обратитесь к квалифицированному врачу или физиотерапевту перед тренировкой.", en: "The course does not diagnose or rehabilitate injuries. Speak with a qualified clinician before training." },
  },
  {
    q: { ru: "Как работает оплата?", en: "How does payment work?" },
    a: { ru: "Перед запуском оплата будет проходить на защищённой странице провайдера. Сейчас это демонстрационный режим.", en: "At launch, payment will run through a secure provider-hosted checkout. This build currently uses development mode." },
  },
];

export const nutritionGuides = [
  { title: { ru: "Тарелка в тренировочный день", en: "The training-day plate" }, category: { ru: "Основа", en: "Foundation" }, time: "6 min" },
  { title: { ru: "Еда до и после ковра", en: "Before and after the mat" }, category: { ru: "Топливо", en: "Fuel" }, time: "8 min" },
  { title: { ru: "Вода, соль и восстановление", en: "Water, sodium, recovery" }, category: { ru: "Гидратация", en: "Hydration" }, time: "7 min" },
];
