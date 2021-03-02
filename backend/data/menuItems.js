const menuItems = [
  {
    _id: "1",
    itemName: "Elote",
    category: "Elotes",
    price: 3.0,
    chooseSize: {
      small: 3.0,
      medium: 4.5,
      large: 6.0,
    },
  },
  {
    _id: "2",
    itemName: "Flamin' Elote with Chip Crumbs",
    category: "Elotes",
    price: 4.0,
    chooseSize: {
      small: 4.0,
      medium: 5.5,
      large: 7.0,
    },
  },
  {
    _id: "3",
    itemName: "Elo-Takis with Chip Crumbs",
    category: "Elotes",
    price: 4.0,
    chooseSize: {
      small: 4.0,
      medium: 5.5,
      large: 7.0,
    },
  },
  {
    _id: "4",
    itemName: "Mangonada",
    category: "Mangonada",
    price: 4.5,
    chooseSize: {
      12: 4.5,
      16: 5.5,
      24: 8.5,
    },
  },
  {
    _id: "5",
    itemName: "Raspado",
    category: "Raspados",
    price: 3.25,
    chooseSize: {
      small: 3.25,
      medium: 3.75,
    },
    flavor: ["Strawberry", "Bubble Gum", "Mango", "Lime"],
  },
  {
    _id: "6",
    itemName: "Ice Cream",
    category: "Ice Cream",
    price: 1.5,
    chooseSize: {
      1: 1.5,
      2: 2.0,
    },
    flavor: ["Vanilla", "Chocolate", "Strawberry", "Cookies and Cream"],
    toppings: ["peanuts", "sprinkles", "caramel"],
  },
  {
    _id: "7",
    itemName: "Chips with cheese",
    category: "Chips",
    price: 4.5,
    chooseSize: {
      medium: 4.5,
      Large: 6.5,
    },
    typeOfChips: ["Hot Cheetos", "Takis", "Doritos"],
  },
  {
    _id: "8",
    itemName: "Chicharrones",
    category: "Chips",
    price: 2.0,
  },
  {
    _id: "9",
    itemName: "Agua Fresca",
    category: "Agua Fresca",
    price: 3.0,
    chooseSize: {
      12: 3.0,
      16: 3.5,
      24: 4.5,
      32: 6.0,
    },
    flavor: [
      "Horchata",
      "Fresa ",
      "Pepino",
      "Limon",
      "Sandia",
      "Jamaica",
      "Pina",
    ],
  },
];

export default menuItems;
