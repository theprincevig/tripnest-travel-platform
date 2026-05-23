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
        errors.username = "Username must be unique";
    }

    if (!validateEmail(formData.email)) {
        errors.email = "Invalid email address";
    }

    if (!validatePassword(formData.password)) {
        errors.password = "Password must be at least 8 characters";
    }

    return errors;
}

export const validateLogin = (formData) => {
    const errors = {
        username: "",
        password: ""
    };

    if (!validateUsername(formData.username)) {
        errors.username = "Username is required";
    }

    if (!validatePassword(formData.password)) {
        errors.password = "Password is required";
    }

    return errors;
}

export const validateListing = (listingData) => {
    const errors = {
        title: "",
        description: "",
        price: "",
        location: "",
        country: "",
        category: "",
        image: ""
    };

    // Title
    if (!listingData.title || listingData.title.trim().length < 3) {
        errors.title = "Title must be at least 3 characters.";
    }

    // Description (optional but better UX)
    if (!listingData.description || listingData.description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters.";
    }

    // Price
    if (listingData.price === "" || Number(listingData.price) <= 0) {
        errors.price = "Price must be greater than 0.";
    }

    // Location
    if (!listingData.location || listingData.location.trim().length < 2) {
        errors.location = "Location is required.";
    }

    // Country
    if (!listingData.country || listingData.country.trim().length < 2) {
        errors.country = "Country is required.";
    }

    // Category
    if (!listingData.category) {
        errors.category = "Please select a category.";
    }

    // Image
    if (!listingData.image) {
        errors.image = "Image is required.";
    }

    return errors;
};

export const validateChangePassword = (passwordData) => {
    const errors = {
        current: "",
        new: "",
        confirm: ""
    };

    // Current
    if (!passwordData.current.trim()) {
        errors.current = "Current password is required";
    }

    // New
    if (!passwordData.new.trim()) {
        errors.new = "New password is required";
    } else if (!validatePassword(passwordData.new)) {
        errors.new = "Password must be at least 8 characters";
    }

    // Confirm
    if (!passwordData.confirm.trim()) {
        errors.confirm = "Please confirm your password";
    } else if (passwordData.new !== passwordData.confirm) {
        errors.confirm = "Passwords doesn't match"
    }

    // Prevent same password reuse
    if (
        passwordData.current && 
        passwordData.new && 
        passwordData.current === passwordData.new
    ) {
        errors.new = "New password must be different";
    }

    return errors;
};

export const hasErrors = (errors) => {
    return Object.values(errors).some(err => err);
}