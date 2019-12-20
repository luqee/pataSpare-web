import * as Yup from 'yup';

const rePhoneNumber = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/;
// const FILE_SIZE = 16 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const ShopSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    number: Yup.string()
      .matches(rePhoneNumber, 'Phone number is not valid')
      .required('Required field'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    location: Yup.string()
      .required('Required field'),
    shopImage: Yup.mixed()
      .test('fileFormat', 'Unsupported file format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
    //   .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
      .required('Required field'),
  });

export default ShopSchema;