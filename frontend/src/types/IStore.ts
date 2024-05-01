import { IPopup } from "./IPopup";

export interface IStore {
  _hasHydrated: boolean;
  // cart: string[];
  // cartId: string | null;
  // setCardId: (cartId: string) => void;
  // removeAllFromCart: (item: string) => void;
  // addToCart: (item: string) => void;
  token?: string;
  message?: string;
  popup?: IPopup | null;

  showMessage: (message: string) => void;
  setToken: (token: string) => void;
  showPopup: (popup: IPopup) => void;
  dismissPopup: () => void;
  // getCartId: () => string;
  // // addManyToCart: (item: string, qtd: number) => void;
  // addProductCart: (item: IProductCart) => void;
  // changeQuantityProductCart: (id: string, quantity: number) => void;
}
