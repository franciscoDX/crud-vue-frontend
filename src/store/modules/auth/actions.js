import router from '@/router'
export async function signIn (context, token){
    try{
        context.commit("SET_LOGGED")
        localStorage.setItem('user-token', token);
        await router.push({ name: 'home' });
    }catch (e){
        console.log(e);
    }
}

export async function logout (context){
    try{
        context.commit("LOGOUT")
        localStorage.clear();
        router.push({ name: 'login' });
    }catch (e){
        console.log(e)
    }
}

export async function verify (context){
    try{
        context.commit("SET_LOGGED")
        await router.push({ name: 'home' });
    }catch (e){
        console.log(e);
    }
}