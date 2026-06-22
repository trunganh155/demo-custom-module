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

  const [width, setWidth] = useState(1.8);
  const [height, setHeight] = useState(0.3);
  const [depth, setDepth] = useState(1.2);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);

  const settingThanhGiuong1 = (thanhGiuong1) => {
    thanhGiuong1.position.z = 0 * -1;

    thanhGiuong1.position.y = 0;

    thanhGiuong1.position.x = 0;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth;

    thanhGiuong1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(thanhGiuong1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    thanhGiuong1.scale.x = lenX / sizeHau.x;
    thanhGiuong1.scale.y = lenY / sizeHau.y;
    thanhGiuong1.scale.z = lenZ / sizeHau.z;
  };

  const settingThanhGiuong2 = (thanhGiuong2) => {
    thanhGiuong2.position.z = (width - DDTBia) * -1;

    thanhGiuong2.position.y = 0;

    thanhGiuong2.position.x = 0;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth;

    thanhGiuong2.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(thanhGiuong2);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    thanhGiuong2.scale.x = lenX / sizeHau.x;
    thanhGiuong2.scale.y = lenY / sizeHau.y;
    thanhGiuong2.scale.z = lenZ / sizeHau.z;
  };

  const settingVatNgang = (vatNgang) => {
    vatNgang.position.z = 0 * -1;

    vatNgang.position.y = height - DDTBia;

    vatNgang.position.x = 0;

    const lenZ = depth > 1.2 ? 0 : width;

    const lenY = depth > 1.2 ? 0 : DDTBia;

    const lenX = depth > 1.2 ? 0 : depth;

    vatNgang.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatNgang);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatNgang.scale.x = lenX / sizeHau.x;
    vatNgang.scale.y = lenY / sizeHau.y;
    vatNgang.scale.z = lenZ / sizeHau.z;
  };

  const settingVatTraiPhu = (vatTraiPhu) => {
    vatTraiPhu.position.z = 0 * -1;

    vatTraiPhu.position.y = height - DDTBia;

    vatTraiPhu.position.x = 0;

    const lenZ = depth > 1.2 ? width / 2 : 0;

    const lenY = depth > 1.2 ? DDTBia : 0;

    const lenX = depth > 1.2 ? depth : 0;

    vatTraiPhu.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatTraiPhu);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatTraiPhu.scale.x = lenX / sizeHau.x;
    vatTraiPhu.scale.y = lenY / sizeHau.y;
    vatTraiPhu.scale.z = lenZ / sizeHau.z;
  };

  const settingVatPhaiPhu = (vatPhaiPhu) => {
    vatPhaiPhu.position.z = (width / 2) * -1;

    vatPhaiPhu.position.y = height - DDTBia;

    vatPhaiPhu.position.x = 0;

    const lenZ = depth > 1.2 ? width / 2 : 0;

    const lenY = depth > 1.2 ? DDTBia : 0;

    const lenX = depth > 1.2 ? depth : 0;

    vatPhaiPhu.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(vatPhaiPhu);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    vatPhaiPhu.scale.x = lenX / sizeHau.x;
    vatPhaiPhu.scale.y = lenY / sizeHau.y;
    vatPhaiPhu.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDoc1 = (xuongDoc1) => {
    xuongDoc1.position.z = ((width - 4 * DDTBia) / 3 + DDTBia) * -1;

    xuongDoc1.position.y = 0;

    xuongDoc1.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth - 2 * DDTBia;

    xuongDoc1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongDoc1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongDoc1.scale.x = lenX / sizeHau.x;
    xuongDoc1.scale.y = lenY / sizeHau.y;
    xuongDoc1.scale.z = lenZ / sizeHau.z;
  };

  const settingXuongDoc2 = (xuongDoc2) => {
    xuongDoc2.position.z = ((width - 4 * DDTBia) / 3 + DDTBia) * 2 * -1;

    xuongDoc2.position.y = 0;

    xuongDoc2.position.x = DDTBia;

    const lenZ = DDTBia;

    const lenY = height - DDTBia;

    const lenX = depth - 2 * DDTBia;

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

    chanGiuong1.position.x = 0;

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

    chanGiuong2.position.x = depth - DDTBia;

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

  const settingXuongNgangPhu1 = (xuongNgangPhu1) => {
    xuongNgangPhu1.position.z = depth > 1.5 ? DDTBia * -1 : 0;

    xuongNgangPhu1.position.y = depth > 1.5 ? 0 : 0;

    xuongNgangPhu1.position.x = depth > 1.5 ? depth / 2 : 0;

    const lenZ = depth > 1.5 ? width - 2 * DDTBia : 0;

    const lenY = depth > 1.5 ? height - DDTBia : 0;

    const lenX = depth > 1.5 ? DDTBia : 0;

    xuongNgangPhu1.scale.set(1, 1, 1);
    const boundingBox = new THREE.Box3().setFromObject(xuongNgangPhu1);
    const sizeHau = new THREE.Vector3();
    boundingBox.getSize(sizeHau);

    xuongNgangPhu1.scale.x = lenX / sizeHau.x;
    xuongNgangPhu1.scale.y = lenY / sizeHau.y;
    xuongNgangPhu1.scale.z = lenZ / sizeHau.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/GIUONG-BUC-KHOI-PHU.glb', (gltfScene) => {
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
          child.material.opacity = 0.4;
          child.material.transparent = true;
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

      const FGR_H_VAT_NGANG = md.getObjectByName('FGR-H-VAT-NGANG');
      const FLW_H_CHAN_GIUONG_1 = md.getObjectByName('FLW-H-CHAN-GIUONG-1');
      const FLW_H_CHAN_GIUONG_2 = md.getObjectByName('FLW-H-CHAN-GIUONG-2');
      const FLW_H_XUONG_NGANG_PHU_1 = md.getObjectByName(
        'FLW-H-XUONG-NGANG-PHU-1'
      );
      const SLW_H_THANH_GIUONG_1 = md.getObjectByName('SLW-H-THANH-GIUONG-1');
      const SLW_H_THANH_GIUONG_2 = md.getObjectByName('SLW-H-THANH-GIUONG-2');
      const SGR_H_VAT_PHAI_PHU = md.getObjectByName('SGR-H-VAT-PHAI-PHU');
      const SGR_H_VAT_TRAI_PHU = md.getObjectByName('SGR-H-VAT-TRAI-PHU');
      const SLW_H_XUONG_DOC_1 = md.getObjectByName('SLW-H-XUONG-DOC-1');
      const SLW_H_XUONG_DOC_2 = md.getObjectByName('SLW-H-XUONG-DOC-2');

      FGR_H_VAT_NGANG && settingVatNgang(FGR_H_VAT_NGANG);
      FLW_H_CHAN_GIUONG_1 && settingChanGiuong1(FLW_H_CHAN_GIUONG_1);
      FLW_H_CHAN_GIUONG_2 && settingChanGiuong2(FLW_H_CHAN_GIUONG_2);
      FLW_H_XUONG_NGANG_PHU_1 && settingXuongNgangPhu1(FLW_H_XUONG_NGANG_PHU_1);
      SLW_H_THANH_GIUONG_1 && settingThanhGiuong1(SLW_H_THANH_GIUONG_1);
      SLW_H_THANH_GIUONG_2 && settingThanhGiuong2(SLW_H_THANH_GIUONG_2);
      SGR_H_VAT_TRAI_PHU && settingVatTraiPhu(SGR_H_VAT_TRAI_PHU);
      SGR_H_VAT_PHAI_PHU && settingVatPhaiPhu(SGR_H_VAT_PHAI_PHU);
      SLW_H_XUONG_DOC_1 && settingXuongDoc1(SLW_H_XUONG_DOC_1);
      SLW_H_XUONG_DOC_2 && settingXuongDoc2(SLW_H_XUONG_DOC_2);

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
          <label className="label" htmlFor="depth">
            Dài (mm):
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
          <label className="label" htmlFor="width">
            Rộng (mm):
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
        </div>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App4;
