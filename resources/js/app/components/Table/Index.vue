<template>
    <div>
        <!-- El componente de tabla, con la opción de pasar items y otras configuraciones desde el padre -->
        <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
</template>

<script src="./Table.js"></script>