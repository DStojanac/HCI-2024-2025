/**
 * An array of routes that are accessible to public
 * These routes do not require authentication
 */
export const publicRoutes = ["/", "/about", "/recipes", "/blog"];

/**
 * An array of routes that are used for authentication
 *
 */
export const authRoutes = ["/login", "/signup"];

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
