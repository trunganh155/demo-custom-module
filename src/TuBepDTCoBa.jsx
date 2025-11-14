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

  const [width, setWidth] = useState(0.9);
  const [height, setHeight] = useState(0.4);
  const [depth, setDepth] = useState(0.35);

  const [luiHau, setLuiHau] = useState(0.01);
  const [ngamHau, setNgamHau] = useState(0.005);

  const [optionDay, setOptionDay] = useState(0);
  const [optionSauDay, setOptionSauDay] = useState(0);
  const [optionNoc, setOptionNoc] = useState(0);
  const [optionHau, setOptionHau] = useState(0);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);

  const [caoBa, setCaoBa] = useState(0.05);

  const [fixNoc, setFixNoc] = useState(0);
  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay = (day) => {
    day.position.z = 0 * -1;
    day.position.x = DDTHau;
    day.position.y = 0;

    const lenZ = width;
    const lenX = depth - DDTHau - DDTBia;
    const lenY = DDTBia;

    day.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day.scale.x = lenX / sizeDay.x;
    day.scale.y = lenY / sizeDay.y;
    day.scale.z = lenZ / sizeDay.z;
  };

  const settingHau = (hau) => {
    hau.position.z = 0 * -1;
    hau.position.x = 0;
    hau.position.y = 0;

    const lenZ = width;
    const lenX = DDTHau;
    const lenY = height;

    hau.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(hau);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau.scale.x = lenX / sizeHau.x;
    hau.scale.y = lenY / sizeHau.y;
    hau.scale.z = lenZ / sizeHau.z;
  };

  const settingBia1_1 = (bia1_1) => {
    bia1_1.position.z = 0 * -1;
    bia1_1.position.x = DDTHau;
    bia1_1.position.y = DDTBia;

    const lenZ = DDTBia;
    const lenX = depth - DDTHau - DDTBia;
    const lenY = height - 2 * DDTBia;

    bia1_1.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia1_1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia1_1.scale.x = lenX / sizeBiaTrai.x;
    bia1_1.scale.y = lenY / sizeBiaTrai.y;
    bia1_1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia1_2 = (bia1_2) => {
    bia1_2.position.z = 0 * -1;
    bia1_2.position.x = depth - DDTBia;
    bia1_2.position.y = caoBa;

    const lenZ = DDTBia;
    const lenX = DDTBia;
    const lenY = height - caoBa - DDTBia;

    bia1_2.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bia1_2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bia1_2.scale.x = lenX / sizeBiaTrai.x;
    bia1_2.scale.y = lenY / sizeBiaTrai.y;
    bia1_2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBia2_1 = (bia2_1) => {
    bia2_1.position.z = (width - DDTBia) * -1;
    bia2_1.position.x = DDTHau;
    bia2_1.position.y = DDTBia;

    const lenZ = DDTBia;
    const lenX = depth - DDTHau - DDTBia;
    const lenY = height - 2 * DDTBia;

    bia2_1.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bia2_1);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bia2_1.scale.x = lenX / sizeBiaPhai.x;
    bia2_1.scale.y = lenY / sizeBiaPhai.y;
    bia2_1.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBia2_2 = (bia2_2) => {
    bia2_2.position.z = (width - DDTBia) * -1;
    bia2_2.position.x = depth - DDTBia;
    bia2_2.position.y = caoBa;

    const lenZ = DDTBia;
    const lenX = DDTBia;
    const lenY = height - caoBa - DDTBia;

    bia2_2.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bia2_2);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bia2_2.scale.x = lenX / sizeBiaPhai.x;
    bia2_2.scale.y = lenY / sizeBiaPhai.y;
    bia2_2.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBa = (ba) => {
    ba.position.z = 0 * -1;
    ba.position.x = depth - DDTBia;
    ba.position.y = 0;

    const lenZ = width;
    const lenX = DDTBia;
    const lenY = caoBa;

    ba.scale.set(1, 1, 1);
    let boundingBoxBa = new THREE.Box3().setFromObject(ba);
    const sizeBa = new THREE.Vector3();
    boundingBoxBa.getSize(sizeBa);

    ba.scale.x = lenX / sizeBa.x;
    ba.scale.y = lenY / sizeBa.y;
    ba.scale.z = lenZ / sizeBa.z;
  };

  const settingNoc = (noc) => {
    noc.position.z = 0 * -1;
    noc.position.x = DDTHau;
    noc.position.y = height - DDTBia;

    const lenZ = width;
    const lenX = depth - DDTHau;
    const lenY = DDTBia;

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

    glftLoader.load('/glb/TBDT-Coba-UV.glb', (gltfScene) => {
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

      const day = md.getObjectByName('DAY');
      const noc = md.getObjectByName('NOC');
      const hau = md.getObjectByName('HAU');
      const bia1_1 = md.getObjectByName('BIA-1-1');
      const bia1_2 = md.getObjectByName('BIA-1-2');
      const bia2_1 = md.getObjectByName('BIA-2-1');
      const bia2_2 = md.getObjectByName('BIA-2-2');
      const ba = md.getObjectByName('BA');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day && settingDay(day);
      bia1_1 && settingBia1_1(bia1_1);
      bia1_2 && settingBia1_2(bia1_2);
      bia2_1 && settingBia2_1(bia2_1);
      bia2_2 && settingBia2_2(bia2_2);
      noc && settingNoc(noc);
      hau && settingHau(hau);
      ba && settingBa(ba);

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
    fixNoc,
    fixDay,
    fixBiaTrai,
    fixBiaPhai,
    DDTBia,
    DDTBia,
    DDTHau,
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
          />
        </div>

        <h5 className="header">Nóc:</h5>
        <div>
          <select className="select">
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
            defaultValue={DDTBia * 1000}
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
          />
        </div>

        <h5 className="header">Đáy:</h5>
        <div>
          <select className="select">
            <option value={0}>Đáy Lọt Lòng</option>
            <option value={1}>Đáy Phủ Bì</option>
          </select>
          <br />
          <select className="select">
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
            defaultValue={DDTBia * 1000}
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
          />
        </div>

        <h5 className="header">Hậu:</h5>
        <div>
          <select className="select">
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
              />
            </div>
          )}
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
          />
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App4;
