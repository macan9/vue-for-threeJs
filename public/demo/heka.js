// 基础库
import * as THREE from 'three';
// 轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// 解压模型
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js"
// 加载hdr环境纹理
import { RGBELoader } from "three/addons/loaders/RGBELoader.js"
// 水面
import { Water } from "three/addons/objects/Water2.js"
// 补间动画库
import { TWEEN } from 'three/addons/libs/tween.module.min.js'
// 引入天空
import { Sky } from 'three/addons/objects/Sky.js';

// gui.js库(可视化改变三维场景)
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const webThree = document.getElementById('webThree')
// 定义相机输出画布的尺寸(单位:像素px)  fov, aspect, near, far 构成一个四棱台3D空间
const width = webThree.clientWidth; //宽度
const height = webThree.clientHeight; //高度
// 创建3D场景对象Scene
const scene = new THREE.Scene();


// 初始化loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./static/draco/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// 加载模型
gltfLoader.load('./static/model/scene.glb', (gltf) => {
    console.log("🚀 ~ file: heka.js:29 ~ gltfLoader.load ~ gltf:", gltf)
    const model = gltf.scene
    model.traverse((child) => {
        if (child.name === 'Plane') {
            child.visible = false //去除模型睡眠效果
        }
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })
    scene.add(model)
})

// 添加光源
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 50, 0)
scene.add(light)

//  加载环境纹理

let rgbeLoader = new RGBELoader()
rgbeLoader.load('./static/textures/sky.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping //设置纹理映射 （因为是球形全景纹理）
    scene.background = texture  //设置背景
    scene.environment = texture
})

// 设置水面效果

const waterGeometry = new THREE.CircleGeometry(10000, 500)

// const waterGeometry = new THREE.CircleGeometry(300, 32);
const water = new Water(waterGeometry, {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 100,
});
water.rotation.x = -Math.PI / 2;
water.position.y = -0.4;
scene.add(water);

// 添加点光源 (添加房子灯泡)
const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.set(0.1, 2.4, -0.6)
pointLight.castShadow = true   //投射阴影
scene.add(pointLight)

// 创建点光源组
const pointLightGroup = new THREE.Group()
pointLightGroup.position.set(-7, 2.5, -1)
let polintLightArr = []
let R = 3
for (let i = 0; i < 3; i++) {
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 50
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    polintLightArr.push(sphere)
    sphere.position.set(
        R * Math.cos((i * 2 * Math.PI) / 3),
        Math.cos((i * 2 * Math.PI) / 3),
        R * Math.sin((i * 2 * Math.PI) / 3)
    )
    let pointLight = new THREE.PointLight(0xffffff, 50)
    sphere.add(pointLight)
    pointLightGroup.add(sphere)
}
scene.add(pointLightGroup)
let options = {
    angle: 0,
};

const tween = new TWEEN.Tween(options)
tween.to({ angle: Math.PI * 2 }, 7000)
tween.onUpdate((obj) => {
    pointLightGroup.rotation.y = obj.angle;
    polintLightArr.forEach((item, index) => {
        item.position.set(
            R * Math.cos((index * 2 * Math.PI) / 3),
            Math.cos((index * 2 * Math.PI) / 3 + options.angle * 5),
            R * Math.sin((index * 2 * Math.PI) / 3)
        )
    })
})
tween.start()
tween.repeat(Infinity)
// tween.yoyo(true)
tween.easing(TWEEN.Easing.Linear.None)

let scenes = [
    {
        text: "看看房子树",
        callback: () => {
            // 执行函数切换位置
            translateCamera(
                new THREE.Vector3(-3.23, 3, 4.06),
                new THREE.Vector3(-8, 2, 0)
            );
        },
    },
    {
        text: "看看全景",
        callback: () => {
            // 执行函数切
            translateCamera(new THREE.Vector3(7, 0, 23), new THREE.Vector3(0, 0, 0));
        },
    },
    {
        text: "海盗宝箱",
        callback: () => {
            // 执行函数切
            translateCamera(new THREE.Vector3(10, 3, 0), new THREE.Vector3(5, 2, 0));
        },
    },
    {
        text: "星星房屋远景",
        callback: () => {
            // 执行函数切
            translateCamera(new THREE.Vector3(7, 0, 23), new THREE.Vector3(0, 0, 0));
            makeHeart()
        },
    },
    {
        text: "GG！",
        callback: () => {
            // 执行函数切
            translateCamera(
                new THREE.Vector3(-20, 1.3, 6.6),
                new THREE.Vector3(5, 2, 0)
            );
        },
    },
];


// 创建dom文字
let liBox = document.getElementById('liBox')
scenes.forEach((item,index)=>{
    var divElement = document.createElement("h1");
    divElement.textContent = item.text;
    liBox.appendChild(divElement)
})

