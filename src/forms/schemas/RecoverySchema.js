import * as Yup from 'yup';

const RecoverySchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required field'), 
});

export default RecoverySchema;