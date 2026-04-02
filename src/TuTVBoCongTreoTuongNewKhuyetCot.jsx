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

  const [width, setWidth] = useState(1.4);
  const [height, setHeight] = useState(0.5);
  const [depth, setDepth] = useState(0.43);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.017);

  const [KCCot, setKCCot] = useState(0.5);
  const [dayCot, setDayCot] = useState(0.15);
  const [rongCot, setRongCot] = useState(0.3);

  const [rBo, setRBo] = useState(0.1);
  const [truHaoBoCong, setTruHaoBoCong] = useState(0.02);
  // const [bct, setBCT] = useState(false);
  // const [bcp, setBCP] = useState(false);
  const [bct, setBCT] = useState(true);
  const [bcp, setBCP] = useState(true);

  //BO CONG TRAI
  const settingBCTHau = (hau) => {
    hau.position.z = DDTBia * -1;

    hau.position.y = 0;

    hau.position.x = KCCot > rBo + truHaoBoCong ? 0 : dayCot;

    const lenZ = bct ? rBo + truHaoBoCong - 2 * DDTBia : 0;

    const lenX = bct ? DDTHau : 0;

    const lenY = bct ? height - DDTBia : 0;

    hau.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau.scale.x = lenX / sizeHau.x;
    hau.scale.y = lenY / sizeHau.y;
    hau.scale.z = lenZ / sizeHau.z;
  };

  const settingBCTBiaTrai = (bTrai) => {
    bTrai.position.z = 0 * -1;

    bTrai.position.y = 0;

    bTrai.position.x = KCCot > rBo + truHaoBoCong ? 0 : dayCot;

    const lenZ = bct ? DDTBia : 0;

    const lenX = bct
      ? KCCot > rBo + truHaoBoCong
        ? depth - rBo
        : depth - rBo - dayCot
      : 0;

    const lenY = bct ? height - DDTBia : 0;

    bTrai.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bTrai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bTrai.scale.x = lenX / sizeBiaTrai.x;
    bTrai.scale.y = lenY / sizeBiaTrai.y;
    bTrai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBCTBiaPhai = (bPhai) => {
    bPhai.position.z = (rBo + truHaoBoCong - DDTBia) * -1;

    bPhai.position.x = KCCot > rBo + truHaoBoCong ? 0 : dayCot;

    bPhai.position.y = 0;

    const lenZ = bct ? DDTBia : 0;

    const lenX = bct
      ? KCCot > rBo + truHaoBoCong
        ? depth - DDTBia
        : depth - DDTBia - dayCot
      : 0;

    const lenY = bct ? height - DDTBia : 0;

    bPhai.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bPhai);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bPhai.scale.x = lenX / sizeBiaPhai.x;
    bPhai.scale.y = lenY / sizeBiaPhai.y;
    bPhai.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBCTBiaBoCong = (dayBoCong) => {
    dayBoCong.position.z = 0 * -1;

    dayBoCong.position.y = 0;

    dayBoCong.position.x = depth - rBo;

    const lenZ = bct ? rBo : 0;

    const lenX = bct ? rBo : 0;

    const lenY = bct ? height - DDTBia : 0;

    dayBoCong.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(dayBoCong);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    dayBoCong.scale.x = lenX / sizeDay.x;
    dayBoCong.scale.y = lenY / sizeDay.y;
    dayBoCong.scale.z = lenZ / sizeDay.z;
  };

  const settingBCTTruHaoBoCong = (THBoCong) => {
    THBoCong.position.z = rBo * -1;

    THBoCong.position.y = 0;

    THBoCong.position.x = depth - DDTBia;

    const lenZ = bct ? truHaoBoCong : 0;

    const lenX = bct ? DDTBia : 0;

    const lenY = bct ? height - DDTBia : 0;

    THBoCong.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(THBoCong);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    THBoCong.scale.x = lenX / sizeHau.x;
    THBoCong.scale.y = lenY / sizeHau.y;
    THBoCong.scale.z = lenZ / sizeHau.z;
  };

  const settingBCTNoc1 = (noc1) => {
    noc1.position.z = 0 * -1;

    noc1.position.y = height - DDTBia;

    noc1.position.x = depth - rBo;

    const lenZ = bct ? rBo : 0;

    const lenX = bct ? rBo : 0;

    const lenY = bct ? DDTBia : 0;

    noc1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc1.scale.x = lenX / sizeDay.x;
    noc1.scale.y = lenY / sizeDay.y;
    noc1.scale.z = lenZ / sizeDay.z;
  };

  const settingBCTNoc3 = (noc3) => {
    noc3.position.z = 0 * -1;

    noc3.position.y = height - DDTBia;

    noc3.position.x = KCCot > rBo + truHaoBoCong ? 0 : dayCot;

    const lenZ = bct ? rBo : 0;

    const lenX = bct
      ? KCCot > rBo + truHaoBoCong
        ? depth - rBo
        : depth - rBo - dayCot
      : 0;

    const lenY = bct ? DDTBia : 0;

    noc3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc3.scale.x = lenX / sizeDay.x;
    noc3.scale.y = lenY / sizeDay.y;
    noc3.scale.z = lenZ / sizeDay.z;
  };

  const settingBCTDay1 = (day1) => {
    day1.position.z = DDTBia * -1;

    day1.position.y = 0;

    day1.position.x = depth - rBo;

    const lenZ = bct ? rBo - DDTBia : 0;

    const lenX = bct ? rBo - DDTBia : 0;

    const lenY = bct ? DDTBia : 0;

    day1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day1.scale.x = lenX / sizeDay.x;
    day1.scale.y = lenY / sizeDay.y;
    day1.scale.z = lenZ / sizeDay.z;
  };

  const settingBCTDay2 = (day2) => {
    day2.position.z = rBo * -1;

    day2.position.y = 0;

    day2.position.x = depth - rBo;

    const lenZ = bct ? truHaoBoCong - DDTBia : 0;

    const lenX = bct ? rBo - DDTBia : 0;

    const lenY = bct ? DDTBia : 0;

    day2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day2.scale.x = lenX / sizeDay.x;
    day2.scale.y = lenY / sizeDay.y;
    day2.scale.z = lenZ / sizeDay.z;
  };

  const settingBCTDay3 = (day3) => {
    day3.position.z = DDTBia * -1;

    day3.position.y = 0;

    day3.position.x = KCCot > rBo + truHaoBoCong ? DDTHau : dayCot + DDTHau;

    const lenZ = bct ? rBo + truHaoBoCong - 2 * DDTBia : 0;

    const lenX = bct
      ? KCCot > rBo + truHaoBoCong
        ? depth - DDTHau - rBo
        : depth - DDTHau - rBo - dayCot
      : 0;

    const lenY = bct ? DDTBia : 0;

    day3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day3.scale.x = lenX / sizeDay.x;
    day3.scale.y = lenY / sizeDay.y;
    day3.scale.z = lenZ / sizeDay.z;
  };
  //BO CONG TRAI

  //KHOI CHINH
  const settingDay1 = (day1) => {
    day1.position.z = (bct ? rBo + truHaoBoCong : 0) * -1;

    day1.position.y = 0;

    day1.position.x = 0;

    const lenZ =
      KCCot > DDTBia ? (bct ? KCCot - rBo - truHaoBoCong : KCCot) : 0;

    const lenX = KCCot > DDTBia ? depth - DDTBia : 0;

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
    day2.position.z =
      (bct
        ? KCCot > rBo + truHaoBoCong
          ? KCCot
          : rBo + truHaoBoCong
        : KCCot > DDTBia
          ? KCCot
          : 0) * -1;

    day2.position.y = 0;

    day2.position.x = dayCot;

    const lenZ =
      rongCot -
      ((bct && KCCot < rBo + truHaoBoCong) || (bcp && KCCot >= width - rongCot)
        ? rBo + truHaoBoCong
        : 0);

    const lenX = depth - dayCot - DDTBia;

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
    day3.position.z =
      ((KCCot > DDTBia && KCCot < width - rongCot ? KCCot : 0) + rongCot) * -1;

    day3.position.y = 0;

    day3.position.x = 0;

    const lenZ =
      KCCot < width - rongCot
        ? bcp
          ? width - (KCCot > DDTBia ? KCCot : 0) - rongCot - rBo - truHaoBoCong
          : width - (KCCot > DDTBia ? KCCot : 0) - rongCot
        : 0;

    const lenX = KCCot < width - rongCot ? depth - DDTBia : 0;

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
    hau1.position.z = (bct ? rBo + truHaoBoCong : DDTBia) * -1;

    hau1.position.y = DDTBia;

    hau1.position.x = 0;

    const lenZ =
      KCCot > DDTBia ? KCCot - (bct ? rBo + truHaoBoCong : 2 * DDTBia) : 0;

    const lenX = KCCot > DDTBia ? DDTHau : 0;

    const lenY = KCCot > DDTBia ? height - 2 * DDTBia : 0;

    hau1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau1.scale.x = lenX / sizeHau.x;
    hau1.scale.y = lenY / sizeHau.y;
    hau1.scale.z = lenZ / sizeHau.z;
  };

  const settingHau2 = (hau2) => {
    hau2.position.z =
      (bct
        ? KCCot > rBo + truHaoBoCong
          ? KCCot - DDTBia
          : rBo + truHaoBoCong
        : KCCot > DDTBia
          ? KCCot - DDTBia
          : 0) * -1;

    hau2.position.x = dayCot;

    hau2.position.y = DDTBia;

    const lenZ =
      rongCot +
      2 * DDTBia -
      ((bct && KCCot < rBo + truHaoBoCong) || (bcp && KCCot >= width - rongCot)
        ? rBo + truHaoBoCong + DDTBia
        : KCCot > DDTBia && KCCot < width - rongCot
          ? 0
          : DDTBia);

    const lenX = DDTBia;

    const lenY = height - 2 * DDTBia;

    hau2.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau2);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau2.scale.x = lenX / sizeHau.x;
    hau2.scale.y = lenY / sizeHau.y;
    hau2.scale.z = lenZ / sizeHau.z;
  };

  const settingHau3 = (hau3) => {
    hau3.position.z = ((KCCot > DDTBia ? KCCot : 0) + rongCot + DDTBia) * -1;

    hau3.position.x = 0;

    hau3.position.y = DDTBia;

    const lenZ =
      KCCot < width - rongCot
        ? width -
          (KCCot > DDTBia ? KCCot : 0) -
          rongCot -
          2 * DDTBia -
          (bcp ? rBo + truHaoBoCong : 0)
        : 0;

    const lenX = KCCot < width - rongCot ? DDTHau : 0;

    const lenY = KCCot < width - rongCot ? height - 2 * DDTBia : 0;

    hau3.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau3);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau3.scale.x = lenX / sizeHau.x;
    hau3.scale.y = lenY / sizeHau.y;
    hau3.scale.z = lenZ / sizeHau.z;
  };

  const settingBiaTrai = (bTrai) => {
    bTrai.position.z = (bct ? rBo + truHaoBoCong : 0) * -1;

    bTrai.position.y = DDTBia;

    bTrai.position.x = KCCot > DDTBia ? 0 : dayCot + DDTBia;

    const lenZ = DDTBia;

    const lenX =
      KCCot > DDTBia ? depth - DDTBia : depth - dayCot - DDTBia - DDTBia;

    const lenY = height - 2 * DDTBia;

    bTrai.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bTrai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bTrai.scale.x = lenX / sizeBiaTrai.x;
    bTrai.scale.y = lenY / sizeBiaTrai.y;
    bTrai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaPhai = (bPhai) => {
    bPhai.position.z =
      (bcp ? width - DDTBia - rBo - truHaoBoCong : width - DDTBia) * -1;

    bPhai.position.x = KCCot < width - rongCot ? 0 : dayCot + DDTBia;

    bPhai.position.y = DDTBia;

    const lenZ = DDTBia;

    const lenX =
      KCCot < width - rongCot
        ? depth - DDTBia
        : depth - dayCot - DDTBia - DDTBia;

    const lenY = height - 2 * DDTBia;

    bPhai.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bPhai);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bPhai.scale.x = lenX / sizeBiaPhai.x;
    bPhai.scale.y = lenY / sizeBiaPhai.y;
    bPhai.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBiaCot1 = (biaCot1) => {
    biaCot1.position.z = (KCCot > DDTBia ? KCCot - DDTBia : 0) * -1;

    biaCot1.position.x = 0;

    biaCot1.position.y = DDTBia;

    const lenZ = KCCot > DDTBia ? DDTBia : 0;

    const lenX = KCCot > DDTBia ? dayCot : 0;

    const lenY = KCCot > DDTBia ? height - 2 * DDTBia : 0;

    biaCot1.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(biaCot1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    biaCot1.scale.x = lenX / sizeBiaTrai.x;
    biaCot1.scale.y = lenY / sizeBiaTrai.y;
    biaCot1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaCot2 = (biaCot2) => {
    biaCot2.position.z = (KCCot > DDTBia ? KCCot + rongCot : rongCot) * -1;

    biaCot2.position.x = 0;

    biaCot2.position.y = DDTBia;

    const lenZ = KCCot < width - rongCot ? DDTBia : 0;

    const lenX = KCCot < width - rongCot ? dayCot : 0;

    const lenY = KCCot < width - rongCot ? height - 2 * DDTBia : 0;

    biaCot2.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(biaCot2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    biaCot2.scale.x = lenX / sizeBiaTrai.x;
    biaCot2.scale.y = lenY / sizeBiaTrai.y;
    biaCot2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingNoc1 = (noc1) => {
    noc1.position.z = (bct ? rBo : 0) * -1;

    noc1.position.x = 0;

    noc1.position.y = height - DDTBia;

    const lenZ = KCCot > DDTBia ? (bct ? KCCot - rBo : KCCot) : 0;

    const lenX = KCCot > DDTBia ? depth : 0;

    const lenY = KCCot > DDTBia ? DDTBia : 0;

    noc1.scale.set(1, 1, 1);
    let boundingBoxNoc = new THREE.Box3().setFromObject(noc1);
    const sizeNoc = new THREE.Vector3();
    boundingBoxNoc.getSize(sizeNoc);

    noc1.scale.x = lenX / sizeNoc.x;
    noc1.scale.y = lenY / sizeNoc.y;
    noc1.scale.z = lenZ / sizeNoc.z;
  };

  const settingNoc2 = (noc2) => {
    noc2.position.z =
      (bct ? (KCCot > rBo + truHaoBoCong ? KCCot : rBo) : KCCot) * -1;

    noc2.position.y = height - DDTBia;

    noc2.position.x = dayCot;

    const lenZ =
      rongCot -
      ((bct && KCCot < rBo + truHaoBoCong) || (bcp && KCCot >= width - rongCot)
        ? rBo
        : 0);

    const lenX = depth - dayCot;

    const lenY = DDTBia;

    noc2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc2.scale.x = lenX / sizeDay.x;
    noc2.scale.y = lenY / sizeDay.y;
    noc2.scale.z = lenZ / sizeDay.z;
  };

  const settingNoc3 = (noc3) => {
    noc3.position.z =
      ((KCCot > DDTBia && KCCot < width - rongCot ? KCCot : 0) + rongCot) * -1;

    noc3.position.y = height - DDTBia;

    noc3.position.x = 0;

    const lenZ =
      KCCot < width - rongCot
        ? bcp
          ? width - (KCCot > DDTBia ? KCCot : 0) - rongCot - rBo
          : width - (KCCot > DDTBia ? KCCot : 0) - rongCot
        : 0;

    const lenX = KCCot < width - rongCot ? depth : 0;

    const lenY = KCCot < width - rongCot ? DDTBia : 0;

    noc3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc3.scale.x = lenX / sizeDay.x;
    noc3.scale.y = lenY / sizeDay.y;
    noc3.scale.z = lenZ / sizeDay.z;
  };

  //KHOI CHINH

  //BO CONG PHAI
  const settingBCPHau = (hau) => {
    hau.position.z = (width - rBo - truHaoBoCong + DDTBia) * -1;

    hau.position.y = 0;

    hau.position.x = KCCot < width - rongCot ? 0 : dayCot;

    const lenZ = bcp ? rBo + truHaoBoCong - 2 * DDTBia : 0;

    const lenX = bcp ? DDTHau : 0;

    const lenY = bcp ? height - DDTBia : 0;

    hau.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau.scale.x = lenX / sizeHau.x;
    hau.scale.y = lenY / sizeHau.y;
    hau.scale.z = lenZ / sizeHau.z;
  };

  const settingBCPBiaTrai = (bTrai) => {
    bTrai.position.z = (width - rBo - truHaoBoCong) * -1;

    bTrai.position.y = 0;

    bTrai.position.x = KCCot < width - rongCot ? 0 : dayCot;

    const lenZ = bcp ? DDTBia : 0;

    const lenX = bcp
      ? KCCot < width - rongCot
        ? depth - DDTBia
        : depth - DDTBia - dayCot
      : 0;

    const lenY = bcp ? height - DDTBia : 0;

    bTrai.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bTrai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bTrai.scale.x = lenX / sizeBiaTrai.x;
    bTrai.scale.y = lenY / sizeBiaTrai.y;
    bTrai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBCPBiaPhai = (bPhai) => {
    bPhai.position.z = (width - DDTBia) * -1;

    bPhai.position.x = KCCot < width - rongCot ? 0 : dayCot;

    bPhai.position.y = 0;

    const lenZ = bcp ? DDTBia : 0;

    const lenX = bcp
      ? KCCot < width - rongCot
        ? depth - rBo
        : depth - rBo - dayCot
      : 0;

    const lenY = bcp ? height - DDTBia : 0;

    bPhai.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bPhai);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bPhai.scale.x = lenX / sizeBiaPhai.x;
    bPhai.scale.y = lenY / sizeBiaPhai.y;
    bPhai.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBCPBiaBoCong = (dayBoCong) => {
    dayBoCong.position.z = (width - rBo) * -1;

    dayBoCong.position.y = 0;

    dayBoCong.position.x = depth - rBo;

    const lenZ = bcp ? rBo : 0;

    const lenX = bcp ? rBo : 0;

    const lenY = bcp ? height - DDTBia : 0;

    dayBoCong.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(dayBoCong);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    dayBoCong.scale.x = lenX / sizeDay.x;
    dayBoCong.scale.y = lenY / sizeDay.y;
    dayBoCong.scale.z = lenZ / sizeDay.z;
  };

  const settingBCPTruHaoBoCong = (THBoCong) => {
    THBoCong.position.z = (width - rBo - truHaoBoCong) * -1;

    THBoCong.position.y = 0;

    THBoCong.position.x = depth - DDTBia;

    const lenZ = bcp ? truHaoBoCong : 0;

    const lenX = bcp ? DDTBia : 0;

    const lenY = bcp ? height - DDTBia : 0;

    THBoCong.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(THBoCong);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    THBoCong.scale.x = lenX / sizeHau.x;
    THBoCong.scale.y = lenY / sizeHau.y;
    THBoCong.scale.z = lenZ / sizeHau.z;
  };

  const settingBCPNoc1 = (noc1) => {
    noc1.position.z = (width - rBo) * -1;

    noc1.position.y = height - DDTBia;

    noc1.position.x = depth - rBo;

    const lenZ = bcp ? rBo : 0;

    const lenX = bcp ? rBo : 0;

    const lenY = bcp ? DDTBia : 0;

    noc1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc1.scale.x = lenX / sizeDay.x;
    noc1.scale.y = lenY / sizeDay.y;
    noc1.scale.z = lenZ / sizeDay.z;
  };

  const settingBCPNoc3 = (noc3) => {
    noc3.position.z = (width - rBo) * -1;

    noc3.position.y = height - DDTBia;

    noc3.position.x = KCCot < width - rongCot ? 0 : dayCot;

    const lenZ = bcp ? rBo : 0;

    const lenX = bcp
      ? KCCot < width - rongCot
        ? depth - rBo
        : depth - rBo - dayCot
      : 0;

    const lenY = bcp ? DDTBia : 0;

    noc3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc3.scale.x = lenX / sizeDay.x;
    noc3.scale.y = lenY / sizeDay.y;
    noc3.scale.z = lenZ / sizeDay.z;
  };

  const settingBCPDay1 = (day1) => {
    day1.position.z = (width - rBo) * -1;

    day1.position.y = 0;

    day1.position.x = depth - rBo;

    const lenZ = bcp ? rBo - DDTBia : 0;

    const lenX = bcp ? rBo - DDTBia : 0;

    const lenY = bcp ? DDTBia : 0;

    day1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day1.scale.x = lenX / sizeDay.x;
    day1.scale.y = lenY / sizeDay.y;
    day1.scale.z = lenZ / sizeDay.z;
  };

  const settingBCPDay2 = (day2) => {
    day2.position.z = (width - rBo - truHaoBoCong + DDTBia) * -1;

    day2.position.y = 0;

    day2.position.x = depth - rBo;

    const lenZ = bcp ? truHaoBoCong - DDTBia : 0;

    const lenX = bcp ? rBo - DDTBia : 0;

    const lenY = bcp ? DDTBia : 0;

    day2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day2.scale.x = lenX / sizeDay.x;
    day2.scale.y = lenY / sizeDay.y;
    day2.scale.z = lenZ / sizeDay.z;
  };

  const settingBCPDay3 = (day3) => {
    day3.position.z = (width - rBo - truHaoBoCong + DDTBia) * -1;

    day3.position.y = 0;

    day3.position.x = KCCot < width - rongCot ? DDTHau : dayCot + DDTHau;

    const lenZ = bcp ? rBo + truHaoBoCong - 2 * DDTBia : 0;

    const lenX = bcp
      ? KCCot < width - rongCot
        ? depth - DDTHau - rBo
        : depth - DDTHau - rBo - dayCot
      : 0;

    const lenY = bcp ? DDTBia : 0;

    day3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day3.scale.x = lenX / sizeDay.x;
    day3.scale.y = lenY / sizeDay.y;
    day3.scale.z = lenZ / sizeDay.z;
  };
  //BO CONG PHAI

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load(
      '/glb/TV-DAT-DAT-BO-CONG-KHUYET-COT-UV-NEW.glb',
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
            child.material.opacity = 0.7;
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

      //BO CONG TRAI
      const BCT_day1 = md.getObjectByName('BCT-DAY-1');
      const BCT_day2 = md.getObjectByName('BCT-DAY-2');
      const BCT_day3 = md.getObjectByName('BCT-DAY-3');
      const BCT_noc1 = md.getObjectByName('BCT-NOC-1');
      const BCT_noc3 = md.getObjectByName('BCT-NOC-3');
      const BCT_hau = md.getObjectByName('BCT-HAU');
      const BCT_bTrai = md.getObjectByName('BCT-BIA-TRAI');
      const BCT_bPhai = md.getObjectByName('BCT-BIA-PHAI');
      const BCT_biaBoCong = md.getObjectByName('BCT-BIA-BO-CONG');
      const BCT_truHaoBoCong = md.getObjectByName('BCT-TRU-HAO-BO-CONG');

      BCT_day1 && settingBCTDay1(BCT_day1);
      BCT_day2 && settingBCTDay2(BCT_day2);
      BCT_day3 && settingBCTDay3(BCT_day3);
      BCT_noc1 && settingBCTNoc1(BCT_noc1);
      BCT_noc3 && settingBCTNoc3(BCT_noc3);
      BCT_hau && settingBCTHau(BCT_hau);
      BCT_bTrai && settingBCTBiaTrai(BCT_bTrai);
      BCT_bPhai && settingBCTBiaPhai(BCT_bPhai);
      BCT_biaBoCong && settingBCTBiaBoCong(BCT_biaBoCong);
      BCT_truHaoBoCong && settingBCTTruHaoBoCong(BCT_truHaoBoCong);
      //BO CONG TRAI

      //BO CONG PHAI
      const BCP_day1 = md.getObjectByName('BCP-DAY-1');
      const BCP_day2 = md.getObjectByName('BCP-DAY-2');
      const BCP_day3 = md.getObjectByName('BCP-DAY-3');
      const BCP_noc1 = md.getObjectByName('BCP-NOC-1');
      const BCP_noc3 = md.getObjectByName('BCP-NOC-3');
      const BCP_hau = md.getObjectByName('BCP-HAU');
      const BCP_bTrai = md.getObjectByName('BCP-BIA-TRAI');
      const BCP_bPhai = md.getObjectByName('BCP-BIA-PHAI');
      const BCP_biaBoCong = md.getObjectByName('BCP-BIA-BO-CONG');
      const BCP_truHaoBoCong = md.getObjectByName('BCP-TRU-HAO-BO-CONG');

      BCP_day1 && settingBCPDay1(BCP_day1);
      BCP_day2 && settingBCPDay2(BCP_day2);
      BCP_day3 && settingBCPDay3(BCP_day3);
      BCP_noc1 && settingBCPNoc1(BCP_noc1);
      BCP_noc3 && settingBCPNoc3(BCP_noc3);
      BCP_hau && settingBCPHau(BCP_hau);
      BCP_bTrai && settingBCPBiaTrai(BCP_bTrai);
      BCP_bPhai && settingBCPBiaPhai(BCP_bPhai);
      BCP_biaBoCong && settingBCPBiaBoCong(BCP_biaBoCong);
      BCP_truHaoBoCong && settingBCPTruHaoBoCong(BCP_truHaoBoCong);
      //BO CONG PHAI

      //KHOI CHINH
      const day1 = md.getObjectByName('DAY-1');
      const day2 = md.getObjectByName('DAY-2');
      const day3 = md.getObjectByName('DAY-3');
      const noc1 = md.getObjectByName('NOC-1');
      const noc2 = md.getObjectByName('NOC-2');
      const noc3 = md.getObjectByName('NOC-3');
      const hau1 = md.getObjectByName('HAU-1');
      const hau2 = md.getObjectByName('HAU-2');
      const hau3 = md.getObjectByName('HAU-3');
      const chanTruoc = md.getObjectByName('CHAN-TRUOC');
      const chanSau = md.getObjectByName('CHAN-SAU');
      const bTrai = md.getObjectByName('BIA-TRAI');
      const bPhai = md.getObjectByName('BIA-PHAI');
      const biaCot1 = md.getObjectByName('BIA-COT-1');
      const biaCot2 = md.getObjectByName('BIA-COT-2');

      day1 && settingDay1(day1);
      day2 && settingDay2(day2);
      day3 && settingDay3(day3);
      bTrai && settingBiaTrai(bTrai);
      bPhai && settingBiaPhai(bPhai);
      biaCot1 && settingBiaCot1(biaCot1);
      biaCot2 && settingBiaCot2(biaCot2);
      noc1 && settingNoc1(noc1);
      noc2 && settingNoc2(noc2);
      noc3 && settingNoc3(noc3);
      hau1 && settingHau1(hau1);
      hau2 && settingHau2(hau2);
      hau3 && settingHau3(hau3);
      chanTruoc && settingChanTruoc(chanTruoc);
      chanSau && settingChanSau(chanSau);
      //KHOI CHINH

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
    rBo,
    bct,
    bcp,
    KCCot,
    dayCot,
    rongCot,
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

          <br />
          <label className="label" htmlFor="depth">
            Bán kính bo cong (mm):
          </label>
          <input
            className="input"
            type="number"
            name="rBo"
            id="rBo"
            defaultValue={rBo * 1000}
            onChange={(e) => {
              setRBo(Number(e.target.value) / 1000);
            }}
          />

          <br />
          <label className="label">
            <input
              type="checkbox"
              checked={bct}
              onChange={(e) => setBCT(e.target.checked)}
            />
            Bo cong trái
          </label>

          <br />
          <label className="label">
            <input
              type="checkbox"
              checked={bcp}
              onChange={(e) => setBCP(e.target.checked)}
            />
            Bo cong phải
          </label>
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
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App4;
