// ---------------------------------------------------------------------------
// The motivation diary.
//
// DEMO CONTENT — written for the build in Nikita's voice. He must confirm or
// rewrite every entry before public launch (see README).
//
// HOW NIKITA ADDS AN ENTRY (no code required):
//   1. Copy one whole { ... } block below, including both braces.
//   2. Paste it at the TOP of the list, right under "export const entries".
//   3. Change: id (any new unique word), date ("YYYY-MM-DD"), title, body.
//   4. Keep both "ru" and "en" filled in. Keep the quotes and the commas.
//   5. Save. The newest entry appears first and joins the rotation.
//
// "mood" decides which shelf an entry sits on when the reader picks how they
// feel. Allowed values: "empty" | "heavy" | "doubt" | "steady".
// ---------------------------------------------------------------------------

export type DiaryMood = "empty" | "heavy" | "doubt" | "steady";

export type DiaryEntry = {
  id: string;
  /** ISO date, YYYY-MM-DD. Newest first. */
  date: string;
  mood: DiaryMood;
  title: { ru: string; en: string };
  body: { ru: string; en: string }[];
};

export const moodLabels: Record<
  DiaryMood | "any",
  { ru: string; en: string }
> = {
  any: { ru: "Любая запись", en: "Any entry" },
  empty: { ru: "Нет сил", en: "Nothing left" },
  heavy: { ru: "Тяжело идёт", en: "Heavy going" },
  doubt: { ru: "Сомневаюсь", en: "Doubting it" },
  steady: { ru: "Всё ровно", en: "Steady" },
};

