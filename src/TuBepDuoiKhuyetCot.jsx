import React, { useEffect, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import SceneInit from './lib/SceneInit';

import './App.css';

let display;

let listBox = [];

function App2() {
  const [gltfUuid, setGltfUuid] = useState(null);

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(0.79);
  const [depth, setDepth] = useState(0.578);

  const [luiHau, setLuiHau] = useState(0.01);
  const [ngamHau, setNgamHau] = useState(0.005);
  const [luiChan, setLuiChan] = useState(0);
  const [caoChan, setCaoChan] = useState(0.1);
  const [caoXTruoc, setCaoXTruoc] = useState(0.09);

  const [optionDay, setOptionDay] = useState(0);
  const [optionNoc, setOptionNoc] = useState(0);
  const [optionHau, setOptionHau] = useState(0);
  const [optionSauDay, setOptionSauDay] = useState(0);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);
  const [DDTMat, setDDTMat] = useState(0.02);
  const [DDTVach, setDDTVach] = useState(0.005);

  const [caoVach, setCaoVach] = useState(0.65);

  const [KCCot, setKCCot] = useState(0.3);
  const [dayCot, setDayCot] = useState(0.15);
  const [rongCot, setRongCot] = useState(0.25);

  const [fixNoc, setFixNoc] = useState(0);
  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay1 = (day1) => {
    day1.position.z = 0 * -1;

    day1.position.y = caoChan;

    day1.position.x = DDTHau;

    const lenZ = KCCot > DDTBia ? KCCot : 0;

    const lenX = KCCot > DDTBia ? depth - DDTHau : 0;

    const lenY = KCCot > DDTBia ? DDTBia : 0;

    day1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day1.scale.x = lenX / sizeDay.x;
    day1.scale.y = lenY / sizeDay.y;
    day1.scale.z = lenZ / sizeDay.z;
  };

  const settingDay2 = (day2) => {
    day2.position.z = KCCot > DDTBia ? KCCot * -1 : 0;

    day2.position.y = caoChan;

    day2.position.x = dayCot;

    const lenZ = rongCot;

    const lenX = depth - dayCot;

    const lenY = DDTBia;

    day2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day2.scale.x = lenX / sizeDay.x;
    day2.scale.y = lenY / sizeDay.y;
    day2.scale.z = lenZ / sizeDay.z;
  };

  const settingDay3 = (day3) => {
    day3.position.z = ((KCCot > DDTBia ? KCCot : 0) + rongCot) * -1;

    day3.position.y = caoChan;

    day3.position.x = DDTHau;

    const lenZ =
      KCCot < width - rongCot
        ? width - (KCCot > DDTBia ? KCCot : 0) - rongCot
        : 0;

    const lenX = KCCot < width - rongCot ? depth - DDTHau : 0;

    const lenY = KCCot < width - rongCot ? DDTBia : 0;

    day3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day3.scale.x = lenX / sizeDay.x;
    day3.scale.y = lenY / sizeDay.y;
    day3.scale.z = lenZ / sizeDay.z;
  };

  const settingHau1 = (hau1) => {
    hau1.position.z = 0 * -1;

    hau1.position.x = 0;

    hau1.position.y = caoChan;

    const lenZ = KCCot > DDTBia ? KCCot : 0;

    const lenX = KCCot > DDTBia ? DDTHau : 0;

    const lenY = KCCot > DDTBia ? height - caoChan : 0;

    hau1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau1.scale.x = lenX / sizeHau.x;
    hau1.scale.y = lenY / sizeHau.y;
    hau1.scale.z = lenZ / sizeHau.z;
  };

  const settingHau2 = (hau2) => {
    hau2.position.z = KCCot > DDTBia ? (KCCot - DDTBia) * -1 : 0;

    hau2.position.x = dayCot;

    hau2.position.y = caoChan + DDTBia;

    const lenZ =
      KCCot > DDTBia
        ? KCCot < width - rongCot
          ? rongCot + DDTBia + DDTBia
          : rongCot + DDTBia
        : rongCot + DDTBia;

    const lenX = DDTBia;

    const lenY = height - caoChan - DDTBia;

    hau2.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau2);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau2.scale.x = lenX / sizeHau.x;
    hau2.scale.y = lenY / sizeHau.y;
    hau2.scale.z = lenZ / sizeHau.z;
  };

  const settingHau3 = (hau3) => {
    hau3.position.z = ((KCCot > DDTBia ? KCCot : 0) + rongCot) * -1;

    hau3.position.x = 0;

    hau3.position.y = caoChan;

    const lenZ =
      KCCot < width - rongCot
        ? width - (KCCot > DDTBia ? KCCot : 0) - rongCot
        : 0;

    const lenX = KCCot < width - rongCot ? DDTHau : 0;

    const lenY = KCCot < width - rongCot ? height - caoChan : 0;

    hau3.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau3);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau3.scale.x = lenX / sizeHau.x;
    hau3.scale.y = lenY / sizeHau.y;
    hau3.scale.z = lenZ / sizeHau.z;
  };

  const settingBia1 = (bia1) => {
    bia1.position.z = 0 * -1;

    bia1.position.x = KCCot > DDTBia ? DDTHau : dayCot + DDTBia;

    bia1.position.y = caoChan + DDTBia;

    const lenZ = DDTBia;

    const lenX = KCCot > DDTBia ? depth - DDTHau : depth - dayCot - DDTBia;

    const lenY = height - caoChan - DDTBia;

    bia1.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia1.scale.x = lenX / sizeBiaTrai.x;
    bia1.scale.y = lenY / sizeBiaTrai.y;
    bia1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia2 = (bia2) => {
    bia2.position.z = (width - DDTBia) * -1;

    bia2.position.x = KCCot < width - rongCot ? DDTHau : dayCot + DDTBia;

    bia2.position.y = caoChan + DDTBia;

    const lenZ = DDTBia;

    const lenX =
      KCCot < width - rongCot ? depth - DDTHau : depth - dayCot - DDTBia;

    const lenY = height - caoChan - DDTBia;

    bia2.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia2.scale.x = lenX / sizeBiaTrai.x;
    bia2.scale.y = lenY / sizeBiaTrai.y;
    bia2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia3 = (bia3) => {
    bia3.position.z = KCCot > DDTBia ? (KCCot - DDTBia) * -1 : 0 * -1;

    bia3.position.x = DDTHau;

    bia3.position.y = caoChan + DDTBia;

    const lenZ = KCCot > DDTBia ? DDTBia : 0;

    const lenX = KCCot > DDTBia ? dayCot - DDTHau : 0;

    const lenY = height - caoChan - DDTBia;

    bia3.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia3);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia3.scale.x = lenX / sizeBiaTrai.x;
    bia3.scale.y = lenY / sizeBiaTrai.y;
    bia3.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia4 = (bia4) => {
    bia4.position.z = KCCot > DDTBia ? (KCCot + rongCot) * -1 : rongCot * -1;

    bia4.position.x = DDTHau;

    bia4.position.y = caoChan + DDTBia;

    const lenZ = KCCot < width - rongCot ? DDTBia : 0;

    const lenX = KCCot < width - rongCot ? dayCot - DDTHau : 0;

    const lenY = height - caoChan - DDTBia;

    bia4.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia4);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia4.scale.x = lenX / sizeBiaTrai.x;
    bia4.scale.y = lenY / sizeBiaTrai.y;
    bia4.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingChan = (chan) => {
    chan.position.z = 0 * -1;

    chan.position.x = depth - DDTBia;

    chan.position.y = 0;

    const lenZ = width;

    const lenX = DDTBia;

    const lenY = caoChan;

    chan.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(chan);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    chan.scale.x = lenX / sizeChanTruoc.x;
    chan.scale.y = lenY / sizeChanTruoc.y;
    chan.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingXuongTruoc1 = (xTruoc1) => {
    xTruoc1.position.z = DDTBia * -1;

    xTruoc1.position.x = depth - DDTBia;

    xTruoc1.position.y = height - caoXTruoc;

    const lenZ = width - 2 * DDTBia;

    const lenX = DDTBia;

    const lenY = caoXTruoc;

    xTruoc1.scale.set(1, 1, 1);
    xTruoc1.rotation.z = 0;
    let boundingBoxXTruoc1 = new THREE.Box3().setFromObject(xTruoc1);
    const sizeXTruoc1 = new THREE.Vector3();
    boundingBoxXTruoc1.getSize(sizeXTruoc1);

    xTruoc1.scale.x = lenX / sizeXTruoc1.x;
    xTruoc1.scale.y = lenY / sizeXTruoc1.y;
    xTruoc1.scale.z = lenZ / sizeXTruoc1.z;
  };

  const settingXuongTruoc2 = (xTruoc2) => {
    xTruoc2.position.z = DDTBia * -1;

    xTruoc2.position.x = depth - DDTBia * 2;

    xTruoc2.position.y = height - caoXTruoc;

    const lenZ = width - 2 * DDTBia;

    const lenX = DDTBia;

    const lenY = caoXTruoc;

    xTruoc2.scale.set(1, 1, 1);
    xTruoc2.rotation.z = 0;
    let boundingBoxXTruoc2 = new THREE.Box3().setFromObject(xTruoc2);
    const sizeXTruoc2 = new THREE.Vector3();
    boundingBoxXTruoc2.getSize(sizeXTruoc2);

    xTruoc2.scale.x = lenX / sizeXTruoc2.x;
    xTruoc2.scale.y = lenY / sizeXTruoc2.y;
    xTruoc2.scale.z = lenZ / sizeXTruoc2.z;
  };

  const settingXuongSau1 = (xuongSau1) => {
    xuongSau1.position.z = DDTBia * -1;

    xuongSau1.position.x = DDTHau;

    xuongSau1.position.y = height - caoXTruoc;

    const lenZ = KCCot > DDTBia ? KCCot - DDTBia - DDTBia : 0;

    const lenX = KCCot > DDTBia ? DDTBia : 0;

    const lenY = KCCot > DDTBia ? caoXTruoc : 0;

    xuongSau1.scale.set(1, 1, 1);
    let boundingBoxNoc = new THREE.Box3().setFromObject(xuongSau1);
    const sizeNoc = new THREE.Vector3();
    boundingBoxNoc.getSize(sizeNoc);

    xuongSau1.scale.x = lenX / sizeNoc.x;
    xuongSau1.scale.y = lenY / sizeNoc.y;
    xuongSau1.scale.z = lenZ / sizeNoc.z;
  };

  const settingXuongSau2 = (xuongSau2) => {
    xuongSau2.position.z =
      ((KCCot > DDTBia ? KCCot : 0) + rongCot + DDTBia) * -1;

    xuongSau2.position.y = height - caoXTruoc;

    xuongSau2.position.x = DDTHau;

    const lenZ =
      KCCot < width - rongCot
        ? width - (KCCot > DDTBia ? KCCot : 0) - rongCot - DDTBia - DDTBia
        : 0;

    const lenX = KCCot < width - rongCot ? DDTBia : 0;

    const lenY = KCCot < width - rongCot ? caoXTruoc : 0;

    xuongSau2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(xuongSau2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    xuongSau2.scale.x = lenX / sizeDay.x;
    xuongSau2.scale.y = lenY / sizeDay.y;
    xuongSau2.scale.z = lenZ / sizeDay.z;
  };

  const settingMatDa1 = (matDa1) => {
    matDa1.position.z = 0 * -1;

    matDa1.position.y = height;

    matDa1.position.x = 0;

    const lenZ = KCCot > DDTBia ? KCCot : 0;

    const lenX = KCCot > DDTBia ? depth + DDTMat : 0;

    const lenY = KCCot > DDTBia ? DDTMat : 0;

    matDa1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(matDa1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    matDa1.scale.x = lenX / sizeDay.x;
    matDa1.scale.y = lenY / sizeDay.y;
    matDa1.scale.z = lenZ / sizeDay.z;
  };

  const settingMatDa2 = (matDa2) => {
    matDa2.position.z = KCCot > DDTBia ? KCCot * -1 : 0;

    matDa2.position.y = height;

    matDa2.position.x = dayCot;

    const lenZ = rongCot;

    const lenX = depth - dayCot + DDTMat;

    const lenY = DDTMat;

    matDa2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(matDa2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    matDa2.scale.x = lenX / sizeDay.x;
    matDa2.scale.y = lenY / sizeDay.y;
    matDa2.scale.z = lenZ / sizeDay.z;
  };

  const settingMatDa3 = (matDa3) => {
    matDa3.position.z = ((KCCot > DDTBia ? KCCot : 0) + rongCot) * -1;

    matDa3.position.y = height;

    matDa3.position.x = 0;

    const lenZ =
      KCCot < width - rongCot
        ? width - (KCCot > DDTBia ? KCCot : 0) - rongCot
        : 0;

    const lenX = KCCot < width - rongCot ? depth + DDTMat : 0;

    const lenY = KCCot < width - rongCot ? DDTMat : 0;

    matDa3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(matDa3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    matDa3.scale.x = lenX / sizeDay.x;
    matDa3.scale.y = lenY / sizeDay.y;
    matDa3.scale.z = lenZ / sizeDay.z;
  };

  const settingVachBep1 = (vachBep1) => {
    vachBep1.position.z = 0 * -1;

    vachBep1.position.x = 0;

    vachBep1.position.y = height + DDTMat;

    const lenZ = KCCot > DDTBia ? KCCot : 0;

    const lenX = KCCot > DDTBia ? DDTVach : 0;

    const lenY = KCCot > DDTBia ? caoVach : 0;

    vachBep1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(vachBep1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    vachBep1.scale.x = lenX / sizeHau.x;
    vachBep1.scale.y = lenY / sizeHau.y;
    vachBep1.scale.z = lenZ / sizeHau.z;
  };

  const settingVachBep2 = (vachBep2) => {
    vachBep2.position.z = KCCot > DDTBia ? (KCCot - DDTVach) * -1 : 0 * -1;

    vachBep2.position.x = DDTVach;

    vachBep2.position.y = height + DDTMat;

    const lenZ = KCCot > DDTBia ? DDTVach : 0;

    const lenX = KCCot > DDTBia ? dayCot - DDTVach : 0;

    const lenY = caoVach;

    vachBep2.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(vachBep2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    vachBep2.scale.x = lenX / sizeBiaTrai.x;
    vachBep2.scale.y = lenY / sizeBiaTrai.y;
    vachBep2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingVachBep3 = (vachBep3) => {
    vachBep3.position.z = KCCot > DDTBia ? (KCCot - DDTVach) * -1 : 0;

    vachBep3.position.x = dayCot;

    vachBep3.position.y = height + DDTMat;

    const lenZ =
      KCCot > DDTBia
        ? KCCot < width - rongCot
          ? rongCot + DDTVach + DDTVach
          : rongCot + DDTVach
        : rongCot + DDTVach;

    const lenX = DDTVach;

    const lenY = caoVach;

    vachBep3.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(vachBep3);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    vachBep3.scale.x = lenX / sizeHau.x;
    vachBep3.scale.y = lenY / sizeHau.y;
    vachBep3.scale.z = lenZ / sizeHau.z;
  };

  const settingVachBep4 = (vachBep4) => {
    vachBep4.position.z =
      KCCot > DDTBia ? (KCCot + rongCot) * -1 : rongCot * -1;

    vachBep4.position.x = DDTVach;

    vachBep4.position.y = height + DDTMat;

    const lenZ = KCCot < width - rongCot ? DDTVach : 0;

    const lenX = KCCot < width - rongCot ? dayCot - DDTVach : 0;

    const lenY = caoVach;

    vachBep4.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(vachBep4);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    vachBep4.scale.x = lenX / sizeBiaTrai.x;
    vachBep4.scale.y = lenY / sizeBiaTrai.y;
    vachBep4.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingVachBep5 = (vachBep5) => {
    vachBep5.position.z = ((KCCot > DDTBia ? KCCot : 0) + rongCot) * -1;

    vachBep5.position.x = 0;

    vachBep5.position.y = height + DDTMat;

    const lenZ =
      KCCot < width - rongCot
        ? width - (KCCot > DDTBia ? KCCot : 0) - rongCot
        : 0;

    const lenX = KCCot < width - rongCot ? DDTVach : 0;

    const lenY = KCCot < width - rongCot ? caoVach : 0;

    vachBep5.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(vachBep5);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    vachBep5.scale.x = lenX / sizeHau.x;
    vachBep5.scale.y = lenY / sizeHau.y;
    vachBep5.scale.z = lenZ / sizeHau.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/TBD-COT.glb', (gltfScene) => {
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
          child.material.opacity = 0.4;
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
      // md.position.set(-depth / 2, -height / 2, width / 2);

      const day1 = md.getObjectByName('DAY-1');
      const day2 = md.getObjectByName('DAY-2');
      const day3 = md.getObjectByName('DAY-3');

      const bia1 = md.getObjectByName('BIA-1');
      const bia2 = md.getObjectByName('BIA-2');
      const bia3 = md.getObjectByName('BIA-3');
      const bia4 = md.getObjectByName('BIA-4');

      const hau1 = md.getObjectByName('HAU-1');
      const hau2 = md.getObjectByName('HAU-2');
      const hau3 = md.getObjectByName('HAU-3');

      const xuongSau1 = md.getObjectByName('XUONG-SAU-1');
      const xuongSau2 = md.getObjectByName('XUONG-SAU-2');

      const xuongTruoc1 = md.getObjectByName('XUONG-TRUOC-1');
      const xuongTruoc2 = md.getObjectByName('XUONG-TRUOC-2');

      const chan = md.getObjectByName('CHAN');

      const matDa1 = md.getObjectByName('MAT-DA-1');
      const matDa2 = md.getObjectByName('MAT-DA-2');
      const matDa3 = md.getObjectByName('MAT-DA-3');

      const vachBep1 = md.getObjectByName('VACH-BEP-1');
      const vachBep2 = md.getObjectByName('VACH-BEP-2');
      const vachBep3 = md.getObjectByName('VACH-BEP-3');
      const vachBep4 = md.getObjectByName('VACH-BEP-4');
      const vachBep5 = md.getObjectByName('VACH-BEP-5');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day1 && settingDay1(day1);
      day2 && settingDay2(day2);
      day3 && settingDay3(day3);

      bia1 && settingBia1(bia1);
      bia2 && settingBia3(bia2);
      bia3 && settingBia4(bia3);
      bia4 && settingBia2(bia4);

      hau1 && settingHau1(hau1);
      hau2 && settingHau2(hau2);
      hau3 && settingHau3(hau3);

      xuongTruoc1 && settingXuongTruoc1(xuongTruoc1);
      xuongTruoc2 && settingXuongTruoc2(xuongTruoc2);

      xuongSau1 && settingXuongSau1(xuongSau1);
      xuongSau2 && settingXuongSau2(xuongSau2);

      chan && settingChan(chan);

      matDa1 && settingMatDa1(matDa1);
      matDa2 && settingMatDa2(matDa2);
      matDa3 && settingMatDa3(matDa3);

      vachBep1 && settingVachBep1(vachBep1);
      vachBep2 && settingVachBep2(vachBep2);
      vachBep3 && settingVachBep3(vachBep3);
      vachBep4 && settingVachBep4(vachBep4);
      vachBep5 && settingVachBep5(vachBep5);

      setTimeout(() => {
        handleResetBox();
      }, 10);
    }
  }, [
    display,
    optionNoc,
    optionDay,
    optionSauDay,
    optionHau,
    width,
    height,
    depth,
    luiHau,
    ngamHau,
    caoChan,
    fixNoc,
    fixDay,
    luiChan,
    fixBiaTrai,
    fixBiaPhai,
    DDTBia,
    DDTBia,
    DDTHau,
    DDTBia,
    DDTBia,
    DDTBia,
    DDTBia,
    KCCot,
    dayCot,
    rongCot,
    gltfUuid,
  ]);

  const handleResetBox = () => {
    display.scene.traverse((child) => {
      if (child.isMesh) {
        const scaledGeometry = child.geometry.clone();
        scaledGeometry.scale(child.scale.x, child.scale.y, child.scale.z);

        const edges = new THREE.EdgesGeometry(scaledGeometry);
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        const boundingBoxEdges = new THREE.LineSegments(edges, material);

        boundingBoxEdges.rotation.copy(child.rotation);
        boundingBoxEdges.position.copy(child.position);

        listBox.push(boundingBoxEdges);

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

        <h5 className="header">Cột:</h5>
        <div>
          <label className="label" htmlFor="rongCot">
            Rộng (mm):
          </label>
          <input
            className="input"
            type="number"
            name="rongCot"
            id="rongCot"
            defaultValue={rongCot * 1000}
            onChange={(e) => {
              setRongCot(Number(e.target.value) / 1000);
            }}
          />
          <br />
          <label className="label" htmlFor="dayCot">
            Dày (mm):
          </label>
          <input
            className="input"
            type="number"
            name="dayCot"
            id="dayCot"
            defaultValue={dayCot * 1000}
            onChange={(e) => {
              setDayCot(Number(e.target.value) / 1000);
            }}
          />
          <br />
          <label className="label" htmlFor="KCCot">
            Khoảng cách từ bìa trái tới cột (mm):
          </label>
          <input
            className="input"
            type="number"
            name="KCCot"
            id="KCCot"
            defaultValue={KCCot * 1000}
            onChange={(e) => {
              setKCCot(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Nóc:</h5>
        <div>
          <select
            className="select"
            onChange={(e) => setOptionNoc(Number(e.target.value))}
          >
            <option value={0}>Nóc Lọt Lòng</option>
            <option value={1}>Nóc Phủ Bì</option>
          </select>
          <br />
          <label className="label" htmlFor="DDTNoc">
            Độ dày tấm nóc (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTNoc"
            id="DDTNoc"
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
            }}
          />
          <br />
          <label className="label" htmlFor="fixNoc">
            Tăng/giảm nóc (mm):
          </label>
          <input
            className="input"
            type="number"
            name="fixNoc"
            id="fixNoc"
            defaultValue={fixNoc * 1000}
            onChange={(e) => {
              setFixNoc(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Đáy:</h5>
        <div>
          <select
            className="select"
            onChange={(e) => setOptionDay(Number(e.target.value))}
          >
            <option value={0}>Lọt Trong 2 Hông</option>
            <option value={1}>Trùm 2 Hông</option>
            <option value={2}>Trùm Trái Lọt Phải</option>
            <option value={3}>Trùm Phải Lọt Trái</option>
          </select>
          <br />
          <select
            className="select"
            onChange={(e) => setOptionSauDay(Number(e.target.value))}
          >
            <option value={0}>Đáy Theo Hậu</option>
            <option value={1}>Đáy Theo Bìa</option>
          </select>
          <br />
          <label className="label" htmlFor="DDTDay">
            Độ dày tấm đáy (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTDay"
            id="DDTDay"
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
            <option value={0}>Hậu Phủ Bì Phủ Nóc</option>
            <option value={1}>Hậu Phủ Bì Lọt Nóc</option>
            <option value={2}>Hậu Âm Tủ</option>
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
          {optionHau === 2 && (
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
          <label className="label" htmlFor="DDTCTruoc">
            Độ dày tấm chân trước (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTCTruoc"
            id="DDTCTruoc"
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
            }}
          />
          <br />

          <label className="label" htmlFor="DDTCSau">
            Độ dày tấm chân sau (mm):
          </label>
          <input
            className="input"
            type="number"
            name="DDTCSau"
            id="DDTCSau"
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
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
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
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
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
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

export default App2;
