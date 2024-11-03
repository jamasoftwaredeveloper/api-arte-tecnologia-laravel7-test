<template>
    <div class="search-input">
        <input type="text" v-model="searchTerm" @input="onSearch" placeholder="Search..." class="form-control" />
    </div>
</template>

<script src="./SearchInput.js"></script>
<style src="./Styles.css" scoped></style>