<script setup>

const route = useRoute()

</script>

<template>
    page: {{ route.params.id }}
</template>