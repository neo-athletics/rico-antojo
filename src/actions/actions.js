export const selectItem = (item) => {
  return {
    type: "ITEM_SELECTED",
    payload: item,
  };
};
export const purchaseItem = (item, data) => {
  const { itemName } = item;
  let description;
  if (item.hasOwnProperty("chooseSize")) {
    const { chooseSize } = item;
    if (itemName === "Agua Fresca" || itemName === "Mangonada") {
      description = `${data.size} oz ${
        data.flavor ? data.flavor : ""
      } ${itemName}`;
      return {
        type: "ITEM_PURCHASED",
        payload: {
          ...data,
          itemName,
          description,
          price: chooseSize[data.size],
        },
      };
    } else if (itemName === "Ice Cream") {
      let toppings = "";
      if (data.iceCreamTopping) {
        data.iceCreamTopping.map((topping, i) => {
          if (i === data.iceCreamTopping.length - 1) {
            return (toppings += `${topping}`);
          } else {
            return (toppings += `${topping}, `);
          }
        });
        console.log(toppings);
      }
      if (data.iceCreamFlavor.length === 2) {
        description = `${data.scoops} scoop Ice Cream, ${
          data.iceCreamFlavor[0]
        } and ${data.iceCreamFlavor[1]} flavor ${
          data.iceCreamTopping ? "with " + toppings : ""
        }`;
      } else {
        description = `${data.scoops} scoop Ice Cream, ${
          data.iceCreamFlavor[0]
        } flavor ${data.iceCreamTopping ? "with " + toppings : ""}`;
      }
      return {
        type: "ITEM_PURCHASED",
        payload: {
          ...data,
          itemName,
          description,
          price: chooseSize[data.scoops],
        },
      };
    } else {
      description = `${data.size} ${data.chips ? data.chips : ""}, ${
        data.flavor ? data.flavor : ""
      } ${itemName}`;
      return {
        type: "ITEM_PURCHASED",
        payload: {
          ...data,
          itemName,
          description,
          price: chooseSize[data.size],
        },
      };
    }
  } else {
    description = `${data[itemName]} of ${itemName}`;
    return {
      type: "ITEM_PURCHASED",
      payload: { ...data, itemName, description, price: item.price },
    };
  }
};

export const updateItemQty = (updateItem, qty) => {
  return {
    type: "ITEM_UPDATED",
    payload: { ...updateItem, quantity: qty },
  };
};

export const removeItem = (item) => {
  return {
    type: "ITEM_REMOVE",
    payload: { ...item },
  };
};
