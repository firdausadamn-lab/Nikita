// ---------------------------------------------------------------------------
// Reference content: nutrition, recovery, injury.
//
// DEMO CONTENT. Every line here was written for the build and is presented as
// Nikita's own method, not as universal fact or medical advice. Nikita must
// confirm all of it before public launch. The injury section is the first
// priority for that review — see README.
//
// Structure: each section is a list of collapsible entries so a returning
// athlete can find one answer ("what do I eat after training") without
// reading the whole page again.
// ---------------------------------------------------------------------------

export type Bilingual = { ru: string; en: string };

export type ReferenceEntry = {
  id: string;
  question: Bilingual;
  /** Paragraphs, rendered in order. */
  body: Bilingual[];
  /** Optional tight list rendered under the paragraphs. */
  list?: Bilingual[];
};

export type ReferenceGroup = {
  id: string;
  eyebrow: Bilingual;
  title: Bilingual;
  entries: ReferenceEntry[];
};

export type ReferenceSection = {
  eyebrow: Bilingual;
  title: Bilingual;
  intro: Bilingual;
  /** A quiet rule under the intro, not a scare banner. */
  caveat: Bilingual;
  groups: ReferenceGroup[];
};

// ---------------------------------------------------------------------------
// NUTRITION
// ---------------------------------------------------------------------------

/**
 * Carried over from the earlier nutrition page. Weight cutting is the single
 * most dangerous practice in this sport, so the warning stays prominent even
 * though the page around it was rewritten.
 */
export const nutritionSafety = {
  eyebrow: { ru: "Сгонка веса", en: "Weight cutting" },
  title: {
    ru: "НЕ КОПИРУЙТЕ ЧУЖОЙ ПРОТОКОЛ СГОНКИ.",
    en: "DO NOT COPY ANOTHER ATHLETE'S WEIGHT CUT.",
  },
  points: [
    {
      ru: "Сгонка веса и обезвоживание требуют индивидуального контроля квалифицированного тренера и медицинского специалиста. Это не то, что делают по статье в интернете.",
      en: "Weight cutting and dehydration require individual oversight from a qualified coach and a medical professional. It is not something to do from an article on the internet.",
    },
    {
      ru: "Ничего на этой странице не является протоколом сгонки. Это обычное питание для тренировок.",
      en: "Nothing on this page is a weight-cutting protocol. This is ordinary eating to support training.",
    },
    {
      ru: "Головокружение, спутанность, судороги, отсутствие мочи, сердцебиение — прекращайте немедленно и обращайтесь за помощью.",
      en: "Dizziness, confusion, cramps, not passing urine, a racing heart — stop immediately and get help.",
    },
  ],
};

