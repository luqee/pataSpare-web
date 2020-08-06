import * as Yup from 'yup';

const ResetSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required field'),
    password: Yup.string()
      .min(5, 'Should contain at least five characters')
      .required('Required field'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required field'), 
});

export default ResetSchema;