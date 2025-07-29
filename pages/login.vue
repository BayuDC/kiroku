<script setup lang="ts">
definePageMeta({
  layout: 'empty',
});

const auth = useAuthStore();
const alert = ref({
  message: '',
  type: 'error' as 'success' | 'error',
});

const username = ref('');
const password = ref('');

async function onSubmit() {
  if (auth.loading) return;
  alert.value = { message: '', type: 'error' };

  const data = await auth.login(username.value, password.value);
  alert.value = {
    message: data.message,
    type: data.error ? 'error' : 'success',
  };
  if (!data.error) {
    navigateTo('/');
  }
}
</script>

<template>
  <Html>
    <Body class="text-blueGray-700 antialiased">
      <main>
        <section class="relative w-full h-full py-40 min-h-screen">
          <div class="absolute top-0 w-full h-full bg-blueGray-800 bg-full bg-no-repeat"></div>
          <div class="container mx-auto px-4 h-full">
            <div class="flex content-center items-center justify-center h-full">
              <div class="w-full lg:w-4/12 px-4">
                <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                >
                  <div class="rounded-t mb-0 px-6 py-6">
                    <div class="text-center mb-3">
                      <h6 class="text-blueGray-500 text-xl font-bold">Login ke Kiroku</h6>
                    </div>
                    <hr class="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                  <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form @submit.prevent="onSubmit">
                      <div class="relative w-full mb-3">
                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password"
                          >Username</label
                        ><input
                          type="text"
                          v-model="username"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Username"
                        />
                      </div>
                      <div class="relative w-full mb-3">
                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password"
                          >Password</label
                        ><input
                          type="password"
                          v-model="password"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                        />
                      </div>
                      <div class="mt-6">
                        <Alert v-if="alert.message" :message="alert.message" :type="alert.type" />
                      </div>
                      <div class="text-center mt-6">
                        <button
                          class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Body>
  </Html>
</template>

<style scoped></style>
