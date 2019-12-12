import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required field'),
    password: Yup.string()
      .min(5, 'Should contain at least five characters')
      .required('Required field'),
});

export default LoginSchema;