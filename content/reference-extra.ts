// ---------------------------------------------------------------------------
// Supplements, sauna, myofascial release, mindset, FAQ, and progress tracking.
//
// SOURCE: this material came from Nikita directly. It is written in his voice
// and still needs his sign-off on wording before launch.
//
// Two deliberate editorial choices, both flagged in the README:
//   1. Supplement and sauna content carries a safety rule, because dosing and
//      heat/cold exposure can cause real harm. Nothing here is medical advice.
//   2. Where the popular claim overstates the science (refeeds "boosting
//      metabolism", L-carnitine for fat loss), the copy says what is actually
//      supported rather than repeating the claim.
// ---------------------------------------------------------------------------

import type { ReferenceSection } from "./reference";

// ---------------------------------------------------------------------------
// SUPPLEMENTS
// ---------------------------------------------------------------------------

export const supplementSafety = {
  eyebrow: { ru: "Прежде чем начать", en: "Before you start" },
  title: {
    ru: "ДОБАВКИ — ЭТО ПОСЛЕДНИЕ 5%.",
    en: "SUPPLEMENTS ARE THE LAST 5%.",
  },
  points: [
    {
      ru: "Сначала еда, сон и тренировки. Ни одна добавка не компенсирует их отсутствие, и продавцы добавок вам этого не скажут.",
      en: "Food, sleep, and training come first. No supplement compensates for their absence, and the people selling supplements will not tell you that.",
    },
    {
      ru: "Это то, что принимаю я. Это не назначение. Если вы принимаете лекарства, есть заболевания, вы беременны или вам меньше 18 — сначала врач или фармацевт.",
      en: "This is what I take. It is not a prescription. If you take medication, have a medical condition, are pregnant, or are under 18, speak to a doctor or pharmacist first.",
    },
    {
      ru: "Дозировки на упаковке — ориентир. Больше не значит лучше, а для некоторых добавок больше значит хуже.",
      en: "The dose on the label is the reference point. More is not better, and for some supplements more is worse.",
    },
  ],
};

