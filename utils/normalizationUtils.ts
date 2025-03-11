const replaceValue = <T>(
    data: Partial<T>,
    targetValue: any,
    replacementValue: any
): Partial<T> => {
    const processedData: Partial<T> = {};
    for (const key in data) {
        if (data[key as keyof T] === targetValue) {
            processedData[key as keyof T] = replacementValue; // Replace target value with replacement value
        } else {
            processedData[key as keyof T] = data[key as keyof T];
        }
    }
    return processedData;
};

export const replaceNullWithEmptyString = <T>(data: Partial<T>): Partial<T> => {
    return replaceValue(data, null, "");
};

export const replaceEmptyStringWithNull = <T>(data: Partial<T>): Partial<T> => {
    return replaceValue(data, "", null);
};