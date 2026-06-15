const allowed = [
    "Linkedin",
    "website",
    "referral",
    "event"
];


const validEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log("EMAIL:", email);
    console.log("RESULT:", regex.test(email));

    return regex.test(email);
};

const validSource = (source) => {
    return allowed.includes(
        source.toLowerCase()
    );
};

const validScore = (score) => {
    return typeof score === "number"
        &&
        score >= 0
        &&
        score <= 100;
};

module.exports = {
    validEmail,
    validScore,
    validSource
}