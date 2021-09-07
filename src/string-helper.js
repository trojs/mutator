export const capitalizeWords = (string) =>
    string
        .split(/_| /)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
