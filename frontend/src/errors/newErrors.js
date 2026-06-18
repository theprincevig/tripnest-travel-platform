import {
    validateEmail,
    validatePassword,
    validatePhone,
    validateUsername
} from "../lib/validators";

export const validateSignup = (formData) => {
    const errors = {
        username: "",
        email: "",
        password: ""
    };

    // Username
    if (!formData.username.trim()) {
        errors.username = "Username is required";
    } else if (!validateUsername(formData.username)) {
        errors.username =
            "Username must be 3-30 characters and can only contain letters, numbers, dots, and underscores";
    }

    // Email
    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email address";
    }

    // Password
    if (!formData.password) {
        errors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
        errors.password = "Password must be at least 8 characters long";
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

export const validateReview = (reviewData) => {
    const errors = {
        rating: "",
        comment: ""
    };

    if (
        reviewData.rating === undefined || 
        reviewData.rating === null || 
        reviewData.rating < 0.5
    ) {
        errors.rating = "Please give a rating";
    } else if (reviewData.rating > 5) {
        errors.rating = "Rating can't exceed 5";
    }

    if (!reviewData.comment || !reviewData.comment.trim()) {
        errors.comment = "Review comment is required";
    } else if (reviewData.comment.trim().length < 5) {
        errors.comment = "Review must be at least 5 characters";
    } else if (reviewData.comment.trim().length > 500) {
        errors.comment = "Reviw can't exceed 500 characters";
    }

    return errors;
};

export const validateProfile = (profileData) => {
    const errors = {
        username: "",
        fullName: {
            firstName: "",
            lastName: "",
        },
        dob: "",
        address: {
            city: "",
            state: "",
            country: "",
        },
        hostProfile: {
            languages: "",
            about: "",
        }
    };

    if (!validateUsername(profileData.username)) {
        errors.username = "Invalid username";
    }

    // First name
    if (!profileData.fullName?.firstName?.trim()) {
        errors.fullName.firstName = "First name is required";

    } else if (profileData.fullName.firstName.trim().length < 2) {
        errors.fullName.firstName = "First name must be at least 2 characters";
    }

    // (Optional) last name
    if (
        profileData.fullName?.lastName &&
        profileData.fullName.lastName.trim().length < 2
    ) {
        errors.fullName.lastName = "Last name must be at least 2 characters";
    }

    // Date of Birth
    if (!profileData.dob) {
        errors.dob = "Date of birth is required";

    } else {
        const dob = new Date(profileData.dob);
        const today = new Date();

        if (dob > today) {
            errors.dob = "Date of birth cannot be in the future";
        }

        let age = today.getFullYear() - dob.getFullYear();

        const monthDiff = today.getMonth() - dob.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
            age--;
        }

        if (age < 18) {
            errors.dob = "You must be at least 18 years old";
        }
    }

    // Address - City
    if (!profileData.address?.city?.trim()) {
        errors.address.city = "City is required";
    }

    // Address - State
    if (!profileData.address?.state?.trim()) {
        errors.address.state = "State is required";
    }

    // Address - Country
    if (!profileData.address?.country?.trim()) {
        errors.address.country = "Country is required";
    }

    // Languages (Host Profile)
    if (
        profileData.hostProfile?.languages &&
        profileData.hostProfile.languages.length > 10
    ) {
        errors.hostProfile.languages = "You can add a maximum of 10 languages";
    }

    // About
    if (
        profileData.hostProfile?.about &&
        profileData.hostProfile.about.trim().length > 500
    ) {
        errors.hostProfile.about = "About section cannot exceed 500 characters";
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
    return Object.values(errors).some((value) => {
        if (typeof value === "string") {
            return value !== "";
        }

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        if (typeof value === "object" && value !== null) {
            return hasErrors(value);
        }

        return false;
    });
};