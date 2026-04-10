import {
    validateEmail,
    validatePassword,
    validateUsername
} from "../lib/validators";

export const validateSignup = (formData) => {
    const errors = {
        username: "",
        email: "",
        password: ""
    };

    if (!validateUsername(formData.username)) {
        errors.username = "Username must be at least 3 characters.";
    }

    if (!validateEmail(formData.email)) {
        errors.email = "Invalid email address.";
    }

    if (!validatePassword(formData.password)) {
        errors.password = "Password must be strong.";
    }

    return errors;
}

export const validateLogin = (formData) => {
    const errors = {
        username: "",
        password: ""
    };

    if (!validateUsername(formData.username)) {
        errors.username = "Username is required.";
    }

    if (!validatePassword(formData.password)) {
        errors.password = "Password is required.";
    }

    return errors;
}

export const hasErrors = (errors) => {
    return Object.values(errors).some(err => err);
}