<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue';
import { mapMarkers } from '@/common/mock/mapMarkers';
 
export default{
    
    setup(){
        
        onMounted(() =>{

            // 初始化底图
            const map = initMap()
            
            // 挂载多种标注，及标注事件
            addMarkers(map)

            // 园、三角形 非瓦片图层
            const circle = L.circle([31.23, 121.47], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 5000
            }).addTo(map)
            const polygon = L.polygon([
                [31.33, 121.47],
                [31.51, 121.41],
                [31.30, 121.68]
            ]).addTo(map)
            // 添加弹窗事件
            circle.bindPopup("I am a circle.")
            polygon.bindPopup("I am a polygon.")


            // 默认地图弹窗
            const popup = L.popup()  
                .setLatLng([31.23, 121.34])
                .setContent("I am a standalone popup.")
                .openOn(map);
            
            // 添加底图点击事件
            const onMapClick = (e) =>{
                popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
            }
            map.on('click', onMapClick);

            // 获取并渲染覆盖在底图上的图层
            // fetch('/gz_2010_us_040_00_20m.json')
            // .then(response => response.json())
            // .then(data => {
            //     console.log(data)
            //     L.geoJSON(data, {
            //         style: {
            //             "color": "#ff7800",
            //             "weight": 5,
            //             "opacity": 0.65
            //         }
            //     }).addTo(map)
            // });

            // WMS（Web Map Service）是一种用于在互联网上分发地图数据的标准协议。
            // 它允许用户通过网络访问和请求地图图层，以获取地图数据并进行展示。
            // const wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
            //     layers: 'SRTM30-Colored-Hillshade',
            //     maxZoom: 4,
            // }).addTo(map);



        })
          
        const initMap = () => {
            // 加载底图,需要基于真实节点 #map 来渲染
            const map = L.map('map').setView([31.2304, 121.4737], 11)

            // 此处可以引用不同的瓦片生成不同的底图，例如腾讯地图、高德地图或者其他瓦片供应商等
            //其中 {x}、{y} 和 {z} 分别表示瓦片的行列号和缩放级别，lang=zh_cn 表示地图语言为中文，
            // 尺寸为 1x1，style=8 表示显示路网地图。
            L.tileLayer('https://webst04.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}', {
                attribution: '© 高德地图'
            }).addTo(map)
            return map
        }

        const addMarkers = (map) => {
            mapMarkers.map(i => {
                const myIcon = L.icon({
                    iconUrl: `/img/map_icon/${i.icon}`,  // 图标文件路径,这里用了public的绝对路径
                    iconSize: i.size   // 图标大小
                }) 
                i.position.map(j=>{
                    const marker = L.marker(j, {icon: myIcon}).addTo(map)
                    marker.bindPopup(`<b>简介</b><br>我是${i.label}`)
                })
            })  
        }
    },
}
</script>
<style scoped>
    #map  { 
        height: calc(100vh - 60px);
        width: 100vw;
    }
</style>