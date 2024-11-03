<template>
  <b-row>
    <b-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="4" lg="3" class="mb-2" id="my-cards">
      <b-card :title="card.name" style="position: relative; overflow: hidden; max-width: 300px;">
        <div class="image-container">
          <img :src="card.imageUrl" :alt="card.name" class="card-image" />
        </div>
        <b-card-text>
          {{ card.text }}
        </b-card-text>
        <b-button :id="'button-' + index" :key="'button-key' + index" v-b-modal="`modal-${index}`">
          Detalles {{ index + 1 }}
        </b-button>

        <!-- Modal dinámico -->
        <b-modal :id="`modal-${index}`" :title="`${card.name}  ${index + 1}`" :key="'modal-key' + index">
          <p class="my-4"> 

            {{ card.moves}}
          <!--  {{ card.stats}}
            {{ card.types}}
            {{ card.weight}}
            {{ card.height}} -->
          </p>
        </b-modal>
      </b-card>
    </b-col>
  </b-row>
</template>



<script src="./CardList.js"></script>
<style src="./Styles.css" scoped></style>