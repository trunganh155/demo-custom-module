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

  const [width, setWidth] = useState(0.8);
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
  const [DDTDay, setDDTDay] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);
  const [DDTChan, setDDTChan] = useState(0.017);
  const [DDTXTruoc, setDDTXTruoc] = useState(0.017);
  const [DDTXSau, setDDTXSau] = useState(0.017);

  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay = (day) => {
    day.position.z = optionDay === 0 ? 0 * -1 : DDTBiaTrai * -1;

    day.position.y = caoChan;

    day.position.x =
      optionDay === 0
        ? optionHau === 0
          ? DDTHau
          : 0
        : optionSauDay === 0
        ? optionHau === 0
          ? DDTHau
          : 0
        : optionHau === 0
        ? DDTHau
        : luiHau;

    const lenZ = width - (optionDay === 0 ? 0 : DDTBiaTrai + DDTBiaPhai);

    const lenX =
      (optionDay === 0
        ? optionHau === 0
          ? depth - DDTHau
          : depth
        : optionSauDay === 0
        ? optionHau === 0
          ? depth - DDTHau
          : depth
        : optionHau === 0
        ? depth - DDTHau
        : depth - DDTHau - luiHau) + (fixDay >= 0 ? -fixDay : 0);

    const lenY = DDTDay;

    day.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day.scale.x = lenX / sizeDay.x;
    day.scale.y = lenY / sizeDay.y;
    day.scale.z = lenZ / sizeDay.z;
  };

  const settingHau = (hau) => {
    hau.position.z = optionHau === 0 ? 0 * -1 : (DDTBiaTrai - ngamHau) * -1;

    hau.position.x = optionHau === 0 ? 0 : luiHau;

    hau.position.y = optionHau === 0 ? caoChan : caoChan + 0.5 * DDTDay;

    const lenZ =
      optionHau === 0 ? width : width - DDTBiaTrai - DDTBiaPhai + 2 * ngamHau;

    const lenX = DDTHau;

    const lenY =
      optionHau === 0 ? height - caoChan : height - caoChan - 0.5 * DDTDay;

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

    bTrai.position.x = optionHau === 0 ? DDTHau : 0;

    bTrai.position.y = optionDay === 0 ? caoChan + DDTDay : caoChan;

    const lenZ = DDTBiaTrai;

    const lenX =
      (optionHau === 0 ? depth - DDTHau : depth) +
      (fixBiaTrai >= 0 ? -fixBiaTrai : 0);

    const lenY = optionDay === 0 ? height - caoChan - DDTDay : height - caoChan;

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

    bPhai.position.x = optionHau === 0 ? DDTHau : 0;

    bPhai.position.y = optionDay === 0 ? caoChan + DDTDay : caoChan;

    const lenZ = DDTBiaPhai;

    const lenX =
      (optionHau === 0 ? depth - DDTHau : depth) +
      (fixBiaPhai >= 0 ? -fixBiaPhai : 0);

    const lenY = optionDay === 0 ? height - caoChan - DDTDay : height - caoChan;

    bPhai.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bPhai);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bPhai.scale.x = lenX / sizeBiaPhai.x;
    bPhai.scale.y = lenY / sizeBiaPhai.y;
    bPhai.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingChan = (chan) => {
    chan.position.z = 0 * -1;

    chan.position.x = depth - DDTChan - luiChan + (fixDay >= 0 ? -fixDay : 0);

    chan.position.y = 0;

    const lenZ = width;

    const lenX = DDTChan;

    const lenY = caoChan;

    chan.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(chan);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    chan.scale.x = lenX / sizeChanTruoc.x;
    chan.scale.y = lenY / sizeChanTruoc.y;
    chan.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingXuongTruoc1 = (xTruoc1) => {
    xTruoc1.position.z = DDTBiaTrai * -1;

    xTruoc1.position.x = optionXTruoc === 0 ? depth - DDTXTruoc : depth;

    xTruoc1.position.y =
      optionXTruoc === 0 ? height - caoXTruoc : height - DDTXTruoc;

    const lenZ = width - DDTBiaTrai - DDTBiaPhai;

    const lenX = DDTXTruoc;

    const lenY = caoXTruoc;

    xTruoc1.scale.set(1, 1, 1);
    xTruoc1.rotation.z = 0;
    let boundingBoxXTruoc1 = new THREE.Box3().setFromObject(xTruoc1);
    const sizeXTruoc1 = new THREE.Vector3();
    boundingBoxXTruoc1.getSize(sizeXTruoc1);

    xTruoc1.scale.x = lenX / sizeXTruoc1.x;
    xTruoc1.scale.y = lenY / sizeXTruoc1.y;
    xTruoc1.scale.z = lenZ / sizeXTruoc1.z;

    xTruoc1.rotation.z = optionXTruoc === 0 ? 0 : Math.PI / 2;
  };

  const settingXuongTruoc2 = (xTruoc2) => {
    xTruoc2.position.z = DDTBiaTrai * -1;

    xTruoc2.position.x =
      optionXTruoc === 0
        ? depth - DDTXTruoc * 2
        : optionXTruoc === 1
        ? depth
        : depth - DDTXTruoc;

    xTruoc2.position.y =
      optionXTruoc === 0
        ? height - caoXTruoc
        : optionXTruoc === 1
        ? height - DDTXTruoc * 2
        : height - caoXTruoc - DDTXTruoc;

    const lenZ = width - DDTBiaTrai - DDTBiaPhai;

    const lenX = DDTXTruoc;

    const lenY = caoXTruoc;

    xTruoc2.scale.set(1, 1, 1);
    xTruoc2.rotation.z = 0;
    let boundingBoxXTruoc2 = new THREE.Box3().setFromObject(xTruoc2);
    const sizeXTruoc2 = new THREE.Vector3();
    boundingBoxXTruoc2.getSize(sizeXTruoc2);

    xTruoc2.scale.x = lenX / sizeXTruoc2.x;
    xTruoc2.scale.y = lenY / sizeXTruoc2.y;
    xTruoc2.scale.z = lenZ / sizeXTruoc2.z;

    xTruoc2.rotation.z =
      optionXTruoc === 0 || optionXTruoc === 2 ? 0 : Math.PI / 2;
  };

  const settingXuongSau = (xSau) => {
    xSau.position.z = DDTBiaTrai * -1;

    xSau.position.x = optionHau === 0 ? DDTHau : DDTHau + luiHau;

    xSau.position.y = optionXSau === 0 ? height - caoXSau : height;

    const lenZ = width - DDTBiaTrai - DDTBiaPhai;

    const lenX = DDTXSau;

    const lenY = caoXSau;

    xSau.scale.set(1, 1, 1);
    xSau.rotation.z = 0;
    let boundingBoxXSau = new THREE.Box3().setFromObject(xSau);
    const sizeXSau = new THREE.Vector3();
    boundingBoxXSau.getSize(sizeXSau);

    xSau.scale.x = lenX / sizeXSau.x;
    xSau.scale.y = lenY / sizeXSau.y;
    xSau.scale.z = lenZ / sizeXSau.z;

    xSau.rotation.z = optionXSau === 0 ? 0 : -Math.PI / 2;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/BD.glb', (gltfScene) => {
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
      const hau = md.getObjectByName('HAU');
      const bTrai = md.getObjectByName('BIA-TRAI');
      const bPhai = md.getObjectByName('BIA-PHAI');
      const chan = md.getObjectByName('CHAN');
      const xuongTruoc1 = md.getObjectByName('XUONG-TRUOC-1');
      const xuongTruoc2 = md.getObjectByName('XUONG-TRUOC-2');
      const xuongSau = md.getObjectByName('XUONG-SAU');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day && settingDay(day);
      bTrai && settingBiaTrai(bTrai);
      bPhai && settingBiaPhai(bPhai);
      chan && settingChan(chan);
      hau && settingHau(hau);
      xuongTruoc1 && settingXuongTruoc1(xuongTruoc1);
      xuongTruoc2 && settingXuongTruoc2(xuongTruoc2);
      xuongSau && settingXuongSau(xuongSau);

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
    optionDay,
    optionSauDay,
    optionHau,
    optionXTruoc,
    optionXSau,
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
