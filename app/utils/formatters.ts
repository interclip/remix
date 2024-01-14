/**
 * Formats a byte value to a human readable string
 */
export const formatBytes = (bytes: number, precision = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = precision < 0 ? 0 : precision;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Formats a number to a percentage
 */
export const formatPercent = (percentage: number, precision = 2) => {
    return (percentage * 100).toFixed(precision);
};
