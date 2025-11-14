import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { CustomOutlinePass } from './CustomOutline';

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 60;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;

    //NOTE: Outline
    this.composer = undefined;
    this.effectFXAA = undefined;
    this.outlinePass = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      0.05,
      1000
    );
    this.camera.position.x = 3;
    this.camera.position.y = 0;
    this.camera.position.z = 0;

    this.scene.background = new THREE.Color(0xffffff);

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.shadowMap.enabled = true;

    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    ////////////////////////////////////////////////////
    // const renderTarget = new THREE.WebGLRenderTarget(
    //   window.innerWidth,
    //   window.innerHeight,
    //   {
    //     samples: 4,
    //     powerPreference: 'high-performance',
    //     //   depthTexture: depthTexture,
    //     //   depthBuffer: true,
    //   }
    // );
    // // this.composer = new EffectComposer(this.renderer, renderTarget);
    // this.composer = new EffectComposer(this.renderer);
    // const pass = new RenderPass(this.scene, this.camera);
    // this.composer.addPass(pass);

    // // Outline pass.
    // const customOutline = new CustomOutlinePass(
    //   new THREE.Vector2(window.innerWidth, window.innerHeight),
    //   this.scene,
    //   this.camera
    // );
    // this.composer.addPass(customOutline);

    // // Antialias pass.
    // const effectFXAA = new ShaderPass(FXAAShader);
    // effectFXAA.uniforms['resolution'].value.set(
    //   1 / window.innerWidth,
    //   1 / window.innerHeight
    // );
    // this.composer.addPass(effectFXAA);
    ////////////////////////////////////////////////////

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(16, 32, 64);
    this.directionalLight.shadow.bias = -0.00001;
    this.directionalLight.shadow.normalBias = 0.1;
    this.directionalLight.shadow.mapSize.width = 128;
    this.directionalLight.shadow.mapSize.height = 128;

    this.scene.add(this.directionalLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(-16, -32, -64);
    this.directionalLight.shadow.bias = -0.00001;
    this.directionalLight.shadow.normalBias = 0.1;
    this.directionalLight.shadow.mapSize.width = 128;
    this.directionalLight.shadow.mapSize.height = 128;

    this.scene.add(this.directionalLight);

    const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);

    // NOTE: Load space background.
    // this.loader = new THREE.TextureLoader();
    // this.scene.background = this.loader.load('./pics/space.jpeg');

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    // };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
    // this.composer.render();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
