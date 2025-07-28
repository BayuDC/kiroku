<script setup lang="ts">
const links = {
  operationl: [
    { name: 'Peminjaman', icon: 'fa-hand-holding-heart', href: '#' },
    { name: 'Pemakaian', icon: 'fa-fire', href: '#' },
  ],
  management: [
    { name: 'Pengguna', icon: 'fa-user', href: '#' },
    { name: 'Kategori', icon: 'fa-tags', href: '#' },
    { name: 'Alat', icon: 'fa-hammer', href: '#' },
    { name: 'Barang', icon: 'fa-cube', href: '#' },
  ],
};

const activeLink = ref('Home');
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
              <a
                :href="link.href"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  link.name === activeLink
                    ? 'text-pink-500 hover:text-pink-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i :class="['fas', link.icon, 'mr-2', 'text-sm', 'opacity-75', 'w-3']"></i>
                {{ link.name }}
              </a>
            </li>
          </ul>

          <!-- Heading -->
          <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Manajemen
          </h6>
          <!-- Navigation -->

          <ul class="md:flex-col md:min-w-full flex flex-col list-none">
            <li class="items-center" v-for="link in links.management" :key="link.name">
              <a
                :href="link.href"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  link.name === activeLink
                    ? 'text-pink-500 hover:text-pink-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i :class="['fas', link.icon, 'mr-2', 'text-sm', 'opacity-75', 'w-3']"></i>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="relative md:ml-64 bg-blueGray-50">
      <!-- Header -->
      <div class="relative bg-pink-600 md:!pt-8 pb-32 pt-12">
        <div class="px-4 md:px-10 mx-auto w-full">
          <div class="px-4">
            <a class="text-white uppercase hidden lg:inline-block font-semibold" href="./index.html">Dashboard</a>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
