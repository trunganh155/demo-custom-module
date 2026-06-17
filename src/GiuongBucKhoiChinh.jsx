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

  const [width, setWidth] = useState(1.8);
  const [height, setHeight] = useState(0.3);
  const [depth, setDepth] = useState(2);

  const [qtyDrawer, setQtyDrawer] = useState(3);
  const [wDrawer, setWDrawer] = useState((depth - 0.1) / qtyDrawer);
  const [hDrawer, setHDrawer] = useState(0.2);
  const [dDrawer, setDDrawer] = useState(0.6);

  const [qtyFlipDoor, setQtyFlipDoor] = useState(3);
  const [wFlipDoor, setWFlipDoor] = useState((depth - 0.1) / qtyFlipDoor);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);

  //BO CONG TRAI
  const settingDauGiuong = (dauGiuong) => {
    dauGiuong.position.z = DDTBia * -1;

    dauGiuong.position.y = 0;

    dauGiuong.position.x = 0;

    const lenZ = width - 2 * DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    dauGiuong.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(dauGiuong);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    dauGiuong.scale.x = lenX / sizeHau.x;
    dauGiuong.scale.y = lenY / sizeHau.y;
    dauGiuong.scale.z = lenZ / sizeHau.z;
  };

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

    thanhGiuong2_2.position.x = 0;

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

  const settingVatTrai1_1 = (vatTrai1_1) => {
    vatTrai1_1.position.z = 0 * -1;

    vatTrai1_1.position.y = height - DDTBia;

    vatTrai1_1.position.x = 0;

    const lenZ = 0.07;

    const lenY = DDTBia;

    const lenX = depth;

    vatTrai1_1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatTrai1_1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatTrai1_1.scale.x = lenX / sizeHau.x;
    vatTrai1_1.scale.y = lenY / sizeHau.y;
    vatTrai1_1.scale.z = lenZ / sizeHau.z;
  };

  const settingVatTrai1_2 = (vatTrai1_2) => {
    vatTrai1_2.position.z = 0.07 * -1;

    vatTrai1_2.position.y = height - DDTBia;

    vatTrai1_2.position.x = 0;

    const lenZ = width / 2 - 0.07;

    const lenY = DDTBia;

    const lenX = depth - qtyFlipDoor * wFlipDoor;

    vatTrai1_2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatTrai1_2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatTrai1_2.scale.x = lenX / sizeHau.x;
    vatTrai1_2.scale.y = lenY / sizeHau.y;
    vatTrai1_2.scale.z = lenZ / sizeHau.z;
  };

  const settingVatPhai = (vatPhai) => {
    vatPhai.position.z = (width / 2) * -1;

    vatPhai.position.y = height - DDTBia;

    vatPhai.position.x = 0;

    const lenZ = width / 2;

    const lenY = DDTBia;

    const lenX = depth;

    vatPhai.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatPhai);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatPhai.scale.x = lenX / sizeHau.x;
    vatPhai.scale.y = lenY / sizeHau.y;
    vatPhai.scale.z = lenZ / sizeHau.z;
  };

  const settingCanhLat1 = (canhLat1) => {
    canhLat1.position.z = 0.07 * -1;

    canhLat1.position.y = height - DDTBia;

    canhLat1.position.x = depth - qtyFlipDoor * wFlipDoor;

    const lenZ = width / 2 - 0.07;

    const lenY = DDTBia;

    const lenX = wFlipDoor;

    canhLat1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(canhLat1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    canhLat1.scale.x = lenX / sizeHau.x;
    canhLat1.scale.y = lenY / sizeHau.y;
    canhLat1.scale.z = lenZ / sizeHau.z;
  };

  const settingCanhLat2 = (canhLat2) => {
    canhLat2.position.z = 0.07 * -1;

    canhLat2.position.y = height - DDTBia;

    canhLat2.position.x = depth - qtyFlipDoor * wFlipDoor + wFlipDoor;

    const lenZ = width / 2 - 0.07;

    const lenY = DDTBia;

    const lenX = wFlipDoor;

    canhLat2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(canhLat2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    canhLat2.scale.x = lenX / sizeHau.x;
    canhLat2.scale.y = lenY / sizeHau.y;
    canhLat2.scale.z = lenZ / sizeHau.z;
  };

  const settingCanhLat3 = (canhLat3) => {
    canhLat3.position.z = 0.07 * -1;

    canhLat3.position.y = height - DDTBia;

    canhLat3.position.x = depth - qtyFlipDoor * wFlipDoor + wFlipDoor * 2;

    const lenZ = qtyFlipDoor < 3 ? 0 : width / 2 - 0.07;

    const lenY = qtyFlipDoor < 3 ? 0 : DDTBia;

    const lenX = qtyFlipDoor < 3 ? 0 : wFlipDoor;

    canhLat3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(canhLat3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    canhLat3.scale.x = lenX / sizeHau.x;
    canhLat3.scale.y = lenY / sizeHau.y;
    canhLat3.scale.z = lenZ / sizeHau.z;
  };

  const settingMatHoc1 = (matHoc1) => {
    matHoc1.position.z = (width - DDTBia) * -1;

    matHoc1.position.y = 0;

    matHoc1.position.x = depth - qtyDrawer * wDrawer;

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

  const settingMatHoc2 = (matHoc2) => {
    matHoc2.position.z = (width - DDTBia) * -1;

    matHoc2.position.y = 0;

    matHoc2.position.x = depth - qtyDrawer * wDrawer + wDrawer;

    const lenZ = DDTBia;

    const lenY = hDrawer;

    const lenX = wDrawer;

    matHoc2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matHoc2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matHoc2.scale.x = lenX / sizeHau.x;
    matHoc2.scale.y = lenY / sizeHau.y;
    matHoc2.scale.z = lenZ / sizeHau.z;
  };

  const settingMatHoc3 = (matHoc3) => {
    matHoc3.position.z = (width - DDTBia) * -1;

    matHoc3.position.y = 0;

    matHoc3.position.x = depth - qtyDrawer * wDrawer + wDrawer * 2;

    const lenZ = qtyDrawer < 3 ? 0 : DDTBia;

    const lenY = qtyDrawer < 3 ? 0 : hDrawer;

    const lenX = qtyDrawer < 3 ? 0 : wDrawer;

    matHoc3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matHoc3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matHoc3.scale.x = lenX / sizeHau.x;
    matHoc3.scale.y = lenY / sizeHau.y;
    matHoc3.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDocNho1 = (xuongDocNho1) => {
    xuongDocNho1.position.z = (width / 2) * -1;

    xuongDocNho1.position.y = height - DDTBia - 0.103;

    xuongDocNho1.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = 0.103;

    const lenX = depth - 2 * DDTBia;

    xuongDocNho1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongDocNho1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongDocNho1.scale.x = lenX / sizeHau.x;
    xuongDocNho1.scale.y = lenY / sizeHau.y;
    xuongDocNho1.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDocNho2 = (xuongDocNho2) => {
    xuongDocNho2.position.z = (width - 2 * DDTBia) * -1;

    xuongDocNho2.position.y = hDrawer - 0.02;

    xuongDocNho2.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = height - hDrawer - DDTBia + 0.02;

    const lenX = depth - 2 * DDTBia;

    xuongDocNho2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongDocNho2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongDocNho2.scale.x = lenX / sizeHau.x;
    xuongDocNho2.scale.y = lenY / sizeHau.y;
    xuongDocNho2.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDoc1 = (xuongDoc1) => {
    xuongDoc1.position.z = (width / 2 - DDTBia) * -1;

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

  const settingChanGiuong1 = (chanGiuong1) => {
    chanGiuong1.position.z = DDTBia * -1;

    chanGiuong1.position.y = 0;

    chanGiuong1.position.x = depth - DDTBia;

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

  const settingXuongNgang1 = (xuongNgang1) => {
    xuongNgang1.position.z = DDTBia * -1;

    xuongNgang1.position.y = 0;

    xuongNgang1.position.x = depth - qtyFlipDoor * wFlipDoor - DDTBia;

    const lenZ = width / 2 - 2 * DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    xuongNgang1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgang1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgang1.scale.x = lenX / sizeHau.x;
    xuongNgang1.scale.y = lenY / sizeHau.y;
    xuongNgang1.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgang3 = (xuongNgang3) => {
    xuongNgang3.position.z = DDTBia * -1;

    xuongNgang3.position.y = 0;

    xuongNgang3.position.x =
      depth - qtyFlipDoor * wFlipDoor + wFlipDoor - DDTBia;

    const lenZ = width / 2 - 2 * DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    xuongNgang3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgang3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgang3.scale.x = lenX / sizeHau.x;
    xuongNgang3.scale.y = lenY / sizeHau.y;
    xuongNgang3.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgang5 = (xuongNgang5) => {
    xuongNgang5.position.z = DDTBia * -1;

    xuongNgang5.position.y = 0;

    xuongNgang5.position.x =
      depth - qtyFlipDoor * wFlipDoor + wFlipDoor * 2 - DDTBia;

    const lenZ = qtyFlipDoor < 3 ? 0 : width / 2 - 2 * DDTBia;

    const lenY = qtyFlipDoor < 3 ? 0 : height - DDTBia;

    const lenX = qtyFlipDoor < 3 ? 0 : DDTBia;

    xuongNgang5.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgang5);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgang5.scale.x = lenX / sizeHau.x;
    xuongNgang5.scale.y = lenY / sizeHau.y;
    xuongNgang5.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgang2 = (xuongNgang2) => {
    xuongNgang2.position.z = (width / 2) * -1;

    xuongNgang2.position.y = 0;

    xuongNgang2.position.x = depth - qtyDrawer * wDrawer - DDTBia;

    const lenZ = width / 2 - DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    xuongNgang2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgang2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgang2.scale.x = lenX / sizeHau.x;
    xuongNgang2.scale.y = lenY / sizeHau.y;
    xuongNgang2.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgang4 = (xuongNgang4) => {
    xuongNgang4.position.z = (width / 2) * -1;

    xuongNgang4.position.y = 0;

    xuongNgang4.position.x = depth - (qtyDrawer - 1) * wDrawer - DDTBia;

    const lenZ = width / 2 - DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    xuongNgang4.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgang4);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgang4.scale.x = lenX / sizeHau.x;
    xuongNgang4.scale.y = lenY / sizeHau.y;
    xuongNgang4.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgang6 = (xuongNgang6) => {
    xuongNgang6.position.z = (width / 2) * -1;

    xuongNgang6.position.y = 0;

    xuongNgang6.position.x = depth - (qtyDrawer - 2) * wDrawer - DDTBia;

    const lenZ = qtyDrawer < 3 ? 0 : width / 2 - DDTBia;

    const lenY = qtyDrawer < 3 ? 0 : height - DDTBia;

    const lenX = qtyDrawer < 3 ? 0 : DDTBia;

    xuongNgang6.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgang6);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgang6.scale.x = lenX / sizeHau.x;
    xuongNgang6.scale.y = lenY / sizeHau.y;
    xuongNgang6.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgangNho1 = (xuongNgangNho3) => {
    xuongNgangNho3.position.z = DDTBia * -1;

    xuongNgangNho3.position.y = height - DDTBia - 0.103;

    xuongNgangNho3.position.x = depth - qtyFlipDoor * wFlipDoor;

    const lenZ = width / 2 - 2 * DDTBia;

    const lenY = 0.103;

    const lenX = DDTBia;

    xuongNgangNho3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgangNho3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgangNho3.scale.x = lenX / sizeHau.x;
    xuongNgangNho3.scale.y = lenY / sizeHau.y;
    xuongNgangNho3.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgangNho2 = (xuongNgangNho2) => {
    xuongNgangNho2.position.z = DDTBia * -1;

    xuongNgangNho2.position.y = height - DDTBia - 0.103;

    xuongNgangNho2.position.x = depth - qtyFlipDoor * wFlipDoor + wFlipDoor;

    const lenZ = width / 2 - 2 * DDTBia;

    const lenY = 0.103;

    const lenX = DDTBia;

    xuongNgangNho2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgangNho2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgangNho2.scale.x = lenX / sizeHau.x;
    xuongNgangNho2.scale.y = lenY / sizeHau.y;
    xuongNgangNho2.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgangNho3 = (xuongNgangNho3) => {
    xuongNgangNho3.position.z = DDTBia * -1;

    xuongNgangNho3.position.y = height - DDTBia - 0.103;

    xuongNgangNho3.position.x = depth - qtyFlipDoor * wFlipDoor + wFlipDoor * 2;

    const lenZ = qtyFlipDoor < 3 ? 0 : width / 2 - 2 * DDTBia;

    const lenY = qtyFlipDoor < 3 ? 0 : 0.103;

    const lenX = qtyFlipDoor < 3 ? 0 : DDTBia;

    xuongNgangNho3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgangNho3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgangNho3.scale.x = lenX / sizeHau.x;
    xuongNgangNho3.scale.y = lenY / sizeHau.y;
    xuongNgangNho3.scale.z = lenZ / sizeHau.z;
  };

  //HOC KEO 1
  const settingRayPhai1 = (rayPhai1) => {
    rayPhai1.position.z = (width - DDTBia - 0.45) * -1;

    rayPhai1.position.y = 0.03;

    rayPhai1.position.x = depth - qtyDrawer * wDrawer;

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

    matPhai1.position.x = depth - qtyDrawer * wDrawer + 0.0135;

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

    rayTrai1.position.x = depth - (qtyDrawer - 1) * wDrawer - DDTBia - 0.0135;

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

    matTrai1.position.x =
      depth - (qtyDrawer - 1) * wDrawer - DDTBia - 0.0135 - DDTBia;

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

    matTruoc1.position.x = depth - qtyDrawer * wDrawer + DDTBia + 0.0135;

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

    matSau1.position.x = depth - qtyDrawer * wDrawer + DDTBia + 0.0135;

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

    dayHocKeo1.position.x =
      depth - qtyDrawer * wDrawer + DDTBia + 0.0135 - DDTBia / 2;

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

  //HOC KEO 2
  const settingRayPhai2 = (rayPhai2) => {
    rayPhai2.position.z = (width - DDTBia - 0.45) * -1;

    rayPhai2.position.y = 0.03;

    rayPhai2.position.x = depth - (qtyDrawer - 1) * wDrawer;

    const lenZ = 0.45;

    const lenY = 0.04;

    const lenX = 0.0135;

    rayPhai2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(rayPhai2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    rayPhai2.scale.x = lenX / sizeHau.x;
    rayPhai2.scale.y = lenY / sizeHau.y;
    rayPhai2.scale.z = lenZ / sizeHau.z;
  };

  const settingMatPhai2 = (matPhai2) => {
    matPhai2.position.z = (width - DDTBia - dDrawer) * -1;

    matPhai2.position.y = 0.02;

    matPhai2.position.x = depth - (qtyDrawer - 1) * wDrawer + 0.0135;

    const lenZ = dDrawer;

    const lenY = 0.12;

    const lenX = DDTBia;

    matPhai2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matPhai2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matPhai2.scale.x = lenX / sizeHau.x;
    matPhai2.scale.y = lenY / sizeHau.y;
    matPhai2.scale.z = lenZ / sizeHau.z;
  };

  const settingRayTrai2 = (rayTrai2) => {
    rayTrai2.position.z = (width - DDTBia - 0.45) * -1;

    rayTrai2.position.y = 0.03;

    rayTrai2.position.x = depth - (qtyDrawer - 2) * wDrawer - DDTBia - 0.0135;

    const lenZ = 0.45;

    const lenY = 0.04;

    const lenX = 0.0135;

    rayTrai2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(rayTrai2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    rayTrai2.scale.x = lenX / sizeHau.x;
    rayTrai2.scale.y = lenY / sizeHau.y;
    rayTrai2.scale.z = lenZ / sizeHau.z;
  };

  const settingMatTrai2 = (matTrai2) => {
    matTrai2.position.z = (width - DDTBia - dDrawer) * -1;

    matTrai2.position.y = 0.02;

    matTrai2.position.x =
      depth - (qtyDrawer - 2) * wDrawer - DDTBia - 0.0135 - DDTBia;

    const lenZ = dDrawer;

    const lenY = 0.12;

    const lenX = DDTBia;

    matTrai2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matTrai2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matTrai2.scale.x = lenX / sizeHau.x;
    matTrai2.scale.y = lenY / sizeHau.y;
    matTrai2.scale.z = lenZ / sizeHau.z;
  };

  const settingMatTruoc2 = (matTruoc2) => {
    matTruoc2.position.z = (width - DDTBia - DDTBia) * -1;

    matTruoc2.position.y = 0.02 + 0.012 + DDTHau;

    matTruoc2.position.x = depth - (qtyDrawer - 1) * wDrawer + DDTBia + 0.0135;

    const lenZ = DDTBia;

    const lenY = 0.1;

    const lenX = wDrawer - 2 * 0.0135 - 3 * DDTBia;

    matTruoc2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matTruoc2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matTruoc2.scale.x = lenX / sizeHau.x;
    matTruoc2.scale.y = lenY / sizeHau.y;
    matTruoc2.scale.z = lenZ / sizeHau.z;
  };

  const settingMatSau2 = (matSau2) => {
    matSau2.position.z = (width - DDTBia - dDrawer) * -1;

    matSau2.position.y = 0.02 + 0.012 + DDTHau;

    matSau2.position.x = depth - (qtyDrawer - 1) * wDrawer + DDTBia + 0.0135;

    const lenZ = DDTBia;

    const lenY = 0.1;

    const lenX = wDrawer - 2 * 0.0135 - 3 * DDTBia;

    matSau2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matSau2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matSau2.scale.x = lenX / sizeHau.x;
    matSau2.scale.y = lenY / sizeHau.y;
    matSau2.scale.z = lenZ / sizeHau.z;
  };

  const settingDayHocKeo2 = (dayHocKeo2) => {
    dayHocKeo2.position.z = (width - DDTBia - dDrawer) * -1;

    dayHocKeo2.position.y = 0.02 + 0.012;

    dayHocKeo2.position.x =
      depth - (qtyDrawer - 1) * wDrawer + DDTBia + 0.0135 - DDTBia / 2;

    const lenZ = dDrawer;

    const lenY = DDTHau;

    const lenX = wDrawer - 2 * 0.0135 - 3 * DDTBia + DDTBia;

    dayHocKeo2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(dayHocKeo2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    dayHocKeo2.scale.x = lenX / sizeHau.x;
    dayHocKeo2.scale.y = lenY / sizeHau.y;
    dayHocKeo2.scale.z = lenZ / sizeHau.z;
  };

  //HOC KEO 3
  const settingRayPhai3 = (rayPhai3) => {
    rayPhai3.position.z = (width - DDTBia - 0.45) * -1;

    rayPhai3.position.y = 0.03;

    rayPhai3.position.x = depth - (qtyDrawer - 2) * wDrawer;

    const lenZ = qtyDrawer < 3 ? 0 : 0.45;

    const lenY = qtyDrawer < 3 ? 0 : 0.04;

    const lenX = qtyDrawer < 3 ? 0 : 0.0135;

    rayPhai3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(rayPhai3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    rayPhai3.scale.x = lenX / sizeHau.x;
    rayPhai3.scale.y = lenY / sizeHau.y;
    rayPhai3.scale.z = lenZ / sizeHau.z;
  };

  const settingMatPhai3 = (matPhai3) => {
    matPhai3.position.z = (width - DDTBia - dDrawer) * -1;

    matPhai3.position.y = 0.02;

    matPhai3.position.x = depth - (qtyDrawer - 2) * wDrawer + 0.0135;

    const lenZ = qtyDrawer < 3 ? 0 : dDrawer;

    const lenY = qtyDrawer < 3 ? 0 : 0.12;

    const lenX = qtyDrawer < 3 ? 0 : DDTBia;

    matPhai3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matPhai3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matPhai3.scale.x = lenX / sizeHau.x;
    matPhai3.scale.y = lenY / sizeHau.y;
    matPhai3.scale.z = lenZ / sizeHau.z;
  };

  const settingRayTrai3 = (rayTrai3) => {
    rayTrai3.position.z = (width - DDTBia - 0.45) * -1;

    rayTrai3.position.y = 0.03;

    rayTrai3.position.x = depth - (qtyDrawer - 3) * wDrawer - DDTBia - 0.0135;

    const lenZ = qtyDrawer < 3 ? 0 : 0.45;

    const lenY = qtyDrawer < 3 ? 0 : 0.04;

    const lenX = qtyDrawer < 3 ? 0 : 0.0135;

    rayTrai3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(rayTrai3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    rayTrai3.scale.x = lenX / sizeHau.x;
    rayTrai3.scale.y = lenY / sizeHau.y;
    rayTrai3.scale.z = lenZ / sizeHau.z;
  };

  const settingMatTrai3 = (matTrai3) => {
    matTrai3.position.z = (width - DDTBia - dDrawer) * -1;

    matTrai3.position.y = 0.02;

    matTrai3.position.x =
      depth - (qtyDrawer - 3) * wDrawer - DDTBia - 0.0135 - DDTBia;

    const lenZ = qtyDrawer < 3 ? 0 : dDrawer;

    const lenY = qtyDrawer < 3 ? 0 : 0.12;

    const lenX = qtyDrawer < 3 ? 0 : DDTBia;

    matTrai3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matTrai3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matTrai3.scale.x = lenX / sizeHau.x;
    matTrai3.scale.y = lenY / sizeHau.y;
    matTrai3.scale.z = lenZ / sizeHau.z;
  };

  const settingMatTruoc3 = (matTruoc3) => {
    matTruoc3.position.z = (width - DDTBia - DDTBia) * -1;

    matTruoc3.position.y = 0.02 + 0.012 + DDTHau;

    matTruoc3.position.x = depth - (qtyDrawer - 2) * wDrawer + DDTBia + 0.0135;

    const lenZ = qtyDrawer < 3 ? 0 : DDTBia;

    const lenY = qtyDrawer < 3 ? 0 : 0.1;

    const lenX = qtyDrawer < 3 ? 0 : wDrawer - 2 * 0.0135 - 3 * DDTBia;

    matTruoc3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matTruoc3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matTruoc3.scale.x = lenX / sizeHau.x;
    matTruoc3.scale.y = lenY / sizeHau.y;
    matTruoc3.scale.z = lenZ / sizeHau.z;
  };

  const settingMatSau3 = (matSau3) => {
    matSau3.position.z = (width - DDTBia - dDrawer) * -1;

    matSau3.position.y = 0.02 + 0.012 + DDTHau;

    matSau3.position.x = depth - (qtyDrawer - 2) * wDrawer + DDTBia + 0.0135;

    const lenZ = qtyDrawer < 3 ? 0 : DDTBia;

    const lenY = qtyDrawer < 3 ? 0 : 0.1;

    const lenX = qtyDrawer < 3 ? 0 : wDrawer - 2 * 0.0135 - 3 * DDTBia;

    matSau3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(matSau3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    matSau3.scale.x = lenX / sizeHau.x;
    matSau3.scale.y = lenY / sizeHau.y;
    matSau3.scale.z = lenZ / sizeHau.z;
  };

  const settingDayHocKeo3 = (dayHocKeo3) => {
    dayHocKeo3.position.z = (width - DDTBia - dDrawer) * -1;

    dayHocKeo3.position.y = 0.02 + 0.012;

    dayHocKeo3.position.x =
      depth - (qtyDrawer - 2) * wDrawer + DDTBia + 0.0135 - DDTBia / 2;

    const lenZ = qtyDrawer < 3 ? 0 : dDrawer;

    const lenY = qtyDrawer < 3 ? 0 : DDTHau;

    const lenX = qtyDrawer < 3 ? 0 : wDrawer - 2 * 0.0135 - 3 * DDTBia + DDTBia;

    dayHocKeo3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(dayHocKeo3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    dayHocKeo3.scale.x = lenX / sizeHau.x;
    dayHocKeo3.scale.y = lenY / sizeHau.y;
    dayHocKeo3.scale.z = lenZ / sizeHau.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load(
      '/glb/GIUONG-BUC-KHOI-CHINH-CO-HOC-KEO.glb',
      (gltfScene) => {
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
      }
    );

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

      const FLW_H_CHAN_GIUONG_1 = md.getObjectByName('FLW-H-CHAN-GIUONG-1');
      const FLW_H_DAU_GIUONG = md.getObjectByName('FLW-H-DAU-GIUONG');
      const FLW_H_XUONG_NGANG_1 = md.getObjectByName('FLW-H-XUONG-NGANG-1');
      const FLW_H_XUONG_NGANG_2 = md.getObjectByName('FLW-H-XUONG-NGANG-2');
      const FLW_H_XUONG_NGANG_3 = md.getObjectByName('FLW-H-XUONG-NGANG-3');
      const FLW_H_XUONG_NGANG_4 = md.getObjectByName('FLW-H-XUONG-NGANG-4');
      const FLW_H_XUONG_NGANG_5 = md.getObjectByName('FLW-H-XUONG-NGANG-5');
      const FLW_H_XUONG_NGANG_6 = md.getObjectByName('FLW-H-XUONG-NGANG-6');
      const FLW_H_XUONG_NGANG_NHO_1 = md.getObjectByName(
        'FLW-H-XUONG-NGANG-NHO-1'
      );
      const FLW_H_XUONG_NGANG_NHO_2 = md.getObjectByName(
        'FLW-H-XUONG-NGANG-NHO-2'
      );
      const FLW_H_XUONG_NGANG_NHO_3 = md.getObjectByName(
        'FLW-H-XUONG-NGANG-NHO-3'
      );
      const FGR_H_CANH_LAT_1 = md.getObjectByName('FGR-H-CANH-LAT-1');
      const FGR_H_CANH_LAT_2 = md.getObjectByName('FGR-H-CANH-LAT-2');
      const FGR_H_CANH_LAT_3 = md.getObjectByName('FGR-H-CANH-LAT-3');
      const SGR_H_VAT_PHAI = md.getObjectByName('SGR-H-VAT-PHAI');
      const SGR_H_VAT_TRAI_1_1 = md.getObjectByName('SGR-H-VAT-TRAI-1-1');
      const SGR_H_VAT_TRAI_1_2 = md.getObjectByName('SGR-H-VAT-TRAI-1-2');
      const SLW_H_THANH_GIUONG_1 = md.getObjectByName('SLW-H-THANH-GIUONG-1');
      const SLW_H_THANH_GIUONG_2_1 = md.getObjectByName(
        'SLW-H-THANH-GIUONG-2-1'
      );
      const SLW_H_THANH_GIUONG_2_2 = md.getObjectByName(
        'SLW-H-THANH-GIUONG-2-2'
      );
      const SLW_H_XUONG_DOC_1 = md.getObjectByName('SLW-H-XUONG-DOC-1');
      const SLW_H_XUONG_DOC_NHO_1 = md.getObjectByName('SLW-H-XUONG-DOC-NHO-1');
      const SLW_H_XUONG_DOC_NHO_2 = md.getObjectByName('SLW-H-XUONG-DOC-NHO-2');
      const SLW_H_MAT_HOC_1 = md.getObjectByName('SLW-H-MAT-HOC-1');
      const SLW_H_MAT_HOC_2 = md.getObjectByName('SLW-H-MAT-HOC-2');
      const SLW_H_MAT_HOC_3 = md.getObjectByName('SLW-H-MAT-HOC-3');

      const DAY_HK_1 = md.getObjectByName('DAY-HK-1');
      const MAT_PHAI_SLW_H_1 = md.getObjectByName('MAT-PHAI-SLW-H-1');
      const MAT_SAU_FLW_H_1 = md.getObjectByName('MAT-SAU-FLW-H-1');
      const MAT_TRAI_SLW_H_1 = md.getObjectByName('MAT-TRAI-SLW-H-1');
      const MAT_TRUOC_FLW_H_1 = md.getObjectByName('MAT-TRUOC-FLW-H-1');
      const RAY_PHAI_1 = md.getObjectByName('RAY-PHAI-1');
      const RAY_TRAI_1 = md.getObjectByName('RAY-TRAI-1');

      const DAY_HK_2 = md.getObjectByName('DAY-HK-2');
      const MAT_PHAI_SLW_H_2 = md.getObjectByName('MAT-PHAI-SLW-H-2');
      const MAT_SAU_FLW_H_2 = md.getObjectByName('MAT-SAU-FLW-H-2');
      const MAT_TRAI_SLW_H_2 = md.getObjectByName('MAT-TRAI-SLW-H-2');
      const MAT_TRUOC_FLW_H_2 = md.getObjectByName('MAT-TRUOC-FLW-H-2');
      const RAY_PHAI_2 = md.getObjectByName('RAY-PHAI-2');
      const RAY_TRAI_2 = md.getObjectByName('RAY-TRAI-2');

      const DAY_HK_3 = md.getObjectByName('DAY-HK-3');
      const MAT_PHAI_SLW_H_3 = md.getObjectByName('MAT-PHAI-SLW-H-3');
      const MAT_SAU_FLW_H_3 = md.getObjectByName('MAT-SAU-FLW-H-3');
      const MAT_TRAI_SLW_H_3 = md.getObjectByName('MAT-TRAI-SLW-H-3');
      const MAT_TRUOC_FLW_H_3 = md.getObjectByName('MAT-TRUOC-FLW-H-3');
      const RAY_PHAI_3 = md.getObjectByName('RAY-PHAI-3');
      const RAY_TRAI_3 = md.getObjectByName('RAY-TRAI-3');

      FLW_H_DAU_GIUONG && settingDauGiuong(FLW_H_DAU_GIUONG);
      SLW_H_THANH_GIUONG_1 && settingThanhGiuong1(SLW_H_THANH_GIUONG_1);
      SLW_H_THANH_GIUONG_2_1 && settingThanhGiuong2_1(SLW_H_THANH_GIUONG_2_1);
      SLW_H_THANH_GIUONG_2_2 && settingThanhGiuong2_2(SLW_H_THANH_GIUONG_2_2);
      SGR_H_VAT_TRAI_1_1 && settingVatTrai1_1(SGR_H_VAT_TRAI_1_1);
      SGR_H_VAT_TRAI_1_2 && settingVatTrai1_2(SGR_H_VAT_TRAI_1_2);
      SGR_H_VAT_PHAI && settingVatPhai(SGR_H_VAT_PHAI);
      FGR_H_CANH_LAT_1 && settingCanhLat1(FGR_H_CANH_LAT_1);
      FGR_H_CANH_LAT_2 && settingCanhLat2(FGR_H_CANH_LAT_2);
      FGR_H_CANH_LAT_3 && settingCanhLat3(FGR_H_CANH_LAT_3);
      SLW_H_MAT_HOC_1 && settingMatHoc1(SLW_H_MAT_HOC_1);
      SLW_H_MAT_HOC_2 && settingMatHoc2(SLW_H_MAT_HOC_2);
      SLW_H_MAT_HOC_3 && settingMatHoc3(SLW_H_MAT_HOC_3);
      SLW_H_XUONG_DOC_NHO_1 && settingXuongDocNho1(SLW_H_XUONG_DOC_NHO_1);
      SLW_H_XUONG_DOC_NHO_2 && settingXuongDocNho2(SLW_H_XUONG_DOC_NHO_2);
      SLW_H_XUONG_DOC_1 && settingXuongDoc1(SLW_H_XUONG_DOC_1);
      FLW_H_XUONG_NGANG_1 && settingXuongNgang1(FLW_H_XUONG_NGANG_1);
      FLW_H_XUONG_NGANG_3 && settingXuongNgang3(FLW_H_XUONG_NGANG_3);
      FLW_H_XUONG_NGANG_5 && settingXuongNgang5(FLW_H_XUONG_NGANG_5);
      FLW_H_XUONG_NGANG_2 && settingXuongNgang2(FLW_H_XUONG_NGANG_2);
      FLW_H_XUONG_NGANG_4 && settingXuongNgang4(FLW_H_XUONG_NGANG_4);
      FLW_H_XUONG_NGANG_6 && settingXuongNgang6(FLW_H_XUONG_NGANG_6);
      FLW_H_XUONG_NGANG_NHO_1 && settingXuongNgangNho1(FLW_H_XUONG_NGANG_NHO_1);
      FLW_H_XUONG_NGANG_NHO_2 && settingXuongNgangNho2(FLW_H_XUONG_NGANG_NHO_2);
      FLW_H_XUONG_NGANG_NHO_3 && settingXuongNgangNho3(FLW_H_XUONG_NGANG_NHO_3);
      FLW_H_CHAN_GIUONG_1 && settingChanGiuong1(FLW_H_CHAN_GIUONG_1);

      DAY_HK_1 && settingDayHocKeo1(DAY_HK_1);
      MAT_PHAI_SLW_H_1 && settingMatPhai1(MAT_PHAI_SLW_H_1);
      MAT_SAU_FLW_H_1 && settingMatSau1(MAT_SAU_FLW_H_1);
      MAT_TRAI_SLW_H_1 && settingMatTrai1(MAT_TRAI_SLW_H_1);
      MAT_TRUOC_FLW_H_1 && settingMatTruoc1(MAT_TRUOC_FLW_H_1);
      RAY_PHAI_1 && settingRayPhai1(RAY_PHAI_1);
      RAY_TRAI_1 && settingRayTrai1(RAY_TRAI_1);

      DAY_HK_2 && settingDayHocKeo2(DAY_HK_2);
      MAT_PHAI_SLW_H_2 && settingMatPhai2(MAT_PHAI_SLW_H_2);
      MAT_SAU_FLW_H_2 && settingMatSau2(MAT_SAU_FLW_H_2);
      MAT_TRAI_SLW_H_2 && settingMatTrai2(MAT_TRAI_SLW_H_2);
      MAT_TRUOC_FLW_H_2 && settingMatTruoc2(MAT_TRUOC_FLW_H_2);
      RAY_PHAI_2 && settingRayPhai2(RAY_PHAI_2);
      RAY_TRAI_2 && settingRayTrai2(RAY_TRAI_2);

      DAY_HK_3 && settingDayHocKeo3(DAY_HK_3);
      MAT_PHAI_SLW_H_3 && settingMatPhai3(MAT_PHAI_SLW_H_3);
      MAT_SAU_FLW_H_3 && settingMatSau3(MAT_SAU_FLW_H_3);
      MAT_TRAI_SLW_H_3 && settingMatTrai3(MAT_TRAI_SLW_H_3);
      MAT_TRUOC_FLW_H_3 && settingMatTruoc3(MAT_TRUOC_FLW_H_3);
      RAY_PHAI_3 && settingRayPhai3(RAY_PHAI_3);
      RAY_TRAI_3 && settingRayTrai3(RAY_TRAI_3);

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

          <br />
          <label className="label" htmlFor="qtyFlipDoor">
            SL cánh lật (cái):
          </label>
          <input
            className="input"
            type="number"
            name="qtyFlipDoor"
            id="qtyFlipDoor"
            defaultValue={qtyFlipDoor}
            onChange={(e) => {
              setQtyFlipDoor(Number(e.target.value));
            }}
          />

          <br />
          <label className="label" htmlFor="wFlipDoor">
            Rộng cánh lật (mm):
          </label>
          <input
            className="input"
            type="number"
            name="wFlipDoor"
            id="wFlipDoor"
            defaultValue={Math.floor(wFlipDoor * 1000)}
            onChange={(e) => {
              setWFlipDoor(Math.min(Number(e.target.value) / 1000), 0.65);
            }}
          />
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App4;
