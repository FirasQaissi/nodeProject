const URL = {
  type: String,
  match: RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  ),
  trim: true,
  lowercase: true,
};

const DEFAULT_VALIDATION = {
  type: String,
  required: true,
  minLength: 2,
  maxLength: 256,
  trim: true,
  lowercase: true,
};


const _URL = URL;
export { _URL as URL };
const _DEFAULT_VALIDATION = DEFAULT_VALIDATION;
export { _DEFAULT_VALIDATION as DEFAULT_VALIDATION };