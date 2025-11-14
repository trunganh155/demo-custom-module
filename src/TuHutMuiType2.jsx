import React, { useEffect, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import SceneInit from './lib/SceneInit';

import './App.css';

let display;

let listBox = [];

function App2() {
  const [gltfUuid, setGltfUuid] = useState(null);

  const [width, setWidth] = useState(0.9);
  const [height, setHeight] = useState(0.8);
  const [depth, setDepth] = useState(0.35);

  const [luiHau, setLuiHau] = useState(0.01);
  const [ngamHau, setNgamHau] = useState(0.005);
  const [luiChan, setLuiChan] = useState(0);
  const [caoChan, setCaoChan] = useState(0);

  const [optionDay, setOptionDay] = useState(0);
  const [optionNoc, setOptionNoc] = useState(0);
  const [optionHau, setOptionHau] = useState(0);
  const [optionSauDay, setOptionSauDay] = useState(0);

  const [DDTBia, setDDTBia] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);

  const [KCCot, setKCCot] = useState(0.4);
  const [dayCot, setDayCot] = useState(0.15);
  const [rongCot, setRongCot] = useState(0.3);

  const [sizeOKhoi, setSizeOKhoi] = useState(0.225);
  const [caoMHM, setCaoMHM] = useState(0.1);

  const [fixNoc, setFixNoc] = useState(0);
  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [visibleBT, setVisibleBT] = useState(true);
  const [visibleBP, setVisibleBP] = useState(true);

  const settingDay1 = (day1) => {
    day1.position.z = DDTBia * -1;

    day1.position.y = caoMHM + 0.003;

    day1.position.x = DDTHau;

    const lenZ = width / 2 - DDTBia - sizeOKhoi / 2;

    const lenX = depth - DDTHau - DDTBia;

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
    day2.position.z = (width / 2 - sizeOKhoi / 2) * -1;

    day2.position.y = caoMHM + 0.003;

    day2.position.x = sizeOKhoi + DDTHau;

    const lenZ = sizeOKhoi;

    const lenX = depth - sizeOKhoi - DDTHau - DDTBia;

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
    day3.position.z =
      (width - DDTBia - (width - 2 * DDTBia - sizeOKhoi) / 2) * -1;

    day3.position.y = caoMHM + 0.003;

    day3.position.x = DDTHau;

    const lenZ = (width - 2 * DDTBia - sizeOKhoi) / 2;

    const lenX = depth - DDTHau - DDTBia;

    const lenY = DDTBia;

    day3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(day3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    day3.scale.x = lenX / sizeDay.x;
    day3.scale.y = lenY / sizeDay.y;
    day3.scale.z = lenZ / sizeDay.z;
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

  const settingBiaTrai = (biaTrai) => {
    biaTrai.position.z = 0 * -1;

    biaTrai.position.x = DDTHau;

    biaTrai.position.y = caoMHM + 0.003;

    const lenZ = DDTBia;

    const lenX = depth - DDTHau;

    const lenY = height - (caoMHM + 0.003) - DDTBia;

    biaTrai.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(biaTrai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    biaTrai.scale.x = lenX / sizeBiaTrai.x;
    biaTrai.scale.y = lenY / sizeBiaTrai.y;
    biaTrai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaPhai = (biaPhai) => {
    biaPhai.position.z = (width - DDTBia) * -1;

    biaPhai.position.x = DDTHau;

    biaPhai.position.y = caoMHM + 0.003;

    const lenZ = DDTBia;

    const lenX = depth - DDTHau;

    const lenY = height - (caoMHM + 0.003) - DDTBia;

    biaPhai.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(biaPhai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    biaPhai.scale.x = lenX / sizeBiaTrai.x;
    biaPhai.scale.y = lenY / sizeBiaTrai.y;
    biaPhai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingOngKhoi1 = (ongKhoi1) => {
    ongKhoi1.position.z = ((width - 2 * DDTBia - sizeOKhoi) / 2) * -1;

    ongKhoi1.position.x = DDTHau;

    ongKhoi1.position.y = caoMHM + 0.003 + DDTBia;

    const lenZ = DDTBia;

    const lenX = sizeOKhoi;

    const lenY = height - (caoMHM + 0.003) - 2 * DDTBia;

    ongKhoi1.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(ongKhoi1);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    ongKhoi1.scale.x = lenX / sizeBiaTrai.x;
    ongKhoi1.scale.y = lenY / sizeBiaTrai.y;
    ongKhoi1.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingOngKhoi2 = (ongKhoi2) => {
    ongKhoi2.position.z = ((width - 2 * DDTBia - sizeOKhoi) / 2) * -1;

    ongKhoi2.position.x = DDTHau + sizeOKhoi;

    ongKhoi2.position.y = caoMHM + 0.003 + DDTBia;

    const lenZ = sizeOKhoi + 2 * DDTBia;

    const lenX = DDTBia;

    const lenY = height - (caoMHM + 0.003) - 2 * DDTBia;

    ongKhoi2.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(ongKhoi2);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    ongKhoi2.scale.x = lenX / sizeBiaTrai.x;
    ongKhoi2.scale.y = lenY / sizeBiaTrai.y;
    ongKhoi2.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingOngKhoi3 = (ongKhoi3) => {
    ongKhoi3.position.z =
      ((width - 2 * DDTBia - sizeOKhoi) / 2 + sizeOKhoi + DDTBia) * -1;

    ongKhoi3.position.x = DDTHau;

    ongKhoi3.position.y = caoMHM + 0.003 + DDTBia;

    const lenZ = DDTBia;

    const lenX = sizeOKhoi;

    const lenY = height - (caoMHM + 0.003) - 2 * DDTBia;

    ongKhoi3.scale.set(1, 1, 1);
    let boundingBoxBia2 = new THREE.Box3().setFromObject(ongKhoi3);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBia2.getSize(sizeBiaTrai);

    ongKhoi3.scale.x = lenX / sizeBiaTrai.x;
    ongKhoi3.scale.y = lenY / sizeBiaTrai.y;
    ongKhoi3.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingChan = (chan) => {
    chan.position.z = DDTBia * -1;

    chan.position.x = depth - DDTBia;

    chan.position.y = caoMHM + 0.003;

    const lenZ = width - 2 * DDTBia;

    const lenX = DDTBia;

    const lenY = 0.05;

    chan.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(chan);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    chan.scale.x = lenX / sizeChanTruoc.x;
    chan.scale.y = lenY / sizeChanTruoc.y;
    chan.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingNoc1 = (noc1) => {
    noc1.position.z = 0;

    noc1.position.x = DDTHau;

    noc1.position.y = height - DDTBia;

    const lenZ = DDTBia + (width - 2 * DDTBia - sizeOKhoi) / 2;

    const lenX = depth - DDTHau;

    const lenY = DDTBia;

    noc1.scale.set(1, 1, 1);
    let boundingBoxNoc = new THREE.Box3().setFromObject(noc1);
    const sizeNoc = new THREE.Vector3();
    boundingBoxNoc.getSize(sizeNoc);

    noc1.scale.x = lenX / sizeNoc.x;
    noc1.scale.y = lenY / sizeNoc.y;
    noc1.scale.z = lenZ / sizeNoc.z;
  };

  const settingNoc2 = (noc2) => {
    noc2.position.z = (width / 2 - sizeOKhoi / 2) * -1;

    noc2.position.y = height - DDTBia;

    noc2.position.x = sizeOKhoi + DDTHau;

    const lenZ = sizeOKhoi;

    const lenX = depth - sizeOKhoi - DDTHau;

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
    noc3.position.z =
      (width - DDTBia - (width - 2 * DDTBia - sizeOKhoi) / 2) * -1;

    noc3.position.y = height - DDTBia;

    noc3.position.x = DDTHau;

    const lenZ = (width - 2 * DDTBia - sizeOKhoi) / 2 + DDTBia;

    const lenX = depth - DDTHau;

    const lenY = DDTBia;

    noc3.scale.set(1, 1, 1);
    let boundingBoxDay = new THREE.Box3().setFromObject(noc3);
    const sizeDay = new THREE.Vector3();
    boundingBoxDay.getSize(sizeDay);

    noc3.scale.x = lenX / sizeDay.x;
    noc3.scale.y = lenY / sizeDay.y;
    noc3.scale.z = lenZ / sizeDay.z;
  };

  useEffect(() => {
    display = new SceneInit('myThreeJsCanvas');
    display.initialize();
    display.animate();

    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    glftLoader.load('/glb/TUHUTMUI.glb', (gltfScene) => {
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
      // md.position.set(-depth / 2, -height / 2, width / 2);

      const day1 = md.getObjectByName('DAY-1');
      const day2 = md.getObjectByName('DAY-2');
      const day3 = md.getObjectByName('DAY-3');

      const biaTrai = md.getObjectByName('BIA-TRAI');
      const biaPhai = md.getObjectByName('BIA-PHAI');

      const oKhoi1 = md.getObjectByName('ONG-KHOI-1');
      const oKhoi2 = md.getObjectByName('ONG-KHOI-2');
      const oKhoi3 = md.getObjectByName('ONG-KHOI-3');

      const hau = md.getObjectByName('HAU');

      const noc1 = md.getObjectByName('NOC-1');
      const noc2 = md.getObjectByName('NOC-2');
      const noc3 = md.getObjectByName('NOC-3');

      const chan = md.getObjectByName('CHAN');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      day1 && settingDay1(day1);
      day2 && settingDay2(day2);
      day3 && settingDay3(day3);

      biaTrai && settingBiaTrai(biaTrai);
      biaPhai && settingBiaPhai(biaPhai);

      oKhoi1 && settingOngKhoi1(oKhoi1);
      oKhoi2 && settingOngKhoi2(oKhoi2);
      oKhoi3 && settingOngKhoi3(oKhoi3);

      hau && settingHau(hau);

      noc1 && settingNoc1(noc1);
      noc2 && settingNoc2(noc2);
      noc3 && settingNoc3(noc3);

      chan && settingChan(chan);

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
    DDTBia,
    DDTBia,
    DDTHau,
    DDTBia,
    DDTBia,
    DDTBia,
    DDTBia,
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
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
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
              setDDTBia(Number(e.target.value) / 1000);
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
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
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
            defaultValue={DDTBia * 1000}
            onChange={(e) => {
              setDDTBia(Number(e.target.value) / 1000);
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
              setDDTBia(Number(e.target.value) / 1000);
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
