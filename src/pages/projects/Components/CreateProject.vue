<template>
    <div class="container pt-3">
      <div class="card">
        <div class="card-header">
          Create Project
        </div>
        <div class="card-body">
            <Form @submit="submitForm()" :validation-schema="projectSchema" v-slot="{ meta, errors }">  
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="projectName" class="form-label">Project Name</label>
                            <Field name="projectName" v-model="formData.projectName" type="text" autocomplete="off" class="form-control" :class="{ 'is-invalid': errors.projectName }" />
                            <div class="invalid-feedback">{{errors.projectName}}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="clientName" class="form-label">Client Name</label>
                            <Field name="clientName" v-model="formData.clientName" type="text" autocomplete="off" class="form-control" :class="{ 'is-invalid': errors.clientName }" />
                            <div class="invalid-feedback">{{errors.clientName}}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="status" class="form-label">Status</label>
                            <Field name="status" v-model="formData.status" class="form-control" as="select" :class="{ 'is-invalid': errors.status }">
                                <option value="">Select value</option>
                                <option v-for="option in OPTIONS_STATUS" :key="option.value" :value="option.value">{{ option.label }}</option>
                            </Field> 
                            <div class="invalid-feedback">{{errors.status}}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="progress" class="form-label">Progress</label>
                            <Field name="progress" v-model="formData.progress" type="number" autocomplete="off" class="form-control" :class="{ 'is-invalid': errors.progress }" />
                            <div class="invalid-feedback">{{errors.progress}}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea name="description" v-model="formData.description" autocomplete="off" class="form-control" :class="{ 'is-invalid': errors.description }"></textarea>
                            <div class="invalid-feedback">{{errors.description}}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="d-flex justify-content-start">
                            <button :disabled="!(meta.valid && meta.dirty)" class="btn btn-primary btn-sm me-2">Create</button>
                            <!-- Emitiendo evento 'cancel' al hacer clic en el botón 'Cancel' -->
                            <button class="btn btn-danger btn-sm" @click="cancelForm">Cancel</button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { Form, Field } from 'vee-validate';
import { ref, defineComponent } from 'vue';
import { projectSchema } from '@/yup/schema/project.js';
import { OPTIONS_STATUS } from '@/constants/projectStatus.js';
import useToast from '@/components/Toast.vue';
import { post } from '@/axios';

export default defineComponent({
    components: {
        Form,
        Field
    },
    setup(props, context) {
        const { showToast } = useToast();

        const formData = ref({
            projectName: '',
            clientName: '',
            description: '',
            status: '',
            progress: 0,
        });

        const submitForm = async () => {
            try {
                const response = await post('/projects/add', formData.value);
                showToast(response.success ? "success" : "error", response.message);
                if (response.success) {
                    context.emit('cancel', 'updateList');
                }
            } catch (err) {
                showToast("error", 'Error en el servidor.');
            }
        };

        const cancelForm = () => {
            context.emit('cancel', 'updateList');
            formData.value = {
                projectName: '',
                clientName: '',
                description: '',
                status: '',
                progress: 0,
            };
        };  

        return {
            formData,
            OPTIONS_STATUS,
            submitForm,
            cancelForm,
            projectSchema
        };
    }
});
</script>
  