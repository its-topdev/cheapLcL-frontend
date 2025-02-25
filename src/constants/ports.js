export const POL_OPTIONS = [
  {
    value: 28,
    label: "NINGBO",
  },
  {
    value: 24,
    label: "QINGDAO",
  },
  {
    value: 21,
    label: "SHANGHAI",
  },
  {
    value: 32,
    label: "SHEKOU",
  },
  {
    value: 22,
    label: "XINGANG",
  },
  {
    value: 19,
    label: "NHAVA SHEVA",
  },
];

export const DEFAULT_POD = {
  value: 58,
  label: "ASHDOD",
};

export const DEFAULT_WEEKS = {
  value: 4,
  label: "4 weeks",
};

export const POD_OPTIONS = [DEFAULT_POD];

export const prices = {
  28: {
    58: 60,
  },
  24: {
    58: 64,
  },
  21: {
    58: 60,
  },
  32: {
    58: 60,
  },
  22: {
    58: 62,
  },
  19: {
    58: 65,
  },
};

export const discount = 5;

export const weeklyDiscount = 3;

export const discountStartDate = new Date("2025-02-15 00:00:00");

export const discountEndDate = new Date("2025-02-28 00:00:00");
