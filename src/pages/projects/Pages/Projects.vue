<template>
    <div>
        <div class="container pt-5">
            <div class="card">
                <div class="card-header">
                    Search Form
                </div>
                <div class="card-body">
                    <Form @submit="searchProjects()" :validation-schema="searchTermSchema" v-slot="{ meta, errors }">  
                        <div class="row gap-2">
                            <div class="col-12 col-md-3">
                                    <Field name="searchTerm" v-model="searchTerm" type="text" autocomplete="off" class="form-control" :class="{ 'is-invalid': errors.searchTerm }" />
                                    <div class="invalid-feedback">{{errors.searchTerm}}</div>
                            </div>
                            <div class="col-12 col-md-3">                                
                                <div class="d-grid gap-2">
                                    <button type="submit" :disabled="!(meta.valid && meta.dirty)" class="btn btn-primary">Search</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div class="container pt-3" v-if="!showCreateProjectForm">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span>Project List</span>
                    <!-- Botón para mostrar u ocultar el formulario -->
                    <button @click="toggleCreateProjectForm" class="btn btn-primary">Create New Project</button>
                </div>
                <div class="card-body table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Progress</th>
                            <th scope="col">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in projectList" :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ item.project_name }}</td>
                                <td>{{ item.client_name }}</td>
                                <td>{{ item.progress }}</td>
                                <td>
                                    <div class="d-flex justify-content-start">
                                        <button class="btn btn-primary btn-sm me-2">Edit</button>
                                        <button class="btn btn-danger btn-sm" @click="confirmDelete(item, index)">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <CreateProject v-if="showCreateProjectForm" @cancel="handleCancel($event)" />
    </div>
</template>

<script>
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import { searchTermSchema } from '@/yup/schema/searchTerm.js';
import { post, del } from '@/axios';
import Swal from 'sweetalert2'
import CreateProject from '../Components/CreateProject.vue';
import useToast from '@/components/Toast.vue';

export default {
    components: {
        Form,
        Field,
        CreateProject
    },
    setup() {
        const show = ref(false);
        const error = ref('');
        const searchTerm = ref('');
        const projectList = ref([]);

        const { showToast } = useToast();

        const searchProjects = async () => {
            error.value = '';
            projectList.value = [];
            try {
                const response = await post('/projects', { searchTerm: searchTerm.value });
                projectList.value = response.projectList;
            } catch (err) {
                error.value = 'Server Error.';
            }
        };

        searchProjects();


       const confirmDelete = async (data, itemIndex) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            if (result.isConfirmed) {
                deleteProject(data, itemIndex);
            }
        };

        const deleteProject = async (data, itemIndex) => {
            try {
                const response = await del(`/projects/delete/${data.id}`);
                showToast(response.success ? "success" : "error", response.message);
                if (response.success) {
                    projectList.value.splice(itemIndex, 1);
                }
            } catch (err) {
                showToast("error", 'Error en el servidor.');
            }
        };

        const handleCancel = (param) => {
            if (param === 'updateList') {
                searchProjects();
            }
            showCreateProjectForm.value = false;
        };

        const showCreateProjectForm = ref(false);

        const toggleCreateProjectForm = () => {
            showCreateProjectForm.value = !showCreateProjectForm.value;
        };

        return { show, 
                error, 
                searchTerm, 
                projectList, 
                searchTermSchema, 
                showCreateProjectForm,
                searchProjects, 
                deleteProject, 
                confirmDelete,
                toggleCreateProjectForm,
                handleCancel
            };
    }
};
</script>
