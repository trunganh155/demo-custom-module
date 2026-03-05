import React, { useEffect, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import SceneInit from './lib/SceneInit';

import './App.css';

let display;

let listBox = [];

function App() {
  const [gltfUuid, setGltfUuid] = useState(null);

  const [width, setWidth] = useState(0.12);
  const [height, setHeight] = useState(0.6);
  const [depth, setDepth] = useState(0.56);

  const [optionDay, setOptionDay] = useState(0);
  const [optionSauDay, setOptionSauDay] = useState(0);
  const [optionNoc, setOptionNoc] = useState(0);
  const [optionHau, setOptionHau] = useState(0);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.017);
  const [caoNep, setCaoNep] = useState(0.03);

  const [rBo, setRBo] = useState(0.1);

  const [fixNoc, setFixNoc] = useState(0);
  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingHau = (hau) => {
    hau.position.z = DDTBia * -1;

    hau.position.y = 0;

    hau.position.x = 0;

    const lenZ = width - 2 * DDTBia;

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

  const settingBiaTrai = (bTrai) => {
    bTrai.position.z = 0 * -1;

    bTrai.position.y = 0;

    bTrai.position.x = 0;

    const lenZ = DDTBia;

    const lenX = depth - rBo;

    const lenY = height;

    bTrai.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bTrai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bTrai.scale.x = lenX / sizeBiaTrai.x;
    bTrai.scale.y = lenY / sizeBiaTrai.y;
    bTrai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaPhai = (bPhai) => {
    bPhai.position.z = (width - DDTBia) * -1;

    bPhai.position.x = 0;

    bPhai.position.y = 0;

    const lenZ = DDTBia;

    const lenX = depth - DDTBia;

    const lenY = height;

    bPhai.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bPhai);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bPhai.scale.x = lenX / sizeBiaPhai.x;
    bPhai.scale.y = lenY / sizeBiaPhai.y;
    bPhai.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingBiaBoCong = (dayBoCong) => {
    dayBoCong.position.z = 0 * -1;

    dayBoCong.position.y = 0;

    dayBoCong.position.x = depth - rBo;

    const lenZ = rBo;

    const lenX = rBo;

    const lenY = height;

    dayBoCong.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(dayBoCong);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    dayBoCong.scale.x = lenX / sizeDay.x;
    dayBoCong.scale.y = lenY / sizeDay.y;
    dayBoCong.scale.z = lenZ / sizeDay.z;
  };

  const settingTruHaoBoCong = (truHaoBoCong) => {
    truHaoBoCong.position.z = rBo * -1;

    truHaoBoCong.position.y = 0;

    truHaoBoCong.position.x = depth - DDTBia;

    const lenZ = width - rBo;

    const lenX = DDTBia;

    const lenY = height;

    truHaoBoCong.scale.set(1, 1, 1);
    let boundingBoxHau = new THREE.Box3().setFromObject(truHaoBoCong);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    truHaoBoCong.scale.x = lenX / sizeHau.x;
    truHaoBoCong.scale.y = lenY / sizeHau.y;
    truHaoBoCong.scale.z = lenZ / sizeHau.z;
  };

  const settingNoc1 = (noc1) => {
    noc1.position.z = DDTBia * -1;

    noc1.position.y = height - DDTBia;

    noc1.position.x = depth - rBo;

    const lenZ = rBo - DDTBia;

    const lenX = rBo - DDTBia;

    const lenY = DDTBia;

    noc1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc1.scale.x = lenX / sizeDay.x;
    noc1.scale.y = lenY / sizeDay.y;
    noc1.scale.z = lenZ / sizeDay.z;
  };

  const settingNoc2 = (noc2) => {
    noc2.position.z = rBo * -1;

    noc2.position.y = height - DDTBia;

    noc2.position.x = depth - rBo;

    const lenZ = width - DDTBia - rBo;

    const lenX = rBo - DDTBia;

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
    noc3.position.z = DDTBia * -1;

    noc3.position.y = height - DDTBia;

    noc3.position.x = DDTHau;

    const lenZ = width - 2 * DDTBia;

    const lenX = depth - DDTHau - rBo;

    const lenY = DDTBia;

    noc3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc3.scale.x = lenX / sizeDay.x;
    noc3.scale.y = lenY / sizeDay.y;
    noc3.scale.z = lenZ / sizeDay.z;
  };

  const settingDay1 = (day1) => {
    day1.position.z = DDTBia * -1;

    day1.position.y = 0;

    day1.position.x = depth - rBo;

    const lenZ = rBo - DDTBia;

    const lenX = rBo - DDTBia;

    const lenY = DDTBia;

    day1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day1.scale.x = lenX / sizeDay.x;
    day1.scale.y = lenY / sizeDay.y;
    day1.scale.z = lenZ / sizeDay.z;
  };

  const settingDay2 = (day2) => {
    day2.position.z = rBo * -1;

    day2.position.y = 0;

    day2.position.x = depth - rBo;

    const lenZ = width - DDTBia - rBo;

    const lenX = rBo - DDTBia;

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
    day3.position.z = DDTBia * -1;

    day3.position.y = 0;

    day3.position.x = DDTHau;

    const lenZ = width - 2 * DDTBia;

    const lenX = depth - DDTHau - rBo;

    const lenY = DDTBia;

    day3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day3.scale.x = lenX / sizeDay.x;
    day3.scale.y = lenY / sizeDay.y;
    day3.scale.z = lenZ / sizeDay.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/KHOIBOCONG-TRAI.glb', (gltfScene) => {
      gltfScene.scene.scale.set(1, 1, 1);
      gltfScene.scene.position.set(0, 0, 0);
      gltfScene.scene.traverse((child) => {
        if (child.isMesh) {
          const randomColor = Math.random() * 0xffffff;
          // Gán màu cho vật liệu của mesh
          // child.material.color.set(randomColor);
          // child.castShadow = true;
          // child.receiveShadow = true;
          child.material.roughness = 0.9;
          child.material.metalness = 0.2;
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
      const day2 = md.getObjectByName('DAY-2');
      const day3 = md.getObjectByName('DAY-3');
      const noc1 = md.getObjectByName('NOC-1');
      const noc2 = md.getObjectByName('NOC-2');
      const noc3 = md.getObjectByName('NOC-3');
      const hau = md.getObjectByName('HAU');
      const bTrai = md.getObjectByName('BIA-TRAI');
      const bPhai = md.getObjectByName('BIA-PHAI');
      const biaBoCong = md.getObjectByName('BIA-BO-CONG');
      const truHaoBoCong = md.getObjectByName('TRU-HAO-BO-CONG');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day1 && settingDay1(day1);
      day2 && settingDay2(day2);
      day3 && settingDay3(day3);
      noc1 && settingNoc1(noc1);
      noc2 && settingNoc2(noc2);
      noc3 && settingNoc3(noc3);
      hau && settingHau(hau);
      bTrai && settingBiaTrai(bTrai);
      bPhai && settingBiaPhai(bPhai);
      biaBoCong && settingBiaBoCong(biaBoCong);
      truHaoBoCong && settingTruHaoBoCong(truHaoBoCong);

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
    rBo,
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
    DDTBia,
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
            Bo cong (mm):
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
            defaultValue={DDTBia * 1000}
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
            defaultValue={DDTBia * 1000}
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
            defaultValue={DDTBia * 1000}
          />
          <br />
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
              setDDTBia(Number(e.target.value) / 1000);
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

export default App;
