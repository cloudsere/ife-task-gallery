(function init(){
    var renderer,
        camera,
        scene,
        light,
        stat,
        controls;
    
    //--------------创建renderer，场景，照相机，坐标系-----------------------
    initWorld();

    //--------------加载小助手，用在THREE.OBJLoader(manager)---------------
    var manager = new THREE.LoadingManager();
    loadManager();

    //--------------载入外部模型并检测外部操作，在回调函数内部调用animateCar(obj)
    loadCar();
    //--------------画地板，返回地板对象floor-------------------------------
    var floor = drawFloor();

function animateCar(obj){
    var keyControlCarW = false;
    var keyControlCarA = false;
    var keyControlCarS = false;
    var keyControlCarD = false;
    var v = 0;
    var a = 0.005;
    var id = null;
    function drawMoveCar(){
        stat.begin();
        id = requestAnimFrame(drawMoveCar);
        if(keyControlCarS){
            obj.position.x += v;
            v+=a; 
        }
        if(keyControlCarW){
            obj.position.x -= v;
            v+=a;
        }
        if(keyControlCarA){
            obj.rotation.y -= 0.03;
           
        }
        if(keyControlCarD){
            /*objCar.translate = centerOfCarBody;*/ //绕轴心旋转
            obj.rotation.y += 0.03;
        }
        if(Math.abs(obj.position.x) > Math.abs(floor.position.x) + 30){
            floor.position.x = obj.position.x - 30;
            floor.scale.x = 2;
        }
        if(!keyControlCarS && !keyControlCarW && !keyControlCarA && !keyControlCarD){
            cancelAnimationFrame(id);
        }
        camera.position.x = obj.position.x + 40;
        light.position.x = obj.position.x + 13;
        camera.lookAt(obj.position);
        light.target = obj;
        render();
        stat.end();
    }
    window.addEventListener('keyup',onKeyUp,false);
    window.addEventListener('keydown',onKeyDown,false);

    function onKeyUp(event){
        v = 0;
        if(event.key !== undefined){
            let eventKeyControlCar = event.key;
            switch(eventKeyControlCar){
                case 'w':
                    keyControlCarW = false;
                    break;
                case 'W':
                    keyControlCarW = false;
                    break;
                case 's':
                    keyControlCarS = false;
                    break;
                case 'S':
                    keyControlCarS = false;
                    break;
                case 'a':
                    keyControlCarA = false;
                    break;
                case 'A':
                    keyControlCarA = false;
                    break;
                case 'd':
                    keyControlCarD = false;
                    break;
                case 'D':
                    keyControlCarD = false;
                    break;
            }
        }else if(event.keyCode !== undefined){
            let eventKeyCodeControlCar = event.keyCode;
            switch(eventKeyCodeControlCar){
                case 87://w
                    keyControlCarW = false;
                    break;
                case 83://s
                    keyControlCarS = false;
                    break;
                case 65://a
                    keyControlCarA = false;
                    break;
                case 68://d
                    keyControlCarD = false;
                    break;
            }
        }
    }
    function onKeyDown(event){
        if(event.key !== undefined){
            var eventKeyControlCar = event.key;
            switch(eventKeyControlCar){
                case 'w':
                    keyControlCarW = true;
                    break;
                case 'W':
                    keyControlCarW = true;
                    break;
                case 's':
                    keyControlCarS = true;
                    break;
                case 'S':
                    keyControlCarS = true;
                    break;
                case 'a':
                    keyControlCarA = true;
                    break;
                case 'A':
                    keyControlCarA = true;
                    break;
                case 'd':
                    keyControlCarD = true;
                    break;
                case 'D':
                    keyControlCarD = true;
                    break;
            }
        }else if(event.keyCode !== undefined){
            var eventKeyCodeControlCar = event.keyCode;
            console.log(eventKeyCodeControlCar);
            switch(eventKeyCodeControlCar){
                case 87://w
                    keyControlCarW = true;
                    break;
                case 83://s
                    keyControlCarS = true;
                    break;
                case 65://A
                    keyControlCarA = true;
                    break;
                case 68://d
                    keyControlCarD = true;
                    break;
            }
        }
        drawMoveCar();
    }

}
//定义requestAnimationFrame
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
              window.setTimeout(callback, 1000 / 60);
              };
    })();

