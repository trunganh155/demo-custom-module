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
  const [dayDa, setDayDa] = useState(0.15);
  const [caoDa, setCaoDa] = useState(0.2);

  const [fixNoc, setFixNoc] = useState(0);
  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay = (day) => {
    day.position.z = 0 * -1;

    day.position.y = 0;

    day.position.x = DDTHau;

    const lenZ = width;

    const lenX = depth - DDTHau;

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

    hau1.position.x = dayDa;

    hau1.position.y = height - caoDa;

    const lenZ = width;

    const lenX = 0.017;

    const lenY = caoDa;

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
        ? height - caoDa
        : optionHau === 1
          ? height - caoDa - DDTNoc
          : optionSauDay === 0
            ? height - caoDa - DDTNoc + ngamHau
            : height - caoDa - DDTNoc - DDTDay + 2 * ngamHau;

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

    bia1.position.x = dayDa + 0.017;

    bia1.position.y = optionDay === 0 ? DDTDay : 0;

    const lenZ = DDTBiaTrai;

    const lenX = depth - dayDa - 0.017 + (fixBiaTrai >= 0 ? -fixBiaTrai : 0);

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
      dayDa + 0.017 + (optionHau === 0 || optionHau === 1 ? -DDTHau : 0);

    const lenY =
      (optionDay === 0
        ? optionNoc === 0
          ? height - DDTDay - DDTNoc
          : height - DDTDay
        : optionNoc === 0
          ? height - DDTNoc
          : height) - caoDa;

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

    bia3.position.x = dayDa + 0.017;

    bia3.position.y = optionDay === 0 ? DDTDay : 0;

    const lenZ = DDTBiaPhai;

    const lenX = depth - dayDa - 0.017 + (fixBiaPhai >= 0 ? -fixBiaPhai : 0);

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
      dayDa + 0.017 + (optionHau === 0 || optionHau === 1 ? -DDTHau : 0);

    const lenY =
      (optionDay === 0
        ? optionNoc === 0
          ? height - DDTDay - DDTNoc
          : height - DDTDay
        : optionNoc === 0
          ? height - DDTNoc
          : height) - caoDa;

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

    noc1.position.x = dayDa + 0.017;

    noc1.position.y = height - DDTNoc;

    const lenZ = width - (optionNoc === 0 ? 0 : DDTBiaTrai + DDTBiaPhai);

    const lenX = depth - dayDa - 0.017 + (fixNoc >= 0 ? -fixNoc : 0);

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

    noc2.position.y = height - caoDa - DDTNoc;

    const lenZ = width - (optionNoc === 0 ? 0 : DDTBiaTrai + DDTBiaPhai);

    const lenX =
      dayDa + 0.017 + (optionHau === 0 || optionHau === 1 ? -DDTHau : 0);

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
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App2;
