export function CastBoolean(value: any): boolean {
    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'string') {
        return value === 'true';
    }

    if (typeof value === 'number') {
        return value === 1;
    }

    return false;
}

export function CastBooleanToNumber(value: any): number {
    return CastBoolean(value) ? 1 : 0;
}