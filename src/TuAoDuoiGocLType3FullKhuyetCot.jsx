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
  const [height, setHeight] = useState(1.8);
  const [depth, setDepth] = useState(0.56);

  const [caoChan, setCaoChan] = useState(0.1);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.017);

  const [KCCot, setKCCot] = useState(0);
  const [dayCot, setDayCot] = useState(0.2);
  const [rongCot, setRongCot] = useState(0.25);

  const [rongK1, setRongK1] = useState(1.2);
  const [rongK2, setRongK2] = useState(1);
  const [truHaoGoc, setTruHaoGoc] = useState(0.03);

  const settingDay1 = (day1) => {
    day1.position.z = truHaoGoc * -1;
    day1.position.y = caoChan;
    day1.position.x = depth;

    const lenZ = depth - truHaoGoc;
    const lenX = rongK1 - depth - DDTBia;
    const lenY = DDTBia;

    day1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day1.scale.x = lenX / sizeDay.x;
    day1.scale.y = lenY / sizeDay.y;
    day1.scale.z = lenZ / sizeDay.z;
  };

  const settingDay2_1 = (day2_1) => {
    day2_1.position.z = truHaoGoc * -1;
    day2_1.position.x = dayCot + DDTBia;
    day2_1.position.y = caoChan;

    const lenZ = rongCot - truHaoGoc + DDTBia;
    const lenX = depth - dayCot - DDTBia;
    const lenY = DDTBia;

    day2_1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day2_1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day2_1.scale.x = lenX / sizeDay.x;
    day2_1.scale.y = lenY / sizeDay.y;
    day2_1.scale.z = lenZ / sizeDay.z;
  };

  const settingDay2_2 = (day2_2) => {
    day2_2.position.z = (rongCot + DDTBia) * -1;
    day2_2.position.x = truHaoGoc;
    day2_2.position.y = caoChan;

    const lenZ = rongK2 - rongCot - 2 * DDTBia;
    const lenX = depth - truHaoGoc;
    const lenY = DDTBia;

    day2_2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day2_2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day2_2.scale.x = lenX / sizeDay.x;
    day2_2.scale.y = lenY / sizeDay.y;
    day2_2.scale.z = lenZ / sizeDay.z;
  };

  const settingNoc1 = (noc1) => {
    noc1.position.z = (truHaoGoc + DDTBia) * -1;
    noc1.position.y = height - DDTBia;
    noc1.position.x = depth;

    const lenZ = depth - truHaoGoc - DDTBia;
    const lenX = rongK1 - depth - DDTBia;
    const lenY = DDTBia;

    noc1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc1.scale.x = lenX / sizeDay.x;
    noc1.scale.y = lenY / sizeDay.y;
    noc1.scale.z = lenZ / sizeDay.z;
  };

  const settingNoc2_1 = (noc2_1) => {
    noc2_1.position.z = (truHaoGoc + DDTBia) * -1;
    noc2_1.position.x = dayCot + DDTBia;
    noc2_1.position.y = height - DDTBia;

    const lenZ = rongCot - truHaoGoc;
    const lenX = depth - dayCot - DDTBia;
    const lenY = DDTBia;

    noc2_1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc2_1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc2_1.scale.x = lenX / sizeDay.x;
    noc2_1.scale.y = lenY / sizeDay.y;
    noc2_1.scale.z = lenZ / sizeDay.z;
  };

  const settingNoc2_2 = (noc2_2) => {
    noc2_2.position.z = (rongCot + DDTBia) * -1;
    noc2_2.position.x = truHaoGoc + DDTBia;
    noc2_2.position.y = height - DDTBia;

    const lenZ = rongK2 - rongCot - 2 * DDTBia;
    const lenX = depth - truHaoGoc - DDTBia;
    const lenY = DDTBia;

    noc2_2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc2_2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc2_2.scale.x = lenX / sizeDay.x;
    noc2_2.scale.y = lenY / sizeDay.y;
    noc2_2.scale.z = lenZ / sizeDay.z;
  };

  const settingHau1 = (hau1) => {
    hau1.position.z = truHaoGoc * -1;
    hau1.position.x = dayCot + DDTBia;
    hau1.position.y = caoChan + DDTBia;

    const lenZ = DDTHau;
    const lenX = rongK1 - dayCot - 2 * DDTBia;
    const lenY = height - caoChan - DDTBia;

    hau1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau1.scale.x = lenX / sizeHau.x;
    hau1.scale.y = lenY / sizeHau.y;
    hau1.scale.z = lenZ / sizeHau.z;
  };

  const settingHau2 = (hau2) => {
    hau2.position.z = (rongCot + DDTBia) * -1;
    hau2.position.x = truHaoGoc;
    hau2.position.y = caoChan + DDTBia;

    const lenZ = rongK2 - rongCot - 2 * DDTBia;
    const lenX = DDTHau;
    const lenY = height - caoChan - DDTBia;

    hau2.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau2);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau2.scale.x = lenX / sizeHau.x;
    hau2.scale.y = lenY / sizeHau.y;
    hau2.scale.z = lenZ / sizeHau.z;
  };

  const settingBia1 = (bia1) => {
    bia1.position.z = truHaoGoc * -1;
    bia1.position.x = rongK1 - DDTBia;
    bia1.position.y = 0;

    const lenZ = depth - truHaoGoc;
    const lenX = DDTBia;
    const lenY = height;

    bia1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia1.scale.x = lenX / sizeBiaTrai.x;
    bia1.scale.y = lenY / sizeBiaTrai.y;
    bia1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia2 = (bia2) => {
    bia2.position.z = (rongK2 - DDTBia) * -1;
    bia2.position.x = truHaoGoc;
    bia2.position.y = 0;

    const lenZ = DDTBia;
    const lenX = depth - truHaoGoc;
    const lenY = height;

    bia2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia2.scale.x = lenX / sizeBiaTrai.x;
    bia2.scale.y = lenY / sizeBiaTrai.y;
    bia2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaCot1 = (biaCot1) => {
    biaCot1.position.z = truHaoGoc * -1;
    biaCot1.position.x = dayCot;
    biaCot1.position.y = 0;

    const lenZ = rongCot - truHaoGoc;
    const lenX = DDTBia;
    const lenY = height;

    biaCot1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(biaCot1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    biaCot1.scale.x = lenX / sizeHau.x;
    biaCot1.scale.y = lenY / sizeHau.y;
    biaCot1.scale.z = lenZ / sizeHau.z;
  };

  const settingBiaCot2 = (biaCot2) => {
    biaCot2.position.z = rongCot * -1;
    biaCot2.position.x = truHaoGoc;
    biaCot2.position.y = 0;

    const lenZ = DDTBia;
    const lenX = dayCot - truHaoGoc + DDTBia;
    const lenY = height;

    biaCot2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(biaCot2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    biaCot2.scale.x = lenX / sizeBiaTrai.x;
    biaCot2.scale.y = lenY / sizeBiaTrai.y;
    biaCot2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingChanTruoc1 = (chanTruoc1) => {
    chanTruoc1.position.z = (depth - DDTBia) * -1;
    chanTruoc1.position.x = depth;
    chanTruoc1.position.y = 0;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth - DDTBia;
    const lenY = caoChan;

    chanTruoc1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(chanTruoc1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    chanTruoc1.scale.x = lenX / sizeBiaTrai.x;
    chanTruoc1.scale.y = lenY / sizeBiaTrai.y;
    chanTruoc1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingChanTruoc2 = (chanTruoc2) => {
    chanTruoc2.position.z = (depth - DDTBia) * -1;
    chanTruoc2.position.x = depth - DDTBia;
    chanTruoc2.position.y = 0;

    const lenZ = rongK2 - depth;
    const lenX = DDTBia;
    const lenY = caoChan;

    chanTruoc2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(chanTruoc2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    chanTruoc2.scale.x = lenX / sizeBiaTrai.x;
    chanTruoc2.scale.y = lenY / sizeBiaTrai.y;
    chanTruoc2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingChanSau1 = (cSau1) => {
    cSau1.position.z = 0.15 * -1;
    cSau1.position.x = dayCot + DDTBia;
    cSau1.position.y = 0;

    const lenZ = DDTBia;
    const lenX = rongK1 - 2 * DDTBia - dayCot;
    const lenY = caoChan;

    cSau1.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(cSau1);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    cSau1.scale.x = lenX / sizeChanTruoc.x;
    cSau1.scale.y = lenY / sizeChanTruoc.y;
    cSau1.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingChanSau2 = (cSau2) => {
    cSau2.position.z = (rongCot + DDTBia) * -1;
    cSau2.position.x = 0.15;
    cSau2.position.y = 0;

    const lenZ = rongK2 - 2 * DDTBia - rongCot;
    const lenX = DDTBia;
    const lenY = caoChan;

    cSau2.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(cSau2);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    cSau2.scale.x = lenX / sizeChanTruoc.x;
    cSau2.scale.y = lenY / sizeChanTruoc.y;
    cSau2.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingXanNgang1 = (xNgang1) => {
    xNgang1.position.z = (DDTHau + truHaoGoc) * -1;
    xNgang1.position.x = depth;
    xNgang1.position.y = (height - caoChan) / 2 + caoChan;

    const lenZ = depth - truHaoGoc - DDTHau;
    const lenX = rongK1 - depth - DDTBia;
    const lenY = DDTBia;

    xNgang1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(xNgang1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    xNgang1.scale.x = lenX / sizeDay.x;
    xNgang1.scale.y = lenY / sizeDay.y;
    xNgang1.scale.z = lenZ / sizeDay.z;
  };

  const settingXanNgang2_1 = (xNgang2_1) => {
    xNgang2_1.position.z = (truHaoGoc + DDTBia) * -1;
    xNgang2_1.position.x = dayCot + DDTBia;
    xNgang2_1.position.y = (height - caoChan) / 2 + caoChan;

    const lenZ = rongCot - truHaoGoc;
    const lenX = depth - dayCot - DDTBia;
    const lenY = DDTBia;

    xNgang2_1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(xNgang2_1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    xNgang2_1.scale.x = lenX / sizeDay.x;
    xNgang2_1.scale.y = lenY / sizeDay.y;
    xNgang2_1.scale.z = lenZ / sizeDay.z;
  };

  const settingXanNgang2_2 = (xNgang2_2) => {
    xNgang2_2.position.z = (rongCot + DDTBia) * -1;
    xNgang2_2.position.x = truHaoGoc + DDTHau;
    xNgang2_2.position.y = (height - caoChan) / 2 + caoChan;

    const lenZ = rongK2 - rongCot - 2 * DDTBia;
    const lenX = depth - truHaoGoc - DDTHau;
    const lenY = DDTBia;

    xNgang2_2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(xNgang2_2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    xNgang2_2.scale.x = lenX / sizeDay.x;
    xNgang2_2.scale.y = lenY / sizeDay.y;
    xNgang2_2.scale.z = lenZ / sizeDay.z;
  };

  const settingCua1 = (cua1) => {
    cua1.position.z = depth * -1;
    cua1.position.x = depth;
    cua1.position.y = caoChan;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth;
    const lenY = height - caoChan - 0.02;

    cua1.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(cua1);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    cua1.scale.x = lenX / sizeXSau.x;
    cua1.scale.y = lenY / sizeXSau.y;
    cua1.scale.z = lenZ / sizeXSau.z;
  };

  const settingTruHaoGoc = (truHaoGoc) => {
    truHaoGoc.position.z = 0;
    truHaoGoc.position.x = 0;
    truHaoGoc.position.y = 0;

    const lenZ = 0;
    const lenX = 0;
    const lenY = 0;

    truHaoGoc.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(truHaoGoc);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    truHaoGoc.scale.x = lenX / sizeXSau.x;
    truHaoGoc.scale.y = lenY / sizeXSau.y;
    truHaoGoc.scale.z = lenZ / sizeXSau.z;
  };

  const settingCua2 = (cua2) => {
    cua2.position.z = (depth + DDTBia) * -1;
    cua2.position.x = depth;
    cua2.position.y = caoChan;

    const lenZ = rongK2 - depth - DDTBia;
    const lenX = DDTBia;
    const lenY = height - caoChan - 0.02;

    cua2.scale.set(1, 1, 1);
    let boundingBoxXSau = new THREE.Box3().setFromObject(cua2);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    cua2.scale.x = lenX / sizeXSau.x;
    cua2.scale.y = lenY / sizeXSau.y;
    cua2.scale.z = lenZ / sizeXSau.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/TADGL3-FULL-KC.glb', (gltfScene) => {
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

        if (child.name?.includes('DOOR')) {
          child.visible = false;
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
      const day2_1 = md.getObjectByName('DAY-2-1');
      const day2_2 = md.getObjectByName('DAY-2-2');
      const noc1 = md.getObjectByName('NOC-1');
      const noc2_1 = md.getObjectByName('NOC-2-1');
      const noc2_2 = md.getObjectByName('NOC-2-2');
      const hau1 = md.getObjectByName('HAU-1');
      const hau2 = md.getObjectByName('HAU-2');
      const bia1 = md.getObjectByName('BIA-1');
      const bia2 = md.getObjectByName('BIA-2');
      const chanTruoc1 = md.getObjectByName('CHAN-TRUOC-1');
      const chanTruoc2 = md.getObjectByName('CHAN-TRUOC-2');
      const chanSau1 = md.getObjectByName('CHAN-SAU-1');
      const chanSau2 = md.getObjectByName('CHAN-SAU-2');

      const biaCot1 = md.getObjectByName('BIA-COT-1');
      const biaCot2 = md.getObjectByName('BIA-COT-2');

      const cua1 = md.getObjectByName('DOOR-1');
      const cua2 = md.getObjectByName('DOOR-4');
      const xNgang1_1 = md.getObjectByName('XAN-NGANG-1-1');
      const xNgang2_1_1 = md.getObjectByName('XAN-NGANG-2-1-1');
      const xNgang2_1_2 = md.getObjectByName('XAN-NGANG-2-1-2');

      const truHaoGoc = md.getObjectByName('TRU-HAO-GOC');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day1 && settingDay1(day1);
      day2_1 && settingDay2_1(day2_1);
      day2_2 && settingDay2_2(day2_2);

      noc1 && settingNoc1(noc1);
      noc2_1 && settingNoc2_1(noc2_1);
      noc2_2 && settingNoc2_2(noc2_2);

      hau1 && settingHau1(hau1);
      hau2 && settingHau2(hau2);

      bia1 && settingBia1(bia1);
      bia2 && settingBia2(bia2);

      chanTruoc1 && settingChanTruoc1(chanTruoc1);
      chanTruoc2 && settingChanTruoc2(chanTruoc2);
      chanSau1 && settingChanSau1(chanSau1);
      chanSau2 && settingChanSau2(chanSau2);

      biaCot1 && settingBiaCot1(biaCot1);
      biaCot2 && settingBiaCot2(biaCot2);

      cua1 && settingCua1(cua1);
      cua2 && settingCua2(cua2);

      xNgang1_1 && settingXanNgang1(xNgang1_1);
      xNgang2_1_1 && settingXanNgang2_1(xNgang2_1_1);
      xNgang2_1_2 && settingXanNgang2_2(xNgang2_1_2);

      truHaoGoc && settingTruHaoGoc(truHaoGoc);

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
    rongK1,
    rongK2,
    truHaoGoc,
    width,
    height,
    depth,
    DDTBia,
    DDTHau,
    gltfUuid,
  ]);

  const handleResetBox = () => {
    const md = display.scene.getObjectByProperty('uuid', gltfUuid);

    md.traverse((child) => {
      if (
        child.isMesh &&
        child.visible &&
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
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App3;
