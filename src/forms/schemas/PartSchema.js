import * as Yup from 'yup';

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
const PartSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    price: Yup.number()
      .positive('Must be postive')
      .required('Required field'),
    stock: Yup.number()
      .integer('Must be an integer')
      .positive('Must be postive')
      .required('Required field'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .required('Required field'),
    part_number: Yup.string()
      .min(3, 'Too Short!')
      .nullable(),
    brand: Yup.object()
        .nullable()
        .shape({
          value: Yup.number(),
          label: Yup.string()
        })
        .required('Required field'),
    models: Yup.array()
        .of(Yup.object().shape({
            value: Yup.number(),
            label: Yup.string()
        }))
      .nullable(),
    years: Yup.array()
        .nullable(),
    tags: Yup.array()
        .nullable()
        .required('Required'),
    partImage: Yup.mixed()
      .test('fileFormat', 'Unsupported file format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
    //   .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
      .required('Required field'),
  });

export default PartSchema;