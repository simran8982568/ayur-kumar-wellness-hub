// Authentication utility functions

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export const isAuthenticated = (): boolean => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = localStorage.getItem("currentUser");
  return isLoggedIn && !!currentUser;
};

export const getCurrentUser = (): User | null => {
  try {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error("Error parsing current user:", error);
    return null;
  }
};

export const setAuthenticatedUser = (user: User): void => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.dispatchEvent(new CustomEvent("authStateChanged"));
};

export const logout = (): void => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.dispatchEvent(new CustomEvent("authStateChanged"));
};

export const requireAuth = (
  callback: () => void,
  redirectPath: string = "/sign-in",
  intentData?: any
): void => {
  if (isAuthenticated()) {
    callback();
  } else {
    // Store the intended action for after login
    if (intentData) {
      sessionStorage.setItem("postLoginIntent", JSON.stringify(intentData));
    }
    
    // Redirect to sign in
    window.location.href = redirectPath;
  }
};

export const getPostLoginIntent = (): any => {
  try {
    const intent = sessionStorage.getItem("postLoginIntent");
    return intent ? JSON.parse(intent) : null;
  } catch (error) {
    console.error("Error parsing post login intent:", error);
    return null;
  }
};

export const clearPostLoginIntent = (): void => {
  sessionStorage.removeItem("postLoginIntent");
};

export const executePostLoginIntent = (): boolean => {
  const intent = getPostLoginIntent();
  if (intent) {
    clearPostLoginIntent();
    
    switch (intent.type) {
      case "buy_now":
        // Navigate to cart page with the product
        if (intent.product) {
          // Add product to cart
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          const existingItem = cart.find((item: any) => item.id === intent.product.id);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({ ...intent.product, quantity: 1 });
          }
          
          localStorage.setItem("cart", JSON.stringify(cart));
          window.dispatchEvent(new CustomEvent("cartUpdated"));
        }
        window.location.href = "/cart-page";
        return true;
        
      case "view_cart":
        window.location.href = "/cart-page";
        return true;
        
      case "shop_now":
        window.location.href = intent.targetPath || "/shop-all";
        return true;
        
      default:
        return false;
    }
  }
  return false;
};