export const supplements: ReferenceSection = {
  eyebrow: { ru: "Спортивное питание", en: "Sports nutrition" },
  title: {
    ru: "ЧТО Я ДЕЙСТВИТЕЛЬНО ПРИНИМАЮ.",
    en: "WHAT I ACTUALLY TAKE.",
  },
  intro: {
    ru: "Короткий список. Я не принимаю всё подряд и не советую этого делать. Здесь только то, что осталось после многих лет проб — и честно о том, где эффект заметный, а где скромный.",
    en: "A short list. I do not take everything, and I do not advise you to. This is only what survived years of trying things — and an honest account of where the effect is obvious and where it is modest.",
  },
  caveat: {
    ru: "Добавки не проходят такой же контроль, как лекарства. Покупайте у проверенных производителей. Если вы выступаете — проверяйте состав на запрещённые вещества сами.",
    en: "Supplements are not regulated like medicines. Buy from reputable manufacturers. If you compete, check the ingredients against banned substance lists yourself.",
  },
  groups: [
    {
      id: "cutting",
      eyebrow: { ru: "01 / На сушке", en: "01 / While cutting" },
      title: { ru: "Что я оставляю, когда режу вес", en: "What I keep when cutting weight" },
      entries: [
        {
          id: "carnitine",
          question: {
            ru: "L-карнитин — как и когда я его принимаю",
            en: "L-carnitine — how and when I take it",
          },
          body: [
            {
              ru: "Карнитин переносит жирные кислоты в митохондрии, где они сжигаются. Я принимаю его перед тренировкой, на пустой желудок или с углеводами — с углеводами он усваивается лучше.",
              en: "Carnitine transports fatty acids into the mitochondria, where they are burned. I take it before training, on an empty stomach or with carbohydrate — it absorbs better with carbohydrate.",
            },
            {
              ru: "Честно: исследования по карнитину для жиросжигания смешанные, и эффект в лучшем случае небольшой. Он не заменит дефицит калорий. Я использую его как небольшую добавку к работе, а не как жиросжигатель.",
              en: "Honestly: the research on carnitine for fat loss is mixed, and the effect is small at best. It will not replace a calorie deficit. I use it as a small addition to the work, not as a fat burner.",
            },
          ],
          list: [
            { ru: "Перед тренировкой, за 30–60 минут", en: "Before training, 30–60 minutes ahead" },
            { ru: "Лучше вместе с углеводами", en: "Better taken alongside carbohydrate" },
            { ru: "Не заменяет дефицит — только дополняет", en: "Does not replace a deficit — it only adds to it" },
          ],
        },
        {
          id: "omega-d3",
          question: {
            ru: "Омега-3 и витамин D3 — суставы, восстановление, иммунитет",
            en: "Omega-3 and vitamin D3 — joints, recovery, immunity",
          },
          body: [
            {
              ru: "Эти две я считаю самыми полезными в списке, и именно они меньше всего похожи на спортпит. Омега-3 поддерживает суставы и снижает воспаление после тяжёлых недель. D3 особенно важен зимой и в северном климате, где солнца почти нет.",
              en: "These two I consider the most useful on the list, and they are the least like sports supplements. Omega-3 supports the joints and lowers inflammation after heavy weeks. D3 matters especially in winter and in northern climates, where there is almost no sun.",
            },
            {
              ru: "D3 — тот случай, где стоит сдать анализ, а не гадать. Дозировка зависит от вашего уровня, и его можно перебрать, в отличие от большинства добавок.",
              en: "D3 is the one where a blood test beats guessing. The dose depends on your level, and unlike most supplements it is possible to take too much.",
            },
          ],
          list: [
            { ru: "Омега-3 — с едой, содержащей жир", en: "Omega-3 — with a meal containing fat" },
            { ru: "D3 — с самым жирным приёмом дня", en: "D3 — with the fattiest meal of the day" },
            { ru: "D3 — по возможности после анализа крови", en: "D3 — ideally after a blood test" },
          ],
        },
        {
          id: "protein",
          question: {
            ru: "Протеин — когда курица уже не лезет",
            en: "Protein powder — when you cannot face more chicken",
          },
          body: [
            {
              ru: "Протеин — это еда, а не магия. Смысл один: закрыть дневную норму белка, когда съесть её обычной едой физически тяжело. На сушке это происходит часто — калорий мало, а белка нужно много.",
              en: "Protein powder is food, not magic. It has one purpose: to close your daily protein target when eating it as normal food is physically hard. While cutting that happens often — calories are low and protein needs to stay high.",
            },
            {
              ru: "Я использую его как один-два приёма в день, обычно после тренировки и вечером. Если норма закрывается едой — он не нужен.",
              en: "I use it as one or two servings a day, usually after training and in the evening. If food already covers the target, it is not needed.",
            },
          ],
        },
      ],
    },
    {
      id: "performance",
      eyebrow: { ru: "02 / Сила", en: "02 / Strength" },
      title: { ru: "Для силы и работоспособности", en: "For strength and performance" },
      entries: [
        {
          id: "creatine",
          question: {
            ru: "Креатин — и почему вода в мышце, а не под кожей",
            en: "Creatine — and why the water sits inside the muscle",
          },
          body: [
            {
              ru: "Главное недоразумение про креатин — что от него заливает. Креатин удерживает воду внутри мышечной клетки, а не под кожей. Отёчный вид дают подкожная вода и соль, а не креатин.",
              en: "The main misunderstanding about creatine is that it makes you puffy. Creatine holds water inside the muscle cell, not under the skin. A soft, swollen look comes from subcutaneous water and salt, not from creatine.",
            },
            {
              ru: "Клетка, наполненная водой, работает лучше: это среда для сокращения и сигнал к росту. Плюс креатин восстанавливает АТФ между подходами — поэтому растёт именно взрывная и силовая работа: последние повторы, вторые и третьи подходы.",
              en: "A cell filled with water works better: it is the environment for contraction and a signal for growth. On top of that, creatine restores ATP between sets — which is why explosive and strength work improves specifically: the last reps, the second and third sets.",
            },
            {
              ru: "Это самая изученная добавка в спорте и одна из немногих, где эффект надёжный. Я принимаю каждый день, в любое время, без загрузки. Загрузка просто ускоряет начало на несколько дней.",
              en: "It is the most researched supplement in sport and one of the few where the effect is reliable. I take it every day, at any time, with no loading phase. Loading only brings the start forward by a few days.",
            },
          ],
          list: [
            { ru: "Каждый день, включая дни отдыха", en: "Every day, including rest days" },
            { ru: "Время приёма не принципиально", en: "Timing does not matter much" },
            { ru: "Пейте достаточно воды", en: "Drink enough water" },
          ],
        },
        {
          id: "citrulline",
          question: {
            ru: "L-цитруллин — кровоток и выносливость",
            en: "L-citrulline — blood flow and endurance",
          },
          body: [
            {
              ru: "Цитруллин повышает выработку оксида азота, сосуды расширяются, к работающей мышце приходит больше крови. На практике это ощущается как более выраженный пампинг и чуть больше повторов в конце подхода.",
              en: "Citrulline raises nitric oxide production, the vessels widen, and more blood reaches the working muscle. In practice it feels like a stronger pump and a couple more reps at the end of a set.",
            },
            {
              ru: "Принимаю перед тренировкой, за 40–60 минут. Эффект скромнее, чем у креатина, но он есть — особенно в объёмной работе.",
              en: "I take it 40–60 minutes before training. The effect is more modest than creatine, but it is real — especially in higher-volume work.",
            },
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// SAUNA
// ---------------------------------------------------------------------------

export const saunaSafety = {
  eyebrow: { ru: "Безопасность", en: "Safety" },
  title: {
    ru: "БАНЯ — СЕРЬЁЗНАЯ НАГРУЗКА НА СЕРДЦЕ.",
    en: "THE SAUNA IS A REAL LOAD ON THE HEART.",
  },
  points: [
    {
      ru: "При заболеваниях сердца, высоком или низком давлении, беременности — только после разрешения врача.",
      en: "With a heart condition, high or low blood pressure, or during pregnancy — only with a doctor's clearance.",
    },
    {
      ru: "Никогда после алкоголя и никогда в одиночку. Это правило не обсуждается.",
      en: "Never after alcohol, and never alone. That rule is not negotiable.",
    },
    {
      ru: "Головокружение, тошнота, сердцебиение, потемнение в глазах — выходите немедленно, не досиживайте заход.",
      en: "Dizziness, nausea, a pounding heart, vision going dark — get out immediately. Do not finish the round.",
    },
    {
      ru: "Холодное погружение резко повышает нагрузку на сердце. Начинайте с прохладного душа, а не с проруби.",
      en: "Cold immersion sharply increases cardiac load. Start with a cool shower, not an ice hole.",
    },
  ],
};

export const sauna: ReferenceSection = {
  eyebrow: { ru: "Баня", en: "The sauna" },
  title: {
    ru: "КАК Я ПАРЮСЬ ПОСЛЕ ТЯЖЁЛОЙ НЕДЕЛИ.",
    en: "HOW I USE THE SAUNA AFTER A HARD WEEK.",
  },
  intro: {
    ru: "Это мой протокол — тот порядок, к которому я пришёл за годы. Он рассчитан на конец тяжёлой недели, а не на день перед соревнованиями и не на вечер после тяжёлой сессии.",
    en: "This is my protocol — the order I arrived at over the years. It is meant for the end of a hard week, not for the day before a competition and not the same evening as a heavy session.",
  },
  caveat: {
    ru: "Баня — это восстановление, а не соревнование на терпение. Тот, кто сидит дольше всех, не выигрывает ничего.",
    en: "The sauna is recovery, not a contest of endurance. The person who stays in longest wins nothing.",
  },
  groups: [
    {
      id: "protocol",
      eyebrow: { ru: "01 / Протокол", en: "01 / The protocol" },
      title: { ru: "По заходам", en: "Round by round" },
      entries: [
        {
          id: "round-1",
          question: {
            ru: "Заход 1 — прогрев, без веника",
            en: "Round 1 — warming up, no birch branches",
          },
          body: [
            {
              ru: "Первый заход короткий и спокойный. Задача — прогреть тело и запустить потоотделение, а не терпеть. Веник здесь не нужен: по холодной мышце он бесполезен и неприятен.",
              en: "The first round is short and calm. The job is to warm the body and start sweating, not to endure. Branches are not needed here: on cold muscle they are useless and unpleasant.",
            },
            {
              ru: "Выхожу, когда пот пошёл ровно по всему телу. Обычно этого достаточно.",
              en: "I come out once sweat is running evenly over the whole body. That is usually enough.",
            },
          ],
        },
        {
          id: "round-2",
          question: {
            ru: "Заход 2 — мягкий прогрев ног и спины",
            en: "Round 2 — gentle heat for the legs and back",
          },
          body: [
            {
              ru: "Второй заход адресный: ноги и спина — то, что забирает основную нагрузку в борьбе и силовой работе. Здесь я работаю мягко, прогревая эти зоны, без жёсткого пара.",
              en: "The second round is targeted: legs and back — the areas that take the main load in wrestling and lifting. Here I work gently, warming those zones, without harsh steam.",
            },
          ],
        },
        {
          id: "contrast",
          question: {
            ru: "Контраст — холодная вода",
            en: "Contrast — the cold",
          },
          body: [
            {
              ru: "После прогрева — холод. Купель или холодный душ. Сосуды сужаются, потом снова расширяются в следующем заходе, и этот насос прогоняет кровь через ткань.",
              en: "After the heat comes cold. A plunge or a cold shower. The vessels constrict, then widen again in the next round, and that pump pushes blood through the tissue.",
            },
            {
              ru: "Коротко. Несколько секунд до полуминуты. Задача — контраст, а не переохлаждение. Если начинает трясти — вы передержали.",
              en: "Keep it short. A few seconds up to half a minute. The point is the contrast, not getting cold. If you start shivering, you stayed too long.",
            },
          ],
        },
        {
          id: "round-3",
          question: {
            ru: "Заход 3 — полноценно, с веником",
            en: "Round 3 — the full round, with branches",
          },
          body: [
            {
              ru: "Только теперь — веник. Тело прогрето, мышца мягкая, и работа веником делает то, ради чего всё затевалось: разгоняет кровь и снимает зажатость.",
              en: "Only now do the branches come out. The body is warm, the muscle is soft, and the branch work does what the whole thing was for: it moves blood and releases tightness.",
            },
            {
              ru: "Это самый длинный заход, но по-прежнему не соревнование. Вышли — отдохнули лёжа столько же, сколько парились.",
              en: "This is the longest round, and still not a contest. Once you are out, rest lying down for as long as you were in.",
            },
          ],
        },
      ],
    },
    {
      id: "after",
      eyebrow: { ru: "02 / После", en: "02 / Afterwards" },
      title: { ru: "Питьё и восстановление жидкости", en: "Drinking and rehydration" },
      entries: [
        {
          id: "tea",
          question: {
            ru: "Что я пью после бани",
            en: "What I drink after the sauna",
          },
          body: [
            {
              ru: "Травяной чай — мята, ромашка, чабрец, шиповник. Тёплое питьё после бани переносится легче, чем ледяное, и не бьёт по и без того нагруженному сердцу.",
              en: "Herbal tea — mint, chamomile, thyme, rosehip. A warm drink after the sauna sits better than an ice-cold one, and it does not hit an already loaded heart.",
            },
            {
              ru: "Никакого алкоголя. Пиво после бани — самая распространённая и самая опасная привычка: обезвоживание плюс нагрузка на сердце.",
              en: "No alcohol. Beer after the sauna is the most common and the most dangerous habit: dehydration on top of cardiac load.",
            },
          ],
        },
        {
          id: "water",
          question: {
            ru: "Сколько воды",
            en: "How much water",
          },
          body: [
            {
              ru: "В бане уходит много воды и соли. Я пью в течение всего вечера, а не литр залпом, и обязательно ем солёное после — иначе вода просто не удержится.",
              en: "You lose a lot of water and salt in the sauna. I drink through the whole evening rather than a litre at once, and I always eat something salty afterwards — otherwise the water simply is not retained.",
            },
          ],
        },
      ],
    },
  ],
};

export const myofascial: ReferenceSection = {
  eyebrow: { ru: "Миофасциальный релиз", en: "Myofascial release" },
  title: {
    ru: "РОЛЛ И МЯЧ ДОМА.",
    en: "THE ROLLER AND THE BALL AT HOME.",
  },
  intro: {
    ru: "Часто это снимает зажатость лучше, чем растяжка. Растяжка тянет мышцу целиком; ролл и мяч работают точечно по конкретному плотному участку, который и создаёт ощущение забитости.",
    en: "This often releases tension better than stretching alone. Stretching pulls the whole muscle; the roller and the ball work on the specific dense spot that is actually creating the tight feeling.",
  },
  caveat: {
    ru: "Работайте по мышце, а не по костям и суставам. Поясницу роллом не катают. Боль должна быть терпимой — если вы задерживаете дыхание, давление слишком сильное.",
    en: "Work on muscle, not on bone or joints. Do not roll the lower back. The discomfort should be tolerable — if you are holding your breath, the pressure is too high.",
  },
  groups: [
    {
      id: "areas",
      eyebrow: { ru: "01 / По зонам", en: "01 / By area" },
      title: { ru: "Ноги, спина, грудь", en: "Legs, back, chest" },
      entries: [
        {
          id: "legs",
          question: { ru: "Ноги — ролл", en: "Legs — foam roller" },
          body: [
            {
              ru: "Квадрицепс, задняя поверхность, икры и наружная поверхность бедра. Катаю медленно, и когда нахожу плотную точку — останавливаюсь на ней и дышу, пока не отпустит. Быстрое катание туда-сюда почти ничего не даёт.",
              en: "Quads, hamstrings, calves, and the outside of the thigh. I roll slowly, and when I find a dense spot I stop on it and breathe until it lets go. Rolling quickly back and forth achieves almost nothing.",
            },
          ],
          list: [
            { ru: "30–60 секунд на зону", en: "30–60 seconds per area" },
            { ru: "Останавливаться на плотных точках", en: "Pause on the dense spots" },
            { ru: "Дышать, а не терпеть", en: "Breathe rather than brace" },
          ],
        },
        {
          id: "back",
          question: {
            ru: "Спина — ролл и мяч у стены",
            en: "Back — roller, and a ball against the wall",
          },
          body: [
            {
              ru: "Грудной отдел катаю роллом поперёк, поясницу — никогда. Для точечной работы между лопаткой и позвоночником использую теннисный мяч у стены: прижал, нашёл точку, стоишь и дышишь.",
              en: "I roll the upper back across the roller; the lower back, never. For precise work between the shoulder blade and the spine I use a tennis ball against the wall: press in, find the spot, stand there and breathe.",
            },
          ],
        },
        {
          id: "chest",
          question: { ru: "Грудь — теннисный мяч", en: "Chest — tennis ball" },
          body: [
            {
              ru: "Грудные забиваются от жимов и от борьбы, и именно они тянут плечи вперёд. Мяч в угол стены, найти точку под ключицей ближе к плечу, немного двигать рукой. Это заметно помогает и плечу, и осанке.",
              en: "The chest tightens from pressing and from wrestling, and it is what pulls the shoulders forward. Ball into the corner of a wall, find the spot below the collarbone towards the shoulder, and move the arm a little. It noticeably helps both the shoulder and posture.",
            },
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// MINDSET
// ---------------------------------------------------------------------------

export const mindset: ReferenceSection = {
  eyebrow: { ru: "Психология и дисциплина", en: "Psychology and discipline" },
  title: {
    ru: "ПОБЕЖДАЕТ ТОТ, КТО НЕ БРОСИЛ.",
    en: "THE ONE WHO DID NOT QUIT WINS.",
  },
  intro: {
    ru: "Люди не худеют не потому, что у них плохая программа. Они не худеют потому, что бросают. Всё, что здесь написано, — про то, как не бросить.",
    en: "People do not fail because they have a bad programme. They fail because they quit. Everything here is about not quitting.",
  },
  caveat: {
    ru: "Если еда стала источником постоянной тревоги, вины или потери контроля — это не вопрос дисциплины. Это повод обратиться к специалисту, и в этом нет ничего стыдного.",
    en: "If food has become a source of constant anxiety, guilt, or loss of control, that is not a discipline problem. It is a reason to speak to a professional, and there is nothing shameful in it.",
  },
  groups: [
    {
      id: "fighter",
      eyebrow: { ru: "01 / Мышление бойца", en: "01 / The fighter's mindset" },
      title: { ru: "Как я себя поднимаю", en: "How I get myself moving" },
      entries: [
        {
          id: "rain",
          question: {
            ru: "На улице дождь, а ты устал и не хочешь",
            en: "It is raining, you are tired, and you do not want to",
          },
          body: [
            {
              ru: "Я не жду желания. Желание — гость, оно приходит когда хочет. Я держусь за расписание: сегодня вторник, значит сегодня тренировка. Обсуждать нечего, и от этого становится легче, а не тяжелее.",
              en: "I do not wait for the wish to train. The wish is a guest; it arrives when it feels like it. I hold on to the schedule: today is Tuesday, so today I train. There is nothing to debate, and that makes it easier, not harder.",
            },
            {
              ru: "Второй приём — уменьшить вход. Не тяжёлая тренировка, а просто доехать и размяться. Почти всегда после разминки вопрос снимается сам.",
              en: "The second trick is to shrink the entry. Not a hard session, just get there and warm up. Almost always, after the warm-up the question answers itself.",
            },
          ],
        },
        {
          id: "ritual",
          question: {
            ru: "Мой ритуал перед выходом на ковёр",
            en: "My routine before stepping onto the mat",
          },
          body: [
            {
              ru: "Одно и то же, всегда, в одном порядке: та же разминка, та же последовательность, те же несколько минут молчания перед выходом. Это не суеверие. Повторяющееся действие успокаивает голову, когда обстановка незнакомая.",
              en: "The same thing, always, in the same order: the same warm-up, the same sequence, the same few minutes of silence before going out. It is not superstition. A repeated action settles the head when the surroundings are unfamiliar.",
            },
            {
              ru: "Я не накручиваю себя и не слушаю агрессивную музыку. Я стараюсь выйти спокойным. Злость даёт тридцать секунд, а схватка длится дольше.",
              en: "I do not hype myself up or listen to aggressive music. I try to walk out calm. Anger gives you thirty seconds, and the match lasts longer than that.",
            },
          ],
        },
      ],
    },
    {
      id: "binge",
      eyebrow: { ru: "02 / Срывы", en: "02 / Slips" },
      title: { ru: "Если сорвался на сладкое", en: "If you binge on sweets" },
      entries: [
        {
          id: "no-blame",
          question: {
            ru: "Первое: не вините себя",
            en: "First: do not blame yourself",
          },
          body: [
            {
              ru: "Один вечер не отменяет неделю работы. Математика не на стороне паники: съеденное за вечер не перечёркивает дефицит за шесть дней.",
              en: "One evening does not undo a week of work. The arithmetic is not on the side of panic: one evening does not cancel six days of a deficit.",
            },
            {
              ru: "Вина — самая опасная часть срыва. Не сам торт, а то, что человек делает после него.",
              en: "Guilt is the dangerous part of the binge. Not the cake itself, but what a person does afterwards.",
            },
          ],
        },
        {
          id: "no-starving",
          question: {
            ru: "Второе: не голодайте на следующий день",
            en: "Second: do not starve yourself the next day",
          },
          body: [
            {
              ru: "Это главная ошибка. Урезав еду назавтра в наказание, вы приходите к вечеру голодным — и срываетесь снова. Так запускается цикл, который тянется месяцами.",
              en: "This is the main mistake. Cutting food the next day as punishment leaves you starving by evening — and you binge again. That is how a cycle starts that can run for months.",
            },
          ],
        },
        {
          id: "continue",
          question: {
            ru: "Третье: продолжайте, как будто ничего не было",
            en: "Third: continue as if nothing happened",
          },
          body: [
            {
              ru: "Следующий приём пищи — обычный, по плану. Не компенсация, не отработка в зале, не наказание. Просто следующий приём.",
              en: "The next meal is a normal one, as planned. Not a compensation, not a punishment session in the gym. Just the next meal.",
            },
            {
              ru: "Люди, у которых получается, — не те, кто никогда не срывается. Это те, кто возвращается на следующий же приём пищи.",
              en: "The people who succeed are not the ones who never slip. They are the ones who return at the very next meal.",
            },
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faq: ReferenceSection = {
  eyebrow: { ru: "Частые вопросы", en: "Common questions" },
  title: {
    ru: "ТО, О ЧЁМ СПРАШИВАЮТ ЧАЩЕ ВСЕГО.",
    en: "THE QUESTIONS I GET MOST.",
  },
  intro: {
    ru: "Собрано из реальных вопросов. Если ответа здесь нет — напишите, и он тут появится.",
    en: "Collected from questions people actually ask. If the answer is not here, write to me and it will be.",
  },
  caveat: {
    ru: "Это общие ориентиры, а не индивидуальная рекомендация. При заболеваниях, травмах или назначенном лечении — сначала врач.",
    en: "These are general reference points, not individual advice. With a medical condition, an injury, or prescribed treatment, see a doctor first.",
  },
  groups: [
    {
      id: "body",
      eyebrow: { ru: "01 / Тело", en: "01 / The body" },
      title: { ru: "Боль, вес, болезнь", en: "Soreness, weight, illness" },
      entries: [
        {
          id: "sore",
          question: {
            ru: "После тренировки болит так, что не могу двигаться",
            en: "I am so sore after training that I can barely move",
          },
          body: [
            {
              ru: "Худшее, что можно сделать — лечь на диван на весь день. Без движения ткань не получает крови, и на следующий день будет хуже, а не лучше.",
              en: "The worst thing you can do is lie on the sofa all day. Without movement the tissue gets no blood flow, and the next day is worse, not better.",
            },
          ],
          list: [
            { ru: "Лёгкая прогулка — 20–30 минут", en: "An easy walk — 20–30 minutes" },
            { ru: "Тёплая ванна или баня", en: "A warm bath or the sauna" },
            { ru: "Мягкая растяжка, без усилия", en: "Gentle stretching, without forcing" },
          ],
        },
        {
          id: "scale",
          question: {
            ru: "Вес не меняется уже четыре дня",
            en: "My weight has not changed in four days",
          },
          body: [
            {
              ru: "Почти всегда это вода. Вес тела меняется от соли, углеводов, стресса, сна и цикла — и эти колебания легко перекрывают жир, который вы теряете за несколько дней.",
              en: "Almost always this is water. Bodyweight moves with salt, carbohydrate, stress, sleep, and your cycle — and those swings easily mask the fat you are losing over a few days.",
            },
            {
              ru: "Оставайтесь в дефиците и не дёргайтесь. Жир уходит, просто весы этого пока не показывают. Смотрите на среднее за неделю, а не на утро вторника.",
              en: "Stay in the deficit and do not panic. Fat is still going; the scale simply is not showing it yet. Look at the weekly average, not at Tuesday morning.",
            },
          ],
        },
        {
          id: "cold",
          question: {
            ru: "Можно тренироваться, если немного простыл?",
            en: "Can I train with a slight cold?",
          },
          body: [
            {
              ru: "Без температуры лёгкая тренировка обычно допустима — уменьшите объём и интенсивность, никакой работы до отказа.",
              en: "Without a fever, a light session is usually fine — reduce the volume and the intensity, and do nothing to failure.",
            },
            {
              ru: "С температурой — полный отдых, без обсуждений. Также отдыхайте, если симптомы ниже шеи: кашель в груди, одышка, ломота. Если сомневаетесь — пропустите день. Один день ничего не стоит.",
              en: "With a fever, rest completely, no discussion. Also rest if symptoms are below the neck: a chesty cough, breathlessness, body aches. If in doubt, skip the day. One day costs nothing.",
            },
          ],
        },
      ],
    },
    {
      id: "food",
      eyebrow: { ru: "02 / Еда", en: "02 / Food" },
      title: { ru: "Рестораны, рефиды, вода и соль", en: "Restaurants, refeeds, water and salt" },
      entries: [
        {
          id: "eating-out",
          question: {
            ru: "Что заказать в кафе или в фастфуде на сушке",
            en: "What to order at a restaurant or fast food while cutting",
          },
          body: [
            {
              ru: "Правило простое: ищите мясо, приготовленное на огне, и овощи, и убирайте соусы на майонезе. Соус часто добавляет больше калорий, чем само мясо.",
              en: "The rule is simple: look for meat cooked over fire, plus vegetables, and remove mayonnaise-based sauces. The sauce often adds more calories than the meat itself.",
            },
          ],
          list: [
            { ru: "Шашлык из курицы с овощами на гриле", en: "Grilled chicken skewers with grilled vegetables" },
            { ru: "Шаурма на тарелке, без майонезных соусов", en: "Shawarma on a plate, without mayonnaise-based sauces" },
            { ru: "Мясо на гриле плюс салат без заправки", en: "Grilled meat plus salad with no dressing" },
            { ru: "Просите соус отдельно — почти везде так делают", en: "Ask for sauce on the side — almost everywhere will do it" },
          ],
        },
        {
          id: "refeed",
          question: {
            ru: "Рефиды — зачем углеводы раз в пару недель",
            en: "Refeeds — why a higher-carb meal every couple of weeks",
          },
          body: [
            {
              ru: "Раз в одну-две недели я делаю приём с большим количеством углеводов: паста, рис, картофель. Пополняется гликоген, и следующие тренировки идут заметно лучше — это самая надёжная часть эффекта.",
              en: "Every week or two I have a meal with plenty of carbohydrate: pasta, rice, potatoes. Glycogen is topped up and the next sessions go noticeably better — that is the most reliable part of the effect.",
            },
            {
              ru: "Про гормоны честно: длительный дефицит снижает лептин — гормон, связанный с сытостью и энергетическим балансом, — и рефид может временно его поднять. Но это временно. Рефид не разгоняет обмен веществ навсегда, что бы ни писали в интернете.",
              en: "On hormones, honestly: a long deficit lowers leptin — a hormone tied to satiety and energy balance — and a refeed can raise it temporarily. But it is temporary. A refeed does not permanently speed up your metabolism, whatever the internet says.",
            },
            {
              ru: "Для меня главная польза психологическая: запланированный приём любимой еды сильно снижает шанс сорваться незапланированно.",
              en: "For me the main benefit is psychological: a planned meal of food you love massively lowers the chance of an unplanned binge.",
            },
          ],
        },
        {
          id: "salt-water",
          question: {
            ru: "Вода и соль — почему соль нельзя убирать",
            en: "Water and salt — why you should not cut salt out",
          },
          body: [
            {
              ru: "Полностью убирать соль на сушке — распространённая и вредная ошибка. Натрий нужен для работы мышц и нервов. Без него приходят судороги, слабость, головокружение и падение силы на тренировке.",
              en: "Cutting salt out completely while dieting is a common and harmful mistake. Sodium is needed for muscle and nerve function. Without it come cramps, weakness, dizziness, and a drop in strength in training.",
            },
            {
              ru: "Соль задерживает воду — да, и на весах это видно. Но это вода, а не жир. Убирая соль, вы получаете красивую цифру и плохую тренировку.",
              en: "Salt holds water — yes, and you see it on the scale. But that is water, not fat. Cut the salt and you get a nicer number and a worse session.",
            },
            {
              ru: "По воде: я держу ровное потребление в течение дня. На тренировке около двух часов пью регулярно небольшими порциями, а не всё в конце, и в жару добавляю электролиты.",
              en: "On water: I keep intake even through the day. In a session of around two hours I drink small amounts regularly rather than everything at the end, and in heat I add electrolytes.",
            },
          ],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// PROGRESS TRACKING
// ---------------------------------------------------------------------------

export const tracking: ReferenceSection = {
  eyebrow: { ru: "Отслеживание прогресса", en: "Tracking progress" },
  title: {
    ru: "ВЕСЫ — НЕ ЕДИНСТВЕННЫЙ СУДЬЯ.",
    en: "THE SCALE IS NOT THE ONLY JUDGE.",
  },
  intro: {
    ru: "Самая частая причина, по которой люди бросают на третьей неделе: вес стоит, и кажется, что ничего не работает. Обычно работает — просто вы измеряете не то.",
    en: "The most common reason people quit in week three: the weight is not moving and it feels like nothing is working. Usually it is working — you are simply measuring the wrong thing.",
  },
  caveat: {
    ru: "Если измерения становятся навязчивыми или портят настроение каждый день — измеряйтесь реже. Инструмент должен служить вам, а не наоборот.",
    en: "If measuring becomes compulsive or ruins your mood daily, measure less often. The tool should serve you, not the other way around.",
  },
  groups: [
    {
      id: "measure",
      eyebrow: { ru: "01 / Замеры", en: "01 / Measurements" },
      title: { ru: "Сантиметр честнее весов", en: "The tape is more honest than the scale" },
      entries: [
        {
          id: "recomp",
          question: {
            ru: "Почему вес стоит, а вы худеете",
            en: "Why the weight holds while you are getting leaner",
          },
          body: [
            {
              ru: "На сушке одновременно происходят две вещи: уходит жир и — особенно у новичков — прибавляется мышца. На весах они компенсируют друг друга, и цифра не двигается.",
              en: "While cutting, two things happen at once: fat comes off and — especially for beginners — muscle is added. On the scale they cancel each other out and the number does not move.",
            },
            {
              ru: "Тело при этом меняется заметно. Именно поэтому я смотрю на сантиметр и на то, как сидит одежда, а не только на весы.",
              en: "Meanwhile the body changes visibly. That is exactly why I look at the tape and at how clothes fit, not only at the scale.",
            },
          ],
        },
        {
          id: "how",
          question: {
            ru: "Что и как измерять — раз в неделю",
            en: "What to measure, and how — once a week",
          },
          body: [
            {
              ru: "Раз в неделю, в один и тот же день, утром, до еды. Чаще не нужно: недельные колебания собьют вас с толку.",
              en: "Once a week, on the same day, in the morning, before eating. More often is not useful: week-to-week noise will only confuse you.",
            },
          ],
          list: [
            { ru: "Талия — на уровне пупка", en: "Waist — at the navel" },
            { ru: "Бёдра — по самой широкой точке", en: "Hips — at the widest point" },
            { ru: "Грудь", en: "Chest" },
            { ru: "Бицепс — всегда одинаково: или в напряжении, или расслабленно", en: "Biceps — always the same way: either flexed or relaxed" },
          ],
        },
      ],
    },
    {
      id: "activity",
      eyebrow: { ru: "02 / Активность", en: "02 / Daily activity" },
      title: { ru: "Шаги решают больше, чем кажется", en: "Steps decide more than you would think" },
      entries: [
        {
          id: "steps",
          question: {
            ru: "Цель — около 10 000 шагов в день",
            en: "The target — around 10,000 steps a day",
          },
          body: [
            {
              ru: "Три тренировки в неделю — это примерно три часа. Остальные сто шестьдесят пять часов решают не меньше. Если всю неделю вы сидите, даже отличная программа даёт заметно меньше.",
              en: "Three sessions a week is about three hours. The other one hundred and sixty-five hours matter just as much. If you sit all week, even an excellent programme delivers noticeably less.",
            },
            {
              ru: "Ходьба не мешает восстановлению, в отличие от лишнего кардио, и её легко добавить: выйти на остановку раньше, лестница вместо лифта, прогулка после ужина.",
              en: "Walking does not interfere with recovery the way extra cardio does, and it is easy to add: get off a stop early, stairs instead of the lift, a walk after dinner.",
            },
          ],
        },
      ],
    },
  ],
};
