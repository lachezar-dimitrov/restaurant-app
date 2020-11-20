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