function drawFloor(){
    var geometryPlane = new THREE.PlaneGeometry(100,100,16,16);
    var texturePlane = new THREE.TextureLoader();
    var planeMaterialWithoutTexture = new THREE.MeshBasicMaterial({
        color:0xc8c7c7
    })
    var plane = new THREE.Mesh(geometryPlane,planeMaterialWithoutTexture);
    plane.doubleSided = true;
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(0,0,0);
    plane.receiveShadow = true;
    scene.add(plane);
    texturePlane.load('img/floor.jpg',function(texture){
        var materialPlane = new THREE.MeshLambertMaterial({
            map:texture
        });
        plane.material = materialPlane;
        render();
    }); 
    return plane;
}
function loadCar(){
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('obj/');
    mtlLoader.load('audicar.mtl',function(materials){
        materials.preload();
        var objLoader = new THREE.OBJLoader(manager);
        objLoader.setMaterials(materials);
        objLoader.setPath('obj/');
        objLoader.load('audicar.obj',function(obj){
            obj.position.set(0,4,0);
            obj.rotation.set(0,Math.PI/6,0);
            obj.scale.set(4,4,4);
            obj.castShadow = true;
            for(var i = 0; i<obj.children.length;i++){
                obj.children[i].castShadow = true;
            }
            camera.lookAt(obj.position);
            animateCar(obj);
            scene.add(obj);
            render();
        })
    });
}

function loadText(){
    var progress = document.createElement('div');
    var progressBar = document.createElement('div');
    progress.appendChild(progressBar);
    var manager = new THREE.LoadingManager();
    manager.onProgress = function( item, loaded, total){
        progressBar.style.width =  (loaded / total * 100) + '%';
    }
}

function loadManager(){
    var progress = document.createElement('div');
    progress.id = 'progress';
    var progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    progress.appendChild(progressBar);
    document.body.appendChild(progress);
    var nowLoaded;
    var totalLoad;
    
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        nowLoaded = itemsLoaded;
        totalLoad = itemsTotal;
    };
    manager.onLoad = function ( ) {
        console.log( 'Loading complete!');
    };
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        nowLoaded = itemsLoaded;
        function changeWidth(){
            console.log(nowLoaded);
            if(nowLoaded == totalLoad){
                progressBar.style.width = (nowLoaded / totalLoad * 100) + '%';
                return;
            }else{
                progressBar.style.width = (nowLoaded / totalLoad * 100) + '%';
                changeWidth();
            }
        }
        changeWidth();
    };
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };
}


//渲染
function render(){
    renderer.render(scene,camera);
}
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    render();
}

function initRenderer(){
    var container = document.getElementById('myCanvas');
    renderer = new THREE.WebGLRenderer({
        antialias : true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x6f7877);
    container.appendChild(renderer.domElement);
    scene = new THREE.Scene();
}
function initCamera(){
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
    camera.position.set(40,30,0);
    scene.add(camera);
}
function initLight(){
    light = new THREE.SpotLight(0xffff00,1,100,Math.PI/3,25);
    light.position.set(10,15,0);
    light.castShadow = true;
    scene.add(light);

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 1000;
    //环境光
    var ambient = new THREE.AmbientLight(0x666666);
    scene.add(ambient);
}
function initControl(){
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.addEventListener('change',render);
    render();
}
function addStat(){
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.right = '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);
}
function initWorld(){
    initRenderer();
    initCamera()
    initLight();
    addStat();
    initControl();
    controlAnimate();

    window.addEventListener( 'resize', onWindowResize, false ); 
    var axisLine = new THREE.AxisHelper(30);
    scene.add(axisLine);
}
 function controlAnimate() {
    controls.update();
    requestAnimationFrame(controlAnimate);
}


})();