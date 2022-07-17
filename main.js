import './style.css'
import * as THREE from 'three'
import { init } from 'ityped'


window.addEventListener('load', first);
window.addEventListener('load', typingText);

const width = window.innerWidth; //ブラウザの横の長さ
const height = window.innerHeight; //ブラウザの縦の長さ

function first() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 1000);

  // レンダラーを作る
  const canvasElement = document.querySelector('#canvas') //HTMLのcanvasのid
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement
  });
  renderer.setSize(width, height);

  // ライトを作る
  const light = new THREE.DirectionalLight(0xFFFFFF, 1); //平行光源（色、光の強さ）
  light.position.set( 0, 0, 1000 );
  scene.add(light);

  // 3Dオブジェクトを作る
  const x_size = window.innerWidth;
  const y_size = window.innerHeight;
  const length = 500;
  const plane_scale = 6;
  const plane = [];
  const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

  for(let i=0; i<length; i++){ //ループで大量にジオメトリを生成
    const color = "0x" + Math.floor(Math.random() * 16777215).toString(16);
    let geometry = new THREE.ShapeGeometry( heartShape ); //ジオメトリ (形や大きさなど形状を表す「ジオメトリ」)
    let material = new THREE.MeshBasicMaterial({ //マテリアル 色や質感をつけるための「マテリアル」
      color: Number(color),
      opacity: 0.8,
      transparent: true, //opacityを設定するときはtransparentを必ず設定
      side: THREE.DoubleSide
    });
    plane[i] = new THREE.Mesh( geometry, material ); //メッシュ（ジオメトリを受け取りマテリアルに適用する「メッシュ」）

    plane[i].position.x = x_size * (Math.random() - 0.5);
    plane[i].position.y = y_size * (Math.random() - 0.5);
    plane[i].position.z = x_size * (Math.random() - 0.5);
    scene.add( plane[i] );
  }

  function random(min, max) {
  let rand = Math.floor((min + (max - min + 1) * Math.random()));
  return rand;
  }

  //アニメ―ション
  function tick() {
    rot += 0.2; // 毎フレーム角度を0.2度ずつ足していく
  // ラジアンに変換する
  const radian = rot * Math.PI / 180;
  // 角度に応じてカメラの位置を設定
  camera.position.x = 1000 * Math.sin(radian);
  camera.position.z = 1000 * Math.cos(radian); //横移動のみなのでY軸は設定しない

  camera.lookAt(new THREE.Vector3(0, 0, 0)); //カメラを常に中央に設置するため、lookAt()メソッドを用いて原点座標を(0, 0 ,0) x, y ,z　を指定

  for(let i=0; i<length; i++){
    plane[i].rotation.y += (Math.random()*0.1);
    plane[i].rotation.x += (Math.random()*0.1);
    // plane[i].rotation.z += (Math.random()*0.1);
  }
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  let rot = 0;
  tick();
}

  function typingText() {
    const oneElement = document.querySelector('#ityped')
    init(oneElement, { showCursor: false, strings: ['PIXEL HEARTS'], loop: false, typeSpeed:  200, });
  }
