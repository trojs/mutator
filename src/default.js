import { capitalizeWords } from './string-helper.js';

export default class DefaultMutator {
    setter([key, value]) {
        if (value === undefined || value === null || Number.isNaN(value)) {
            return;
        }

        if (value.constructor === Object) {
            Object.entries(value).forEach(([subKey, subValue]) => {
                const result = [`${key}_${subKey}`, subValue];
                this.setter(result);
            });
            return;
        }

        const fn = `set${capitalizeWords(key)}Attribute`;
        if (this?.[fn]?.constructor === Function) {
            this[fn](value);
            return;
        }

        this[key] = value;
    }

    hydrate(data) {
        Object.entries(data).forEach(this.setter.bind(this));
    }

    static create(data) {
        const view = new this();
        view.hydrate(data);

        return view;
    }
}
