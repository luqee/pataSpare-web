import * as Yup from 'yup';

const rePhoneNumber = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/

const DealerSignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .required('Required field'),
  number: Yup.string()
    .matches(rePhoneNumber, 'Phone number is not valid')
    .required('Required field'),
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

export default DealerSignupSchema;