let index = 0
let isAnimate = false;
window.addEventListener("wheel", (e) => {
    if (isAnimate) return;
    isAnimate = true;
    if (e.deltaY > 0) {
        index++;
        if (index > scenes.length - 1) {
            index = 0;
            restoreHeart();
        }
    }
    changeText()
    scenes[index].callback();
    setTimeout(() => {
        isAnimate = false;
    }, 1000);
})

function changeText() {
    console.log(index)
    let box = document.getElementById('liBox')
    console.log("🚀 ~ file: heka.js:206 ~ changeText ~ box:", box.style)
    
    box.style.top = -index * 60 +'px'

}

function translateCamera(position, target) {
    const cameraTween = new TWEEN.Tween(camera.position)
    cameraTween.to({
        x: position.x,
        y: position.y,
        z: position.z,
    }, 1000)
    cameraTween.start()
    const controlsTween = new TWEEN.Tween(controls.target)
    controlsTween.to({
        x: target.x,
        y: target.y,
        z: target.z,
    }, 1000)
    controlsTween.onUpdate(() => {
        controls.update();
    })
    controlsTween.start()
}

// 实例化创建漫天星星
let starsInstance = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 10,
    }),
    100
);

// 星星随机到天上
let starsArr = [];
let endArr = [];

for (let i = 0; i < 100; i++) {
    let x = Math.random() * 100 - 50;
    let y = Math.random() * 100 - 50;
    let z = Math.random() * 100 - 50;
    starsArr.push(new THREE.Vector3(x, y, z));

    let matrix = new THREE.Matrix4();
    matrix.setPosition(x, y, z);
    starsInstance.setMatrixAt(i, matrix);
}
scene.add(starsInstance);

// 创建爱心路径
let heartShape = new THREE.Shape();
heartShape.moveTo(25, 25);
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

// 根据爱心路径获取点
let center = new THREE.Vector3(0, 2, 10);
for (let i = 0; i < 100; i++) {
    let point = heartShape.getPoint(i / 100);
    endArr.push(
        new THREE.Vector3(
            point.x * 0.1 + center.x,
            point.y * 0.1 + center.y,
            center.z
        )
    );
}

function makeHeart() {
    let params = {
        time: 0,
    };


    let heartTween = new TWEEN.Tween(params)
    heartTween.to({ time: 1 }, 1000)
    heartTween.onUpdate(() => {
        for (let i = 0; i < 100; i++) {
            let x = starsArr[i].x + (endArr[i].x - starsArr[i].x) * params.time;
            let y = starsArr[i].y + (endArr[i].y - starsArr[i].y) * params.time;
            let z = starsArr[i].z + (endArr[i].z - starsArr[i].z) * params.time;
            let matrix = new THREE.Matrix4();
            matrix.setPosition(x, y, z);
            starsInstance.setMatrixAt(i, matrix);
        }
        starsInstance.instanceMatrix.needsUpdate = true;
    })
    heartTween.start()
}
function restoreHeart() {
    let params = {
        time: 0,
    };
    let resetheartTween = new TWEEN.Tween(params)
    resetheartTween.to({ time: 1 }, 1000)
    resetheartTween.onUpdate(() => {
        for (let i = 0; i < 100; i++) {
            let x = endArr[i].x + (starsArr[i].x - endArr[i].x) * params.time;
            let y = endArr[i].y + (starsArr[i].y - endArr[i].y) * params.time;
            let z = endArr[i].z + (starsArr[i].z - endArr[i].z) * params.time;
            let matrix = new THREE.Matrix4();
            matrix.setPosition(x, y, z);
            starsInstance.setMatrixAt(i, matrix);
        }
        starsInstance.instanceMatrix.needsUpdate = true;
    })
    resetheartTween.start()
}























const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

//相机在Three.js三维坐标系中的位置
camera.position.set(-3.23, 2.98, 4.06);

//相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0, 0, 0);  //y轴上位置10

camera.updateProjectionMatrix();

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
    antialias: true, //设置抗锯齿
});

renderer.setPixelRatio(window.devicePixelRatio)

//设置three.js渲染区域的尺寸(像素px)
renderer.setSize(width, height);

// 设置允许阴影
renderer.shadowMap.enabled = true
//设置背景颜色
renderer.setClearColor(0x444444, 1);

// 设置色调映射
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.5  //调节亮度
renderer.physicallyCorrectLights = true
webThree.appendChild(renderer.domElement);
// AxesHelper：辅助观察的坐标系
// const axesHelper = new THREE.AxesHelper(150);

// scene.add(axesHelper);


function render() {
    TWEEN.update();
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}

render()

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.target.set(-8, 2, 0);
controls.update();//update()函数内会执行camera.lookAt(controls.targe)

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};


