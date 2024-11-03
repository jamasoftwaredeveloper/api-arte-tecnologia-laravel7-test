<template>
  <b-row>
    <b-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="4" lg="3" class="mb-4">
      <b-card :title="card.name" class="card-animation" style="position: relative; overflow: hidden;">
        <div class="image-container">
          <img :src="card.imageUrl" :alt="card.name" class="card-image" />
        </div>
        <b-card-text>
          {{ card.text }}
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>


<script src="./CardList.js"></script>
<style src="./Styles.css" scoped></style>