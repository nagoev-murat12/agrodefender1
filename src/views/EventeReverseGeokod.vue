<template>
    <div>
        <p class="header">Кликните по карте, чтобы узнать адрес</p>
        <div id="map"></div>
    </div>
</template>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<c469af60-af68-4935-a64d-14aa60281856>" type="text/javascript"></script>
<script>
import evente_reverse_geokod from '../services/evente_reverse_geokod.js'
export default {
    data(){
        return{

        }
    },
    mounted(){
          evente_reverse_geokod.someFunction();
    }
}
</script>
 <style type="text/css">
        html, body {
            width: 100%;
            height: 95%;
            margin: 0;
            padding: 0;
            font-family: Arial;
            font-size: 14px;
        }
        #map {
            width: 100%;
            height: 95%;
        }
        .header {
            padding: 5px;
        }
    </style>
    