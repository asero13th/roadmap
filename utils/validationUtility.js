export const validateEmail = (email) => {
    const emailRegEx = /\S+@\S+\.\S+/;
    return emailRegEx.test(email);
  };
  
  export const validatePasswordStrength = (password) => {
    return password.length >= 6;
  };
  
  export const validateUsername = (username) => {
    return username.length >= 3;
  };
  
  export const validateName = (name) => {
    return name.length >= 3;
  };
  