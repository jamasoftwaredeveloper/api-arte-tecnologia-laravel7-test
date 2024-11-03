<template>
    <div class="container">
        <SearchInput @search="handleSearch" />
        <CardList :cards="items" v-if="!loading"/>
        <div class="pagination-container" v-if="items.length > 0 && loading">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="my-cards"
                @change="onPageChange"></b-pagination>
        </div>
    </div>
</template>

<script src="./Dashboard.js"></script>
<style src="./Dashboard.css" scoped></style>