// Action Types
export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const READ_PRODUCTS_REQUEST = "READ_PRODUCTS_REQUEST";
export const READ_PRODUCTS_SUCCESS = "READ_PRODUCTS_SUCCESS";
export const READ_PRODUCTS_FAILURE = "READ_PRODUCTS_FAILURE";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const CLEAR_PRODUCT_STATUS = "CLEAR_PRODUCT_STATUS";

const initialState = {
  items: [],
  loading: false,
  error: null,
  success: null,
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
    case READ_PRODUCTS_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null, success: null };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
        success: "Product created successfully!",
      };
    case READ_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        success: null,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        success: "Product updated successfully!",
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((p) => p.id !== action.payload),
        success: "Product deleted successfully!",
      };
    case CREATE_PRODUCT_FAILURE:
    case READ_PRODUCTS_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload, success: null };
    case CLEAR_PRODUCT_STATUS:
      return { ...state, success: null, error: null };
    default:
      return state;
  }
}