export const nutrition: ReferenceSection = {
  eyebrow: { ru: "Питание", en: "Nutrition" },
  title: {
    ru: "ЕДА ПОДДЕРЖИВАЕТ РАБОТУ.",
    en: "FOOD SUPPORTS THE WORK.",
  },
  intro: {
    ru: "Это то, как питаюсь я и как питались борцы, рядом с которыми я вырос. Здесь нет обещаний быстрой трансформации. Есть порядок, который позволяет тренироваться тяжело три раза в неделю и восстанавливаться к следующей сессии.",
    en: "This is how I eat, and how the wrestlers I grew up around ate. There are no promises of rapid transformation here. There is an order that lets you train hard three times a week and recover in time for the next session.",
  },
  caveat: {
    ru: "Потребности у всех разные — вес, возраст, работа, сон. Это отправная точка, а не предписание. При заболеваниях, аллергии или назначенной диете сначала говорите со специалистом.",
    en: "Needs differ — bodyweight, age, job, sleep. This is a starting point, not a prescription. If you have a medical condition, an allergy, or a prescribed diet, speak to a professional first.",
  },
  groups: [
    {
      id: "foundation",
      eyebrow: { ru: "01 / Основа", en: "01 / Foundation" },
      title: { ru: "Что есть в обычный день", en: "What to eat on a normal day" },
      entries: [
        {
          id: "macros",
          question: {
            ru: "С чего я начинаю: белок, потом всё остальное",
            en: "Where I start: protein first, then everything else",
          },
          body: [
            {
              ru: "Я не считаю каждую калорию. Я держу в голове три вещи: достаточно ли белка, достаточно ли углеводов вокруг тренировки, и не пропустил ли я овощи. Если эти три пункта на месте, остальное обычно выравнивается само.",
              en: "I do not count every calorie. I keep three things in mind: is there enough protein, are there enough carbohydrates around training, and did I skip vegetables. When those three are in place, the rest usually settles itself.",
            },
            {
              ru: "Белок — это то, из чего строится ткань, которую ты нагружаешь. Я беру примерно ладонь белковой еды в каждый приём: мясо, рыба, яйца, творог, бобовые. Четыре приёма в день — и вопрос закрыт без калькулятора.",
              en: "Protein is what rebuilds the tissue you load. I take roughly a palm of protein at each meal: meat, fish, eggs, cottage cheese, legumes. Four meals a day closes the question without a calculator.",
            },
            {
              ru: "Углеводы — это топливо, а не враг. Борьба и силовая работа идут на гликогене. Если убрать углеводы, первым уходит не жир, а качество третьего подхода.",
              en: "Carbohydrates are fuel, not the enemy. Wrestling and strength work run on glycogen. Cut carbohydrates and the first thing you lose is not fat, it is the quality of your third set.",
            },
          ],
        },
        {
          id: "sources",
          question: {
            ru: "Продукты, которые я держу дома всегда",
            en: "The foods I always keep in the house",
          },
          body: [
            {
              ru: "Простой список. Если это есть в холодильнике, я не принимаю плохих решений в девять вечера.",
              en: "A simple list. If these are in the fridge, I do not make bad decisions at nine in the evening.",
            },
          ],
          list: [
            { ru: "Яйца — быстрый белок в любое время дня", en: "Eggs — fast protein at any hour" },
            { ru: "Творог или простой йогурт — белок перед сном", en: "Cottage cheese or plain yoghurt — protein before sleep" },
            { ru: "Гречка, рис, картофель — база под тренировочные дни", en: "Buckwheat, rice, potatoes — the base for training days" },
            { ru: "Курица, говядина, скумбрия или сельдь", en: "Chicken, beef, mackerel or herring" },
            { ru: "Капуста, морковь, свёкла — дёшево и круглый год", en: "Cabbage, carrots, beetroot — cheap and available all year" },
            { ru: "Орехи и оливковое масло — жиры, которые не нужно готовить", en: "Nuts and olive oil — fats that need no cooking" },
          ],
        },
        {
          id: "blocks",
          question: {
            ru: "Как это ложится на три блока программы",
            en: "How this maps onto the three training blocks",
          },
          body: [
            {
              ru: "Первый блок ставит базу — здесь еда должна быть просто стабильной. Ешь регулярно, не пропускай завтрак, привыкай к четырём приёмам. Ничего героического.",
              en: "The first block builds the base. Here food only has to be steady. Eat regularly, do not skip breakfast, get used to four meals. Nothing heroic.",
            },
            {
              ru: "Второй блок — сила и мощность. Нагрузка растёт, и вокруг тренировки нужно больше углеводов. Это тот момент, когда недоедание становится заметным: вес на штанге стоит, а ты думаешь, что дело в программе.",
              en: "The second block is strength and power. The load rises and you need more carbohydrate around the session. This is where under-eating shows up: the bar stops moving and you assume the programme is at fault.",
            },
            {
              ru: "Третий блок — работа под усталостью. Здесь решает восстановление между сессиями: белок в каждый приём и нормальный ужин, иначе третья неделя блока разберёт тебя.",
              en: "The third block is work under fatigue. Here recovery between sessions decides everything: protein at every meal and a real dinner, or week three of the block will take you apart.",
            },
          ],
        },
      ],
    },
    {
      id: "before",
      eyebrow: { ru: "02 / До тренировки", en: "02 / Before training" },
      title: { ru: "Чем заправиться перед работой", en: "Fuelling before the work" },
      entries: [
        {
          id: "pre-timing",
          question: {
            ru: "За сколько до тренировки я ем",
            en: "How long before training I eat",
          },
          body: [
            {
              ru: "Полноценный приём — за два-три часа. Небольшой перекус — за сорок-шестьдесят минут. Если ем ближе, чем за час, беру что-то лёгкое: банан, немного риса, чай с мёдом. Тяжёлая еда прямо перед борьбой или приседом — это плохой опыт, и ты запомнишь его надолго.",
              en: "A full meal two to three hours before. A small snack forty to sixty minutes before. If I eat closer than an hour out, I keep it light: a banana, a little rice, tea with honey. Heavy food right before wrestling or squatting is a bad experience, and you remember it for a long time.",
            },
          ],
        },
        {
          id: "pre-what",
          question: {
            ru: "Что именно я ем перед сессией",
            en: "What I actually eat before a session",
          },
          body: [
            {
              ru: "Углеводы, которые легко усваиваются, и немного белка. Жир и много клетчатки я оставляю на потом — они замедляют желудок, и на разминке это чувствуется.",
              en: "Carbohydrate that digests easily, plus a little protein. I leave fat and heavy fibre for later — they slow the stomach, and you feel it in the warm-up.",
            },
          ],
          list: [
            { ru: "Рис с курицей за 2–3 часа", en: "Rice with chicken, 2–3 hours before" },
            { ru: "Овсянка с мёдом за 2 часа", en: "Oats with honey, 2 hours before" },
            { ru: "Банан и чай за 40 минут", en: "A banana and tea, 40 minutes before" },
            { ru: "Белый хлеб с мёдом, если совсем нет времени", en: "White bread with honey when there is no time at all" },
          ],
        },
        {
          id: "pre-empty",
          question: {
            ru: "А если тренировка рано утром?",
            en: "What if the session is early in the morning?",
          },
          body: [
            {
              ru: "Я не заставляю себя есть полноценно в шесть утра. Что-то маленькое и быстрое — банан, немного мёда, сладкий чай — и нормальный приём сразу после. Тренироваться совсем пустым можно, но качество последних подходов падает, и это видно в журнале.",
              en: "I do not force a full meal at six in the morning. Something small and fast — a banana, some honey, sweet tea — and a proper meal straight after. You can train completely empty, but the quality of the last sets drops, and it shows up in the log.",
            },
          ],
        },
      ],
    },
    {
      id: "after",
      eyebrow: { ru: "03 / После тренировки", en: "03 / After training" },
      title: { ru: "Окно восстановления", en: "The recovery window" },
      entries: [
        {
          id: "post-why",
          question: {
            ru: "Почему приём после тренировки важнее остальных",
            en: "Why the meal after training matters more than the others",
          },
          body: [
            {
              ru: "После тяжёлой сессии ты потратил гликоген и повредил мышечную ткань — это нормальная часть работы. Еда после тренировки решает, начнёшь ты восстанавливаться сейчас или через несколько часов. При трёх сессиях в неделю эта разница накапливается.",
              en: "After a hard session you have spent glycogen and damaged muscle tissue — that is the normal part of the work. The meal afterwards decides whether recovery starts now or several hours from now. Across three sessions a week, that difference accumulates.",
            },
            {
              ru: "Я не верю в «окно в тридцать минут, иначе всё зря». Но я верю в то, что чем раньше поел, тем лучше себя чувствуешь на следующий день. Проверял на себе годами.",
              en: "I do not believe in a thirty-minute window that ruins everything if you miss it. I do believe that the sooner you eat, the better you feel the next day. I have tested that on myself for years.",
            },
          ],
        },
        {
          id: "post-what",
          question: {
            ru: "Что я ем сразу после — конкретно",
            en: "What I eat straight after — specifically",
          },
          body: [
            {
              ru: "Белок плюс углеводы. Белок — материал для восстановления, углеводы возвращают гликоген. Жир здесь я держу небольшим, чтобы не тормозить усвоение.",
              en: "Protein plus carbohydrate. Protein is the repair material, carbohydrate puts glycogen back. I keep fat low here so digestion is not slowed.",
            },
            {
              ru: "Если полноценно поесть негде — беру что-то в сумке и ем нормально уже дома, через час-полтора.",
              en: "If there is nowhere to eat properly, I take something from my bag and have the real meal at home an hour or so later.",
            },
          ],
          list: [
            { ru: "Курица с рисом и овощами — мой стандарт", en: "Chicken with rice and vegetables — my standard" },
            { ru: "Творог с мёдом и бананом — когда нет времени готовить", en: "Cottage cheese with honey and banana — when there is no time to cook" },
            { ru: "Яйца с картофелем", en: "Eggs with potatoes" },
            { ru: "В сумке: банан, горсть орехов, шоколад — это перекус, а не ужин", en: "In the bag: a banana, a handful of nuts, chocolate — that is a snack, not dinner" },
          ],
        },
        {
          id: "post-drink",
          question: {
            ru: "Питьё после тренировки",
            en: "Drinking after training",
          },
          body: [
            {
              ru: "Восстанавливать воду начинаю сразу и продолжаю весь вечер, а не пью литр залпом. Если сессия была тяжёлой и я много потел, добавляю в еду соль — она уходит с потом, и без неё вода хуже удерживается.",
              en: "I start replacing water immediately and keep going through the evening rather than drinking a litre at once. If the session was hard and I sweated a lot, I add salt to the meal — it leaves with sweat, and without it the water is held less well.",
            },
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// RECOVERY
// ---------------------------------------------------------------------------

export const recovery: ReferenceSection = {
  eyebrow: { ru: "Восстановление", en: "Recovery" },
  title: {
    ru: "ТЫ РАСТЁШЬ НЕ НА ТРЕНИРОВКЕ.",
    en: "YOU DO NOT GROW IN THE SESSION.",
  },
  intro: {
    ru: "Тренировка — это запрос. Восстановление — это ответ. Большинство людей, которые застряли, не тренируются мало. Они мало восстанавливаются. Это методы, на которые я опираюсь сам, в порядке их реальной ценности.",
    en: "The session is the request. Recovery is the answer. Most people who are stuck are not training too little. They are recovering too little. These are the methods I lean on myself, in the order they actually matter.",
  },
  caveat: {
    ru: "Если усталость не уходит неделями, падает вес или пропадает сон — это уже не вопрос методов восстановления. Это повод обратиться к врачу.",
    en: "If fatigue does not lift for weeks, if your weight drops, or if sleep disappears, that is no longer a recovery-method question. That is a reason to see a doctor.",
  },
  groups: [
    {
      id: "methods",
      eyebrow: { ru: "01 / Инструменты", en: "01 / The toolkit" },
      title: { ru: "Что действительно работает", en: "What actually works" },
      entries: [
        {
          id: "sleep",
          question: {
            ru: "Сон — всё остальное на втором месте",
            en: "Sleep — everything else is second",
          },
          body: [
            {
              ru: "Во сне идёт основная гормональная работа восстановления. Ни массаж, ни добавки, ни лёд не компенсируют пять часов сна. Если из всего списка ты сделаешь только это — результат всё равно изменится.",
              en: "The main hormonal work of recovery happens in sleep. No massage, supplement, or ice bath compensates for five hours of sleep. If you take only one thing from this list, this is the one that still changes the result.",
            },
            {
              ru: "Что помогает мне: ложиться в одно и то же время, прохладная комната, телефон не в кровати. Скучно, но работает лучше всего, что продаётся в банке.",
              en: "What helps me: the same bedtime, a cool room, the phone out of the bed. Boring, but it works better than anything sold in a tub.",
            },
          ],
        },
        {
          id: "hydration",
          question: {
            ru: "Вода и соль",
            en: "Water and salt",
          },
          body: [
            {
              ru: "Обезвоживание бьёт по силе и по концентрации раньше, чем ты почувствуешь жажду. Я пью в течение дня, а не пытаюсь догнать вечером. Тёмная моча утром — простой сигнал, что вчера пил мало.",
              en: "Dehydration hits strength and concentration before you feel thirsty. I drink through the day rather than trying to catch up in the evening. Dark urine in the morning is a simple signal that yesterday was too dry.",
            },
          ],
        },
        {
          id: "active",
          question: {
            ru: "Активное восстановление, а не полный покой",
            en: "Active recovery, not total rest",
          },
          body: [
            {
              ru: "На следующий день после тяжёлой сессии я не лежу. Двадцать-тридцать минут лёгкой работы — ходьба, велосипед, спокойное плавание — гоняют кровь через ткань, которую ты нагрузил, и на следующий день двигаться заметно легче.",
              en: "The day after a hard session I do not lie down. Twenty to thirty minutes of easy work — walking, cycling, easy swimming — moves blood through the tissue you loaded, and the next day moving is noticeably easier.",
            },
            {
              ru: "Ключевое слово — лёгкая. Если после восстановительной сессии ты устал, это была тренировка.",
              en: "The key word is easy. If you are tired after a recovery session, that was a workout.",
            },
          ],
        },
        {
          id: "mobility",
          question: {
            ru: "Подвижность там, где она нужна борцу",
            en: "Mobility where a wrestler actually needs it",
          },
          body: [
            {
              ru: "Я не растягиваю всё подряд. Я работаю над теми местами, которые закрываются от борьбы и силовой работы: грудной отдел, бёдра, голеностоп. Десять минут после сессии, спокойно, без попыток пересилить ткань.",
              en: "I do not stretch everything. I work the places that close down from wrestling and lifting: the upper back, the hips, the ankles. Ten minutes after a session, calm, with no attempt to force the tissue.",
            },
          ],
        },
        {
          id: "overrated",
          question: {
            ru: "Что переоценено, по моему опыту",
            en: "What is overrated, in my experience",
          },
          body: [
            {
              ru: "Лёд, массажные пистолеты, дорогие добавки — всё это может быть приятно и иногда полезно. Но это последние несколько процентов. Если сон и еда не на месте, они не спасут, и деньги уйдут впустую.",
              en: "Ice, massage guns, expensive supplements — all of it can feel good and sometimes helps. But it is the last few percent. If sleep and food are not in place, none of it saves you, and the money is wasted.",
            },
          ],
        },
      ],
    },
    {
      id: "week",
      eyebrow: { ru: "02 / Неделя", en: "02 / The week" },
      title: { ru: "Как я расставляю восстановление", en: "How I lay recovery out" },
      entries: [
        {
          id: "structure",
          question: {
            ru: "Три сессии и то, что между ними",
            en: "Three sessions and what sits between them",
          },
          body: [
            {
              ru: "Между двумя тяжёлыми сессиями я держу минимум один полный день. В этот день — лёгкое движение и подвижность, а не догоняющая тренировка. День после третьей сессии недели — самый спокойный: он готовит тебя к следующей неделе, а не закрывает предыдущую.",
              en: "I keep at least one full day between two hard sessions. On that day: easy movement and mobility, not a catch-up workout. The day after the third session of the week is the quietest one — it prepares the week ahead rather than closing the one behind.",
            },
          ],
          list: [
            { ru: "День 1 — тяжёлая сессия", en: "Day 1 — hard session" },
            { ru: "День 2 — лёгкое движение, подвижность", en: "Day 2 — easy movement, mobility" },
            { ru: "День 3 — тяжёлая сессия", en: "Day 3 — hard session" },
            { ru: "День 4 — ходьба, сон в приоритете", en: "Day 4 — walking, sleep prioritised" },
            { ru: "День 5 — тяжёлая сессия", en: "Day 5 — hard session" },
            { ru: "Дни 6–7 — покой и подвижность", en: "Days 6–7 — rest and mobility" },
          ],
        },
        {
          id: "signals",
          question: {
            ru: "Как понять, что ты недовосстановился",
            en: "How to tell you have not recovered",
          },
          body: [
            {
              ru: "Я смотрю не на мышечную боль — она обманывает. Я смотрю на три вещи: разминка ощущается тяжелее обычного, привычный вес идёт медленнее, и падает желание идти в зал. Два из трёх — я снижаю нагрузку на сессию, а не пробиваю её.",
              en: "I do not look at muscle soreness — it lies. I look at three things: the warm-up feels heavier than usual, a familiar weight moves slower, and the wish to go to the gym drops. Two out of three and I lower the session rather than push through it.",
            },
            {
              ru: "Снизить нагрузку на одну сессию — это не шаг назад. Пропустить две недели из-за упрямства — шаг назад.",
              en: "Lowering one session is not a step back. Losing two weeks to stubbornness is a step back.",
            },
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// INJURY — the section that needs the most care.
// The safety callout is rendered separately and prominently, above everything.
// ---------------------------------------------------------------------------

export const injurySafety = {
  eyebrow: { ru: "Прочитайте первым", en: "Read this first" },
  title: {
    ru: "СНАЧАЛА ВРАЧ. ПОТОМ ВСЁ ОСТАЛЬНОЕ.",
    en: "A DOCTOR FIRST. EVERYTHING ELSE AFTER.",
  },
  points: [
    {
      ru: "Любую травму должен оценить врач или физиотерапевт. Без осмотра невозможно отличить растяжение от разрыва или трещины, а эта разница определяет всё, что делать дальше.",
      en: "Any injury should be assessed by a doctor or physiotherapist. Without an examination there is no way to tell a strain from a tear or a fracture, and that difference decides everything that follows.",
    },
    {
      ru: "Это мой личный опыт возвращения после травм, а не медицинская рекомендация. Я борец, а не врач.",
      en: "This is my personal experience of coming back from injuries, not medical advice. I am a wrestler, not a doctor.",
    },
    {
      ru: "Всё ниже написано как дополнение к работе со специалистом, а не как замена ей. Если врач сказал иначе — слушайте врача, а не меня.",
      en: "Everything below is written to sit alongside professional guidance, never to replace it. If your doctor says otherwise, listen to your doctor, not to me.",
    },
    {
      ru: "Резкая боль, отёк, онемение, боль ночью или отсутствие улучшения — прекратите и идите к специалисту.",
      en: "Sharp pain, swelling, numbness, pain at night, or no improvement — stop and see a professional.",
    },
  ],
};

export const injury: ReferenceSection = {
  eyebrow: { ru: "Травмы и возвращение", en: "Injury and return" },
  title: {
    ru: "КАК Я ВОЗВРАЩАЛСЯ.",
    en: "HOW I CAME BACK.",
  },
  intro: {
    ru: "За карьеру я травмировался достаточно, чтобы понять одну вещь: возвращение решает не смелость, а терпение. Здесь то, как я работал вокруг мелких травм и потянутых мышц — всегда рядом со специалистом, который меня вёл.",
    en: "Across my career I was injured often enough to learn one thing: coming back is decided by patience, not by courage. This is how I worked around minor injuries and pulled muscles — always alongside the professional who was guiding me.",
  },
  caveat: {
    ru: "Ничто здесь не относится к серьёзным травмам: разрывам, переломам, травмам головы и шеи. С ними — только к врачу.",
    en: "None of this applies to serious injuries: tears, fractures, head or neck injuries. Those go to a doctor, and nowhere else.",
  },
  groups: [
    {
      id: "principles",
      eyebrow: { ru: "01 / Принципы", en: "01 / Principles" },
      title: { ru: "Как я думаю о возвращении", en: "How I think about coming back" },
      entries: [
        {
          id: "keep-training",
          question: {
            ru: "Травмировано одно место — не тело целиком",
            en: "One area is injured, not the whole body",
          },
          body: [
            {
              ru: "Самая частая ошибка — перестать тренироваться вообще. Потянутое бедро не мешает работать над верхом, хватом и корпусом. Продолжая тренировать здоровое, ты сохраняешь форму, режим и голову — а голова в этот период страдает сильнее всего.",
              en: "The most common mistake is to stop training altogether. A pulled hamstring does not stop you working the upper body, the grip, and the trunk. By continuing to train what is healthy you keep your condition, your routine, and your head — and the head suffers most in this period.",
            },
          ],
        },
        {
          id: "pain-scale",
          question: {
            ru: "Разница между дискомфортом и болью",
            en: "The difference between discomfort and pain",
          },
          body: [
            {
              ru: "Тупое, ровное ощущение, которое не растёт по ходу подхода и уходит после — с этим я обычно продолжаю работать в меньшей амплитуде. Резкое, точечное, стреляющее — я останавливаюсь сразу, без обсуждений.",
              en: "A dull, even sensation that does not grow through the set and fades afterwards — with that I usually keep working in a smaller range. Sharp, pinpoint, shooting pain — I stop immediately, no discussion.",
            },
            {
              ru: "Боль, которая усиливается на следующий день после сессии, означает, что нагрузка была слишком большой. Это информация, а не повод для вины.",
              en: "Pain that is worse the day after a session means the load was too much. That is information, not a reason for guilt.",
            },
          ],
        },
      ],
    },
    {
      id: "auxiliary",
      eyebrow: { ru: "02 / Подсобная работа", en: "02 / Auxiliary work" },
      title: { ru: "Что я делаю вокруг слабого места", en: "What I do around the weak area" },
      entries: [
        {
          id: "hamstring",
          question: {
            ru: "Потянутая задняя поверхность бедра",
            en: "A pulled hamstring",
          },
          body: [
            {
              ru: "Когда острая фаза прошла и специалист разрешил нагружать, я начинаю с очень лёгкой работы в короткой амплитуде и постепенно её увеличиваю. Никаких резких движений и ничего взрывного, пока полная амплитуда не станет безболезненной.",
              en: "Once the acute phase has passed and the professional has cleared loading, I begin with very light work in a short range and increase it gradually. No sudden movements and nothing explosive until full range is pain-free.",
            },
          ],
          list: [
            { ru: "Изометрия: мягкое удержание без движения", en: "Isometrics: gentle holds with no movement" },
            { ru: "Ягодичный мост двумя ногами, медленно", en: "Two-leg glute bridge, slow" },
            { ru: "Румынская тяга с пустым грифом в короткой амплитуде", en: "Romanian deadlift with an empty bar, short range" },
            { ru: "Ходьба — раньше, чем бег, всегда", en: "Walking — before running, always" },
          ],
        },
        {
          id: "shoulder",
          question: {
            ru: "Плечо после борьбы",
            en: "A shoulder after wrestling",
          },
          body: [
            {
              ru: "Плечо я не бросаю, а перевожу на работу, которую оно переносит: лёгкие вращения с резиной, работа лопатки, удержания. Жимы над головой я убираю первыми и возвращаю последними.",
              en: "I do not abandon the shoulder, I move it to work it tolerates: light rotations with a band, scapular work, holds. Overhead pressing is the first thing I remove and the last thing I bring back.",
            },
          ],
          list: [
            { ru: "Внешние вращения с лёгкой резиной", en: "External rotations with a light band" },
            { ru: "Сведение и опускание лопаток", en: "Scapular retraction and depression" },
            { ru: "Тяга к поясу вместо жима над головой", en: "Rows instead of overhead pressing" },
          ],
        },
        {
          id: "back",
          question: {
            ru: "Поясница",
            en: "The lower back",
          },
          body: [
            {
              ru: "С поясницей я особенно осторожен, потому что она обманывает: сегодня терпимо, завтра не встать. Я убираю нагрузку с позвоночника и строю корпус тем, что не сжимает его сверху.",
              en: "I am especially careful with the lower back because it deceives you: bearable today, unable to stand tomorrow. I take load off the spine and build the trunk with things that do not compress it from above.",
            },
          ],
          list: [
            { ru: "Планка и боковая планка", en: "Plank and side plank" },
            { ru: "Мёртвый жук — медленно и с контролем", en: "Dead bug — slow and controlled" },
            { ru: "Прогулка фермера — корпус без сгибания", en: "Farmer's walk — trunk work without bending" },
            { ru: "Ходьба каждый день", en: "Walking every day" },
          ],
        },
      ],
    },
    {
      id: "return",
      eyebrow: { ru: "03 / Возвращение", en: "03 / The return" },
      title: { ru: "Как я захожу обратно", en: "How I ease back in" },
      entries: [
        {
          id: "progression",
          question: {
            ru: "Порядок, которого я держусь",
            en: "The order I hold to",
          },
          body: [
            {
              ru: "Сначала возвращается амплитуда без боли. Потом объём — те же движения, больше подходов. Только потом вес. И в самом конце — скорость и взрывная работа. Скорость всегда последняя, потому что именно она рвёт то, что зажило не до конца.",
              en: "Range of motion without pain comes back first. Then volume — the same movements, more sets. Only then weight. And last of all, speed and explosive work. Speed is always last, because it is what tears tissue that has not fully healed.",
            },
            {
              ru: "Если на любом шаге боль вернулась — я откатываюсь на предыдущий, а не терплю. Это стоит недели. Упрямство стоит месяцев.",
              en: "If pain returns at any step, I go back to the previous one rather than tolerate it. That costs a week. Stubbornness costs months.",
            },
          ],
        },
        {
          id: "patience",
          question: {
            ru: "Самое трудное — не тело",
            en: "The hardest part is not the body",
          },
          body: [
            {
              ru: "Тяжелее всего смотреть, как форма уходит, и знать, что ты можешь больше, чем тебе разрешено сегодня. Я проходил это несколько раз. Каждый раз, когда я торопился, я платил дважды. Каждый раз, когда терпел, возвращался целым.",
              en: "The hardest thing is watching condition slip away while knowing you can do more than you are allowed today. I have been through this several times. Every time I rushed, I paid twice. Every time I was patient, I came back whole.",
            },
          ],
        },
      ],
    },
  ],
};
