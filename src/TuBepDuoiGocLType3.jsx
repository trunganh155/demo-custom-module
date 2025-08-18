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
  const [DDTDay, setDDTDay] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.017);
  const [DDTChan, setDDTChan] = useState(0.017);
  const [DDTXTruoc, setDDTXTruoc] = useState(0.017);
  const [DDTXSau, setDDTXSau] = useState(0.017);

  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [rongK1, setRongK1] = useState(1);
  const [rongK2, setRongK2] = useState(1.2);
  const [truHaoGoc, setTruHaoGoc] = useState(0.03);
  const [caoBa, setCaoBa] = useState(0.09);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay1 = (day1) => {
    day1.position.z = truHaoGoc * -1;
    day1.position.y = caoChan;
    day1.position.x = depth;

    const lenZ = depth - truHaoGoc;
    const lenX = rongK1 - depth;
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
    day2.position.z = truHaoGoc * -1;
    day2.position.x = truHaoGoc;
    day2.position.y = caoChan;

    const lenZ = rongK2 - truHaoGoc;
    const lenX = depth - truHaoGoc;
    const lenY = DDTDay;

    day2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day2.scale.x = lenX / sizeDay.x;
    day2.scale.y = lenY / sizeDay.y;
    day2.scale.z = lenZ / sizeDay.z;
  };

  const settingHau1 = (hau1) => {
    hau1.position.z = truHaoGoc * -1;
    hau1.position.x = truHaoGoc;
    hau1.position.y = caoChan + DDTDay;

    const lenZ = DDTHau;
    const lenX = rongK1 - truHaoGoc - DDTBia;
    const lenY = height - caoChan - DDTDay;

    hau1.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau1);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau1.scale.x = lenX / sizeHau.x;
    hau1.scale.y = lenY / sizeHau.y;
    hau1.scale.z = lenZ / sizeHau.z;
  };

  const settingHau2 = (hau2) => {
    hau2.position.z = (truHaoGoc + DDTBia) * -1;
    hau2.position.x = truHaoGoc;
    hau2.position.y = caoChan + DDTDay;

    const lenZ = rongK2 - truHaoGoc - DDTHau - DDTBia;
    const lenX = DDTHau;
    const lenY = height - caoChan - DDTDay;

    hau2.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau2);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau2.scale.x = lenX / sizeHau.x;
    hau2.scale.y = lenY / sizeHau.y;
    hau2.scale.z = lenZ / sizeHau.z;
  };

  const settingBia1_1 = (bia1_1) => {
    bia1_1.position.z = truHaoGoc * -1;
    bia1_1.position.x = rongK1 - DDTBia;
    bia1_1.position.y = caoChan + DDTDay;

    const lenZ = depth - truHaoGoc;
    const lenX = DDTBia;
    const lenY = height - caoChan - DDTDay - caoBa;

    bia1_1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia1_1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia1_1.scale.x = lenX / sizeBiaTrai.x;
    bia1_1.scale.y = lenY / sizeBiaTrai.y;
    bia1_1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia1_2 = (bia1_2) => {
    bia1_2.position.z = truHaoGoc * -1;
    bia1_2.position.x = rongK1 - DDTBia;
    bia1_2.position.y = height - caoBa;

    const lenZ = depth - truHaoGoc - 2 * DDTBia;
    const lenX = DDTBia;
    const lenY = caoBa;

    bia1_2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia1_2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia1_2.scale.x = lenX / sizeBiaTrai.x;
    bia1_2.scale.y = lenY / sizeBiaTrai.y;
    bia1_2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia2_1 = (bia2_1) => {
    bia2_1.position.z = (rongK2 - DDTBia) * -1;
    bia2_1.position.x = truHaoGoc;
    bia2_1.position.y = caoChan + DDTDay;

    const lenZ = DDTBia;
    const lenX = depth - truHaoGoc;
    const lenY = height - caoChan - DDTDay - caoBa;

    bia2_1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia2_1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia2_1.scale.x = lenX / sizeBiaTrai.x;
    bia2_1.scale.y = lenY / sizeBiaTrai.y;
    bia2_1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia2_2 = (bia2_2) => {
    bia2_2.position.z = (rongK2 - DDTBia) * -1;
    bia2_2.position.x = truHaoGoc;
    bia2_2.position.y = height - caoBa;

    const lenZ = DDTBia;
    const lenX = depth - truHaoGoc;
    const lenY = caoBa;

    bia2_2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia2_2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia2_2.scale.x = lenX / sizeBiaTrai.x;
    bia2_2.scale.y = lenY / sizeBiaTrai.y;
    bia2_2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBa1 = (ba1) => {
    ba1.position.z = (depth - DDTBia) * -1;
    ba1.position.x = depth;
    ba1.position.y = height - caoBa;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth;
    const lenY = caoBa;

    ba1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(ba1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    ba1.scale.x = lenX / sizeBiaTrai.x;
    ba1.scale.y = lenY / sizeBiaTrai.y;
    ba1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBa2 = (ba2) => {
    ba2.position.z = (depth - 2 * DDTBia) * -1;
    ba2.position.x = depth;
    ba2.position.y = height - caoBa;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth;
    const lenY = caoBa;

    ba2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(ba2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    ba2.scale.x = lenX / sizeBiaTrai.x;
    ba2.scale.y = lenY / sizeBiaTrai.y;
    ba2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBa3 = (ba3) => {
    ba3.position.z = (truHaoGoc + DDTBia) * -1;
    ba3.position.x = depth - DDTBia;
    ba3.position.y = height - caoBa;

    const lenZ = rongK2 - truHaoGoc - DDTBia;
    const lenX = DDTBia;
    const lenY = caoBa;

    ba3.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(ba3);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    ba3.scale.x = lenX / sizeBiaTrai.x;
    ba3.scale.y = lenY / sizeBiaTrai.y;
    ba3.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBa4 = (ba4) => {
    ba4.position.z = (truHaoGoc + DDTBia) * -1;
    ba4.position.x = depth - 2 * DDTBia;
    ba4.position.y = height - caoBa;

    const lenZ = rongK2 - truHaoGoc - DDTBia;
    const lenX = DDTBia;
    const lenY = caoBa;

    ba4.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(ba4);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    ba4.scale.x = lenX / sizeBiaTrai.x;
    ba4.scale.y = lenY / sizeBiaTrai.y;
    ba4.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingChan1 = (chan1) => {
    chan1.position.z = (depth - DDTBia) * -1;
    chan1.position.x = depth;
    chan1.position.y = 0;

    const lenZ = DDTBia;
    const lenX = rongK1 - depth;
    const lenY = caoChan;

    chan1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(chan1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    chan1.scale.x = lenX / sizeBiaTrai.x;
    chan1.scale.y = lenY / sizeBiaTrai.y;
    chan1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingChan2 = (chan2) => {
    chan2.position.z = (depth - DDTBia) * -1;
    chan2.position.x = depth - DDTBia;
    chan2.position.y = 0;

    const lenZ = rongK2 - depth + DDTBia;
    const lenX = DDTBia;
    const lenY = caoChan;

    chan2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(chan2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    chan2.scale.x = lenX / sizeBiaTrai.x;
    chan2.scale.y = lenY / sizeBiaTrai.y;
    chan2.scale.z = lenZ / sizeBiaTrai.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/TBDGL3.glb', (gltfScene) => {
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

      const day1 = md.getObjectByName('G-DAY-1');
      const day2 = md.getObjectByName('G-DAY-2');
      const hau1 = md.getObjectByName('G-HAU-1');
      const hau2 = md.getObjectByName('G-HAU-2');
      const bia1_1 = md.getObjectByName('G-BIA-1-1');
      const bia1_2 = md.getObjectByName('G-BIA-1-2');
      const bia2_1 = md.getObjectByName('G-BIA-2-1');
      const bia2_2 = md.getObjectByName('G-BIA-2-2');
      const chan1 = md.getObjectByName('G-CHAN-1');
      const chan2 = md.getObjectByName('G-CHAN-2');

      const ba1 = md.getObjectByName('G-BA-1');
      const ba2 = md.getObjectByName('G-BA-2');
      const ba3 = md.getObjectByName('G-BA-3');
      const ba4 = md.getObjectByName('G-BA-4');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day1 && settingDay1(day1);
      day2 && settingDay2(day2);
      hau1 && settingHau1(hau1);
      hau2 && settingHau2(hau2);
      bia1_1 && settingBia1_1(bia1_1);
      bia1_2 && settingBia1_2(bia1_2);
      bia2_1 && settingBia2_1(bia2_1);
      bia2_2 && settingBia2_2(bia2_2);
      chan1 && settingChan1(chan1);
      chan2 && settingChan2(chan2);
      ba1 && settingBa1(ba1);
      ba2 && settingBa2(ba2);
      ba3 && settingBa3(ba3);
      ba4 && settingBa4(ba4);

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
    DDTDay,
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
