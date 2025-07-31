<script setup lang="ts">
import { NuxtLink } from '#components';

const auth = useAuthStore();

const links = {
  operationl: [
    { name: 'Peminjaman', icon: 'fa-hand-holding-heart', href: '/loans' },
    { name: 'Pemakaian', icon: 'fa-fire', href: '/usages' },
  ],
  management: [
    { name: 'Pengguna', icon: 'fa-user', href: '/users', adminOnly: true },
    { name: 'Kategori', icon: 'fa-tags', href: '/categories' },
    { name: 'Alat', icon: 'fa-hammer', href: '/tools' },
    { name: 'Barang', icon: 'fa-cube', href: '/consumables' },
  ],
};

const activeLink = ref('Home');

const title = useTitleStore();
</script>

<template>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root">
    <nav
      class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
    >
      <div
        class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
      >
        <button
          class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onclick="toggleNavbar('example-collapse-sidebar')"
        >
          <i class="fas fa-bars"></i>
        </button>
        <a
          class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          href="/"
        >
          Kiroku Invetory
        </a>
        <ul class="md:hidden items-center flex flex-wrap list-none">
          <li class="inline-block relative">
            <a
              class="text-blueGray-500 block py-1 px-3"
              href="#pablo"
              onclick="openDropdown(event,'notification-dropdown')"
              ><i class="fas fa-bell"></i
            ></a>
            <div
              class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
              id="notification-dropdown"
            >
              <a
                href="#pablo"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >Action</a
              ><a
                href="#pablo"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >Another action</a
              ><a
                href="#pablo"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >Something else here</a
              >
              <div class="h-0 my-2 border border-solid border-blueGray-100"></div>
              <a
                href="#pablo"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >Seprated link</a
              >
            </div>
          </li>
          <li class="inline-block relative">
            <div
              class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
              id="user-responsive-dropdown"
            >
              <a
                href="#pablo"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >Action</a
              ><a
                href="#pablo"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >Another action</a
              ><a
                href="#pablo"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >Something else here</a
              >
              <div class="h-0 my-2 border border-solid border-blueGray-100"></div>
              <a
                href="#pablo"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                >Seprated link</a
              >
            </div>
          </li>
        </ul>
        <div
          class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
          id="example-collapse-sidebar"
        >
          <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
            <div class="flex flex-wrap">
              <div class="w-6/12">
                <a
                  class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  href="/"
                >
                  Kiroku Invetory
                </a>
              </div>
              <div class="w-6/12 flex justify-end">
                <button
                  type="button"
                  class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  onclick="toggleNavbar('example-collapse-sidebar')"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Heading -->
          <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Operasional
          </h6>
          <!-- Navigation -->

          <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
            <li class="items-center" v-for="link in links.operationl" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  link.name === activeLink
                    ? 'text-pink-500 hover:text-pink-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i :class="['fas', link.icon, 'mr-2', 'text-sm', 'opacity-75', 'w-3']"></i>
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>

          <!-- Heading -->
          <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Manajemen
          </h6>
          <!-- Navigation -->

          <ul class="md:flex-col md:min-w-full flex flex-col list-none">
            <li class="items-center" v-for="link in links.management" :key="link.name">
              <template v-if="!link.adminOnly || (link.adminOnly && auth?.user?.role === 'admin')">
                <NuxtLink
                  :to="link.href"
                  class="text-xs uppercase py-3 font-bold block"
                  :class="[
                    link.name === activeLink
                      ? 'text-pink-500 hover:text-pink-600'
                      : 'text-blueGray-700 hover:text-blueGray-500',
                  ]"
                >
                  <i :class="['fas', link.icon, 'mr-2', 'text-sm', 'opacity-75', 'w-3']"></i>
                  {{ link.name }}
                </NuxtLink>
              </template>
            </li>
          </ul>

          <hr class="my-4 md:min-w-full mt-auto" />
          <div class="text-blueGray-700 font-bold text-sm opacity-40">Login sebagai</div>
          <div class="text-blueGray-700 font-bold">
            {{ auth?.user?.name }}
            <span class="text-blueGray-700 font-medium opacity-80">[{{ auth?.user?.role }}]</span>
          </div>
          <div class="py-3">
            <NuxtLink to="/logout" class="text-xs uppercase font-bold text-blueGray-700 hover:text-red-500">
              <i class="fas fa-sign-out-alt mr-2 text-sm opacity-75 w-3"></i>
              Logout
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <div class="relative md:ml-64 bg-blueGray-50">
      <!-- Header -->
      <div class="relative bg-pink-600 md:!pt-8 pb-32 pt-12">
        <div class="px-4 md:px-10 mx-auto w-full">
          <div class="px-4">
            <a class="text-white uppercase hidden lg:inline-block font-semibold" href="./index.html">{{
              title.text
            }}</a>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
