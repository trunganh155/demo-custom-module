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

  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(0.3);
  const [depth, setDepth] = useState(3.5);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);
  const [bedDepth, setBedDepth] = useState(2);

  //BO CONG TRAI
  const settingDauGiuong = (dauGiuong) => {
    dauGiuong.position.z = 0 * -1;

    dauGiuong.position.y = 0;

    dauGiuong.position.x = 0;

    const lenZ = width;

    const lenY = 0.8;

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

    thanhGiuong1.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = bedDepth - DDTBia;

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

    thanhGiuong2_1.position.y = 0.23;

    thanhGiuong2_1.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = 0.053;

    const lenX = bedDepth - DDTBia;

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

    thanhGiuong2_2.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = 0.23;

    const lenX = 0.1;

    thanhGiuong2_2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(thanhGiuong2_2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    thanhGiuong2_2.scale.x = lenX / sizeHau.x;
    thanhGiuong2_2.scale.y = lenY / sizeHau.y;
    thanhGiuong2_2.scale.z = lenZ / sizeHau.z;
  };

  const settingThanhGiuong3 = (thanhGiuong3) => {
    thanhGiuong3.position.z = 0 * -1;

    thanhGiuong3.position.y = 0;

    thanhGiuong3.position.x = bedDepth;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth - bedDepth;

    thanhGiuong3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(thanhGiuong3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    thanhGiuong3.scale.x = lenX / sizeHau.x;
    thanhGiuong3.scale.y = lenY / sizeHau.y;
    thanhGiuong3.scale.z = lenZ / sizeHau.z;
  };

  const settingThanhGiuong4 = (thanhGiuong4) => {
    thanhGiuong4.position.z = (width - DDTBia) * -1;

    thanhGiuong4.position.y = 0;

    thanhGiuong4.position.x = bedDepth;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth - bedDepth;

    thanhGiuong4.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(thanhGiuong4);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    thanhGiuong4.scale.x = lenX / sizeHau.x;
    thanhGiuong4.scale.y = lenY / sizeHau.y;
    thanhGiuong4.scale.z = lenZ / sizeHau.z;
  };

  const settingVatTrai1_1 = (vatTrai1_1) => {
    vatTrai1_1.position.z = 0 * -1;

    vatTrai1_1.position.y = height - DDTBia;

    vatTrai1_1.position.x = DDTBia;

    const lenZ = 0.07;

    const lenY = DDTBia;

    const lenX = bedDepth - DDTBia;

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

    vatTrai1_2.position.x = DDTBia;

    const lenZ = width / 2 - 0.07;

    const lenY = DDTBia;

    const lenX = 0.1;

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

    vatPhai.position.x = DDTBia;

    const lenZ = width / 2;

    const lenY = DDTBia;

    const lenX = bedDepth - DDTBia;

    vatPhai.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatPhai);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatPhai.scale.x = lenX / sizeHau.x;
    vatPhai.scale.y = lenY / sizeHau.y;
    vatPhai.scale.z = lenZ / sizeHau.z;
  };

  const settingVatNgang = (vatNgang) => {
    vatNgang.position.z = 0 * -1;

    vatNgang.position.y = height - DDTBia;

    vatNgang.position.x = bedDepth;

    const lenZ = width;

    const lenY = DDTBia;

    const lenX = depth - bedDepth;

    vatNgang.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatNgang);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatNgang.scale.x = lenX / sizeHau.x;
    vatNgang.scale.y = lenY / sizeHau.y;
    vatNgang.scale.z = lenZ / sizeHau.z;
  };

  const settingCanhLat1 = (canhLat1) => {
    canhLat1.position.z = 0.07 * -1;

    canhLat1.position.y = height - DDTBia;

    canhLat1.position.x = DDTBia + 0.1;

    const lenZ = width / 2 - 0.07;

    const lenY = DDTBia;

    const lenX = (bedDepth - DDTBia - 0.1) / 3;

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

    canhLat2.position.x = DDTBia + 0.1 + (bedDepth - DDTBia - 0.1) / 3;

    const lenZ = width / 2 - 0.07;

    const lenY = DDTBia;

    const lenX = (bedDepth - DDTBia - 0.1) / 3;

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

    canhLat3.position.x = DDTBia + 0.1 + ((bedDepth - DDTBia - 0.1) / 3) * 2;

    const lenZ = width / 2 - 0.07;

    const lenY = DDTBia;

    const lenX = (bedDepth - DDTBia - 0.1) / 3;

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

    matHoc1.position.x = DDTBia + 0.1;

    const lenZ = DDTBia;

    const lenY = 0.2;

    const lenX = (bedDepth - DDTBia - 0.1) / 3;

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

    matHoc2.position.x = DDTBia + 0.1 + (bedDepth - DDTBia - 0.1) / 3;

    const lenZ = DDTBia;

    const lenY = 0.2;

    const lenX = (bedDepth - DDTBia - 0.1) / 3;

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

    matHoc3.position.x = DDTBia + 0.1 + ((bedDepth - DDTBia - 0.1) / 3) * 2;

    const lenZ = DDTBia;

    const lenY = 0.2;

    const lenX = (bedDepth - DDTBia - 0.1) / 3;

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

    const lenX = bedDepth - 2 * DDTBia;

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

    xuongDocNho2.position.y = height - DDTBia - 0.103;

    xuongDocNho2.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = 0.103;

    const lenX = bedDepth - 2 * DDTBia;

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

    const lenX = bedDepth - 2 * DDTBia;

    xuongDoc1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongDoc1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongDoc1.scale.x = lenX / sizeHau.x;
    xuongDoc1.scale.y = lenY / sizeHau.y;
    xuongDoc1.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDoc2 = (xuongDoc2) => {
    xuongDoc2.position.z = ((width - 4 * DDTBia) / 3 + DDTBia) * -1;

    xuongDoc2.position.y = 0;

    xuongDoc2.position.x = bedDepth + DDTBia;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth - bedDepth - 2 * DDTBia;

    xuongDoc2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongDoc2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongDoc2.scale.x = lenX / sizeHau.x;
    xuongDoc2.scale.y = lenY / sizeHau.y;
    xuongDoc2.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDoc3 = (xuongDoc2) => {
    xuongDoc2.position.z = ((width - 4 * DDTBia) / 3 + DDTBia) * 2 * -1;

    xuongDoc2.position.y = 0;

    xuongDoc2.position.x = bedDepth + DDTBia;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth - bedDepth - 2 * DDTBia;

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

    chanGiuong1.position.x = bedDepth - DDTBia;

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

    chanGiuong2.position.x = bedDepth;

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

  const settingChanGiuong3 = (chanGiuong3) => {
    chanGiuong3.position.z = DDTBia * -1;

    chanGiuong3.position.y = 0;

    chanGiuong3.position.x = depth - DDTBia;

    const lenZ = width - 2 * DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    chanGiuong3.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(chanGiuong3);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    chanGiuong3.scale.x = lenX / sizeHau.x;
    chanGiuong3.scale.y = lenY / sizeHau.y;
    chanGiuong3.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgang1 = (xuongNgang1) => {
    xuongNgang1.position.z = DDTBia * -1;

    xuongNgang1.position.y = 0;

    xuongNgang1.position.x = 0.1 + DDTBia;

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

    xuongNgang3.position.x = 0.1 + (bedDepth - DDTBia - 0.1) / 3;

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

    xuongNgang5.position.x = 0.1 + ((bedDepth - DDTBia - 0.1) / 3) * 2;

    const lenZ = width / 2 - 2 * DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

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

    xuongNgang2.position.x = 0.1 + DDTBia;

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

    xuongNgang4.position.x = 0.1 + (bedDepth - DDTBia - 0.1) / 3;

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

    xuongNgang6.position.x = 0.1 + ((bedDepth - DDTBia - 0.1) / 3) * 2;

    const lenZ = width / 2 - DDTBia;

    const lenY = height - DDTBia;

    const lenX = DDTBia;

    xuongNgang6.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgang6);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgang6.scale.x = lenX / sizeHau.x;
    xuongNgang6.scale.y = lenY / sizeHau.y;
    xuongNgang6.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgangNho1 = (xuongNgangNho1) => {
    xuongNgangNho1.position.z = DDTBia * -1;

    xuongNgangNho1.position.y = height - DDTBia - 0.103;

    xuongNgangNho1.position.x = 0.1 + (bedDepth - DDTBia - 0.1) / 3 + DDTBia;

    const lenZ = width / 2 - 2 * DDTBia;

    const lenY = 0.103;

    const lenX = DDTBia;

    xuongNgangNho1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgangNho1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgangNho1.scale.x = lenX / sizeHau.x;
    xuongNgangNho1.scale.y = lenY / sizeHau.y;
    xuongNgangNho1.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongNgangNho2 = (xuongNgangNho2) => {
    xuongNgangNho2.position.z = DDTBia * -1;

    xuongNgangNho2.position.y = height - DDTBia - 0.103;

    xuongNgangNho2.position.x =
      0.1 + ((bedDepth - DDTBia - 0.1) / 3) * 2 + DDTBia;

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

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/GIUONG-BUC.glb', (gltfScene) => {
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

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      const FLW_H_CHAN_GIUONG_1 = md.getObjectByName('FLW-H-CHAN-GIUONG-1');
      const FLW_H_CHAN_GIUONG_2 = md.getObjectByName('FLW-H-CHAN-GIUONG-2');
      const FLW_H_CHAN_GIUONG_3 = md.getObjectByName('FLW-H-CHAN-GIUONG-3');
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
      const SGR_H_CANH_LAT_1 = md.getObjectByName('SGR-H-CANH-LAT-1');
      const SGR_H_CANH_LAT_2 = md.getObjectByName('SGR-H-CANH-LAT-2');
      const SGR_H_CANH_LAT_3 = md.getObjectByName('SGR-H-CANH-LAT-3');
      const SGR_H_VAT_PHAI = md.getObjectByName('SGR-H-VAT-PHAI');
      const FGR_H_VAT_NGANG = md.getObjectByName('FGR-H-VAT-NGANG');
      const SGR_H_VAT_TRAI_1_1 = md.getObjectByName('SGR-H-VAT-TRAI-1-1');
      const SGR_H_VAT_TRAI_1_2 = md.getObjectByName('SGR-H-VAT-TRAI-1-2');
      const SLW_H_THANH_GIUONG_1 = md.getObjectByName('SLW-H-THANH-GIUONG-1');
      const SLW_H_THANH_GIUONG_2_1 = md.getObjectByName(
        'SLW-H-THANH-GIUONG-2-1'
      );
      const SLW_H_THANH_GIUONG_2_2 = md.getObjectByName(
        'SLW-H-THANH-GIUONG-2-2'
      );
      const SLW_H_THANH_GIUONG_3 = md.getObjectByName('SLW-H-THANH-GIUONG-3');
      const SLW_H_THANH_GIUONG_4 = md.getObjectByName('SLW-H-THANH-GIUONG-4');
      const SLW_H_XUONG_DOC_1 = md.getObjectByName('SLW-H-XUONG-DOC-1');
      const SLW_H_XUONG_DOC_2 = md.getObjectByName('SLW-H-XUONG-DOC-2');
      const SLW_H_XUONG_DOC_3 = md.getObjectByName('SLW-H-XUONG-DOC-3');
      const SLW_H_XUONG_DOC_NHO_1 = md.getObjectByName('SLW-H-XUONG-DOC-NHO-1');
      const SLW_H_XUONG_DOC_NHO_2 = md.getObjectByName('SLW-H-XUONG-DOC-NHO-2');
      const SLW_H_MAT_HOC_1 = md.getObjectByName('SLW-H-MAT-HOC-1');
      const SLW_H_MAT_HOC_2 = md.getObjectByName('SLW-H-MAT-HOC-2');
      const SLW_H_MAT_HOC_3 = md.getObjectByName('SLW-H-MAT-HOC-3');

      FLW_H_DAU_GIUONG && settingDauGiuong(FLW_H_DAU_GIUONG);
      SLW_H_THANH_GIUONG_1 && settingThanhGiuong1(SLW_H_THANH_GIUONG_1);
      SLW_H_THANH_GIUONG_2_1 && settingThanhGiuong2_1(SLW_H_THANH_GIUONG_2_1);
      SLW_H_THANH_GIUONG_2_2 && settingThanhGiuong2_2(SLW_H_THANH_GIUONG_2_2);
      SLW_H_THANH_GIUONG_3 && settingThanhGiuong3(SLW_H_THANH_GIUONG_3);
      SLW_H_THANH_GIUONG_4 && settingThanhGiuong4(SLW_H_THANH_GIUONG_4);
      SGR_H_VAT_TRAI_1_1 && settingVatTrai1_1(SGR_H_VAT_TRAI_1_1);
      SGR_H_VAT_TRAI_1_2 && settingVatTrai1_2(SGR_H_VAT_TRAI_1_2);
      SGR_H_VAT_PHAI && settingVatPhai(SGR_H_VAT_PHAI);
      FGR_H_VAT_NGANG && settingVatNgang(FGR_H_VAT_NGANG);
      SGR_H_CANH_LAT_1 && settingCanhLat1(SGR_H_CANH_LAT_1);
      SGR_H_CANH_LAT_2 && settingCanhLat2(SGR_H_CANH_LAT_2);
      SGR_H_CANH_LAT_3 && settingCanhLat3(SGR_H_CANH_LAT_3);
      SLW_H_MAT_HOC_1 && settingMatHoc1(SLW_H_MAT_HOC_1);
      SLW_H_MAT_HOC_2 && settingMatHoc2(SLW_H_MAT_HOC_2);
      SLW_H_MAT_HOC_3 && settingMatHoc3(SLW_H_MAT_HOC_3);
      SLW_H_XUONG_DOC_NHO_1 && settingXuongDocNho1(SLW_H_XUONG_DOC_NHO_1);
      SLW_H_XUONG_DOC_NHO_2 && settingXuongDocNho2(SLW_H_XUONG_DOC_NHO_2);
      SLW_H_XUONG_DOC_1 && settingXuongDoc1(SLW_H_XUONG_DOC_1);
      SLW_H_XUONG_DOC_2 && settingXuongDoc2(SLW_H_XUONG_DOC_2);
      SLW_H_XUONG_DOC_3 && settingXuongDoc3(SLW_H_XUONG_DOC_3);
      FLW_H_XUONG_NGANG_1 && settingXuongNgang1(FLW_H_XUONG_NGANG_1);
      FLW_H_XUONG_NGANG_3 && settingXuongNgang3(FLW_H_XUONG_NGANG_3);
      FLW_H_XUONG_NGANG_5 && settingXuongNgang5(FLW_H_XUONG_NGANG_5);
      FLW_H_XUONG_NGANG_2 && settingXuongNgang2(FLW_H_XUONG_NGANG_2);
      FLW_H_XUONG_NGANG_4 && settingXuongNgang4(FLW_H_XUONG_NGANG_4);
      FLW_H_XUONG_NGANG_NHO_1 && settingXuongNgangNho1(FLW_H_XUONG_NGANG_NHO_1);
      FLW_H_XUONG_NGANG_NHO_2 && settingXuongNgangNho2(FLW_H_XUONG_NGANG_NHO_2);
      FLW_H_XUONG_NGANG_6 && settingXuongNgang6(FLW_H_XUONG_NGANG_6);
      FLW_H_CHAN_GIUONG_1 && settingChanGiuong1(FLW_H_CHAN_GIUONG_1);
      FLW_H_CHAN_GIUONG_2 && settingChanGiuong2(FLW_H_CHAN_GIUONG_2);
      FLW_H_CHAN_GIUONG_3 && settingChanGiuong3(FLW_H_CHAN_GIUONG_3);

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
  }, [display, width, height, depth, bedDepth, DDTHau, DDTBia, gltfUuid]);

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

          <br />
          <label className="label" htmlFor="height">
            Dài giường (mm):
          </label>
          <input
            className="input"
            type="number"
            name="bedDepth"
            id="bedDepth"
            defaultValue={bedDepth * 1000}
            onChange={(e) => {
              setBedDepth(Number(e.target.value) / 1000);
            }}
          />
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App4;
