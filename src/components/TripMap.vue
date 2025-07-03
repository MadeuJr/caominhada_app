<template>
    <div ref="mapRef" class="map-container" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Icon, Style, Stroke } from 'ol/style'
import LineString from 'ol/geom/LineString'

const props = defineProps<{
    positions: { lat: number, lng: number }[]
}>()

const mapRef = ref(null)
let map: Map
const vectorSource = new VectorSource()
let lineFeature: Feature<LineString>
let markerFeature: Feature<Point>

onMounted(() => {
    const tileLayer = new TileLayer({
        source: new OSM()
    })

    markerFeature = new Feature({
        geometry: new Point(fromLonLat([-46.6333, -23.5505]))
    })

    markerFeature.setStyle(new Style({
        image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scale: 0.07
        })
    }))
    lineFeature = new Feature({
        geometry: new LineString([])
    })

    lineFeature.setStyle(new Style({
        stroke: new Stroke({
            color: '#ed1010',
            width: 3
        })
    }))

    vectorSource.addFeatures([markerFeature, lineFeature])

    const vectorLayer = new VectorLayer({
        source: vectorSource
    })

    map = new Map({
        target: mapRef.value as HTMLElement,
        layers: [tileLayer, vectorLayer],
        view: new View({
            center: fromLonLat([-46.6333, -23.5505]),
            zoom: 15
        })
    })
})

watch(() => props.positions, (coords) => {
    if (!coords.length) return

    const last = coords.at(-1)!
    const olCoords = coords.map(p => fromLonLat([p.lng, p.lat]))

    markerFeature.getGeometry()?.setCoordinates(fromLonLat([last.lng, last.lat]))
    lineFeature.getGeometry()?.setCoordinates(olCoords)

    map.getView().setCenter(fromLonLat([last.lng, last.lat]))
}, { deep: true })
</script>

<style scoped>
.map-container {
    width: 100%;
    height: 100%;
}
</style>
  
