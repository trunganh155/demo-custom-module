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

  const [width, setWidth] = useState(1.5);
  const [height, setHeight] = useState(2);
  const [depth, setDepth] = useState(0.56);

  const [luiHau, setLuiHau] = useState(0.01);
  const [ngamHau, setNgamHau] = useState(0.005);
  const [luiChan, setLuiChan] = useState(0);
  const [caoChan, setCaoChan] = useState(0.1);

  const [optionDay, setOptionDay] = useState(0);
  const [optionNoc, setOptionNoc] = useState(0);
  const [optionHau, setOptionHau] = useState(0);
  const [optionSauDay, setOptionSauDay] = useState(0);

  const [DDTBiaTrai, setDDTBiaTrai] = useState(0.017);
  const [DDTBiaPhai, setDDTBiaPhai] = useState(0.017);
  const [DDTNoc, setDDTNoc] = useState(0.017);
  const [DDTDay, setDDTDay] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);
  const [DDTCTruoc, setDDTCTruoc] = useState(0.017);
  const [DDTCSau, setDDTCSau] = useState(0.017);

  const [KCCot, setKCCot] = useState(0.4);
  const [dayCot, setDayCot] = useState(0.15);
  const [rongCot, setRongCot] = useState(0.3);

  const [fixNoc, setFixNoc] = useState(0);
  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay = (day) => {
    if (optionDay === 0 || optionDay === 3) {
      //Day lot
      day.position.z = DDTBiaTrai * -1;
    } else {
      //Day trum
      day.position.z = 0 * -1;
    }
    day.position.y = caoChan;
    // if (optionHau === 0 || optionHau === 1) {
    //   //Hau PB
    //   day.position.x = DDTHau ;
    // } else {
    //   //Hau LL
    //   day.position.x = (DDTHau + luiHau) ;
    // }

    if (optionSauDay === 0) {
      //Day theo hau
      if (optionHau === 0 || optionHau === 1) {
        //Hau PB
        day.position.x = DDTHau;
      } else {
        //Hau LL
        day.position.x = DDTHau + luiHau;
      }
    } else {
      //Day theo bia
      if (optionHau === 0 || optionHau === 1) {
        //Hau PB
        day.position.x = DDTHau;
      } else {
        //Hau LL
        day.position.x = 0;
      }
    }

    const lenZ =
      width -
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 1
        ? 0
        : DDTBiaTrai);
    // const lenX =
    //   (optionHau === 0 || optionHau === 1
    //     ? depth - DDTHau
    //     : depth - DDTHau - luiHau) + (fixDay >= 0 ? 0 : fixDay);

    const lenX =
      (optionSauDay === 0
        ? optionHau === 0 || optionHau === 1
          ? depth - DDTHau
          : depth - DDTHau - luiHau
        : optionHau === 0 || optionHau === 1
        ? depth - DDTHau
        : depth) + (fixDay >= 0 ? 0 : fixDay);
    const lenY = DDTDay;

    day.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day.scale.x = lenX / sizeDay.x;
    day.scale.y = lenY / sizeDay.y;
    day.scale.z = lenZ / sizeDay.z;
  };

  const settingDay1 = (day1) => {
    if (optionDay === 0 || optionDay === 3) {
      //Day lot
      day1.position.z = DDTBiaTrai * -1;
    } else {
      //Day trum
      day1.position.z = 0 * -1;
    }

    day1.position.y = caoChan;

    if (optionSauDay === 0) {
      //Day theo hau
      if (optionHau === 0 || optionHau === 1) {
        //Hau PB
        day1.position.x = DDTHau;
      } else {
        //Hau LL
        day1.position.x = DDTHau + luiHau;
      }
    } else {
      //Day theo bia
      if (optionHau === 0 || optionHau === 1) {
        //Hau PB
        day1.position.x = DDTHau;
      } else {
        //Hau LL
        day1.position.x = 0;
      }
    }

    const lenZ =
      KCCot -
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 1
        ? 0
        : DDTBiaTrai);
    // const lenZ =
    //   cotdz - (optionDay === 0 ? DDTBiaTrai : optionDay === 1 ? 0 : DDTBiaTrai);

    const lenX =
      (optionSauDay === 0
        ? optionHau === 0 || optionHau === 1
          ? depth - DDTHau
          : depth - DDTHau - luiHau
        : optionHau === 0 || optionHau === 1
        ? depth - DDTHau
        : depth) + (fixDay >= 0 ? 0 : fixDay);

    const lenY = DDTDay;

    day1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day1.scale.x = lenX / sizeDay.x;
    day1.scale.y = lenY / sizeDay.y;
    day1.scale.z = lenZ / sizeDay.z;
  };

  const settingDay2 = (day2) => {
    if (optionDay === 0 || optionDay === 3) {
      //Day lot
      day2.position.z = (KCCot - DDTBiaTrai) * -1;
    } else {
      //Day trum
      day2.position.z = KCCot * -1;
    }

    day2.position.y = caoChan;

    if (optionSauDay === 0) {
      //Day theo hau
      if (optionHau === 0 || optionHau === 1) {
        //Hau PB
        // day2.position.x = dayCot + DDTHau;
        day2.position.x = dayCot + DDTBiaTrai;
      } else {
        //Hau LL
        // day2.position.x = dayCot + DDTHau + luiHau;
        day2.position.x = dayCot + DDTBiaTrai + luiHau;
      }
    } else {
      //Day theo bia
      if (optionHau === 0 || optionHau === 1) {
        //Hau PB
        // day2.position.x = DDTHau;
        day2.position.x = DDTBiaTrai;
      } else {
        //Hau LL
        day2.position.x = 0;
      }
    }

    const lenZ =
      rongCot +
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 1
        ? 0
        : DDTBiaTrai);

    // const lenX =
    //   (optionSauDay === 0
    //     ? optionHau === 0 || optionHau === 1
    //       ? depth - dayCot - DDTHau
    //       : depth - dayCot - DDTHau - luiHau
    //     : optionHau === 0 || optionHau === 1
    //     ? depth - dayCot - DDTHau
    //     : depth - dayCot) + (fixDay >= 0 ? 0 : fixDay);
    const lenX =
      (optionSauDay === 0
        ? optionHau === 0 || optionHau === 1
          ? depth - dayCot - DDTBiaTrai
          : depth - dayCot - DDTBiaTrai - luiHau
        : optionHau === 0 || optionHau === 1
        ? depth - dayCot - DDTBiaTrai
        : depth - dayCot) + (fixDay >= 0 ? 0 : fixDay);

    const lenY = DDTDay;

    day2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day2.scale.x = lenX / sizeDay.x;
    day2.scale.y = lenY / sizeDay.y;
    day2.scale.z = lenZ / sizeDay.z;
  };

  const settingDay3 = (day3) => {
    if (optionDay === 0 || optionDay === 3) {
      //Day lot
      day3.position.z = (KCCot + rongCot + DDTBiaPhai) * -1;
    } else {
      //Day trum
      day3.position.z = (KCCot + rongCot) * -1;
    }

    day3.position.y = caoChan;

    if (optionSauDay === 0) {
      //Day theo hau
      if (optionHau === 0 || optionHau === 1) {
        //Hau PB
        day3.position.x = DDTHau;
      } else {
        //Hau LL
        day3.position.x = DDTHau + luiHau;
      }
    } else {
      //Day theo bia
      if (optionHau === 0 || optionHau === 1) {
        //Hau PB
        day3.position.x = DDTHau;
      } else {
        //Hau LL
        day3.position.x = 0;
      }
    }

    const lenZ =
      width -
      KCCot -
      rongCot -
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 1
        ? 0
        : DDTBiaTrai);

    const lenX =
      (optionSauDay === 0
        ? optionHau === 0 || optionHau === 1
          ? depth - DDTHau
          : depth - DDTHau - luiHau
        : optionHau === 0 || optionHau === 1
        ? depth - DDTHau
        : depth) + (fixDay >= 0 ? 0 : fixDay);

    const lenY = DDTDay;

    day3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day3.scale.x = lenX / sizeDay.x;
    day3.scale.y = lenY / sizeDay.y;
    day3.scale.z = lenZ / sizeDay.z;
  };

  const settingHau = (hau) => {
    if (optionHau === 0 || optionHau === 1) {
      hau.position.z = 0 * -1;
    } else {
      // hau.position.z = truBia;
      hau.position.z = (DDTBiaTrai - ngamHau) * -1;
    }
    if (optionHau === 0 || optionHau === 1) {
      hau.position.x = 0;
    } else {
      hau.position.x = luiHau;
    }
    // if (optionHau === 0 || optionHau === 1) {
    //   hau.position.y = caoChan;
    // } else {
    //   hau.position.y = 0;
    // }

    if (optionHau === 0 || optionHau === 1) {
      //Day PB
      hau.position.y = caoChan;
    } else {
      //Day LL
      if (optionSauDay === 0) {
        //Day theo hau
        hau.position.y = 0;
      } else {
        //Day theo bia
        hau.position.y = caoChan + 0.5 * DDTDay;
      }
    }

    hau.scale.set(1, 1, 1);
    // const lenZ =
    //   optionHau === 0 || optionHau === 1 ? width : width - truBia * 2;
    const lenZ =
      optionHau === 0 || optionHau === 1
        ? width
        : width - DDTBiaTrai - DDTBiaPhai + 2 * ngamHau;
    const lenX = DDTHau;
    // const lenY =
    //   optionHau === 0
    //     ? height - caoChan
    //     : optionHau === 1
    //     ? height - caoChan - DDTNoc
    //     : height - truBia;
    const lenY =
      optionHau === 0
        ? height - caoChan
        : optionHau === 1
        ? height - caoChan - DDTNoc
        : optionSauDay === 0
        ? height - truBia
        : height - caoChan - 0.5 * DDTNoc - 0.5 * DDTDay;

    let boundingBoxHau = new THREE.Box3().setFromObject(hau);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau.scale.x = lenX / sizeHau.x;
    hau.scale.y = lenY / sizeHau.y;
    hau.scale.z = lenZ / sizeHau.z;
  };

  const settingHau1 = (hau1) => {
    if (optionHau === 0 || optionHau === 1) {
      hau1.position.z = 0 * -1;
    } else {
      // hau.position.z = truBia;
      hau1.position.z = (DDTBiaTrai - ngamHau) * -1;
    }

    if (optionHau === 0 || optionHau === 1) {
      hau1.position.x = 0;
    } else {
      hau1.position.x = luiHau;
    }

    if (optionHau === 0 || optionHau === 1) {
      //Day PB
      hau1.position.y = caoChan;
    } else {
      //Day LL
      if (optionSauDay === 0) {
        //Day theo hau
        hau1.position.y = 0;
      } else {
        //Day theo bia
        hau1.position.y = caoChan + 0.5 * DDTDay;
      }
    }

    // const lenZ =
    //   optionHau === 0 || optionHau === 1
    //     ? width
    //     : width - DDTBiaTrai - DDTBiaPhai + 2 * ngamHau;
    const lenZ =
      optionHau === 0 || optionHau === 1
        ? KCCot
        : KCCot - DDTBiaTrai - DDTBiaPhai + 2 * ngamHau;

    const lenX = DDTHau;

    const lenY =
      optionHau === 0
        ? height - caoChan
        : optionHau === 1
        ? height - caoChan - DDTNoc
        : optionSauDay === 0
        ? height - truBia
        : height - caoChan - 0.5 * DDTNoc - 0.5 * DDTDay;

    hau1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau1.scale.x = lenX / sizeHau.x;
    hau1.scale.y = lenY / sizeHau.y;
    hau1.scale.z = lenZ / sizeHau.z;
  };

  const settingHau2 = (hau2) => {
    if (optionHau === 0 || optionHau === 1) {
      hau2.position.z = (KCCot - DDTBiaTrai) * -1;
    } else {
      hau2.position.z = (KCCot - DDTBiaTrai - ngamHau) * -1;
    }

    if (optionHau === 0 || optionHau === 1) {
      hau2.position.x = dayCot;
    } else {
      hau2.position.x = dayCot + luiHau;
    }

    // if (optionHau === 0 || optionHau === 1) {
    //   //Day PB
    //   hau2.position.y = caoChan;
    // } else {
    //   //Day LL
    //   if (optionSauDay === 0) {
    //     //Day theo hau
    //     hau2.position.y = 0;
    //   } else {
    //     //Day theo bia
    //     hau2.position.y = caoChan + 0.5 * DDTDay;
    //   }
    // }
    hau2.position.y = 0;

    const lenZ =
      optionHau === 0 || optionHau === 1
        ? rongCot + DDTBiaTrai + DDTBiaPhai
        : rongCot + DDTBiaTrai + DDTBiaPhai;

    // const lenX = DDTHau;
    const lenX = DDTBiaTrai;

    // const lenY =
    //   optionHau === 0
    //     ? height - caoChan
    //     : optionHau === 1
    //     ? height - caoChan - DDTNoc
    //     : optionSauDay === 0
    //     ? height - truBia
    //     : height - caoChan - 0.5 * DDTNoc - 0.5 * DDTDay;
    const lenY = height;

    hau2.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau2);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau2.scale.x = lenX / sizeHau.x;
    hau2.scale.y = lenY / sizeHau.y;
    hau2.scale.z = lenZ / sizeHau.z;
  };

  const settingHau3 = (hau3) => {
    if (optionHau === 0 || optionHau === 1) {
      hau3.position.z = (KCCot + rongCot) * -1;
    } else {
      hau3.position.z = (KCCot + rongCot - DDTBiaTrai - ngamHau) * -1;
    }

    if (optionHau === 0 || optionHau === 1) {
      hau3.position.x = 0;
    } else {
      hau3.position.x = luiHau;
    }

    if (optionHau === 0 || optionHau === 1) {
      //Day PB
      hau3.position.y = caoChan;
    } else {
      //Day LL
      if (optionSauDay === 0) {
        //Day theo hau
        hau3.position.y = 0;
      } else {
        //Day theo bia
        hau3.position.y = caoChan + 0.5 * DDTDay;
      }
    }

    const lenZ =
      optionHau === 0 || optionHau === 1
        ? width - KCCot - rongCot
        : width - KCCot - rongCot - DDTBiaTrai - DDTBiaPhai + 2 * ngamHau;

    const lenX = DDTHau;

    const lenY =
      optionHau === 0
        ? height - caoChan
        : optionHau === 1
        ? height - caoChan - DDTNoc
        : optionSauDay === 0
        ? height - truBia
        : height - caoChan - 0.5 * DDTNoc - 0.5 * DDTDay;

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

    if (optionHau === 0 || optionHau === 1) {
      bia1.position.x = DDTHau;
    } else {
      bia1.position.x = 0;
    }

    if (optionDay === 0 || optionDay === 3) {
      bia1.position.y = 0;
    } else {
      bia1.position.y = caoChan + DDTDay;
    }

    const lenZ = DDTBiaTrai;

    const lenX =
      (optionHau === 0 || optionHau === 1 ? depth - DDTHau : depth) +
      (fixNoc >= 0 ? -fixNoc : 0) +
      (fixBiaTrai >= 0 ? 0 : fixBiaTrai);

    const lenY =
      optionDay === 1 || optionDay === 2
        ? optionNoc === 0
          ? height - caoChan - DDTDay
          : height - caoChan - DDTDay - DDTNoc
        : optionNoc === 0
        ? height
        : height - DDTNoc;

    bia1.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia1.scale.x = lenX / sizeBiaTrai.x;
    bia1.scale.y = lenY / sizeBiaTrai.y;
    bia1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia2 = (bia2) => {
    bia2.position.z = (KCCot - DDTBiaTrai) * -1;

    if (optionHau === 0 || optionHau === 1) {
      bia2.position.x = DDTHau;
    } else {
      bia2.position.x = 0;
    }

    if (optionDay === 0 || optionDay === 3) {
      bia2.position.y = 0;
    } else {
      bia2.position.y = caoChan + DDTDay;
    }

    const lenZ = DDTBiaTrai;

    // const lenX =
    //   (optionHau === 0 || optionHau === 1 ? depth - DDTHau : depth) +
    //   (fixNoc >= 0 ? -fixNoc : 0) +
    //   (fixBiaTrai >= 0 ? 0 : fixBiaTrai);
    const lenX =
      (optionHau === 0 || optionHau === 1 ? dayCot - DDTHau : dayCot) +
      (fixNoc >= 0 ? -fixNoc : 0) +
      (fixBiaTrai >= 0 ? 0 : fixBiaTrai);

    const lenY =
      optionDay === 1 || optionDay === 2
        ? optionNoc === 0
          ? height - caoChan - DDTDay
          : height - caoChan - DDTDay - DDTNoc
        : optionNoc === 0
        ? height
        : height - DDTNoc;

    bia2.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia2.scale.x = lenX / sizeBiaTrai.x;
    bia2.scale.y = lenY / sizeBiaTrai.y;
    bia2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia3 = (bia3) => {
    bia3.position.z = (KCCot + rongCot) * -1;

    if (optionHau === 0 || optionHau === 1) {
      bia3.position.x = DDTHau;
    } else {
      bia3.position.x = 0;
    }

    if (optionDay === 0 || optionDay === 3) {
      bia3.position.y = 0;
    } else {
      bia3.position.y = caoChan + DDTDay;
    }

    const lenZ = DDTBiaTrai;

    // const lenX =
    //   (optionHau === 0 || optionHau === 1 ? depth - DDTHau : depth) +
    //   (fixNoc >= 0 ? -fixNoc : 0) +
    //   (fixBiaTrai >= 0 ? 0 : fixBiaTrai);
    const lenX =
      (optionHau === 0 || optionHau === 1 ? dayCot - DDTHau : dayCot) +
      (fixNoc >= 0 ? -fixNoc : 0) +
      (fixBiaTrai >= 0 ? 0 : fixBiaTrai);

    const lenY =
      optionDay === 1 || optionDay === 2
        ? optionNoc === 0
          ? height - caoChan - DDTDay
          : height - caoChan - DDTDay - DDTNoc
        : optionNoc === 0
        ? height
        : height - DDTNoc;

    bia3.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia3);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia3.scale.x = lenX / sizeBiaTrai.x;
    bia3.scale.y = lenY / sizeBiaTrai.y;
    bia3.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia4 = (bia4) => {
    bia4.position.z = (width - DDTBiaPhai) * -1;

    if (optionHau === 0 || optionHau === 1) {
      bia4.position.x = DDTHau;
    } else {
      bia4.position.x = 0;
    }

    if (optionDay === 0 || optionDay === 3) {
      bia4.position.y = 0;
    } else {
      bia4.position.y = caoChan + DDTDay;
    }

    const lenZ = DDTBiaTrai;

    const lenX =
      (optionHau === 0 || optionHau === 1 ? depth - DDTHau : depth) +
      (fixNoc >= 0 ? -fixNoc : 0) +
      (fixBiaTrai >= 0 ? 0 : fixBiaTrai);

    const lenY =
      optionDay === 1 || optionDay === 2
        ? optionNoc === 0
          ? height - caoChan - DDTDay
          : height - caoChan - DDTDay - DDTNoc
        : optionNoc === 0
        ? height
        : height - DDTNoc;

    bia4.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia4);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia4.scale.x = lenX / sizeBiaTrai.x;
    bia4.scale.y = lenY / sizeBiaTrai.y;
    bia4.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaTrai = (bTrai) => {
    bTrai.position.z = 0 * -1;
    if (optionHau === 0 || optionHau === 1) {
      bTrai.position.x = DDTHau;
    } else {
      bTrai.position.x = 0;
    }
    if (optionDay === 0 || optionDay === 3) {
      bTrai.position.y = 0;
    } else {
      bTrai.position.y = caoChan + DDTDay;
    }

    const lenZ = DDTBiaTrai;
    const lenX =
      (optionHau === 0 || optionHau === 1 ? depth - DDTHau : depth) +
      (fixNoc >= 0 ? -fixNoc : 0) +
      (fixBiaTrai >= 0 ? 0 : fixBiaTrai);
    const lenY =
      optionDay === 1 || optionDay === 2
        ? optionNoc === 0
          ? height - caoChan - DDTDay
          : height - caoChan - DDTDay - DDTNoc
        : optionNoc === 0
        ? height
        : height - DDTNoc;

    bTrai.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bTrai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bTrai.scale.x = lenX / sizeBiaTrai.x;
    bTrai.scale.y = lenY / sizeBiaTrai.y;
    bTrai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaPhai = (bPhai) => {
    bPhai.position.z = (width - DDTBiaPhai) * -1;
    if (optionHau === 0 || optionHau === 1) {
      bPhai.position.x = DDTHau;
    } else {
      bPhai.position.x = 0;
    }
    if (optionDay === 0 || optionDay === 2) {
      bPhai.position.y = 0;
    } else {
      bPhai.position.y = caoChan + DDTDay;
    }

    const lenZ = DDTBiaPhai;
    const lenX =
      (optionHau === 0 || optionHau === 1 ? depth - DDTHau : depth) +
      (fixNoc >= 0 ? -fixNoc : 0) +
      (fixBiaPhai >= 0 ? 0 : fixBiaPhai);
    const lenY =
      optionDay === 1 || optionDay === 3
        ? optionNoc === 0
          ? height - caoChan - DDTDay
          : height - caoChan - DDTDay - DDTNoc
        : optionNoc === 0
        ? height
        : height - DDTNoc;

    bPhai.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bPhai);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bPhai.scale.x = lenX / sizeBiaPhai.x;
    bPhai.scale.y = lenY / sizeBiaPhai.y;
    bPhai.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingChanTruoc = (cTruoc) => {
    if (optionDay === 0 || optionDay === 3) {
      cTruoc.position.z = DDTBiaTrai * -1;
    } else {
      cTruoc.position.z = 0 * -1;
    }
    cTruoc.position.x =
      depth - DDTCTruoc - luiChan + (fixDay >= 0 ? 0 : fixDay);
    cTruoc.position.y = 0;

    const lenZ =
      width -
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 2
        ? DDTBiaTrai
        : optionDay == 3
        ? DDTBiaPhai
        : 0);
    const lenX = DDTCTruoc;
    const lenY = caoChan;

    cTruoc.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(cTruoc);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    cTruoc.scale.x = lenX / sizeChanTruoc.x;
    cTruoc.scale.y = lenY / sizeChanTruoc.y;
    cTruoc.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingChanSau = (cSau) => {
    if (optionDay === 0 || optionDay === 3) {
      cSau.position.z = DDTBiaTrai * -1;
    } else {
      cSau.position.z = 0 * -1;
    }
    cSau.position.x = optionHau === 2 ? luiHau + DDTHau + 0.05 : 0.08;
    // cSau.position.x = 0.08 ;
    cSau.position.y = 0;

    const lenZ =
      width -
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 2
        ? DDTBiaTrai
        : optionDay == 3
        ? DDTBiaPhai
        : 0);
    const lenX = DDTCSau;
    const lenY = caoChan;

    cSau.scale.set(1, 1, 1);
    let boundingBoxChanSau = new THREE.Box3().setFromObject(cSau);
    const sizeChanSau = new THREE.Vector3();
    boundingBoxChanSau.getSize(sizeChanSau);

    cSau.scale.x = lenX / sizeChanSau.x;
    cSau.scale.y = lenY / sizeChanSau.y;
    cSau.scale.z = lenZ / sizeChanSau.z;
  };

  const settingNoc = (noc) => {
    if (optionNoc === 0) {
      //LL
      noc.position.z = DDTBiaTrai * -1;
    } else {
      //PB
      noc.position.z = 0 * -1;
    }
    if (optionHau === 0) {
      noc.position.x = DDTHau;
    } else if (optionHau === 1) {
      noc.position.x = 0;
    } else {
      noc.position.x = 0;
    }
    noc.position.y = height - DDTNoc;

    const lenZ = optionNoc === 0 ? width - DDTBiaTrai - DDTBiaPhai : width;
    const lenX =
      (optionHau === 0 ? depth - DDTHau : depth) + (fixNoc >= 0 ? 0 : fixNoc);
    const lenY = DDTNoc;

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

    // glftLoader.load('/glb/day.glb', (gltfScene) => {
    // glftLoader.load('/glb/TA.glb', (gltfScene) => {
    glftLoader.load('/glb/TA-KHUYET.glb', (gltfScene) => {
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

      const day1 = md.getObjectByName('DAY1');
      const day2 = md.getObjectByName('DAY2');
      const day3 = md.getObjectByName('DAY3');

      const bia1 = md.getObjectByName('BIA1');
      const bia2 = md.getObjectByName('BIA2');
      const bia3 = md.getObjectByName('BIA3');
      const bia4 = md.getObjectByName('BIA4');

      const hau1 = md.getObjectByName('HAU1');
      const hau2 = md.getObjectByName('HAU2');
      const hau3 = md.getObjectByName('HAU3');

      const noc = md.getObjectByName('NOC');

      // const hau = md.getObjectByName('HAU');
      // const bTrai = md.getObjectByName('BIA-TRAI');
      // const bPhai = md.getObjectByName('BIA-PHAI');
      // const cTruoc = md.getObjectByName('CHAN-TRUOC');
      // const cSau = md.getObjectByName('CHAN-SAU');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day1 && settingDay1(day1);
      day2 && settingDay2(day2);
      day3 && settingDay3(day3);

      bia1 && settingBia1(bia1);
      bia2 && settingBia2(bia2);
      bia3 && settingBia3(bia3);
      bia4 && settingBia4(bia4);

      hau1 && settingHau1(hau1);
      hau2 && settingHau2(hau2);
      hau3 && settingHau3(hau3);

      noc && settingNoc(noc);

      // bTrai && settingBiaTrai(bTrai);
      // bPhai && settingBiaPhai(bPhai);
      // cTruoc && settingChanTruoc(cTruoc);
      // cSau && settingChanSau(cSau);
      // hau && settingHau(hau);

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
    DDTNoc,
    DDTDay,
    DDTHau,
    DDTBiaTrai,
    DDTBiaPhai,
    DDTCTruoc,
    DDTCSau,
    KCCot,
    dayCot,
    rongCot,
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
            defaultValue={DDTNoc * 1000}
            onChange={(e) => {
              setDDTNoc(Number(e.target.value) / 1000);
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
            defaultValue={DDTDay * 1000}
            onChange={(e) => {
              setDDTDay(Number(e.target.value) / 1000);
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
            defaultValue={DDTCTruoc * 1000}
            onChange={(e) => {
              setDDTCTruoc(Number(e.target.value) / 1000);
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
            defaultValue={DDTCSau * 1000}
            onChange={(e) => {
              setDDTCSau(Number(e.target.value) / 1000);
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

export default App2;
