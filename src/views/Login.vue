<template>
    <div class="container pt-5 h-100">
        <Form @submit="login()" :validation-schema="loginSchema" v-slot="{ meta, errors }">  
            <div class="card">
                <div class="card-header">
                   Please enter your credentials
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label>User</label>
                        <Field name="username" v-model="user.username" type="text" autocomplete="off" class="form-control" :class="{ 'is-invalid': errors.username }" />
                        <div class="invalid-feedback">{{errors.username}}</div>
                    </div>
                    <div class="mb-3">
                        <label>Password</label>
                        <Field name="password" v-model="user.password"  type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{errors.password}}</div>
                    </div>

                    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="error">
                        {{error}}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" :disabled="!(meta.valid && meta.dirty)" class="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </Form>
    </div>
    
</template>

<script>
import { ref, onMounted } from 'vue';
import { mapActions } from "vuex";
import { Form, Field } from 'vee-validate';
import { post, get } from '@/axios';
import { loginSchema } from '@/yup/schema/login.js';

export default {
    components: {
        Form,
        Field
    },
    setup() {
        const show = ref(false);
        const error = ref('');
        const user = ref({
            username: '',
            password: '',
        });
        const loginSchema = loginSchema;

        const { _signIn, _verify } = mapActions('auth', ['signIn', 'verify']);

        const login = async () => {
            error.value = '';
            try {
                const response = await post('/login', user.value);
                if (!response.success) {
                error.value = response.message;
                } else {
                _signIn(response.token);
                }
            } catch (err) {
                error.value = 'Server Error.';
            }
        };

        const checkToken = async () => {
            if (localStorage.getItem('user-token')) {
                try {
                    const response = await get('/verifyToken');
                    if (response.success) {
                        _verify();
                    } else {
                        localStorage.clear();
                    }
                } catch (err) {
                    error.value = 'Server Error.';
                }
            }
        };

        onMounted(checkToken);

        return { show, error, user, loginSchema, login, checkToken };
    }
};
</script>

