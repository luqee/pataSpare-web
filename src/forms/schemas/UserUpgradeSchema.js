import * as Yup from 'yup';

const rePhoneNumber = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/

const UserUpgradeSchema = Yup.object().shape({
  number: Yup.string()
    .matches(rePhoneNumber, 'Phone number is not valid')
    .required('Required field')
});

export default UserUpgradeSchema;