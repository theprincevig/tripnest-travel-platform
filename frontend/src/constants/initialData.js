// Signup and Login initial data
export const initialSignupData = {
    username: "",
    email: "",
    password: ""
}

export const initialLoginData = {
    username: "",
    password: ""
};

// Listing initial data
export const initialListingData = {
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    category: ""
};

// Profile and it's errors inital data
export const initialProfileData = {
    username: "",
    fullName: {
        firstName: "",
        lastName: "",
    },
    dob: "",
    phone: "",
    gender: "",
    address: {
        city: "",
        state: "",
        country: "",
    },
    hostProfile: {
        languages: [],
        about: "",
    }
};

export const initialProfileErrors = {
    username: "",
    fullName: {
        firstName: "",
        lastName: "",
    },
    dob: "",
    phone: "",
    gender: "",
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

// Cancellation policy for listing's reservation
export const initialCancellationData = {
    hasCancellationFee: false,
    cancellationFee: 0,
    refundAmount: 0
};
