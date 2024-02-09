import * as Yup from 'yup';

export const searchTermSchema = Yup.object().shape({
    searchTerm: Yup.string().required('The search term is required')
})	
