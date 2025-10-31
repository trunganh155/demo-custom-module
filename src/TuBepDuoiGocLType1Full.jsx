import React, { useEffect, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import SceneInit from './lib/SceneInit';

import './App.css';

let display;

let listBox = [];

let truBia = 0.01;

function App3() {
  const [gltfUuid, setGltfUuid] = useState(null);

  const [width, setWidth] = useState(1.5);
  const [height, setHeight] = useState(0.89);
  const [depth, setDepth] = useState(0.56);

  const [luiHau, setLuiHau] = useState(0.01);
  const [ngamHau, setNgamHau] = useState(0.005);
  const [luiChan, setLuiChan] = useState(0.05);
  const [caoChan, setCaoChan] = useState(0.1);
  const [caoXTruoc, setCaoXTruoc] = useState(0.08);
  const [caoXSau, setCaoXSau] = useState(0.08);

  const [optionDay, setOptionDay] = useState(0);
  const [optionSauDay, setOptionSauDay] = useState(0);
  const [optionHau, setOptionHau] = useState(0);
  const [optionXTruoc, setOptionXTruoc] = useState(0);
  const [optionXSau, setOptionXSau] = useState(0);

  const [DDTBiaTrai, setDDTBiaTrai] = useState(0.017);
  const [DDTBiaPhai, setDDTBiaPhai] = useState(0.017);
  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);
  const [DDTChan, setDDTChan] = useState(0.017);
  const [DDTXTruoc, setDDTXTruoc] = useState(0.017);
  const [DDTXSau, setDDTXSau] = useState(0.017);

  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [rongK1, setRongK1] = useState(1.4);
  const [rongK2, setRongK2] = useState(1.4);
  const [truHaoGoc, setTruHaoGoc] = useState(0.03);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay1 = (day1) => {
    day1.position.z = DDTHau * -1;
    day1.position.x = depth + DDTBia + truHaoGoc;
    day1.position.y = caoChan;

    const lenZ = depth - DDTHau;
    const lenX = rongK1 - depth - DDTBia - truHaoGoc;
    const lenY = DDTBia;

    day1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day1.scale.x = lenX / sizeDay.x;
    day1.scale.y = lenY / sizeDay.y;
    day1.scale.z = lenZ / sizeDay.z;
  };

  const settingDay2 = (day2) => {
    day2.position.z = truHaoGoc * -1;
    day2.position.x = DDTHau;
    day2.position.y = caoChan;

    const lenZ = rongK2 - truHaoGoc;
    const lenX = depth - DDTHau;
    const lenY = DDTBia;

    day2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day2.scale.x = lenX / sizeDay.x;
    day2.scale.y = lenY / sizeDay.y;
    day2.scale.z = lenZ / sizeDay.z;
  };

  const settingHau1 = (hau1) => {
    hau1.position.z = 0 * -1;
    hau1.position.x = depth + DDTBia + truHaoGoc;
    hau1.position.y = caoChan;

    const lenZ = DDTHau;
    const lenX = rongK1 - depth - DDTBia - truHaoGoc;
    const lenY = height - caoChan;

    hau1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau1.scale.x = lenX / sizeHau.x;
    hau1.scale.y = lenY / sizeHau.y;
    hau1.scale.z = lenZ / sizeHau.z;
  };

  const settingHau2 = (hau2) => {
    hau2.position.z = truHaoGoc * -1;
    hau2.position.x = 0;
    hau2.position.y = caoChan;

    const lenZ = rongK2 - truHaoGoc;
    const lenX = DDTHau;
    const lenY = height - caoChan;

    hau2.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau2);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau2.scale.x = lenX / sizeHau.x;
    hau2.scale.y = lenY / sizeHau.y;
    hau2.scale.z = lenZ / sizeHau.z;
  };

  const settingBia1 = (bia1) => {
    bia1.position.z = DDTHau * -1;
    bia1.position.x = rongK1 - DDTBia;
    bia1.position.y = caoChan + DDTBia;

    const lenZ = depth - DDTHau;
    const lenX = DDTBia;
    const lenY = height - caoChan - DDTBia;

    bia1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia1.scale.x = lenX / sizeBiaTrai.x;
    bia1.scale.y = lenY / sizeBiaTrai.y;
    bia1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia2 = (bia2) => {
    bia2.position.z = DDTHau * -1;
    bia2.position.x = depth + DDTBia + truHaoGoc;
    bia2.position.y = caoChan + DDTBia;

    const lenZ = depth - DDTHau;
    const lenX = DDTBia;
    const lenY = height - caoChan - DDTBia;

    bia2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia2.scale.x = lenX / sizeBiaTrai.x;
    bia2.scale.y = lenY / sizeBiaTrai.y;
    bia2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia3 = (bia3) => {
    bia3.position.z = truHaoGoc * -1;
    bia3.position.x = DDTHau;
    bia3.position.y = caoChan + DDTBia;

    const lenZ = DDTBia;
    const lenX = depth - DDTHau;
    const lenY = height - caoChan - DDTBia;

    bia3.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia3);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia3.scale.x = lenX / sizeBiaTrai.x;
    bia3.scale.y = lenY / sizeBiaTrai.y;
    bia3.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia4 = (bia4) => {
    bia4.position.z = (rongK2 - DDTBia) * -1;
    bia4.position.x = DDTHau;
    bia4.position.y = caoChan + DDTBia;

    const lenZ = DDTBia;
    const lenX = depth - DDTHau;
    const lenY = height - caoChan - DDTBia;

    bia4.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia4);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia4.scale.x = lenX / sizeBiaTrai.x;
    bia4.scale.y = lenY / sizeBiaTrai.y;
    bia4.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingChanTruoc1 = (cTruoc1) => {
    cTruoc1.position.z = (depth - DDTBia) * -1;
    cTruoc1.position.x = depth + DDTBia + truHaoGoc;
    cTruoc1.position.y = 0;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth - DDTBia - truHaoGoc;
    const lenY = caoChan;

    cTruoc1.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(cTruoc1);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    cTruoc1.scale.x = lenX / sizeChanTruoc.x;
    cTruoc1.scale.y = lenY / sizeChanTruoc.y;
    cTruoc1.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingChanTruoc2 = (cTruoc2) => {
    cTruoc2.position.z = truHaoGoc * -1;
    cTruoc2.position.x = depth - DDTBia;
    cTruoc2.position.y = 0;

    const lenZ = rongK2 - truHaoGoc;
    const lenX = DDTBia;
    const lenY = caoChan;

    cTruoc2.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(cTruoc2);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    cTruoc2.scale.x = lenX / sizeChanTruoc.x;
    cTruoc2.scale.y = lenY / sizeChanTruoc.y;
    cTruoc2.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingNepTruoc1 = (nepTruoc1) => {
    nepTruoc1.position.z = (depth - DDTBia) * -1;
    nepTruoc1.position.x = depth + 2 * DDTBia + truHaoGoc;
    nepTruoc1.position.y = height - caoXTruoc;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth - 3 * DDTBia - truHaoGoc;
    const lenY = caoXTruoc;

    nepTruoc1.scale.set(1, 1, 1);
    let boundingBoxXTruoc1 = new THREE.Box3().setFromObject(nepTruoc1);
    const sizeXTruoc1 = new THREE.Vector3();
    boundingBoxXTruoc1.getSize(sizeXTruoc1);

    nepTruoc1.scale.x = lenX / sizeXTruoc1.x;
    nepTruoc1.scale.y = lenY / sizeXTruoc1.y;
    nepTruoc1.scale.z = lenZ / sizeXTruoc1.z;
  };

  const settingNepTruoc2 = (nepTruoc2) => {
    nepTruoc2.position.z = (depth - 2 * DDTBia) * -1;
    nepTruoc2.position.x = depth + 2 * DDTBia + truHaoGoc;
    nepTruoc2.position.y = height - caoXTruoc;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth - 3 * DDTBia - truHaoGoc;
    const lenY = caoXTruoc;

    nepTruoc2.scale.set(1, 1, 1);
    let boundingBoxXTruoc1 = new THREE.Box3().setFromObject(nepTruoc2);
    const sizeXTruoc1 = new THREE.Vector3();
    boundingBoxXTruoc1.getSize(sizeXTruoc1);

    nepTruoc2.scale.x = lenX / sizeXTruoc1.x;
    nepTruoc2.scale.y = lenY / sizeXTruoc1.y;
    nepTruoc2.scale.z = lenZ / sizeXTruoc1.z;
  };

  const settingNepTruoc3 = (nepTruoc3) => {
    nepTruoc3.position.z = (truHaoGoc + DDTBia) * -1;
    nepTruoc3.position.x = depth - DDTBia;
    nepTruoc3.position.y = height - caoXTruoc;

    const lenZ = rongK2 - truHaoGoc - 2 * DDTBia;
    const lenX = DDTBia;
    const lenY = caoXTruoc;

    nepTruoc3.scale.set(1, 1, 1);

    let boundingBoxXTruoc2 = new THREE.Box3().setFromObject(nepTruoc3);
    const sizeXTruoc2 = new THREE.Vector3();
    boundingBoxXTruoc2.getSize(sizeXTruoc2);

    nepTruoc3.scale.x = lenX / sizeXTruoc2.x;
    nepTruoc3.scale.y = lenY / sizeXTruoc2.y;
    nepTruoc3.scale.z = lenZ / sizeXTruoc2.z;
  };

  const settingNepTruoc4 = (nepTruoc4) => {
    nepTruoc4.position.z = (truHaoGoc + DDTBia) * -1;
    nepTruoc4.position.x = depth - 2 * DDTBia;
    nepTruoc4.position.y = height - caoXTruoc;

    const lenZ = rongK2 - truHaoGoc - 2 * DDTBia;
    const lenX = DDTBia;
    const lenY = caoXTruoc;

    nepTruoc4.scale.set(1, 1, 1);

    let boundingBoxXTruoc2 = new THREE.Box3().setFromObject(nepTruoc4);
    const sizeXTruoc2 = new THREE.Vector3();
    boundingBoxXTruoc2.getSize(sizeXTruoc2);

    nepTruoc4.scale.x = lenX / sizeXTruoc2.x;
    nepTruoc4.scale.y = lenY / sizeXTruoc2.y;
    nepTruoc4.scale.z = lenZ / sizeXTruoc2.z;
  };

  const settingNepSau1 = (nepSau1) => {
    nepSau1.position.z = DDTHau * -1;
    nepSau1.position.x = depth + 2 * DDTBia + truHaoGoc;
    nepSau1.position.y = height - caoXTruoc;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth - 3 * DDTBia - truHaoGoc;
    const lenY = caoXTruoc;

    nepSau1.scale.set(1, 1, 1);
    let boundingBoxXTruoc1 = new THREE.Box3().setFromObject(nepSau1);
    const sizeXTruoc1 = new THREE.Vector3();
    boundingBoxXTruoc1.getSize(sizeXTruoc1);

    nepSau1.scale.x = lenX / sizeXTruoc1.x;
    nepSau1.scale.y = lenY / sizeXTruoc1.y;
    nepSau1.scale.z = lenZ / sizeXTruoc1.z;
  };

  const settingNepSau2 = (nepSau3) => {
    nepSau3.position.z = (truHaoGoc + DDTBia) * -1;
    nepSau3.position.x = DDTHau;
    nepSau3.position.y = height - caoXTruoc;

    const lenZ = rongK2 - truHaoGoc - 2 * DDTBia;
    const lenX = DDTBia;
    const lenY = caoXTruoc;

    nepSau3.scale.set(1, 1, 1);

    let boundingBoxXTruoc2 = new THREE.Box3().setFromObject(nepSau3);
    const sizeXTruoc2 = new THREE.Vector3();
    boundingBoxXTruoc2.getSize(sizeXTruoc2);

    nepSau3.scale.x = lenX / sizeXTruoc2.x;
    nepSau3.scale.y = lenY / sizeXTruoc2.y;
    nepSau3.scale.z = lenZ / sizeXTruoc2.z;
  };

  const settingBa1 = (ba1) => {
    ba1.position.z = depth * -1;
    ba1.position.x = depth + DDTBia;
    ba1.position.y = 0;

    const lenZ = DDTBia;
    const lenX = truHaoGoc;
    const lenY = height - 0.02;

    ba1.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(ba1);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    ba1.scale.x = lenX / sizeXSau.x;
    ba1.scale.y = lenY / sizeXSau.y;
    ba1.scale.z = lenZ / sizeXSau.z;
  };

  const settingMatCoDinh = (mcd) => {
    mcd.position.z = truHaoGoc * -1;
    mcd.position.x = depth;
    mcd.position.y = 0;

    const lenZ = depth + DDTBia;
    const lenX = DDTBia;
    const lenY = height - 0.02;

    mcd.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(mcd);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    mcd.scale.x = lenX / sizeXSau.x;
    mcd.scale.y = lenY / sizeXSau.y;
    mcd.scale.z = lenZ / sizeXSau.z;
  };

  const settingXan1 = (xan1) => {
    xan1.position.z = (depth + DDTBia + truHaoGoc - 0.008) * -1;
    xan1.position.x = depth - 0.08;
    xan1.position.y = caoChan + DDTBia;

    const lenZ = DDTBia;
    const lenX = 0.08;
    const lenY = height - caoChan - DDTBia - caoXTruoc;

    xan1.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(xan1);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    xan1.scale.x = lenX / sizeXSau.x;
    xan1.scale.y = lenY / sizeXSau.y;
    xan1.scale.z = lenZ / sizeXSau.z;
  };

  const settingXan2 = (xan2) => {
    xan2.position.z = (depth + DDTBia + truHaoGoc - 0.008) * -1;
    xan2.position.x = depth - 0.08;
    xan2.position.y = height - caoXTruoc;

    const lenZ = DDTBia;
    const lenX = 0.08 - 2 * DDTBia;
    const lenY = caoXTruoc;

    xan2.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(xan2);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    xan2.scale.x = lenX / sizeXSau.x;
    xan2.scale.y = lenY / sizeXSau.y;
    xan2.scale.z = lenZ / sizeXSau.z;
  };

  const settingXanNgang1 = (xNgang1) => {
    xNgang1.position.z = DDTHau * -1;
    xNgang1.position.x = depth + 2 * DDTBia + truHaoGoc;
    xNgang1.position.y = (height - caoChan - caoXTruoc) / 2 + caoChan;

    const lenZ = depth - DDTHau;
    const lenX = rongK1 - depth - 3 * DDTBia - truHaoGoc;
    const lenY = DDTBia;

    xNgang1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(xNgang1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    xNgang1.scale.x = lenX / sizeDay.x;
    xNgang1.scale.y = lenY / sizeDay.y;
    xNgang1.scale.z = lenZ / sizeDay.z;
  };

  const settingXanNgang2 = (xNgang2) => {
    xNgang2.position.z = (truHaoGoc + DDTBia) * -1;
    xNgang2.position.x = DDTHau;
    xNgang2.position.y = (height - caoChan - caoXTruoc) / 2 + caoChan;

    const lenZ = rongK2 - truHaoGoc - 2 * DDTBia;
    const lenX = depth - DDTHau;
    const lenY = DDTBia;

    xNgang2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(xNgang2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    xNgang2.scale.x = lenX / sizeDay.x;
    xNgang2.scale.y = lenY / sizeDay.y;
    xNgang2.scale.z = lenZ / sizeDay.z;
  };

  const settingCua1 = (cua1) => {
    cua1.position.z = depth * -1;
    cua1.position.x =
      depth + DDTBia + truHaoGoc + (rongK1 - depth - DDTBia - truHaoGoc) / 2;
    cua1.position.y = caoChan;

    const lenZ = DDTBia;
    const lenX = (rongK1 - depth - DDTBia - truHaoGoc) / 2;
    const lenY = height - caoChan - 0.02;

    cua1.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(cua1);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    cua1.scale.x = lenX / sizeXSau.x;
    cua1.scale.y = lenY / sizeXSau.y;
    cua1.scale.z = lenZ / sizeXSau.z;
  };

  const settingCua2 = (cua2) => {
    cua2.position.z = depth * -1;
    cua2.position.x = depth + DDTBia + truHaoGoc;
    cua2.position.y = caoChan;

    const lenZ = DDTBia;
    const lenX = (rongK1 - depth - DDTBia - truHaoGoc) / 2;
    const lenY = height - caoChan - 0.02;

    cua2.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(cua2);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    cua2.scale.x = lenX / sizeXSau.x;
    cua2.scale.y = lenY / sizeXSau.y;
    cua2.scale.z = lenZ / sizeXSau.z;
  };

  const settingCua3 = (cua3) => {
    cua3.position.z = (depth + DDTBia + truHaoGoc) * -1;
    cua3.position.x = depth;
    cua3.position.y = caoChan;

    const lenZ = rongK2 - truHaoGoc - depth - DDTBia;
    const lenX = DDTBia;
    const lenY = height - caoChan - 0.02;

    cua3.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(cua3);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    cua3.scale.x = lenX / sizeXSau.x;
    cua3.scale.y = lenY / sizeXSau.y;
    cua3.scale.z = lenZ / sizeXSau.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/TBDGL1-FULL.glb', (gltfScene) => {
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

          // Thêm opacity
          child.material.opacity = 1;
          child.material.transparent = true; // Bắt buộc phải có để opacity hoạt động
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

      const day1 = md.getObjectByName('DAY-1');
      const day2 = md.getObjectByName('DAY-2');
      const hau1 = md.getObjectByName('HAU-1');
      const hau2 = md.getObjectByName('HAU-2');
      const bia1 = md.getObjectByName('BIA-1');
      const bia2 = md.getObjectByName('BIA-2');
      const bia3 = md.getObjectByName('BIA-3');
      const bia4 = md.getObjectByName('BIA-4');
      const cTruoc1 = md.getObjectByName('CHAN-TRUOC-1');
      const cTruoc2 = md.getObjectByName('CHAN-TRUOC-2');

      const nepTruoc1 = md.getObjectByName('NEP-TRUOC-1');
      const nepTruoc2 = md.getObjectByName('NEP-TRUOC-2');
      const nepTruoc3 = md.getObjectByName('NEP-TRUOC-3');
      const nepTruoc4 = md.getObjectByName('NEP-TRUOC-4');

      const nepSau1 = md.getObjectByName('NEP-SAU-1');
      const nepSau2 = md.getObjectByName('NEP-SAU-2');

      const ba1 = md.getObjectByName('BA-1');
      const xan1 = md.getObjectByName('XAN-1-1');
      const xan2 = md.getObjectByName('XAN-1-2');
      const matCoDinh = md.getObjectByName('MAT-CO-DINH');

      const xNgang1 = md.getObjectByName('XAN-NGANG-1');
      const xNgang2 = md.getObjectByName('XAN-NGANG-2');
      const cua1 = md.getObjectByName('DOOR-1');
      const cua2 = md.getObjectByName('DOOR-2');
      const cua3 = md.getObjectByName('DOOR-3');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day1 && settingDay1(day1);
      day2 && settingDay2(day2);
      hau1 && settingHau1(hau1);
      hau2 && settingHau2(hau2);
      bia1 && settingBia1(bia1);
      bia2 && settingBia2(bia2);
      bia3 && settingBia3(bia3);
      bia4 && settingBia4(bia4);

      cTruoc1 && settingChanTruoc1(cTruoc1);
      cTruoc2 && settingChanTruoc2(cTruoc2);

      nepTruoc1 && settingNepTruoc1(nepTruoc1);
      nepTruoc2 && settingNepTruoc2(nepTruoc2);
      nepTruoc3 && settingNepTruoc3(nepTruoc3);
      nepTruoc4 && settingNepTruoc4(nepTruoc4);

      nepSau1 && settingNepSau1(nepSau1);
      nepSau2 && settingNepSau2(nepSau2);

      ba1 && settingBa1(ba1);
      xan1 && settingXan1(xan1);
      xan2 && settingXan2(xan2);
      matCoDinh && settingMatCoDinh(matCoDinh);

      xNgang1 && settingXanNgang1(xNgang1);
      xNgang2 && settingXanNgang2(xNgang2);
      cua1 && settingCua1(cua1);
      cua2 && settingCua2(cua2);
      cua3 && settingCua3(cua3);

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
      }, 100);
    }
  }, [
    display,
    optionDay,
    optionSauDay,
    optionHau,
    optionXTruoc,
    optionXSau,
    rongK1,
    rongK2,
    truHaoGoc,
    width,
    height,
    depth,
    luiHau,
    ngamHau,
    caoChan,
    caoXTruoc,
    caoXSau,
    fixDay,
    luiChan,
    fixBiaTrai,
    fixBiaPhai,
    DDTBia,
    DDTHau,
    DDTBiaTrai,
    DDTBiaPhai,
    DDTChan,
    DDTXTruoc,
    DDTXSau,
    gltfUuid,
  ]);

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
          <label className="label" htmlFor="rongK1">
            Rộng K1 (mm):
          </label>
          <input
            className="input"
            type="number"
            name="rongK1"
            id="rongK1"
            defaultValue={rongK1 * 1000}
            onChange={(e) => {
              setRongK1(Number(e.target.value) / 1000);
            }}
          />
          <br />
          <label className="label" htmlFor="width">
            Rộng K2 (mm):
          </label>
          <input
            className="input"
            type="number"
            name="rongK2"
            id="rongK2"
            defaultValue={rongK2 * 1000}
            onChange={(e) => {
              setRongK2(Number(e.target.value) / 1000);
            }}
          />
          {/* <input
            className="input"
            type="number"
            name="width"
            id="width"
            defaultValue={width * 1000}
            onChange={(e) => {
              setWidth(Number(e.target.value) / 1000);
            }}
          /> */}
          <br />
          <label className="label" htmlFor="rongK2">
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
          <br />
          <label className="label" htmlFor="truHaoGoc">
            Trừ hao góc (mm):
          </label>
          <input
            className="input"
            type="number"
            name="truHaoGoc"
            id="truHaoGoc"
            defaultValue={truHaoGoc * 1000}
            onChange={(e) => {
              setTruHaoGoc(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Xương trước:</h5>
        <div>
          <select
            className="select"
            onChange={(e) => setOptionXTruoc(Number(e.target.value))}
          >
            <option value={0}>2 Dọc</option>
            <option value={1}>2 Ngang</option>
            <option value={2}>1 Dọc, 1 Ngang</option>
          </select>

          <br />
          <label className="label" htmlFor="DDTHau">
            Độ dày tấm xương trước (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTXuongTruoc"
            id="DDTXuongTruoc"
            defaultValue={DDTXTruoc * 1000}
            onChange={(e) => {
              setDDTXTruoc(Number(e.target.value) / 1000);
            }}
          />

          <br />
          <label className="label" htmlFor="caoChan">
            Chiều cao xương trước (mm):
          </label>
          <input
            className="input"
            type="number"
            name="caoXTruoc"
            id="caoXTruoc"
            defaultValue={caoXTruoc * 1000}
            onChange={(e) => {
              setCaoXTruoc(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Xương sau:</h5>
        <div>
          <select
            className="select"
            onChange={(e) => setOptionXSau(Number(e.target.value))}
          >
            <option value={0}>Dọc</option>
            <option value={1}>Ngang</option>
          </select>

          <br />
          <label className="label" htmlFor="DDTHau">
            Độ dày tấm xương sau (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTXuongSau"
            id="DDTXuongSau"
            defaultValue={DDTXSau * 1000}
            onChange={(e) => {
              setDDTXSau(Number(e.target.value) / 1000);
            }}
          />

          <br />
          <label className="label" htmlFor="caoChan">
            Chiều cao xương sau (mm):
          </label>
          <input
            className="input"
            type="number"
            name="caoXSau"
            id="caoXSau"
            defaultValue={caoXSau * 1000}
            onChange={(e) => {
              setCaoXSau(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Đáy:</h5>
        <div>
          <select
            className="select"
            onChange={(e) => setOptionDay(Number(e.target.value))}
          >
            <option value={0}>Phủ Bì</option>
            <option value={1}>Lọt Lòng</option>
          </select>
          <br />
          <select
            className="select"
            onChange={(e) => setOptionSauDay(Number(e.target.value))}
          >
            <option value={0}>Đáy Theo Bìa</option>
            <option value={1}>Đáy Theo Hậu</option>
          </select>
          <br />
          <label className="label" htmlFor="DDTBia">
            Độ dày tấm đáy (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTBia"
            id="DDTBia"
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
            }}
          />
          <br />
          <label className="label" htmlFor="fixDay">
            Tăng/giảm đáy (mm):
          </label>
          <input
            className="input"
            type="number"
            name="fixDay"
            id="fixDay"
            defaultValue={fixDay * 1000}
            onChange={(e) => {
              setFixDay(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Hậu:</h5>
        <div>
          <select
            className="select"
            onChange={(e) => setOptionHau(Number(e.target.value))}
          >
            <option value={0}>Hậu Phủ Bì</option>
            <option value={1}>Hậu Âm Tủ</option>
          </select>
          <br />
          <label className="label" htmlFor="DDTHau">
            Độ dày tấm hậu (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTHau"
            id="DDTHau"
            defaultValue={DDTHau * 1000}
            onChange={(e) => {
              setDDTHau(Number(e.target.value) / 1000);
            }}
          />
          {optionHau === 1 && (
            <div>
              <label className="label" htmlFor="luiHau">
                Lùi Hậu (mm):
              </label>
              <input
                className="input"
                type="number"
                name="luiHau"
                id="luiHau"
                defaultValue={luiHau * 1000}
                onChange={(e) => {
                  setLuiHau(Number(e.target.value) / 1000);
                }}
              />
              <br />
              <label className="label" htmlFor="ngamHau">
                Ngậm Hậu (mm):
              </label>
              <input
                className="input"
                type="number"
                name="ngamHau"
                id="ngamHau"
                defaultValue={ngamHau * 1000}
                onChange={(e) => {
                  setNgamHau(Number(e.target.value) / 1000);
                }}
              />
            </div>
          )}
        </div>

        <h5 className="header">Chân:</h5>
        <div>
          <label className="label" htmlFor="DDTChan">
            Độ dày tấm chân (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTChan"
            id="DDTChan"
            defaultValue={DDTChan * 1000}
            onChange={(e) => {
              setDDTChan(Number(e.target.value) / 1000);
            }}
          />
          <br />

          <label className="label" htmlFor="caoChan">
            Chiều cao chân tủ (mm):
          </label>
          <input
            className="input"
            type="number"
            name="caoChan"
            id="caoChan"
            defaultValue={caoChan * 1000}
            onChange={(e) => {
              setCaoChan(Number(e.target.value) / 1000);
            }}
          />
          <br />

          <label className="label" htmlFor="luiChan">
            Lùi chân trước (mm):
          </label>
          <input
            className="input"
            type="number"
            name="luiChan"
            id="luiChan"
            defaultValue={luiChan * 1000}
            onChange={(e) => {
              setLuiChan(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Bìa Trái:</h5>
        <div>
          <label className="label" htmlFor="HideBiaTrai">
            Ẩn/hiện:
          </label>
          <input
            type="checkbox"
            name="showLine"
            id="HideBiaTrai"
            checked={visibleBT}
            onChange={() => {
              handleHide('BIA-TRAI', !visibleBT);
              setVisibleBT(!visibleBT);
            }}
          />
          <br />

          <label className="label" htmlFor="DDTBiaTrai">
            Độ dày tấm bìa trái (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTBiaTrai"
            id="DDTBiaTrai"
            defaultValue={DDTBiaTrai * 1000}
            onChange={(e) => {
              setDDTBiaTrai(Number(e.target.value) / 1000);
            }}
          />
          <br />

          <label className="label" htmlFor="fixBiaTrai">
            Tăng/giảm bìa trái (mm):
          </label>
          <input
            className="input"
            type="number"
            name="fixBiaTrai"
            id="fixBiaTrai"
            defaultValue={fixBiaTrai * 1000}
            onChange={(e) => {
              setFixBiaTrai(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Bìa Phải:</h5>
        <div>
          <label className="label" htmlFor="HideBiaPhai">
            Ẩn/hiện:
          </label>
          <input
            type="checkbox"
            name="showLine"
            id="HideBiaPhai"
            checked={visibleBP}
            onChange={() => {
              handleHide('BIA-PHAI', !visibleBP);
              setVisibleBP(!visibleBP);
            }}
          />
          <br />

          <label className="label" htmlFor="DDTBiaPhai">
            Độ dày tấm bìa phải (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTBiaPhai"
            id="DDTBiaPhai"
            defaultValue={DDTBiaPhai * 1000}
            onChange={(e) => {
              setDDTBiaPhai(Number(e.target.value) / 1000);
            }}
          />
          <br />

          <label className="label" htmlFor="fixBiaPhai">
            Tăng/giảm bìa phải (mm):
          </label>
          <input
            className="input"
            type="number"
            name="fixBiaPhai"
            id="fixBiaPhai"
            defaultValue={fixBiaPhai * 1000}
            onChange={(e) => {
              setFixBiaPhai(Number(e.target.value) / 1000);
            }}
          />
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App3;
