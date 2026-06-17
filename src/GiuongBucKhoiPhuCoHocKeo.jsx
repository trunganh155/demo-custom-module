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

  const [width, setWidth] = useState(1.6);
  const [height, setHeight] = useState(0.3);
  const [depth, setDepth] = useState(1.2);

  const [qtyDrawer, setQtyDrawer] = useState(1);
  const [wDrawer, setWDrawer] = useState(0.65);
  const [hDrawer, setHDrawer] = useState(0.2);
  const [dDrawer, setDDrawer] = useState(0.6);

  const [qtyFlipDoor, setQtyFlipDoor] = useState(3);
  const [wFlipDoor, setWFlipDoor] = useState((depth - 0.1) / qtyFlipDoor);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);

  const settingThanhGiuong1 = (thanhGiuong1) => {
    thanhGiuong1.position.z = 0 * -1;

    thanhGiuong1.position.y = 0;

    thanhGiuong1.position.x = 0;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth;

    thanhGiuong1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(thanhGiuong1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    thanhGiuong1.scale.x = lenX / sizeHau.x;
    thanhGiuong1.scale.y = lenY / sizeHau.y;
    thanhGiuong1.scale.z = lenZ / sizeHau.z;
  };

  const settingThanhGiuong2_1 = (thanhGiuong2_1) => {
    thanhGiuong2_1.position.z = (width - DDTBia) * -1;

    thanhGiuong2_1.position.y = hDrawer + 0.03;

    thanhGiuong2_1.position.x = 0;

    const lenZ = DDTBia;

    const lenY = height - DDTBia - hDrawer - 0.03;

    const lenX = depth;

    thanhGiuong2_1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(thanhGiuong2_1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    thanhGiuong2_1.scale.x = lenX / sizeHau.x;
    thanhGiuong2_1.scale.y = lenY / sizeHau.y;
    thanhGiuong2_1.scale.z = lenZ / sizeHau.z;
  };

  const settingThanhGiuong2_2 = (thanhGiuong2_2) => {
    thanhGiuong2_2.position.z = (width - DDTBia) * -1;

    thanhGiuong2_2.position.y = 0;

    thanhGiuong2_2.position.x = qtyDrawer * wDrawer;

    const lenZ = DDTBia;

    const lenY = hDrawer + 0.03;

    const lenX = depth - qtyDrawer * wDrawer;

    thanhGiuong2_2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(thanhGiuong2_2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    thanhGiuong2_2.scale.x = lenX / sizeHau.x;
    thanhGiuong2_2.scale.y = lenY / sizeHau.y;
    thanhGiuong2_2.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDocNho1 = (xuongDocNho1) => {
    xuongDocNho1.position.z = (width - 2 * DDTBia) * -1;

    xuongDocNho1.position.y = hDrawer - 0.02;

    xuongDocNho1.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = height - hDrawer - DDTBia + 0.02;

    const lenX = depth - 2 * DDTBia;

    xuongDocNho1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongDocNho1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongDocNho1.scale.x = lenX / sizeHau.x;
    xuongDocNho1.scale.y = lenY / sizeHau.y;
    xuongDocNho1.scale.z = lenZ / sizeHau.z;
  };

  const settingVatNgang = (vatNgang) => {
    vatNgang.position.z = 0 * -1;

    vatNgang.position.y = height - DDTBia;

    vatNgang.position.x = 0;

    const lenZ = depth > 1.2 ? 0 : width;

    const lenY = depth > 1.2 ? 0 : DDTBia;

    const lenX = depth > 1.2 ? 0 : depth;

    vatNgang.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatNgang);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatNgang.scale.x = lenX / sizeHau.x;
    vatNgang.scale.y = lenY / sizeHau.y;
    vatNgang.scale.z = lenZ / sizeHau.z;
  };

  const settingVatTraiPhu = (vatTraiPhu) => {
    vatTraiPhu.position.z = 0 * -1;

    vatTraiPhu.position.y = height - DDTBia;

    vatTraiPhu.position.x = 0;

    const lenZ = depth > 1.2 ? width / 2 : 0;

    const lenY = depth > 1.2 ? DDTBia : 0;

    const lenX = depth > 1.2 ? depth : 0;

    vatTraiPhu.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatTraiPhu);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatTraiPhu.scale.x = lenX / sizeHau.x;
    vatTraiPhu.scale.y = lenY / sizeHau.y;
    vatTraiPhu.scale.z = lenZ / sizeHau.z;
  };

  const settingVatPhaiPhu = (vatPhaiPhu) => {
    vatPhaiPhu.position.z = (width / 2) * -1;

    vatPhaiPhu.position.y = height - DDTBia;

    vatPhaiPhu.position.x = 0;

    const lenZ = depth > 1.2 ? width / 2 : 0;

    const lenY = depth > 1.2 ? DDTBia : 0;

    const lenX = depth > 1.2 ? depth : 0;

    vatPhaiPhu.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatPhaiPhu);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatPhaiPhu.scale.x = lenX / sizeHau.x;
    vatPhaiPhu.scale.y = lenY / sizeHau.y;
    vatPhaiPhu.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDoc1 = (xuongDoc1) => {
    xuongDoc1.position.z = ((width - dDrawer - 0.1) / 2) * -1;

    xuongDoc1.position.y = 0;

    xuongDoc1.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth - 2 * DDTBia;

    xuongDoc1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongDoc1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongDoc1.scale.x = lenX / sizeHau.x;
    xuongDoc1.scale.y = lenY / sizeHau.y;
    xuongDoc1.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDoc2 = (xuongDoc2) => {
    xuongDoc2.position.z = (width - dDrawer - 0.1) * -1;

    xuongDoc2.position.y = 0;

    xuongDoc2.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth - 2 * DDTBia;

    xuongDoc2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongDoc2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongDoc2.scale.x = lenX / sizeHau.x;
    xuongDoc2.scale.y = lenY / sizeHau.y;
    xuongDoc2.scale.z = lenZ / sizeHau.z;
  };

  const settingChanGiuong1 = (chanGiuong1) => {
    chanGiuong1.position.z = DDTBia * -1;

    chanGiuong1.position.y = 0;

    chanGiuong1.position.x = 0;

    const lenZ = width - 2 * DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    chanGiuong1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(chanGiuong1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    chanGiuong1.scale.x = lenX / sizeHau.x;
    chanGiuong1.scale.y = lenY / sizeHau.y;
    chanGiuong1.scale.z = lenZ / sizeHau.z;
  };

  const settingChanGiuong2 = (chanGiuong2) => {
    chanGiuong2.position.z = DDTBia * -1;

    chanGiuong2.position.y = 0;

    chanGiuong2.position.x = depth - DDTBia;

    const lenZ = width - 2 * DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    chanGiuong2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(chanGiuong2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    chanGiuong2.scale.x = lenX / sizeHau.x;
    chanGiuong2.scale.y = lenY / sizeHau.y;
    chanGiuong2.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgangPhu1 = (xuongNgangPhu1) => {
    xuongNgangPhu1.position.z = DDTBia * -1;

    xuongNgangPhu1.position.y = 0;

    xuongNgangPhu1.position.x = wDrawer;

    const lenZ = width - 2 * DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    xuongNgangPhu1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgangPhu1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgangPhu1.scale.x = lenX / sizeHau.x;
    xuongNgangPhu1.scale.y = lenY / sizeHau.y;
    xuongNgangPhu1.scale.z = lenZ / sizeHau.z;
  };

  const settingMatHoc1 = (matHoc1) => {
    matHoc1.position.z = (width - DDTBia) * -1;

    matHoc1.position.y = 0;

    matHoc1.position.x = 0;

    const lenZ = DDTBia;

    const lenY = hDrawer;

    const lenX = wDrawer;

    matHoc1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matHoc1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matHoc1.scale.x = lenX / sizeHau.x;
    matHoc1.scale.y = lenY / sizeHau.y;
    matHoc1.scale.z = lenZ / sizeHau.z;
  };

  //HOC KEO 1
  const settingRayPhai1 = (rayPhai1) => {
    rayPhai1.position.z = (width - DDTBia - 0.45) * -1;

    rayPhai1.position.y = 0.03;

    rayPhai1.position.x = DDTBia;

    const lenZ = 0.45;

    const lenY = 0.04;

    const lenX = 0.0135;

    rayPhai1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(rayPhai1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    rayPhai1.scale.x = lenX / sizeHau.x;
    rayPhai1.scale.y = lenY / sizeHau.y;
    rayPhai1.scale.z = lenZ / sizeHau.z;
  };

  const settingMatPhai1 = (matPhai1) => {
    matPhai1.position.z = (width - DDTBia - dDrawer) * -1;

    matPhai1.position.y = 0.02;

    matPhai1.position.x = DDTBia + 0.0135;

    const lenZ = dDrawer;

    const lenY = 0.12;

    const lenX = DDTBia;

    matPhai1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matPhai1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matPhai1.scale.x = lenX / sizeHau.x;
    matPhai1.scale.y = lenY / sizeHau.y;
    matPhai1.scale.z = lenZ / sizeHau.z;
  };

  const settingRayTrai1 = (rayTrai1) => {
    rayTrai1.position.z = (width - DDTBia - 0.45) * -1;

    rayTrai1.position.y = 0.03;

    rayTrai1.position.x = DDTBia + wDrawer - DDTBia - 0.0135;

    const lenZ = 0.45;

    const lenY = 0.04;

    const lenX = 0.0135;

    rayTrai1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(rayTrai1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    rayTrai1.scale.x = lenX / sizeHau.x;
    rayTrai1.scale.y = lenY / sizeHau.y;
    rayTrai1.scale.z = lenZ / sizeHau.z;
  };

  const settingMatTrai1 = (matTrai1) => {
    matTrai1.position.z = (width - DDTBia - dDrawer) * -1;

    matTrai1.position.y = 0.02;

    matTrai1.position.x = DDTBia + wDrawer - DDTBia - 0.0135 - DDTBia;

    const lenZ = dDrawer;

    const lenY = 0.12;

    const lenX = DDTBia;

    matTrai1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matTrai1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matTrai1.scale.x = lenX / sizeHau.x;
    matTrai1.scale.y = lenY / sizeHau.y;
    matTrai1.scale.z = lenZ / sizeHau.z;
  };

  const settingMatTruoc1 = (matTruoc1) => {
    matTruoc1.position.z = (width - DDTBia - DDTBia) * -1;

    matTruoc1.position.y = 0.02 + 0.012 + DDTHau;

    matTruoc1.position.x = 2 * DDTBia + 0.0135;

    const lenZ = DDTBia;

    const lenY = 0.1;

    const lenX = wDrawer - 2 * 0.0135 - 3 * DDTBia;

    matTruoc1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matTruoc1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matTruoc1.scale.x = lenX / sizeHau.x;
    matTruoc1.scale.y = lenY / sizeHau.y;
    matTruoc1.scale.z = lenZ / sizeHau.z;
  };

  const settingMatSau1 = (matSau1) => {
    matSau1.position.z = (width - DDTBia - dDrawer) * -1;

    matSau1.position.y = 0.02 + 0.012 + DDTHau;

    matSau1.position.x = 2 * DDTBia + 0.0135;

    const lenZ = DDTBia;

    const lenY = 0.1;

    const lenX = wDrawer - 2 * 0.0135 - 3 * DDTBia;

    matSau1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matSau1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matSau1.scale.x = lenX / sizeHau.x;
    matSau1.scale.y = lenY / sizeHau.y;
    matSau1.scale.z = lenZ / sizeHau.z;
  };

  const settingDayHocKeo1 = (dayHocKeo1) => {
    dayHocKeo1.position.z = (width - DDTBia - dDrawer) * -1;

    dayHocKeo1.position.y = 0.02 + 0.012;

    dayHocKeo1.position.x = 2 * DDTBia + 0.0135 - DDTBia / 2;

    const lenZ = dDrawer;

    const lenY = DDTHau;

    const lenX = wDrawer - 2 * 0.0135 - 3 * DDTBia + DDTBia;

    dayHocKeo1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(dayHocKeo1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    dayHocKeo1.scale.x = lenX / sizeHau.x;
    dayHocKeo1.scale.y = lenY / sizeHau.y;
    dayHocKeo1.scale.z = lenZ / sizeHau.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/GIUONG-BUC-KHOI-PHU-CO-HOC-KEO.glb', (gltfScene) => {
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
          child.material.transparent = true;
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

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      const DAY_HK_1 = md.getObjectByName('DAY-HK-1');
      const FGR_H_VAT_NGANG = md.getObjectByName('FGR-H-VAT-NGANG');
      const FLW_H_CHAN_GIUONG_1 = md.getObjectByName('FLW-H-CHAN-GIUONG-1');
      const FLW_H_CHAN_GIUONG_2 = md.getObjectByName('FLW-H-CHAN-GIUONG-2');
      const FLW_H_XUONG_NGANG_PHU_1 = md.getObjectByName(
        'FLW-H-XUONG-NGANG-PHU-1'
      );
      const MAT_PHAI_SLW_H_1 = md.getObjectByName('MAT-PHAI-SLW-H-1');
      const MAT_SAU_FLW_H_1 = md.getObjectByName('MAT-SAU-FLW-H-1');
      const MAT_TRAI_SLW_H_1 = md.getObjectByName('MAT-TRAI-SLW-H-1');
      const MAT_TRUOC_FLW_H_1 = md.getObjectByName('MAT-TRUOC-FLW-H-1');
      const RAY_PHAI_1 = md.getObjectByName('RAY-PHAI-1');
      const RAY_TRAI_1 = md.getObjectByName('RAY-TRAI-1');
      const SLW_H_THANH_GIUONG_1 = md.getObjectByName('SLW-H-THANH-GIUONG-1');
      const SLW_H_THANH_GIUONG_2_1 = md.getObjectByName(
        'SLW-H-THANH-GIUONG-2-1'
      );
      const SDW_V_THANH_GIUONG_2_2 = md.getObjectByName(
        'SDW-V-THANH-GIUONG-2-2'
      );
      const SGR_H_VAT_PHAI_PHU = md.getObjectByName('SGR-H-VAT-PHAI-PHU');
      const SGR_H_VAT_TRAI_PHU = md.getObjectByName('SGR-H-VAT-TRAI-PHU');
      const SLW_H_MAT_HOC_1 = md.getObjectByName('SLW-H-MAT-HOC-1');
      const SLW_H_XUONG_DOC_1 = md.getObjectByName('SLW-H-XUONG-DOC-1');
      const SLW_H_XUONG_DOC_2 = md.getObjectByName('SLW-H-XUONG-DOC-2');
      const SLW_H_XUONG_DOC_NHO_1 = md.getObjectByName('SLW-H-XUONG-DOC-NHO-1');

      FGR_H_VAT_NGANG && settingVatNgang(FGR_H_VAT_NGANG);
      FLW_H_CHAN_GIUONG_1 && settingChanGiuong1(FLW_H_CHAN_GIUONG_1);
      FLW_H_CHAN_GIUONG_2 && settingChanGiuong2(FLW_H_CHAN_GIUONG_2);
      FLW_H_XUONG_NGANG_PHU_1 && settingXuongNgangPhu1(FLW_H_XUONG_NGANG_PHU_1);
      SLW_H_THANH_GIUONG_1 && settingThanhGiuong1(SLW_H_THANH_GIUONG_1);
      SLW_H_THANH_GIUONG_2_1 && settingThanhGiuong2_1(SLW_H_THANH_GIUONG_2_1);
      SDW_V_THANH_GIUONG_2_2 && settingThanhGiuong2_2(SDW_V_THANH_GIUONG_2_2);
      SGR_H_VAT_TRAI_PHU && settingVatTraiPhu(SGR_H_VAT_TRAI_PHU);
      SGR_H_VAT_PHAI_PHU && settingVatPhaiPhu(SGR_H_VAT_PHAI_PHU);
      SLW_H_MAT_HOC_1 && settingMatHoc1(SLW_H_MAT_HOC_1);
      SLW_H_XUONG_DOC_1 && settingXuongDoc1(SLW_H_XUONG_DOC_1);
      SLW_H_XUONG_DOC_2 && settingXuongDoc2(SLW_H_XUONG_DOC_2);
      SLW_H_XUONG_DOC_NHO_1 && settingXuongDocNho1(SLW_H_XUONG_DOC_NHO_1);

      DAY_HK_1 && settingDayHocKeo1(DAY_HK_1);
      MAT_PHAI_SLW_H_1 && settingMatPhai1(MAT_PHAI_SLW_H_1);
      MAT_SAU_FLW_H_1 && settingMatSau1(MAT_SAU_FLW_H_1);
      MAT_TRAI_SLW_H_1 && settingMatTrai1(MAT_TRAI_SLW_H_1);
      MAT_TRUOC_FLW_H_1 && settingMatTruoc1(MAT_TRUOC_FLW_H_1);
      RAY_PHAI_1 && settingRayPhai1(RAY_PHAI_1);
      RAY_TRAI_1 && settingRayTrai1(RAY_TRAI_1);

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
        const bcpMeshNames = [
          // 'BCP-DAY-1',
          // 'BCP-DAY-2',
          // 'BCP-DAY-3',
          // 'BCP-NOC-1',
          // 'BCP-NOC-3',
          // 'BCP-HAU',
          // 'BCP-BIA-TRAI',
          // 'BCP-BIA-PHAI',
          // 'BCP-BIA-BO-CONG',
          // 'BCP-TRU-HAO-BO-CONG',
          ///
          // 'DAY',
          // 'NOC',
          // 'HAU',
          // 'BIA-TRAI',
          // 'BIA-PHAI',
          ///
          // 'BCT-DAY-1',
          // 'BCT-DAY-2',
          // 'BCT-DAY-3',
          // 'BCT-NOC-1',
          // 'BCT-NOC-3',
          // 'BCT-HAU',
          // 'BCT-BIA-TRAI',
          // 'BCT-BIA-PHAI',
          // 'BCT-BIA-BO-CONG',
          // 'BCT-TRU-HAO-BO-CONG',
        ];

        bcpMeshNames.forEach((name) => handleHide(name, false));

        handleResetBox();
      }, 10);
    }
  }, [
    display,
    width,
    height,
    depth,
    DDTHau,
    DDTBia,
    wDrawer,
    qtyDrawer,
    hDrawer,
    wFlipDoor,
    qtyFlipDoor,
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
          <label className="label" htmlFor="depth">
            Dài (mm):
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
          <label className="label" htmlFor="width">
            Rộng (mm):
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
          <label className="label" htmlFor="qtyDrawer">
            SL hộc kéo (cái):
          </label>
          <input
            className="input"
            type="number"
            name="qtyDrawer"
            id="qtyDrawer"
            defaultValue={qtyDrawer}
            onChange={(e) => {
              setQtyDrawer(Math.min(Number(e.target.value), 3));
            }}
          />

          <br />
          <label className="label" htmlFor="wDrawer">
            Rộng hộc (mm):
          </label>
          <input
            className="input"
            type="number"
            name="wDrawer"
            id="wDrawer"
            defaultValue={Math.floor(wDrawer * 1000)}
            onChange={(e) => {
              setWDrawer(Math.min(Number(e.target.value) / 1000), 0.65);
            }}
          />

          <br />
          <label className="label" htmlFor="hDrawer">
            Cao hộc (mm):
          </label>
          <input
            className="input"
            type="number"
            name="hDrawer"
            id="hDrawer"
            defaultValue={hDrawer * 1000}
            onChange={(e) => {
              setHDrawer(Number(e.target.value) / 1000);
            }}
          />
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App4;
