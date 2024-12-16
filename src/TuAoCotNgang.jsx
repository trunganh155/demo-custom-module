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
  const [caoCot, setCaoCot] = useState(0.2);
  const [rongCot, setRongCot] = useState(0.3);

  const [fixNoc, setFixNoc] = useState(0);
  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay = (day) => {
    day.position.z = optionDay === 0 ? 0 * -1 : DDTBiaTrai * -1;

    day.position.y = 0;

    day.position.x =
      optionSauDay === 0
        ? optionHau === 0 || optionHau === 1
          ? DDTHau
          : DDTHau + luiHau
        : optionHau === 0 || optionHau === 1
        ? DDTHau
        : 0;

    const lenZ = width - (optionDay === 0 ? 0 : DDTBiaTrai + DDTBiaPhai);

    const lenX =
      (optionSauDay === 0
        ? optionHau === 0 || optionHau === 1
          ? depth - DDTHau
          : depth - DDTHau - luiHau
        : optionHau === 0 || optionHau === 1
        ? depth - DDTHau
        : depth) + (fixDay >= 0 ? -fixDay : 0);

    const lenY = DDTDay;

    day.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day.scale.x = lenX / sizeDay.x;
    day.scale.y = lenY / sizeDay.y;
    day.scale.z = lenZ / sizeDay.z;
  };

  const settingHau1 = (hau1) => {
    hau1.position.z = 0;

    hau1.position.x = dayCot;

    hau1.position.y = height - caoCot;

    const lenZ = width;

    const lenX = 0.017;

    const lenY = caoCot;

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
      optionHau === 0 || optionHau === 1 ? 0 * -1 : (DDTBiaTrai - ngamHau) * -1;

    hau2.position.y =
      optionHau === 0 || optionHau === 1
        ? 0
        : optionSauDay === 0
        ? 0
        : DDTDay - ngamHau;

    hau2.position.x = optionHau === 0 || optionHau === 1 ? 0 : luiHau;

    const lenZ =
      optionHau === 0 || optionHau === 1
        ? width
        : width - DDTBiaTrai - DDTBiaPhai + 2 * ngamHau;

    const lenX = DDTHau;

    const lenY =
      optionHau === 0
        ? height - caoCot
        : optionHau === 1
        ? height - caoCot - DDTNoc
        : optionSauDay === 0
        ? height - caoCot - DDTNoc + ngamHau
        : height - caoCot - DDTNoc - DDTDay + 2 * ngamHau;

    hau2.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau2);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau2.scale.x = lenX / sizeHau.x;
    hau2.scale.y = lenY / sizeHau.y;
    hau2.scale.z = lenZ / sizeHau.z;
  };

  const settingBia1 = (bia1) => {
    bia1.position.z = 0 * -1;

    bia1.position.x = dayCot + 0.017;

    bia1.position.y = optionDay === 0 ? DDTDay : 0;

    const lenZ = DDTBiaTrai;

    const lenX = depth - dayCot - 0.017 + (fixBiaTrai >= 0 ? -fixBiaTrai : 0);

    const lenY =
      optionDay === 0
        ? optionNoc === 0
          ? height - DDTDay - DDTNoc
          : height - DDTDay
        : optionNoc === 0
        ? height - DDTNoc
        : height;

    bia1.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia1.scale.x = lenX / sizeBiaTrai.x;
    bia1.scale.y = lenY / sizeBiaTrai.y;
    bia1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia2 = (bia2) => {
    bia2.position.z = 0 * -1;

    bia2.position.x = optionHau === 0 || optionHau === 1 ? DDTHau : 0;

    bia2.position.y = optionDay === 0 ? DDTDay : 0;

    const lenZ = DDTBiaTrai;

    const lenX =
      dayCot + 0.017 + (optionHau === 0 || optionHau === 1 ? -DDTHau : 0);

    const lenY =
      (optionDay === 0
        ? optionNoc === 0
          ? height - DDTDay - DDTNoc
          : height - DDTDay
        : optionNoc === 0
        ? height - DDTNoc
        : height) - caoCot;

    bia2.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    bia2.scale.x = lenX / sizeBiaTrai.x;
    bia2.scale.y = lenY / sizeBiaTrai.y;
    bia2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia3 = (bia3) => {
    bia3.position.z = (width - DDTBiaPhai) * -1;

    bia3.position.x = dayCot + 0.017;

    bia3.position.y = optionDay === 0 ? DDTDay : 0;

    const lenZ = DDTBiaPhai;

    const lenX = depth - dayCot - 0.017 + (fixBiaPhai >= 0 ? -fixBiaPhai : 0);

    const lenY =
      optionDay === 0
        ? optionNoc === 0
          ? height - DDTDay - DDTNoc
          : height - DDTDay
        : optionNoc === 0
        ? height - DDTNoc
        : height;

    bia3.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia3);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaPhai);

    bia3.scale.x = lenX / sizeBiaPhai.x;
    bia3.scale.y = lenY / sizeBiaPhai.y;
    bia3.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBia4 = (bia4) => {
    bia4.position.z = (width - DDTBiaPhai) * -1;

    bia4.position.x = optionHau === 0 || optionHau === 1 ? DDTHau : 0;

    bia4.position.y = optionDay === 0 ? DDTDay : 0;

    const lenZ = DDTBiaPhai;

    const lenX =
      dayCot + 0.017 + (optionHau === 0 || optionHau === 1 ? -DDTHau : 0);

    const lenY =
      (optionDay === 0
        ? optionNoc === 0
          ? height - DDTDay - DDTNoc
          : height - DDTDay
        : optionNoc === 0
        ? height - DDTNoc
        : height) - caoCot;

    bia4.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(bia4);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaPhai);

    bia4.scale.x = lenX / sizeBiaPhai.x;
    bia4.scale.y = lenY / sizeBiaPhai.y;
    bia4.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingNoc1 = (noc1) => {
    noc1.position.z = optionNoc === 0 ? 0 : DDTBiaTrai * -1;

    noc1.position.x = dayCot + 0.017;

    noc1.position.y = height - DDTNoc;

    const lenZ = width - (optionNoc === 0 ? 0 : DDTBiaTrai + DDTBiaPhai);

    const lenX = depth - dayCot - 0.017 + (fixNoc >= 0 ? -fixNoc : 0);

    const lenY = DDTNoc;

    noc1.scale.set(1, 1, 1);
    let boundingBoxNoc = new THREE.Box3().setFromObject(noc1);
    const sizeNoc = new THREE.Vector3();
    boundingBoxNoc.getSize(sizeNoc);

    noc1.scale.x = lenX / sizeNoc.x;
    noc1.scale.y = lenY / sizeNoc.y;
    noc1.scale.z = lenZ / sizeNoc.z;
  };

  const settingNoc2 = (noc2) => {
    noc2.position.z = optionNoc === 0 ? 0 : DDTBiaTrai * -1;

    noc2.position.x = optionHau === 0 || optionHau === 1 ? DDTHau : 0;

    noc2.position.y = height - caoCot - DDTNoc;

    const lenZ = width - (optionNoc === 0 ? 0 : DDTBiaTrai + DDTBiaPhai);

    const lenX =
      dayCot + 0.017 + (optionHau === 0 || optionHau === 1 ? -DDTHau : 0);

    const lenY = DDTNoc;

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

    glftLoader.load('/glb/TACotNgang.glb', (gltfScene) => {
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
    const thickness = 0.017;
    const points = [
      new THREE.Vector3(0.008, 0.5, -0.017), // Điểm 0
      new THREE.Vector3(0.008, 0.5, -0.383), // Điểm 1
      new THREE.Vector3(0.167, 0.5, -0.383), // Điểm 2
      new THREE.Vector3(0.167, 0.5, -0.717), // Điểm 3
      new THREE.Vector3(0.008, 0.5, -0.717), // Điểm 4
      new THREE.Vector3(0.008, 0.5, -1.483), // Điểm 5
      new THREE.Vector3(0.56, 0.5, -1.483), // Điểm 6
      new THREE.Vector3(0.56, 0.5, -0.017), // Điểm 7
      // Điểm dưới với độ dày
      new THREE.Vector3(0.008, 0.5 - thickness, -0.017),
      new THREE.Vector3(0.008, 0.5 - thickness, -0.383),
      new THREE.Vector3(0.167, 0.5 - thickness, -0.383),
      new THREE.Vector3(0.167, 0.5 - thickness, -0.717),
      new THREE.Vector3(0.008, 0.5 - thickness, -0.717),
      new THREE.Vector3(0.008, 0.5 - thickness, -1.483),
      new THREE.Vector3(0.56, 0.5 - thickness, -1.483),
      new THREE.Vector3(0.56, 0.5 - thickness, -0.017),
    ];

    // Tạo hình đa giác từ các điểm
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Chỉ số để tạo các mặt tam giác
    const indices = [
      0, 1, 2, 0, 2, 7, 2, 3, 7, 3, 6, 7, 3, 5, 6, 3, 4, 5,
      // Mặt dưới
      8, 9, 10, 8, 10, 15, 10, 11, 15, 11, 14, 15, 11, 13, 14, 11, 12, 13,
      //Mặt trước
      6, 7, 15, 6, 15, 14,
    ];
    geometry.setIndex(indices);

    const material = new THREE.MeshBasicMaterial({
      color: 0xfcfcfc,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);

    // display.scene.add(mesh);
  }, []);

  useEffect(() => {
    if (display && gltfUuid) {
      const md = display.scene.getObjectByProperty('uuid', gltfUuid);
      // md.position.set(-depth / 2, -height / 2, width / 2);

      const day = md.getObjectByName('DAY');

      const bia1 = md.getObjectByName('BIA-1');
      const bia2 = md.getObjectByName('BIA-2');
      const bia3 = md.getObjectByName('BIA-3');
      const bia4 = md.getObjectByName('BIA-4');

      const hau1 = md.getObjectByName('HAU-1');
      const hau2 = md.getObjectByName('HAU-2');

      const noc1 = md.getObjectByName('NOC-1');
      const noc2 = md.getObjectByName('NOC-2');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day && settingDay(day);

      bia1 && settingBia1(bia1);
      bia2 && settingBia2(bia2);
      bia3 && settingBia3(bia3);
      bia4 && settingBia4(bia4);

      hau1 && settingHau1(hau1);
      hau2 && settingHau2(hau2);

      noc1 && settingNoc1(noc1);
      noc2 && settingNoc2(noc2);

      // const textureLoader = new THREE.TextureLoader();
      // textureLoader.load('/images/TEXTURE.png', (newTexture) => {
      //   md.traverse((node) => {
      //     if (node.isMesh) {
      //       const materials = Array.isArray(node.material)
      //         ? node.material
      //         : [node.material];

      //       newTexture.offset.set(1, 1);
      //       newTexture.wrapS = newTexture.wrapT = THREE.MirroredRepeatWrapping;
      //       newTexture.repeat.set(
      //         node?.parent?.scale?.x || 1,
      //         node?.parent?.scale?.y || 1
      //       );
      //       newTexture.mapping = THREE.UVMapping;

      //       materials.forEach((material) => {
      //         material.map = newTexture;
      //       });
      //     }
      //   });
      // });

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

  // const handleResetBox = () => {
  //   const md = display.scene.getObjectByProperty('uuid', gltfUuid);

  //   md.traverse((child) => {
  //     console.log(child);
  //     if (
  //       child.isMesh &&
  //       child.scale.x !== 0 &&
  //       child.scale.y !== 0 &&
  //       child.scale.z !== 0
  //     ) {
  //       const box = new THREE.Box3().setFromObject(md);
  //       // Tính toán kích thước và vị trí của khung
  //       const size = new THREE.Vector3();
  //       box.getSize(size);
  //       const center = new THREE.Vector3();
  //       box.getCenter(center);

  //       // Scale the geometry based on the parent scale
  //       const scaledGeometry = child.geometry.clone();
  //       scaledGeometry.scale(child.scale.x, child.scale.y, child.scale.z);

  //       // Create edges from the scaled geometry
  //       const edges = new THREE.EdgesGeometry(scaledGeometry);
  //       const material = new THREE.LineBasicMaterial({ color: 0x000000 });

  //       // Create LineSegments for the bounding box edges
  //       const boundingBoxEdges = new THREE.LineSegments(edges, material);
  //       // Position the bounding box edges to match the mesh
  //       boundingBoxEdges.position.copy(child.position);
  //       // boundingBoxEdges.position.set(
  //       //   child.position.x - depth / 2,
  //       //   child.position.y - height / 2,
  //       //   child.position.z + width / 2
  //       // );

  //       listBox.push(boundingBoxEdges);
  //       // Add the bounding box to the scene
  //       display.scene.add(boundingBoxEdges);
  //     }
  //   });
  // };

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
          <label className="label" htmlFor="caoCot">
            Cao (mm):
          </label>
          <input
            className="input"
            type="number"
            name="caoCot"
            id="caoCot"
            defaultValue={caoCot * 1000}
            onChange={(e) => {
              setCaoCot(Number(e.target.value) / 1000);
            }}
          />
        </div>

        <h5 className="header">Nóc:</h5>
        <div>
          <select
            className="select"
            onChange={(e) => setOptionNoc(Number(e.target.value))}
          >
            <option value={0}>Nóc Phủ Bì</option>
            <option value={1}>Nóc Lọt Lòng</option>
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
            <option value={0}>Phủ bì</option>
            <option value={1}>Lọt Lòng</option>
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
