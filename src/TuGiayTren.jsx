import React, { useEffect, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import SceneInit from './lib/SceneInit';

import './App.css';

let display;

let listBox = [];

function App4() {
  const [gltfUuid, setGltfUuid] = useState(null);

  const [width, setWidth] = useState(0.8);
  const [height, setHeight] = useState(0.89);
  const [depth, setDepth] = useState(0.35);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);

  const settingDay = (day) => {
    day.position.z = 0 * -1;
    day.position.x = DDTHau;
    day.position.y = 0;

    const lenZ = width;
    const lenX = depth - DDTHau;
    const lenY = DDTBia;

    day.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day.scale.x = lenX / sizeDay.x;
    day.scale.y = lenY / sizeDay.y;
    day.scale.z = lenZ / sizeDay.z;
  };

  const settingHau = (hau) => {
    hau.position.z = 0 * -1;
    hau.position.x = 0;
    hau.position.y = 0;

    const lenZ = width;
    const lenX = DDTHau;
    const lenY = height;

    hau.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau.scale.x = lenX / sizeHau.x;
    hau.scale.y = lenY / sizeHau.y;
    hau.scale.z = lenZ / sizeHau.z;
  };

  const settingBiaTrai = (bTrai) => {
    bTrai.position.z = 0 * -1;
    bTrai.position.x = DDTHau;
    bTrai.position.y = DDTBia;

    const lenZ = DDTBia;
    const lenX = depth - DDTHau;
    const lenY = height - DDTBia - DDTBia;

    bTrai.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bTrai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bTrai.scale.x = lenX / sizeBiaTrai.x;
    bTrai.scale.y = lenY / sizeBiaTrai.y;
    bTrai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaPhai = (bPhai) => {
    bPhai.position.z = (width - DDTBia) * -1;
    bPhai.position.x = DDTHau;
    bPhai.position.y = DDTBia;

    const lenZ = DDTBia;
    const lenX = depth - DDTHau;
    const lenY = height - DDTBia - DDTBia;

    bPhai.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bPhai);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bPhai.scale.x = lenX / sizeBiaPhai.x;
    bPhai.scale.y = lenY / sizeBiaPhai.y;
    bPhai.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingNoc = (noc) => {
    noc.position.z = 0 * -1;
    noc.position.x = DDTHau;
    noc.position.y = height - DDTBia;

    const lenZ = width;
    const lenX = depth - DDTHau;
    const lenY = DDTBia;

    noc.scale.set(1, 1, 1);
    let boundingBoxNoc = new THREE.Box3().setFromObject(noc);
    const sizeNoc = new THREE.Vector3();
    boundingBoxNoc.getSize(sizeNoc);

    noc.scale.x = lenX / sizeNoc.x;
    noc.scale.y = lenY / sizeNoc.y;
    noc.scale.z = lenZ / sizeNoc.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/TAT.glb', (gltfScene) => {
      gltfScene.scene.scale.set(1, 1, 1);
      gltfScene.scene.position.set(0, 0, 0);
      gltfScene.scene.traverse((child) => {
        if (child.isMesh) {
          const randomColor = Math.random() * 0xffffff;
          // Gán màu cho vật liệu của mesh
          // child.material.color.set(randomColor);
          // child.castShadow = true;
          // child.receiveShadow = true;
          child.material.roughness = 0.8;
          child.material.metalness = 0.4;
        }
      });

      textureLoader.load('/images/TEXTURE.png', (newTexture) => {
        newTexture.offset.set(1, 1);
        newTexture.wrapS = newTexture.wrapT = THREE.MirroredRepeatWrapping;
        newTexture.repeat.set(1, 1);
        // newTexture.repeat.set(module.scale.z, 1);

        newTexture.mapping = THREE.UVMapping;

        gltfScene.scene.traverse((node) => {
          if (node.isMesh) {
            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];
            materials.forEach((material) => {
              material.map = newTexture;
            });
          }
        });
      });

      setGltfUuid(gltfScene.scene.uuid);

      display.scene.add(gltfScene.scene);
    });

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, display.camera);
      const intersects = raycaster.intersectObjects(display.scene.children);

      // change color of objects intersecting the raycaster
      if (intersects.length !== 0) {
        for (let i = 0; i < intersects.length; i++) {
          intersects[i].object.material.color.set(0xff0000);
        }
      }

      // change color of the closest object intersecting the raycaster
      // if (intersects.length > 0) {
      //   intersects[0].object.material.color.set(0xff0000);
      // }
    };

    // window.addEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    if (display && gltfUuid) {
      const md = display.scene.getObjectByProperty('uuid', gltfUuid);
      md.position.set(-depth / 2, -height / 2, width / 2);

      const day = md.getObjectByName('DAY');
      const noc = md.getObjectByName('NOC');
      const hau = md.getObjectByName('HAU');
      const bTrai = md.getObjectByName('BIA-TRAI');
      const bPhai = md.getObjectByName('BIA-PHAI');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day && settingDay(day);
      bTrai && settingBiaTrai(bTrai);
      bPhai && settingBiaPhai(bPhai);
      noc && settingNoc(noc);
      hau && settingHau(hau);

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('/images/TEXTURE.png', (newTexture) => {
        md.traverse((node) => {
          if (node.isMesh) {
            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];

            newTexture.offset.set(1, 1);
            newTexture.wrapS = newTexture.wrapT = THREE.MirroredRepeatWrapping;
            newTexture.repeat.set(
              node?.parent?.scale?.x || 1,
              node?.parent?.scale?.y || 1
            );
            newTexture.mapping = THREE.UVMapping;

            materials.forEach((material) => {
              material.map = newTexture;
            });
          }
        });
      });

      setTimeout(() => {
        handleResetBox();
      }, 10);
    }
  }, [display, width, height, depth, DDTBia, DDTHau, gltfUuid]);

  const handleResetBox = () => {
    const md = display.scene.getObjectByProperty('uuid', gltfUuid);

    md.traverse((child) => {
      if (
        child.isMesh &&
        child.scale.x !== 0 &&
        child.scale.y !== 0 &&
        child.scale.z !== 0
      ) {
        // Tạo Box3 để xác định kích thước của mesh
        const box = new THREE.Box3().setFromObject(child);
        // Tính toán kích thước và vị trí của khung
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        // Tạo geometry cho khung
        const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
        // Tạo edges từ geometry
        const edges = new THREE.EdgesGeometry(geometry);
        // Tạo màu ngẫu nhiên cho khung viền
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        // const material = new THREE.LineBasicMaterial({
        //   color: 0xffffff,
        //   depthWrite: false,
        // });
        // Tạo LineSegments cho khung viền
        const boundingBoxEdges = new THREE.LineSegments(edges, material);
        // Đặt vị trí cho khung sao cho nó nằm khớp với mesh
        boundingBoxEdges.position.copy(center);

        listBox.push(boundingBoxEdges);
        // Thêm khung vào scene
        display.scene.add(boundingBoxEdges);
      }
    });
  };

  const handleHide = (name, visible) => {
    const md = display.scene.getObjectByProperty('uuid', gltfUuid);

    const mesh = md.getObjectByName(name);

    mesh.visible = visible;
  };

  return (
    <div>
      <div className="container-option">
        <h5 className="header">Kích thước:</h5>
        <div>
          <label className="label" htmlFor="width">
            Dài (mm):
          </label>
          <input
            className="input"
            type="number"
            name="width"
            id="width"
            defaultValue={width * 1000}
            onChange={(e) => {
              setWidth(Number(e.target.value) / 1000);
            }}
          />
          <br />
          <label className="label" htmlFor="height">
            Cao (mm):
          </label>
          <input
            className="input"
            type="number"
            name="height"
            id="height"
            defaultValue={height * 1000}
            onChange={(e) => {
              setHeight(Number(e.target.value) / 1000);
            }}
          />
          <br />
          <label className="label" htmlFor="depth">
            Sâu (mm):
          </label>
          <input
            className="input"
            type="number"
            name="depth"
            id="depth"
            defaultValue={depth * 1000}
            onChange={(e) => {
              setDepth(Number(e.target.value) / 1000);
            }}
          />
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App4;
