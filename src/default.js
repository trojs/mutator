import { capitalizeFirstLetter } from './string-helper.js';

export default class DefaultMutator {
    setter([key, value]) {
        if (value === undefined || value === null || Number.isNaN(value)) {
            return;
        }

        const fn = `set${capitalizeFirstLetter(key)}Attribute`;
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
