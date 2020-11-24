export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,

  ...updatedProperties,
});

export const checkValidity = (value, rules) => {
  if (!rules) return true;

  let isValid = true;

  if (rules.required) isValid = value.trim() !== '' && isValid;

  if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

  if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

  return isValid;
};

export const formConfigure = (
  placeholder,

  elementType = 'input',

  type = 'text',

  value = '',

  validation
) => {
  if (!validation || typeof validation !== 'object') {
    validation = {
      required: true,

      touched: false,
    };
  }

  return {
    elementType,

    elementConfig: {
      type,

      placeholder,
    },

    value,

    valid: false,

    validation,
  };
};
