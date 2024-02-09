import * as Yup from 'yup';
import { OPTIONS_STATUS } from '@/constants/projectStatus.js';

export const projectSchema = Yup.object().shape({
    projectName: Yup.string().required('The name of project is required'),
    clientName: Yup.string().required('The name of client is required'),
    status: Yup.string()
        .required()
        .oneOf(OPTIONS_STATUS.map(option => option.value), 'Please select a valid status from the list'),
    progress: Yup.number().required('The progress is required')
        .integer('The progress must be an integer number')
        .min(0, 'The progress cannot be less than 0')
        .max(100, 'The progress cannot be more than 100'),
})	
