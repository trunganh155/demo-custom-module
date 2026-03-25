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

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(0.1);
  const [depth, setDepth] = useState(0.017);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);

  const [cachBia, setCachBia] = useState(0.04);
  const [minKC, setMinKC] = useState(0.25);

  //KHOI CHINH
  const settingThanhGoTreo = (thanhGoTreo) => {
    thanhGoTreo.position.z = 0 * -1;

    thanhGoTreo.position.y = 0;

    thanhGoTreo.position.x = 0;

    const lenZ = width;

    const lenX = depth;

    const lenY = height;

    thanhGoTreo.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(thanhGoTreo);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    thanhGoTreo.scale.x = lenX / sizeDay.x;
    thanhGoTreo.scale.y = lenY / sizeDay.y;
    thanhGoTreo.scale.z = lenZ / sizeDay.z;
  };

  const settingMocTreoDau = (mocTreoDau) => {
    mocTreoDau.position.z = cachBia * -1;

    mocTreoDau.position.y = height / 2;

    mocTreoDau.position.x = depth;

    const lenZ = 0.02;

    const lenY = 0.02;

    const lenX = 0.04;

    mocTreoDau.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(mocTreoDau);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    mocTreoDau.scale.x = lenX / sizeDay.x;
    mocTreoDau.scale.y = lenY / sizeDay.y;
    mocTreoDau.scale.z = lenZ / sizeDay.z;
  };

  const settingMocTreoCuoi = (mocTreoCuoi) => {
    mocTreoCuoi.position.z = (width - cachBia) * -1;

    mocTreoCuoi.position.y = height / 2;

    mocTreoCuoi.position.x = depth;

    const lenZ = 0.02;

    const lenY = 0.02;

    const lenX = 0.04;

    mocTreoCuoi.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(mocTreoCuoi);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    mocTreoCuoi.scale.x = lenX / sizeDay.x;
    mocTreoCuoi.scale.y = lenY / sizeDay.y;
    mocTreoCuoi.scale.z = lenZ / sizeDay.z;
  };

  const settingMocTreo1 = (mocTreo1) => {
    mocTreo1.position.z =
      (cachBia +
        ((width - 2 * cachBia) / Math.floor((width - 2 * cachBia) / minKC)) *
          1) *
      -1;

    mocTreo1.position.y = height / 2;

    mocTreo1.position.x = depth;

    const lenZ = Math.floor((width - 2 * cachBia) / minKC) >= 2 ? 0.02 : 0;

    const lenY = Math.floor((width - 2 * cachBia) / minKC) >= 2 ? 0.02 : 0;

    const lenX = Math.floor((width - 2 * cachBia) / minKC) >= 2 ? 0.04 : 0;

    mocTreo1.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(mocTreo1);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    mocTreo1.scale.x = lenX / sizeDay.x;
    mocTreo1.scale.y = lenY / sizeDay.y;
    mocTreo1.scale.z = lenZ / sizeDay.z;
  };

  const settingMocTreo2 = (mocTreo2) => {
    mocTreo2.position.z =
      (cachBia +
        ((width - 2 * cachBia) / Math.floor((width - 2 * cachBia) / minKC)) *
          2) *
      -1;

    mocTreo2.position.y = height / 2;

    mocTreo2.position.x = depth;

    const lenZ = Math.floor((width - 2 * cachBia) / minKC) >= 3 ? 0.02 : 0;

    const lenY = Math.floor((width - 2 * cachBia) / minKC) >= 3 ? 0.02 : 0;

    const lenX = Math.floor((width - 2 * cachBia) / minKC) >= 3 ? 0.04 : 0;

    mocTreo2.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(mocTreo2);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    mocTreo2.scale.x = lenX / sizeDay.x;
    mocTreo2.scale.y = lenY / sizeDay.y;
    mocTreo2.scale.z = lenZ / sizeDay.z;
  };

  const settingMocTreo3 = (mocTreo3) => {
    mocTreo3.position.z =
      (cachBia +
        ((width - 2 * cachBia) / Math.floor((width - 2 * cachBia) / minKC)) *
          3) *
      -1;

    mocTreo3.position.y = height / 2;

    mocTreo3.position.x = depth;

    const lenZ = Math.floor((width - 2 * cachBia) / minKC) >= 4 ? 0.02 : 0;

    const lenY = Math.floor((width - 2 * cachBia) / minKC) >= 4 ? 0.02 : 0;

    const lenX = Math.floor((width - 2 * cachBia) / minKC) >= 4 ? 0.04 : 0;

    mocTreo3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(mocTreo3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    mocTreo3.scale.x = lenX / sizeDay.x;
    mocTreo3.scale.y = lenY / sizeDay.y;
    mocTreo3.scale.z = lenZ / sizeDay.z;
  };

  const settingMocTreo4 = (mocTreo4) => {
    mocTreo4.position.z =
      (cachBia +
        ((width - 2 * cachBia) / Math.floor((width - 2 * cachBia) / minKC)) *
          4) *
      -1;

    mocTreo4.position.y = height / 2;

    mocTreo4.position.x = depth;

    const lenZ = Math.floor((width - 2 * cachBia) / minKC) >= 5 ? 0.02 : 0;

    const lenY = Math.floor((width - 2 * cachBia) / minKC) >= 5 ? 0.02 : 0;

    const lenX = Math.floor((width - 2 * cachBia) / minKC) >= 5 ? 0.04 : 0;

    mocTreo4.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(mocTreo4);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    mocTreo4.scale.x = lenX / sizeDay.x;
    mocTreo4.scale.y = lenY / sizeDay.y;
    mocTreo4.scale.z = lenZ / sizeDay.z;
  };

  const settingMocTreo5 = (mocTreo5) => {
    mocTreo5.position.z =
      (cachBia +
        ((width - 2 * cachBia) / Math.floor((width - 2 * cachBia) / minKC)) *
          5) *
      -1;

    mocTreo5.position.y = height / 2;

    mocTreo5.position.x = depth;

    const lenZ = Math.floor((width - 2 * cachBia) / minKC) >= 6 ? 0.02 : 0;

    const lenY = Math.floor((width - 2 * cachBia) / minKC) >= 6 ? 0.02 : 0;

    const lenX = Math.floor((width - 2 * cachBia) / minKC) >= 6 ? 0.04 : 0;

    mocTreo5.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(mocTreo5);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    mocTreo5.scale.x = lenX / sizeDay.x;
    mocTreo5.scale.y = lenY / sizeDay.y;
    mocTreo5.scale.z = lenZ / sizeDay.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/MOC-TREO-TU-GIAY.glb', (gltfScene) => {
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

      const thanhGoTreo = md.getObjectByName('THANH-GO-TREO');
      const mocTreoDau = md.getObjectByName('MOC-TREO-DAU');
      const mocTreoCuoi = md.getObjectByName('MOC-TREO-CUOI');
      const mocTreo1 = md.getObjectByName('MOC-TREO-1');
      const mocTreo2 = md.getObjectByName('MOC-TREO-2');
      const mocTreo3 = md.getObjectByName('MOC-TREO-3');
      const mocTreo4 = md.getObjectByName('MOC-TREO-4');
      const mocTreo5 = md.getObjectByName('MOC-TREO-5');

      thanhGoTreo && settingThanhGoTreo(thanhGoTreo);
      mocTreoDau && settingMocTreoDau(mocTreoDau);
      mocTreoCuoi && settingMocTreoCuoi(mocTreoCuoi);
      mocTreo1 && settingMocTreo1(mocTreo1);
      mocTreo2 && settingMocTreo2(mocTreo2);
      mocTreo3 && settingMocTreo3(mocTreo3);
      mocTreo4 && settingMocTreo4(mocTreo4);
      mocTreo5 && settingMocTreo5(mocTreo5);

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
  }, [display, width, height, depth, DDTHau, DDTBia, gltfUuid]);

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
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App4;
