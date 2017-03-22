(function init(){

    //--------------创建renderer，场景，照相机，坐标系--------------
    var container = document.getElementById('myCanvas');
    var renderer = new THREE.WebGLRenderer({
        antialias : true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x6f7877);
    container.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
    camera.position.set(40,30,0);
    scene.add(camera);

    var axisLine = new THREE.AxisHelper(30);
    scene.add(axisLine);

    //光源
    var light = new THREE.SpotLight(0xffff00,1,100,Math.PI/6,25);
    light.position.set(13,15,-15);
    light.castShadow = true;
    scene.add(light);

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 1000;
    //环境光
    var ambient = new THREE.AmbientLight(0x666666);
    scene.add(ambient);

    window.addEventListener( 'resize', onWindowResize, false ); 

    //--------------载入外部模型并检测外部操作，在回调函数内部调用animateCar(obj)--------------
    loadCar();
    //--------------画地板，返回地板对象floor--------------
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
        var onProgress = function(xhr){
            if(xhr.lengthComputable){
                var percentComplete = xhr.loaded / xhr.total * 100;
                function beforeLoading(){
                    var loadingText = document.getElementById('loading');
                    if(!loadingText){
                        var context = document.createElement('div');
                        context.style.position = 'absolute';
                        context.style.right = '50%';
                        context.style.top = '40%';
                        context.id = 'loading';
                        container.appendChild(context);
                    }
                    if(percentComplete > 99){
                        container.removeChild(loadingText);
                        return;
                    }else{
                        loadingText.innerHTML = '<h1>现在已经加载' + percentComplete +'</h1>';
                        beforeLoading();
                    }
                }
                beforeLoading();
            }
        };

        var onError = function(xhr){};

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('obj/');
        mtlLoader.load('audicar.mtl',function(materials){
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('obj/');
            objLoader.load('audicar.obj',function(obj){
                obj.position.set(0,0,0);
                obj.rotation.set(0,Math.PI/6,0);
                obj.scale.set(4,4,4);
                camera.lookAt(obj.position);
                animateCar(obj);
                scene.add(obj);
                render();
            })
        },onProgress,onError);
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
//添加监控动画效果
var stat = null;
stat = new Stats();
stat.domElement.style.position = 'absolute';
stat.domElement.style.right = '0px';
stat.domElement.style.top = '0px';
document.body.appendChild(stat.domElement);


})();