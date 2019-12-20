import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required field'),
    subject: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    message: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),  
});

export default ContactSchema;