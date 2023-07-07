import { createContext, useMemo, useReducer } from "react";

export type CardItemType = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

type CardStateType = {
  cart: CardItemType[];
};

const initCartState: CardStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADDT",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CardItemType;
};

const reducer = (
  state: CardStateType,
  action: ReducerAction
): CardStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("Invalid payload");
      }
      const { sku, name, price } = action.payload;
      const filteredCart: CardItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      const itemExist: CardItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      const quantity = itemExist ? itemExist.quantity + 1 : 1;
      return {
        ...state,
        cart: [...filteredCart, { sku, name, price, quantity }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("Invalid payload");
      }
      const { sku } = action.payload;
      const filteredCart: CardItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("Invalid payload");
      }
      const { sku, quantity } = action.payload;

      const itemExist: CardItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      if (!itemExist) {
        throw new Error("Item must exist in order to update quantity");
      }
      const updatedItem: CardItemType = { ...itemExist, quantity };
      const filteredCart: CardItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Invalid action type");
  }
};

const useCartContext = (initialState: CardStateType = initCartState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const REDUCER_ACTIONS = useMemo(() => REDUCER_ACTION_TYPE, []); //this does not cause re-rendering

  const totalItem: number = state.cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice: any = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(
    state.cart.reduce(
      (previousValue, cartItem) =>
        previousValue + cartItem.price * cartItem.quantity,
      0
    )
  );
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4)); //last four number
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });
  return { dispatch, REDUCER_ACTIONS, totalItem, totalPrice, cart };
};

//creating context
export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItem: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[];
};

export const CartProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};
