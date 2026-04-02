import React, { useEffect, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import SceneInit from './lib/SceneInit';

import './App.css';

let display;

let listBox = [];

let truBia = 0.01;

function App2() {
  const [gltfUuid, setGltfUuid] = useState(null);

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(0.55);
  const [depth, setDepth] = useState(0.56);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);

  const [KCCot, setKCCot] = useState(0.4);
  const [dayDa, setDayDa] = useState(0.15);
  const [caoDa, setCaoDa] = useState(0.2);

  const settingDay = (day) => {
    day.position.z = 0 * -1;

    day.position.y = 0;

    day.position.x = DDTHau;

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

  const settingHau = (hau2) => {
    hau2.position.z = 0 * -1;

    hau2.position.y = 0;

    hau2.position.x = 0;

    const lenZ = width;
    const lenX = DDTHau;

    const lenY = height - caoDa;

    hau2.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau2);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau2.scale.x = lenX / sizeHau.x;
    hau2.scale.y = lenY / sizeHau.y;
    hau2.scale.z = lenZ / sizeHau.z;
  };

  const settingNoc = (noc1) => {
    noc1.position.z = 0 * -1;

    noc1.position.x = dayDa + DDTBia;

    noc1.position.y = height - DDTBia;

    const lenZ = width;

    const lenX = depth - dayDa - DDTBia;

    const lenY = DDTBia;

    noc1.scale.set(1, 1, 1);
    let boundingBoxNoc = new THREE.Box3().setFromObject(noc1);
    const sizeNoc = new THREE.Vector3();
    boundingBoxNoc.getSize(sizeNoc);

    noc1.scale.x = lenX / sizeNoc.x;
    noc1.scale.y = lenY / sizeNoc.y;
    noc1.scale.z = lenZ / sizeNoc.z;
  };

  const settingBiaTrai1 = (bia1) => {
    bia1.position.z = 0 * -1;

    bia1.position.x = dayDa + DDTBia;

    bia1.position.y = DDTBia;

    const lenZ = DDTBia;

    const lenX = depth - dayDa - DDTBia;

    const lenY = height - 2 * DDTBia;

    bia1.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia1.scale.x = lenX / sizeBiaTrai.x;
    bia1.scale.y = lenY / sizeBiaTrai.y;
    bia1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaTrai2 = (bia2) => {
    bia2.position.z = 0 * -1;

    bia2.position.x = DDTHau;

    bia2.position.y = DDTBia;

    const lenZ = DDTBia;

    const lenX = dayDa + DDTBia - DDTHau;

    const lenY = height - 2 * DDTBia - caoDa;

    bia2.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia2.scale.x = lenX / sizeBiaTrai.x;
    bia2.scale.y = lenY / sizeBiaTrai.y;
    bia2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaPhai1 = (bia3) => {
    bia3.position.z = (width - DDTBia) * -1;

    bia3.position.x = dayDa + DDTBia;

    bia3.position.y = DDTBia;

    const lenZ = DDTBia;

    const lenX = depth - dayDa - DDTBia;

    const lenY = height - DDTBia - DDTBia;

    bia3.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia3);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaPhai);

    bia3.scale.x = lenX / sizeBiaPhai.x;
    bia3.scale.y = lenY / sizeBiaPhai.y;
    bia3.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBiaPhai2 = (bia4) => {
    bia4.position.z = (width - DDTBia) * -1;

    bia4.position.x = DDTHau;

    bia4.position.y = DDTBia;

    const lenZ = DDTBia;

    const lenX = dayDa + DDTBia - DDTHau;

    const lenY = height - 2 * DDTBia - caoDa;

    bia4.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia4);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaPhai);

    bia4.scale.x = lenX / sizeBiaPhai.x;
    bia4.scale.y = lenY / sizeBiaPhai.y;
    bia4.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBiaCot1 = (hau1) => {
    hau1.position.z = 0 * -1;

    hau1.position.y = height - caoDa;

    hau1.position.x = dayDa;

    const lenZ = width;

    const lenX = DDTBia;

    const lenY = caoDa;

    hau1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau1.scale.x = lenX / sizeHau.x;
    hau1.scale.y = lenY / sizeHau.y;
    hau1.scale.z = lenZ / sizeHau.z;
  };

  const settingBiaCot2 = (noc2) => {
    noc2.position.z = 0 * -1;

    noc2.position.x = DDTHau;

    noc2.position.y = height - caoDa - DDTBia;

    const lenZ = width;

    const lenX = dayDa + DDTBia - DDTHau;

    const lenY = DDTBia;

    noc2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc2.scale.x = lenX / sizeDay.x;
    noc2.scale.y = lenY / sizeDay.y;
    noc2.scale.z = lenZ / sizeDay.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/TA-KC-Ngang.glb', (gltfScene) => {
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
      // md.position.set(-depth / 2, -height / 2, width / 2);

      const day = md.getObjectByName('DAY');
      const hau = md.getObjectByName('HAU');
      const noc = md.getObjectByName('NOC');

      const biaTrai1 = md.getObjectByName('BIA-TRAI-1');
      const biaTrai2 = md.getObjectByName('BIA-TRAI-2');
      const biaPhai1 = md.getObjectByName('BIA-PHAI-1');
      const biaPhai2 = md.getObjectByName('BIA-PHAI-2');

      const biaCot1 = md.getObjectByName('BIA-COT-1');
      const biaCot2 = md.getObjectByName('BIA-COT-2');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      biaTrai1 && settingBiaTrai1(biaTrai1);
      biaTrai2 && settingBiaTrai2(biaTrai2);
      biaPhai1 && settingBiaPhai1(biaPhai1);
      biaPhai2 && settingBiaPhai2(biaPhai2);

      day && settingDay(day);
      hau && settingHau(hau);
      noc && settingNoc(noc);

      biaCot1 && settingBiaCot1(biaCot1);
      biaCot2 && settingBiaCot2(biaCot2);

      setTimeout(() => {
        handleResetBox();
      }, 10);
    }
  }, [
    display,
    width,
    height,
    depth,
    DDTBia,
    DDTHau,
    KCCot,
    caoDa,
    dayDa,
    gltfUuid,
  ]);

  const handleResetBox = () => {
    const md = display.scene.getObjectByProperty('uuid', gltfUuid);

    // Xóa tất cả box hiện tại
    listBox?.forEach((box) => {
      display.scene.remove(box);
    });
    listBox = [];

    md.traverse((child) => {
      if (
        child.isMesh &&
        child.visible &&
        child.scale.x !== 0 &&
        child.scale.y !== 0 &&
        child.scale.z !== 0 &&
        child?.userData?.drawBorder !== false &&
        child?.userData?.requireBorder !== false
      ) {
        // Vẽ theo đúng hình dạng geometry thực tếz
        const THRESH = 60; // threshold để bỏ các cạnh bo cong/mịn
        const edges = new THREE.EdgesGeometry(child.geometry, THRESH);
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        const wireframe = new THREE.LineSegments(edges, material);

        // Copy transform từ mesh gốc
        wireframe.position.copy(child.position);
        wireframe.rotation.copy(child.rotation);
        wireframe.scale.copy(child.scale);

        // Apply world matrix nếu có parent transform
        if (child.parent && child.parent !== display.scene) {
          // Lấy world position thực tế
          const worldPosition = new THREE.Vector3();
          const worldQuaternion = new THREE.Quaternion();
          const worldScale = new THREE.Vector3();

          child.getWorldPosition(worldPosition);
          child.getWorldQuaternion(worldQuaternion);
          child.getWorldScale(worldScale);

          wireframe.position.copy(worldPosition);
          wireframe.quaternion.copy(worldQuaternion);
          wireframe.scale.copy(worldScale);
        }

        // Loại bỏ khi raycast
        wireframe.visibleForRaycast = false;

        listBox.push(wireframe);
        display.scene.add(wireframe);
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

        <h5 className="header">Đà:</h5>
        <div>
          <label className="label" htmlFor="caoDa">
            Cao (mm):
          </label>
          <input
            className="input"
            type="number"
            name="caoDa"
            id="caoDa"
            defaultValue={caoDa * 1000}
            onChange={(e) => {
              setCaoDa(Number(e.target.value) / 1000);
            }}
          />
          <br />
          <label className="label" htmlFor="dayDa">
            Dày (mm):
          </label>
          <input
            className="input"
            type="number"
            name="dayDa"
            id="dayDa"
            defaultValue={dayDa * 1000}
            onChange={(e) => {
              setDayDa(Number(e.target.value) / 1000);
            }}
          />
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App2;
