// @ts-check

export class FormValidator {
  /**
   * @type {{[name: string]:{
   * input: HTMLInputElement;
   * error: HTMLElement;
   * validator: (value: string) => string;
   * }}}
   */
  _fields = {};

  /**
   * @param {string[]} inputNames
   */
  constructor(inputNames) {
    for (const name of inputNames) {
      this._fields[name] = {
        input: document.querySelector(`input[name="${name}"]`),
        error: document.querySelector(`.input-error-${name}`),
        validator: () => undefined,
      };
    }
  }

  /**
   * Set validator for an input field.
   * @param {string} name
   * @param {(value: string) => string} validator
   */
  setValidator(name, validator) {
    this._fields[name].validator = validator;
  }

  /**
   * Get input value.
   * @param {string} name
   * @returns {string} value
   */
  getValue(name) {
    return this._fields[name].input.value;
  }

  /**
   * Run validation.
   * @returns {boolean} `true` if all fields are valid. `false` otherwise.
   */
  validate() {
    let result = true;
    for (const name in this._fields) {
      const errorMessage = this._fields[name].validator(
        this._fields[name].input.value
      );

      if (errorMessage) {
        this._fields[name].error.innerText = errorMessage;
        this._fields[name].error.classList.remove("hidden");
        result = false;
      } else {
        this._fields[name].error.classList.add("hidden");
      }
    }

    return result;
  }
}
