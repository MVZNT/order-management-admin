import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import toastResponsive from "react-hot-toast";
import dateFormat from "dateformat";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const numberSpacer = (amount: number) => {
    // Split the number into integer and decimal parts with at most two decimal places
    const [integerPart, decimalPart] = amount.toFixed(2).split(".");

    // Format the integer part with spaces as thousands separators
    const formattedIntegerPart = parseInt(integerPart, 10).toLocaleString().replace(/,/g, " ");

    // Combine the formatted integer part with the decimal part
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};

export const customToast = (type: "SUCCESS" | "ERROR", message: string) => {
    switch (type) {
        case "SUCCESS":
            toastResponsive.success(`${message}`, {
                duration: 2000,
            });
            break;
        case "ERROR":
            toastResponsive.error(`${message}`, {
                duration: 3000,
            });
            break;
        default:
            toastResponsive("Something went wrong!");
            break;
    }
};

export const dateFormatter = (date: string) => {
    const paddedShortDate = dateFormat(date, "dd/mm/yyyy");
    const shortTime = dateFormat(date, "HH:MM");

    return `${paddedShortDate}, ${shortTime}`;
};

export const calculateRows = (text: string = ""): number => {
    const lines = text.split("\n").length; // Count the number of lines in the text
    return Math.max(2, lines); // Ensure at least 2 rows, or use the number of lines
};

export const dateFormatterPPW = (dateStr: string) => {
    if (dateStr === "00000000") {
        return ""
    }

    try {
        const dateObj: Date = new Date(dateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
        const formattedDate: string = dateObj.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
        return formattedDate;
    } catch (error) {
        return "Invalid date format. Please provide date in 'YYYYMMDD' format.";
    }
}

export const dateFormatterPPWReverse = (dateStr: string): string => {
    try {
        const dateObj: Date = new Date(dateStr);
        const year: number = dateObj.getFullYear();
        const month: string = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day: string = ('0' + dateObj.getDate()).slice(-2);
        return `${year}${month}${day}`;
    } catch (error) {
        return "Invalid date format. Please provide date in 'Month Day, Year' format.";
    }
};

export const capitalizedText = (text: string) => {
    if (text === "QC") return text
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatNumber = (num: number) => {
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
};


export const formatTime = (timeInMilliseconds: number) => {
    if (timeInMilliseconds < 1000) {
        return `${timeInMilliseconds} ms`;
    } else if (timeInMilliseconds < 60000) {
        return `${(timeInMilliseconds / 1000).toFixed(2)} seconds`;
    } else {
        const minutes = Math.floor(timeInMilliseconds / 60000);
        const seconds: any = ((timeInMilliseconds % 60000) / 1000).toFixed(0);
        return `${
            minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') : ''
        } ${seconds > 0 ? seconds + ' seconds' : ''}`;
    }
};

export const unixTimestampToFormattedDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

export const wordSlicer = (word: string) => {
    return word.length <= 65 ? word : `${word.slice(0, 65)} ...`;
};
