import { Question } from "@/types";

export const interpretation = [
  { range: "0", description: "Отсутствует" },
  { range: "1 - 4", description: "Легкая" },
  { range: "5 - 7", description: "Средняя" },
  { range: "8 - 10", description: "Тяжелая" },
  { range: "11 - 13", description: "Очень тяжелая" },
  { range: ">=14", description: "Чрезвычайно тяжелая" },
];

export const getInterpretation = (score: number) => {
  if (score === 0) return interpretation[0].description;
  if (score <= 4) return interpretation[1].description;
  if (score <= 7) return interpretation[2].description;
  if (score <= 10) return interpretation[3].description;
  if (score <= 13) return interpretation[4].description;
  return interpretation[5].description;
};

export const questions: Question[] = [
  {
    id: 1,
    text: "Боль или дискомфорт в течение ночи",
    options: [
      { label: "Нет", value: 0 },
      { label: "При движении или в некоторых позах", value: 1 },
      { label: "Без движения", value: 2 },
    ],
  },
  {
    id: 2,
    text: "Продолжительность утренней скованности или боли после подъема",
    options: [
      { label: "Нет", value: 0 },
      { label: "< 15 минут", value: 1 },
      { label: ">= 15 минут", value: 2 },
    ],
  },
  {
    id: 3,
    text: "Усиление боли в положении стоя в течение 30 минут",
    options: [
      { label: "Нет", value: 0 },
      { label: "Да", value: 1 },
    ],
  },
  {
    id: 4,
    text: "Боль при ходьбе",
    options: [
      { label: "Нет", value: 0 },
      { label: "При прохождении определённого расстояния", value: 1 },
      { label: "В начале движения", value: 2 },
    ],
  },
  {
    id: 5,
    text: "Боль в положении сидя после 2 часов",
    options: [
      { label: "Нет", value: 0 },
      { label: "Да", value: 1 },
    ],
  },
  {
    id: 6,
    text: "Ограничение дистанции ходьбы",
    options: [
      { label: "Нет", value: 0 },
      { label: "Больше 1 км, но с трудом", value: 1 },
      { label: "Около 1 км (около 15 минут)", value: 2 },
      { label: "Около 500 - 900 метров (8 - 15 минут)", value: 3 },
      { label: "300 - 500 метров", value: 4 },
      { label: "100 - 300 метров", value: 5 },
      { label: "Меньше 100 метров", value: 6 },
    ],
  },
  {
    id: 7,
    text: "Потребность во вспомогательных средствах",
    options: [
      { label: "Нет", value: 0 },
      { label: "1 трость или костыль", value: 1 },
      { label: "2 трости или костыля", value: 2 },
    ],
  },
  {
    id: 8,
    text: "Возможность подъема на один лестничный пролет вверх (для тазобедренного сустава)",
    options: [
      { label: "Легко", value: 0 },
      { label: "С некоторыми трудностями", value: 0.5 },
      { label: "С умеренным трудом", value: 1 },
      { label: "С выраженным трудом", value: 1.5 },
      { label: "Нет", value: 2 },
    ],
  },
  {
    id: 9,
    text: "Возможность спуска на один лестничный пролет вниз (для тазобедренного сустава)",
    options: [
      { label: "Легко", value: 0 },
      { label: "С некоторыми трудностями", value: 0.5 },
      { label: "С умеренным трудом", value: 1 },
      { label: "С выраженным трудом", value: 1.5 },
      { label: "Нет", value: 2 },
    ],
  },
  {
    id: 10,
    text: "Возможность сидения на корточках или на коленях (для тазобедренного сустава)",
    options: [
      { label: "Легко", value: 0 },
      { label: "С некоторыми трудностями", value: 0.5 },
      { label: "С умеренным трудом", value: 1 },
      { label: "С выраженным трудом", value: 1.5 },
      { label: "Нет", value: 2 },
    ],
  },
  {
    id: 11,
    text: "Ходьба по пересеченной местности (для тазобедренного сустава)",
    options: [
      { label: "Легко", value: 0 },
      { label: "С некоторыми трудностями", value: 0.5 },
      { label: "С умеренным трудом", value: 1 },
      { label: "С выраженным трудом", value: 1.5 },
      { label: "Нет", value: 2 },
    ],
  },
  {
    id: 12,
    text: "Возможность подъема на один лестничный пролет вверх (для коленного сустава)",
    options: [
      { label: "Легко", value: 0 },
      { label: "С некоторыми трудностями", value: 0.5 },
      { label: "С умеренным трудом", value: 1 },
      { label: "С выраженным трудом", value: 1.5 },
      { label: "Нет", value: 2 },
    ],
  },
  {
    id: 13,
    text: "Возможность спуска на один лестничный пролет вниз (для коленного сустава)",
    options: [
      { label: "Легко", value: 0 },
      { label: "С некоторыми трудностями", value: 0.5 },
      { label: "С умеренным трудом", value: 1 },
      { label: "С выраженным трудом", value: 1.5 },
      { label: "Нет", value: 2 },
    ],
  },
  {
    id: 14,
    text: "Возможность сидения на корточках или на коленях (для коленного сустава)",
    options: [
      { label: "Легко", value: 0 },
      { label: "С некоторыми трудностями", value: 0.5 },
      { label: "С умеренным трудом", value: 1 },
      { label: "С выраженным трудом", value: 1.5 },
      { label: "Нет", value: 2 },
    ],
  },
  {
    id: 15,
    text: "Ходьба по пересеченной местности (для коленного сустава)",
    options: [
      { label: "Легко", value: 0 },
      { label: "С некоторыми трудностями", value: 0.5 },
      { label: "С умеренным трудом", value: 1 },
      { label: "С выраженным трудом", value: 1.5 },
      { label: "Нет", value: 2 },
    ],
  },
];
