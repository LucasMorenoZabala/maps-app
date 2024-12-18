<template>
    <div class="searchBar-container">
        <input type="text" class="form-control" placeholder="Buscar lugares..." v-model="searchTerm">
        <SearchResults />
    </div>
 </template>
 
 <script lang="ts" src="./SearchBar.ts"></script>
 
 <style scoped>
 .searchBar-container {
     position: fixed;
     top: 30px;
     left: 30px;
     background-color: white;
     z-index: 999;
     box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
     width: 250px;
     max-width: 90%; 
     border-radius: 5px !important;
     overflow: hidden;
     padding: 5px;
 }
 

 @media (max-width: 768px) {
     .searchBar-container {
         top: 20px; 
         left: 20px; 
         width: auto; 
     }
 }
 

 @media (max-width: 480px) {
     .searchBar-container {
         top: 15px;
         left: 10px;
         right: 10px;
         width: auto;
         padding: 8px;
         font-size: 14px; 
     }
 
     .form-control {
         font-size: 14px; 
     }
 }
 </style>
 