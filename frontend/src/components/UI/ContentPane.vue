<template>
  <TheSidebar />
  <main class="w-full ml-4 py-4 pr-4">
    <div class="flex flex-col h-full">
      <TheHeader />
      <slot></slot>
    </div>
  </main>
</template>
