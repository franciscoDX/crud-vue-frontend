import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup.string().required('The user is required'),
    password: Yup.string().required('The password is required')
})	