export const entries: DiaryEntry[] = [
  {
    id: "cold-morning",
    date: "2026-07-22",
    mood: "empty",
    title: { ru: "Холодное утро", en: "A cold morning" },
    body: [
      {
        ru: "Сегодня не хотел вставать. Не немного лень — вообще не хотел. Лежал и считал причины остаться дома, и они все были разумные.",
        en: "I did not want to get up today. Not a little lazy — genuinely did not want to. I lay there counting reasons to stay home, and every one of them was reasonable.",
      },
      {
        ru: "Потом я сделал то, что делаю всегда: не стал решать, тренироваться или нет. Просто оделся. Решение принимается уже в зале, а не в кровати. В кровати ты никогда не выберешь работу.",
        en: "Then I did what I always do: I did not decide whether to train. I just got dressed. The decision gets made at the gym, not in bed. In bed you will never choose the work.",
      },
    ],
  },
  {
    id: "small-day",
    date: "2026-07-19",
    mood: "empty",
    title: { ru: "Маленький день тоже считается", en: "A small day still counts" },
    body: [
      {
        ru: "Не каждая сессия обязана быть лучшей. Сегодня я сделал половину от запланированного и ушёл. И это правильное решение, а не слабость.",
        en: "Not every session has to be your best. Today I did half of what was planned and left. That was the right call, not weakness.",
      },
      {
        ru: "Половина работы лучше, чем ноль, и намного лучше, чем травма от упрямства. Цепочка важнее одного звена.",
        en: "Half the work beats zero, and it beats an injury from stubbornness by a much wider margin. The chain matters more than any single link.",
      },
    ],
  },
  {
    id: "nobody-watching",
    date: "2026-07-15",
    mood: "doubt",
    title: { ru: "Когда никто не смотрит", en: "When nobody is watching" },
    body: [
      {
        ru: "На соревнованиях легко быть собранным — там смотрят. Труднее в среду вечером в пустом зале, когда никто не узнает, сделал ты последний подход или нет.",
        en: "It is easy to be focused at a competition — people are watching. It is harder on a Wednesday evening in an empty gym, when nobody will know whether you did the last set.",
      },
      {
        ru: "Тот, кем ты становишься, строится именно в среду. Соревнование только показывает результат.",
        en: "The person you become is built on the Wednesday. The competition only reveals the result.",
      },
    ],
  },
  {
    id: "borrowed-motivation",
    date: "2026-07-11",
    mood: "doubt",
    title: { ru: "Мотивация — плохой напарник", en: "Motivation is a bad training partner" },
    body: [
      {
        ru: "Мотивация приходит и уходит. Она не спрашивает разрешения. Если строить работу на ней, тренировки будут случайными.",
        en: "Motivation comes and goes. It does not ask permission. If you build the work on it, your training becomes random.",
      },
      {
        ru: "Я строю на расписании. В понедельник я иду в зал не потому, что хочу, а потому что понедельник. Желание обычно приходит на разминке — но я его уже не жду.",
        en: "I build on a schedule. On Monday I go to the gym not because I want to, but because it is Monday. The wish usually arrives during the warm-up — but by then I am no longer waiting for it.",
      },
    ],
  },
  {
    id: "the-bar-is-honest",
    date: "2026-07-08",
    mood: "steady",
    title: { ru: "Штанга не врёт", en: "The bar does not lie" },
    body: [
      {
        ru: "Можно обмануть тренера, друзей, себя в разговоре. Вес не обманешь. Он либо идёт, либо нет, и он точно знает, что ты делал последние шесть недель.",
        en: "You can fool a coach, your friends, yourself in conversation. You cannot fool the weight. It either moves or it does not, and it knows exactly what you have been doing for the last six weeks.",
      },
      {
        ru: "Мне это нравится. В мире, где всё можно объяснить словами, приятно иметь вещь, которая отвечает честно.",
        en: "I like that. In a world where everything can be explained away with words, it is good to have one thing that answers honestly.",
      },
    ],
  },
  {
    id: "after-loss",
    date: "2026-07-04",
    mood: "heavy",
    title: { ru: "После поражения", en: "After a loss" },
    body: [
      {
        ru: "Проигрывал я много. Первые сутки после — самые бесполезные: в голове одно и то же, и все мысли врут в одну сторону.",
        en: "I have lost plenty. The first day after is the most useless one: the same loop in your head, and every thought lies in the same direction.",
      },
      {
        ru: "Я даю себе один вечер. Потом смотрю запись, нахожу конкретную ошибку — не «я плохой», а «рука была низко» — и иду её чинить. Ошибку можно тренировать. Стыд нельзя.",
        en: "I give myself one evening. Then I watch the tape and find the specific mistake — not \"I am bad\" but \"my hand was low\" — and go and fix it. A mistake can be trained. Shame cannot.",
      },
    ],
  },
  {
    id: "boring-weeks",
    date: "2026-06-30",
    mood: "heavy",
    title: { ru: "Скучные недели", en: "The boring weeks" },
    body: [
      {
        ru: "Никто не рассказывает про недели, где ничего не происходит. Вес стоит, ощущения средние, прогресса не видно. Их большинство.",
        en: "Nobody talks about the weeks where nothing happens. The weight sits still, everything feels average, no progress is visible. They are the majority.",
      },
      {
        ru: "Именно в них решается всё. Тот, кто продолжает в скучные недели, обгоняет того, кто отлично тренируется только во вдохновлённые.",
        en: "That is where everything is decided. The one who continues through the boring weeks passes the one who trains brilliantly only on inspired ones.",
      },
    ],
  },
  {
    id: "compare",
    date: "2026-06-26",
    mood: "doubt",
    title: { ru: "Чужой зал", en: "Someone else's gym" },
    body: [
      {
        ru: "Я перестал сравнивать себя с людьми, чей путь я не видел. Ты видишь их лучший подход, а не восемь лет до него.",
        en: "I stopped comparing myself to people whose road I have not seen. You see their best set, not the eight years behind it.",
      },
      {
        ru: "Сравнивать имеет смысл только с собой шесть месяцев назад. Этот человек тебе известен полностью.",
        en: "The only useful comparison is with yourself six months ago. That is the one person you know completely.",
      },
    ],
  },
  {
    id: "warmup-truth",
    date: "2026-06-21",
    mood: "empty",
    title: { ru: "Правило разминки", en: "The warm-up rule" },
    body: [
      {
        ru: "Когда совсем нет сил, я договариваюсь с собой на одну вещь: только разминка. Пришёл, размялся — можешь идти домой, честно.",
        en: "When there is nothing left, I make one deal with myself: just the warm-up. Come in, warm up, and you may go home. Honestly.",
      },
      {
        ru: "За все годы я уходил после разминки, может, три раза. Тело почти всегда просыпается. Но договор должен быть настоящим, иначе он перестаёт работать.",
        en: "In all these years I have left after the warm-up maybe three times. The body almost always wakes up. But the deal has to be real, or it stops working.",
      },
    ],
  },
  {
    id: "quiet-strength",
    date: "2026-06-17",
    mood: "steady",
    title: { ru: "Сила не кричит", en: "Strength does not shout" },
    body: [
      {
        ru: "Самые сильные люди, которых я встречал в борьбе, были самыми спокойными. Они не доказывали ничего в раздевалке. Они доказывали на ковре и молчали.",
        en: "The strongest people I met in wrestling were the calmest. They proved nothing in the changing room. They proved it on the mat and stayed quiet.",
      },
      {
        ru: "Чем меньше тебе нужно показывать силу, тем больше её обычно есть.",
        en: "The less you need to display strength, the more of it you usually have.",
      },
    ],
  },
  {
    id: "body-talks",
    date: "2026-06-12",
    mood: "heavy",
    title: { ru: "Тело говорит тихо", en: "The body speaks quietly" },
    body: [
      {
        ru: "Сначала оно шепчет: чуть тянет, чуть неудобно, чуть тяжелее вставать. Если не слушать — начинает кричать, и тогда это уже месяц без зала.",
        en: "First it whispers: a slight pull, slight discomfort, slightly harder to get up. Ignore it and it starts shouting, and by then it is a month out of the gym.",
      },
      {
        ru: "Слушать шёпот — не слабость. Это то, что позволяет тренироваться десять лет, а не два года.",
        en: "Listening to the whisper is not weakness. It is what lets you train for ten years instead of two.",
      },
    ],
  },
  {
    id: "why-started",
    date: "2026-06-07",
    mood: "doubt",
    title: { ru: "Зачем ты начал", en: "Why you started" },
    body: [
      {
        ru: "В какой-то момент цель размывается. Ты уже не помнишь, зачем всё это, и просто ходишь по инерции.",
        en: "At some point the goal blurs. You no longer remember what it was all for, and you keep going out of habit.",
      },
      {
        ru: "Я возвращаюсь к простому ответу: мне не нравится, каким я становлюсь, когда не тренируюсь. Этого достаточно. Причина не обязана быть красивой.",
        en: "I go back to a simple answer: I do not like who I become when I stop training. That is enough. The reason does not have to be beautiful.",
      },
    ],
  },
  {
    id: "one-more-set",
    date: "2026-06-02",
    mood: "steady",
    title: { ru: "Последний подход", en: "The last set" },
    body: [
      {
        ru: "Разница между хорошей сессией и обычной обычно в одном подходе — том, который делать не хотелось.",
        en: "The difference between a good session and an ordinary one is usually one set — the one you did not want to do.",
      },
      {
        ru: "Но это работает только если техника цела. Плохой последний подход не делает тебя сильнее, он делает тебя травмированным.",
        en: "But it only works while the technique holds. A sloppy last set does not make you stronger, it makes you injured.",
      },
    ],
  },
  {
    id: "no-audience",
    date: "2026-05-28",
    mood: "empty",
    title: { ru: "Никто не придёт", en: "Nobody is coming" },
    body: [
      {
        ru: "Никто не придёт и не заставит тебя. Тренер может дать план, партнёр может ждать в зале, но встать с дивана можешь только ты.",
        en: "Nobody is coming to make you do it. A coach can give you a plan, a partner can wait at the gym, but only you can get off the sofa.",
      },
      {
        ru: "Сначала это звучит тяжело. Потом понимаешь, что это же и есть свобода: всё, что ты построил, построил ты.",
        en: "At first that sounds heavy. Then you realise it is also the freedom: everything you have built, you built.",
      },
    ],
  },
  {
    id: "technique-first",
    date: "2026-05-23",
    mood: "steady",
    title: { ru: "Позиция раньше силы", en: "Position before force" },
    body: [
      {
        ru: "Молодым я пытался решать всё силой. Работало до определённого уровня, а потом перестало — там все сильные.",
        en: "When I was young I tried to solve everything with force. It worked up to a certain level, then it stopped — at that level everyone is strong.",
      },
      {
        ru: "Дальше начинается позиция. Правильное место, правильный момент, и тогда нужно вдвое меньше силы. Это относится и к штанге.",
        en: "After that it becomes position. The right place at the right moment, and you need half the force. The same is true under the bar.",
      },
    ],
  },
  {
    id: "sleep-is-training",
    date: "2026-05-18",
    mood: "heavy",
    title: { ru: "Сон — это тоже работа", en: "Sleep is part of the work" },
    body: [
      {
        ru: "Я долго считал, что режим — это только тренировки и еда. Пока не заметил, что после недели плохого сна тот же вес кажется чужим.",
        en: "For a long time I thought discipline meant only training and food. Until I noticed that after a week of bad sleep the same weight feels like someone else's.",
      },
      {
        ru: "Лечь вовремя иногда труднее, чем доделать сессию. И даёт больше.",
        en: "Going to bed on time is sometimes harder than finishing the session. And it gives you more.",
      },
    ],
  },
  {
    id: "long-game",
    date: "2026-05-14",
    mood: "doubt",
    title: { ru: "Считай годами", en: "Count in years" },
    body: [
      {
        ru: "Люди бросают, потому что считают неделями. За неделю почти ничего не видно, и кажется, что не работает.",
        en: "People quit because they count in weeks. In a week you see almost nothing, and it looks like it is not working.",
      },
      {
        ru: "Посмотри на два года. Два года средних тренировок дают больше, чем два месяца идеальных и потом ничего.",
        en: "Look at two years. Two years of average training gives more than two months of perfect training followed by nothing.",
      },
    ],
  },
  {
    id: "gym-is-not-punishment",
    date: "2026-05-09",
    mood: "empty",
    title: { ru: "Зал — не наказание", en: "The gym is not a punishment" },
    body: [
      {
        ru: "Если ты идёшь в зал, чтобы наказать себя за еду или за пропуск, ты не продержишься долго. Наказание невозможно любить.",
        en: "If you go to the gym to punish yourself for what you ate or for a session you missed, you will not last. Nobody can love a punishment.",
      },
      {
        ru: "Я иду туда, потому что оттуда выхожу спокойнее, чем зашёл. Это единственная причина, которая работает годами.",
        en: "I go because I come out calmer than I went in. That is the only reason that survives for years.",
      },
    ],
  },
  {
    id: "start-again",
    date: "2026-05-03",
    mood: "heavy",
    title: { ru: "Начать заново", en: "Starting again" },
    body: [
      {
        ru: "Я начинал заново много раз: после травм, после перерывов, после периодов, когда всё разваливалось. Каждый раз первая неделя унизительна.",
        en: "I have started again many times: after injuries, after breaks, after stretches when everything fell apart. The first week is humiliating every time.",
      },
      {
        ru: "Но тело помнит. Через месяц ты не там, где был, но и не там, где начинал. Возвращаться всегда быстрее, чем строить впервые.",
        en: "But the body remembers. After a month you are not where you were, but you are not where you started either. Coming back is always faster than building it the first time.",
      },
    ],
  },
  {
    id: "enough-today",
    date: "2026-04-28",
    mood: "steady",
    title: { ru: "На сегодня хватит", en: "That is enough for today" },
    body: [
      {
        ru: "Уметь остановиться — такой же навык, как уметь продолжить. Я учился ему дольше.",
        en: "Knowing when to stop is as much a skill as knowing how to continue. It took me longer to learn.",
      },
      {
        ru: "Ты пришёл, сделал работу, ушёл целым. Завтра будет ещё один день, и ты будешь в состоянии его использовать.",
        en: "You showed up, did the work, left in one piece. Tomorrow is another day, and you will be in a condition to use it.",
      },
    ],
  },
];
