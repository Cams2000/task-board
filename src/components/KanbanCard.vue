<template>
    <v-list-item>
      <v-list-item-content>
        <h4>Title: </h4>
        <v-list-item-title>{{ card.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ card.description }}</v-list-item-subtitle>
        <v-list-item-title>{{ card.estimatedDate }}</v-list-item-title>
        <v-list-item-title>{{ card.estimatedTime }}</v-list-item-title>
        <v-list-item-title>{{ card.fileInput.length }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </template>
  
  <script>
  export default {
    props: {
      card: Object
    }
  };
  </script>
  