// ==============================
//   REGEX VALIDATIONS
// ==============================
const usernameRegex = /^(?![._])(?!.*[._]{2})[a-zA-Z0-9._]{3,30}(?<![._])$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

// ==============================
//   HELPER VALIDATION FUNCTIONS
// ==============================
export const validateUsername = (username) => usernameRegex.test(username);
export const validateEmail = (email) => emailRegex.test(email);
export const validatePassword = (password) => passwordRegex.test(password);