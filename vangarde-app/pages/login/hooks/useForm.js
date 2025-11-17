import { useState } from 'react';

// useForm: eenvoudige hook voor formulierdata
// - values: object met veldwaarden
// - errors: object met foutmeldingen per veld
// - handleChange: update values bij input-events
// - reset: zet form terug naar beginwaarden
export default function useForm(initialValues = {}, validateFn) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // optionele synchronische validatie bij elke wijziging
    if (typeof validateFn === 'function') {
      const newErrors = validateFn({ ...values, [name]: value }) || {};
      setErrors(newErrors);
    }
  };

  const reset = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
  };

  return { values, setValues, errors, setErrors, handleChange, reset };
}
