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
  const [depth, setDepth] = useState(0.35);

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

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.017);

  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [rongK1, setRongK1] = useState(1);
  const [rongK2, setRongK2] = useState(1);
  const [truHaoGoc, setTruHaoGoc] = useState(0.03);

  const [KCCot, setKCCot] = useState(0);
  const [dayCot, setDayCot] = useState(0.15);
  const [rongCot, setRongCot] = useState(0.25);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay1 = (day1) => {
    day1.position.z = truHaoGoc * -1;
    day1.position.x = depth;
    day1.position.y = 0;

    const lenZ = depth - truHaoGoc;
    const lenX = rongK1 - depth;
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
    day2_1.position.x = dayCot;
    day2_1.position.y = 0;

    const lenZ = rongCot - truHaoGoc;
    const lenX = depth - dayCot;
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
    day2_2.position.z = rongCot * -1;
    day2_2.position.x = truHaoGoc;
    day2_2.position.y = 0;

    const lenZ = rongK2 - rongCot;
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

  const settingHau1 = (hau1) => {
    hau1.position.z = truHaoGoc * -1;
    hau1.position.x = dayCot + DDTBia;
    hau1.position.y = DDTBia;

    const lenZ = DDTHau;
    const lenX = rongK1 - dayCot - 2 * DDTBia;
    const lenY = height - DDTBia - DDTBia;

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
    hau2.position.y = DDTBia;

    const lenZ = rongK2 - rongCot - 2 * DDTBia;
    const lenX = DDTHau;
    const lenY = height - DDTBia - DDTBia;

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
    bia1.position.y = DDTBia;

    const lenZ = depth - truHaoGoc;
    const lenX = DDTBia;
    const lenY = height - DDTBia - DDTBia;

    bia1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia1.scale.x = lenX / sizeBiaTrai.x;
    bia1.scale.y = lenY / sizeBiaTrai.y;
    bia1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia4 = (bia2) => {
    bia2.position.z = (rongK2 - DDTBia) * -1;
    bia2.position.x = truHaoGoc;
    bia2.position.y = DDTBia;

    const lenZ = DDTBia;
    const lenX = depth - truHaoGoc;
    const lenY = height - DDTBia - DDTBia;

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
    biaCot1.position.y = DDTBia;

    const lenZ = rongCot - truHaoGoc;
    const lenX = DDTBia;
    const lenY = height - 2 * DDTBia;

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
    biaCot2.position.y = DDTBia;

    const lenZ = DDTBia;
    const lenX = dayCot - truHaoGoc + DDTBia;
    const lenY = height - 2 * DDTBia;

    biaCot2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(biaCot2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    biaCot2.scale.x = lenX / sizeBiaTrai.x;
    biaCot2.scale.y = lenY / sizeBiaTrai.y;
    biaCot2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingNoc1 = (noc1) => {
    noc1.position.z = truHaoGoc * -1;
    noc1.position.x = depth;
    noc1.position.y = height - DDTBia;

    const lenZ = depth - truHaoGoc;
    const lenX = rongK1 - depth;
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
    noc2_1.position.z = truHaoGoc * -1;
    noc2_1.position.x = dayCot;
    noc2_1.position.y = height - DDTBia;

    const lenZ = rongCot - truHaoGoc;
    const lenX = depth - dayCot;
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
    noc2_2.position.z = rongCot * -1;
    noc2_2.position.x = truHaoGoc;
    noc2_2.position.y = height - DDTBia;

    const lenZ = rongK2 - rongCot;
    const lenX = depth - truHaoGoc;
    const lenY = DDTBia;

    noc2_2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc2_2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc2_2.scale.x = lenX / sizeDay.x;
    noc2_2.scale.y = lenY / sizeDay.y;
    noc2_2.scale.z = lenZ / sizeDay.z;
  };

  const settingXanNgang1 = (xNgang1) => {
    xNgang1.position.z = (DDTHau + truHaoGoc) * -1;
    xNgang1.position.x = depth;
    xNgang1.position.y = (height - caoChan - caoXTruoc) / 2 + caoChan;

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
    xNgang2_1.position.y = (height - caoChan - caoXTruoc) / 2 + caoChan;

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
    xNgang2_2.position.y = (height - caoChan - caoXTruoc) / 2 + caoChan;

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

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/TBTGL3KC-FULL-UV.glb', (gltfScene) => {
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
          child.material.opacity = 0.6;
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
      const hau1 = md.getObjectByName('HAU-1');
      const hau2 = md.getObjectByName('HAU-2');
      const bia1 = md.getObjectByName('BIA-1');
      const bia4 = md.getObjectByName('BIA-4');
      const biaCot1 = md.getObjectByName('BIA-COT-1');
      const biaCot2 = md.getObjectByName('BIA-COT-2');
      const noc1 = md.getObjectByName('NOC-1');
      const noc2_1 = md.getObjectByName('NOC-2-1');
      const noc2_2 = md.getObjectByName('NOC-2-2');

      const xanNgang1 = md.getObjectByName('XAN-NGANG-1');
      const xanNgang2_1 = md.getObjectByName('XAN-NGANG-2-1');
      const xanNgang2_2 = md.getObjectByName('XAN-NGANG-2-2');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day1 && settingDay1(day1);
      day2_1 && settingDay2_1(day2_1);
      day2_2 && settingDay2_2(day2_2);

      hau1 && settingHau1(hau1);
      hau2 && settingHau2(hau2);

      bia1 && settingBia1(bia1);
      bia4 && settingBia4(bia4);

      biaCot1 && settingBiaCot1(biaCot1);
      biaCot2 && settingBiaCot2(biaCot2);

      noc1 && settingNoc1(noc1);
      noc2_1 && settingNoc2_1(noc2_1);
      noc2_2 && settingNoc2_2(noc2_2);

      xanNgang1 && settingXanNgang1(xanNgang1);
      xanNgang2_1 && settingXanNgang2_1(xanNgang2_1);
      xanNgang2_2 && settingXanNgang2_2(xanNgang2_2);

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
    DDTBia,
    DDTHau,
    DDTBia,
    DDTBia,
    DDTBia,
    DDTBia,
    DDTBia,
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
            defaultValue={DDTBia * 1000}
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
            defaultValue={DDTBia * 1000}
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
            defaultValue={DDTBia * 1000}
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
            defaultValue={DDTBia * 1000}
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
            defaultValue={DDTBia * 1000}
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
            defaultValue={DDTBia * 1000}
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
