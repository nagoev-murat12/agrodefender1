<template>
    <div>
            <pre>{{ jsonData }}</pre>
    </div>
</template>

<script>
export default {
    props: {
        data:{
            type: Object,
            required: true,
        }
    },
    computed: {
        jsonData(){
            return JSON.stringify(this.data, null, 2)
        }
    }
}
</script>