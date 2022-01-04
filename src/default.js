import { capitalizeWords } from './string-helper.js';

export default class DefaultMutator {
    mapper([key, value]) {
        if (value === undefined || value === null || Number.isNaN(value)) {
            return [key, undefined];
        }

        if (value.constructor === Object) {
            const mappedResult = Object.entries(value).map(
                ([subKey, subValue]) => {
                    const result = [`${key}_${subKey}`, subValue];
                    return [subKey, this.mapper(result)[1]];
                }
            );

            const filteredResult = mappedResult.filter(Boolean);

            return [key, Object.fromEntries(filteredResult)];
        }

        const fn = `set${capitalizeWords(key)}Attribute`;
        if (this?.[fn]?.constructor === Function) {
            return [key, this[fn](value)];
        }

        return [key, value];
    }

    hydrate(data) {
        const result = Object.entries(data).map(this.mapper.bind(this));
        const filteredResult = result.filter(Boolean);

        Object.assign(this, Object.fromEntries(filteredResult));
    }

    static create(data) {
        const view = new this();
        view.hydrate(data);

        return view;
    }
}
