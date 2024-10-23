import React, { useEffect, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

import './App.css';

let display;

let listBox = [];

let truBia = 0.01;

function App() {
  const [width, setWidth] = useState(1.5);
  const [height, setHeight] = useState(2);
  const [depth, setDepth] = useState(0.56);

  const [luiHau, setLuiHau] = useState(0.01);
  const [luiChan, setLuiChan] = useState(0);
  const [caoChan, setCaoChan] = useState(0.1);

  const [optionDay, setOptionDay] = useState(0);
  const [optionNoc, setOptionNoc] = useState(0);
  const [optionHau, setOptionHau] = useState(0);
  const [gltfUuid, setGltfUuid] = useState(null);

  const [DDTBiaTrai, setDDTBiaTrai] = useState(0.017);
  const [DDTBiaPhai, setDDTBiaPhai] = useState(0.017);
  const [DDTNoc, setDDTNoc] = useState(0.017);
  const [DDTDay, setDDTDay] = useState(0.017);
  const [DDTHau, setDDTHau] = useState(0.008);
  const [DDTCTruoc, setDDTCTruoc] = useState(0.017);
  const [DDTCSau, setDDTCSau] = useState(0.017);

  const [fixNoc, setFixNoc] = useState(0);
  const [fixBiaTrai, setFixBiaTrai] = useState(0);
  const [fixBiaPhai, setFixBiaPhai] = useState(0);
  const [fixDay, setFixDay] = useState(0);

  const [showLine, setShowLine] = useState(false);

  const settingDay = (day) => {
    if (optionDay === 0 || optionDay === 3) {
      //Day lot
      day.position.z = DDTBiaTrai;
    } else {
      //Day trum
      day.position.z = 0;
    }
    day.position.y = caoChan;
    if (optionHau === 0 || optionHau === 1) {
      //Hau PB
      day.position.x = DDTHau * -1;
    } else {
      //Hau LL
      day.position.x = (DDTHau + luiHau) * -1;
    }

    const lenZ =
      width -
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 1
        ? 0
        : DDTBiaTrai);
    const lenX =
      (optionHau === 0 || optionHau === 1
        ? depth - DDTHau
        : depth - DDTHau - luiHau) + (fixDay >= 0 ? 0 : fixDay);
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
    if (optionHau === 0 || optionHau === 1) {
      hau.position.z = 0;
    } else {
      hau.position.z = truBia;
    }
    if (optionHau === 0 || optionHau === 1) {
      hau.position.x = 0 * -1;
    } else {
      hau.position.x = luiHau * -1;
    }
    if (optionHau === 0 || optionHau === 1) {
      hau.position.y = caoChan;
    } else {
      hau.position.y = 0;
    }

    hau.scale.set(1, 1, 1);
    const lenZ =
      optionHau === 0 || optionHau === 1 ? width : width - truBia * 2;
    const lenX = DDTHau;
    const lenY =
      optionHau === 0
        ? height - caoChan
        : optionHau === 1
        ? height - caoChan - DDTNoc
        : height - truBia;

    let boundingBoxHau = new THREE.Box3().setFromObject(hau);
    const sizeHau = new THREE.Vector3();
    boundingBoxHau.getSize(sizeHau);

    hau.scale.x = lenX / sizeHau.x;
    hau.scale.y = lenY / sizeHau.y;
    hau.scale.z = lenZ / sizeHau.z;
  };

  const settingBiaTrai = (bTrai) => {
    bTrai.position.z = 0;
    if (optionHau === 0 || optionHau === 1) {
      bTrai.position.x = DDTHau * -1;
    } else {
      bTrai.position.x = 0 * -1;
    }
    if (optionDay === 0 || optionDay === 3) {
      bTrai.position.y = 0;
    } else {
      bTrai.position.y = caoChan + DDTDay;
    }

    const lenZ = DDTBiaTrai;
    const lenX =
      (optionHau === 0 || optionHau === 1 ? depth - DDTHau : depth) +
      (fixNoc >= 0 ? -fixNoc : 0) +
      (fixBiaTrai >= 0 ? 0 : fixBiaTrai);
    const lenY =
      optionDay === 1 || optionDay === 2
        ? optionNoc === 0
          ? height - caoChan - DDTDay
          : height - caoChan - DDTDay - DDTNoc
        : optionNoc === 0
        ? height
        : height - DDTNoc;

    bTrai.scale.set(1, 1, 1);
    let boundingBoxBiaTrai = new THREE.Box3().setFromObject(bTrai);
    const sizeBiaTrai = new THREE.Vector3();
    boundingBoxBiaTrai.getSize(sizeBiaTrai);

    bTrai.scale.x = lenX / sizeBiaTrai.x;
    bTrai.scale.y = lenY / sizeBiaTrai.y;
    bTrai.scale.z = lenZ / sizeBiaTrai.z;
  };

  const settingBiaPhai = (bPhai) => {
    bPhai.position.z = width - DDTBiaPhai;
    if (optionHau === 0 || optionHau === 1) {
      bPhai.position.x = DDTHau * -1;
    } else {
      bPhai.position.x = 0 * -1;
    }
    if (optionDay === 0 || optionDay === 2) {
      bPhai.position.y = 0;
    } else {
      bPhai.position.y = caoChan + DDTDay;
    }

    const lenZ = DDTBiaPhai;
    const lenX =
      (optionHau === 0 || optionHau === 1 ? depth - DDTHau : depth) +
      (fixNoc >= 0 ? -fixNoc : 0) +
      (fixBiaPhai >= 0 ? 0 : fixBiaPhai);
    const lenY =
      optionDay === 1 || optionDay === 3
        ? optionNoc === 0
          ? height - caoChan - DDTDay
          : height - caoChan - DDTDay - DDTNoc
        : optionNoc === 0
        ? height
        : height - DDTNoc;

    bPhai.scale.set(1, 1, 1);
    let boundingBoxBiaPhai = new THREE.Box3().setFromObject(bPhai);
    const sizeBiaPhai = new THREE.Vector3();
    boundingBoxBiaPhai.getSize(sizeBiaPhai);

    bPhai.scale.x = lenX / sizeBiaPhai.x;
    bPhai.scale.y = lenY / sizeBiaPhai.y;
    bPhai.scale.z = lenZ / sizeBiaPhai.z;
  };

  const settingChanTruoc = (cTruoc) => {
    if (optionDay === 0 || optionDay === 3) {
      cTruoc.position.z = DDTBiaTrai;
    } else {
      cTruoc.position.z = 0;
    }
    cTruoc.position.x =
      (depth - DDTCTruoc - luiChan + (fixDay >= 0 ? 0 : fixDay)) * -1;
    cTruoc.position.y = 0;

    const lenZ =
      width -
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 2
        ? DDTBiaTrai
        : optionDay == 3
        ? DDTBiaPhai
        : 0);
    const lenX = DDTCTruoc;
    const lenY = caoChan;

    cTruoc.scale.set(1, 1, 1);
    let boundingBoxChanTruoc = new THREE.Box3().setFromObject(cTruoc);
    const sizeChanTruoc = new THREE.Vector3();
    boundingBoxChanTruoc.getSize(sizeChanTruoc);

    cTruoc.scale.x = lenX / sizeChanTruoc.x;
    cTruoc.scale.y = lenY / sizeChanTruoc.y;
    cTruoc.scale.z = lenZ / sizeChanTruoc.z;
  };

  const settingChanSau = (cSau) => {
    if (optionDay === 0 || optionDay === 3) {
      cSau.position.z = DDTBiaTrai;
    } else {
      cSau.position.z = 0;
    }
    cSau.position.x = 0.08 * -1;
    cSau.position.y = 0;

    const lenZ =
      width -
      (optionDay === 0
        ? DDTBiaTrai + DDTBiaPhai
        : optionDay === 2
        ? DDTBiaTrai
        : optionDay == 3
        ? DDTBiaPhai
        : 0);
    const lenX = DDTCSau;
    const lenY = caoChan;

    cSau.scale.set(1, 1, 1);
    let boundingBoxChanSau = new THREE.Box3().setFromObject(cSau);
    const sizeChanSau = new THREE.Vector3();
    boundingBoxChanSau.getSize(sizeChanSau);

    cSau.scale.x = lenX / sizeChanSau.x;
    cSau.scale.y = lenY / sizeChanSau.y;
    cSau.scale.z = lenZ / sizeChanSau.z;
  };

  const settingNoc = (noc) => {
    if (optionNoc === 0) {
      //LL
      noc.position.z = DDTBiaTrai;
    } else {
      //PB
      noc.position.z = 0;
    }
    if (optionHau === 0) {
      noc.position.x = DDTHau * -1;
    } else if (optionHau === 1) {
      noc.position.x = 0 * -1;
    } else {
      noc.position.x = 0 * -1;
    }
    noc.position.y = height - DDTNoc;

    const lenZ = optionNoc === 0 ? width - DDTBiaTrai - DDTBiaPhai : width;
    const lenX =
      (optionHau === 0 ? depth - DDTHau : depth) + (fixNoc >= 0 ? 0 : fixNoc);
    const lenY = DDTNoc;

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

    // inital scene
    // const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // display.scene.add(boxMesh);

    const glftLoader = new GLTFLoader();
    // glftLoader.load('./public/glb/TA_DEMO2.glb', (gltfScene) => {
    glftLoader.load('/glb/scene2.glb', (gltfScene) => {
      // glftLoader.load('./public/glb/TA.glb', (gltfScene) => {

      gltfScene.scene.position.set(0, 0, 0);

      gltfScene.scene.traverse((child) => {
        if (child.isMesh) {
          const randomColor = Math.random() * 0xffffff;
          // Gán màu cho vật liệu của mesh
          // child.material.color.set(randomColor);
          child.material.roughness = 0.8;
          child.material.metalness = 0.4;
        }
      });

      setGltfUuid(gltfScene.scene.uuid);

      display.scene.add(gltfScene.scene);
    });

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (event) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, display.camera);
      const intersects = raycaster.intersectObjects(display.scene.children);

      // for (let i = 0; i < intersects.length; i++) {
      //   console.log(intersects);
      // }

      // change color of objects intersecting the raycaster
      // for (let i = 0; i < intersects.length; i++) {
      //   intersects[i].object.material.color.set(0xff0000);
      // }

      // change color of the closest object intersecting the raycaster
      if (intersects.length > 0) {
        intersects[0].object.material.color.set(0xff0000);
      }
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
      const bTrai = md.getObjectByName('BIA-TRAI');
      const bPhai = md.getObjectByName('BIA-PHAI');
      const cTruoc = md.getObjectByName('CHAN-TRUOC');
      const cSau = md.getObjectByName('CHAN-SAU');

      listBox?.forEach((box) => {
        display.scene.remove(box);
      });
      listBox = [];

      settingDay(day);
      settingBiaTrai(bTrai);
      settingBiaPhai(bPhai);
      settingChanTruoc(cTruoc);
      settingChanSau(cSau);
      settingNoc(noc);
      settingHau(hau);
      setShowLine(false);

      setTimeout(() => {
        handleResetBox();
      }, 100);
    }
  }, [
    display,
    // optionCua,
    optionNoc,
    optionDay,
    optionHau,
    width,
    height,
    depth,
    luiHau,
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
    gltfUuid,
  ]);

  const handleResetBox = () => {
    const md = display.scene.getObjectByProperty('uuid', gltfUuid);

    const day = md.getObjectByName('DAY');
    const noc = md.getObjectByName('NOC');
    const hau = md.getObjectByName('HAU');
    const bTrai = md.getObjectByName('BIA-TRAI');
    const bPhai = md.getObjectByName('BIA-PHAI');
    const cTruoc = md.getObjectByName('CHAN-TRUOC');
    const cSau = md.getObjectByName('CHAN-SAU');

    const meshes = [day, noc, hau, bTrai, bPhai, cTruoc, cSau];

    meshes.forEach((mesh) => {
      if (mesh) {
        // Tạo Box3 để xác định kích thước của mesh
        const box = new THREE.Box3().setFromObject(mesh);

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
        const randomColor = Math.random() * 0xffffff; // Màu ngẫu nhiên
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });

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

  // useEffect(() => {
  //   if (showLine) {
  //     const md = display.scene.getObjectByProperty('uuid', gltfUuid);
  //     const day = md.getObjectByName('DAY');
  //     const noc = md.getObjectByName('NOC');
  //     const hau = md.getObjectByName('HAU');
  //     const bTrai = md.getObjectByName('BIA-TRAI');
  //     const bPhai = md.getObjectByName('BIA-PHAI');
  //     const cTruoc = md.getObjectByName('CHAN-TRUOC');
  //     const cSau = md.getObjectByName('CHAN-SAU');
  //     const meshes = [day, noc, hau, bTrai, bPhai, cTruoc, cSau];
  //     meshes.forEach((mesh) => {
  //       if (mesh) {
  //         // Tạo Box3 để xác định kích thước của mesh
  //         const box = new THREE.Box3().setFromObject(mesh);
  //         // Tính toán kích thước và vị trí của khung
  //         const size = new THREE.Vector3();
  //         box.getSize(size);
  //         const center = new THREE.Vector3();
  //         box.getCenter(center);
  //         // Tạo geometry cho khung
  //         const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  //         // Tạo edges từ geometry
  //         const edges = new THREE.EdgesGeometry(geometry);
  //         // Tạo màu ngẫu nhiên cho khung viền
  //         const randomColor = Math.random() * 0xffffff; // Màu ngẫu nhiên
  //         const material = new THREE.LineBasicMaterial({ color: 0x000000 });
  //         // Tạo LineSegments cho khung viền
  //         const boundingBoxEdges = new THREE.LineSegments(edges, material);
  //         // Đặt vị trí cho khung sao cho nó nằm khớp với mesh
  //         boundingBoxEdges.position.copy(center);
  //         listBox.push(boundingBoxEdges);
  //         // Thêm khung vào scene
  //         display.scene.add(boundingBoxEdges);
  //       }
  //     });
  //   } else {
  //     listBox?.forEach((box) => {
  //       display.scene.remove(box);
  //     });
  //     listBox = [];
  //   }
  // }, [showLine]);

  return (
    <div>
      <div className="container-option">
        <h5 className="header">Kích thước:</h5>
        <label htmlFor="width">Dài (mm): </label>
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
        <label htmlFor="height">Cao (mm): </label>
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
        <label htmlFor="depth">Sâu (mm): </label>
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

        <h5 className="header">Nóc:</h5>
        <select onChange={(e) => setOptionNoc(Number(e.target.value))}>
          <option value={0}>Nóc Lọt Lòng</option>
          <option value={1}>Nóc Phủ Bì</option>
        </select>
        <br />
        <label htmlFor="DDTNoc">Độ dày tấm nóc (mm): </label>
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
        <label htmlFor="fixNoc">Tăng/giảm nóc (mm): </label>
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

        <h5 className="header">Đáy:</h5>
        <select onChange={(e) => setOptionDay(Number(e.target.value))}>
          <option value={0}>Lọt Trong 2 Hông</option>
          <option value={1}>Trùm 2 Hông</option>
          <option value={2}>Trùm Trái Lọt Phải</option>
          <option value={3}>Trùm Phải Lọt Trái</option>
        </select>
        <br />
        <label htmlFor="DDTDay">Độ dày tấm đáy (mm): </label>
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
        <label htmlFor="fixDay">Tăng/giảm đáy (mm): </label>
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

        <h5 className="header">Hậu:</h5>
        <select onChange={(e) => setOptionHau(Number(e.target.value))}>
          <option value={0}>Hậu Phủ Bì Phủ Nóc</option>
          <option value={1}>Hậu Phủ Bì Lọt Nóc</option>
          <option value={2}>Hậu Âm Tủ</option>
        </select>
        <br />
        <label htmlFor="DDTHau">Độ dày tấm hậu (mm): </label>
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
            <label htmlFor="luiHau">Lùi Hậu (mm): </label>
            <input
              type="number"
              name="luiHau"
              id="luiHau"
              defaultValue={luiHau * 1000}
              onChange={(e) => {
                setLuiHau(Number(e.target.value) / 1000);
              }}
            />
          </div>
        )}

        <h5 className="header">Chân:</h5>
        <label htmlFor="DDTCTruoc">Độ dày tấm chân trước (mm): </label>
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
        <label htmlFor="DDTCSau">Độ dày tấm chân sau (mm): </label>
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
        <label htmlFor="caoChan">Chiều cao chân tủ (mm): </label>
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
        <label htmlFor="luiChan">Lùi chân trước (mm): </label>
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

        <h5 className="header">Bìa Trái:</h5>
        <label htmlFor="DDTBiaTrai">Độ dày tấm bìa trái (mm): </label>
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
        <label htmlFor="fixBiaTrai">Tăng/giảm bìa trái (mm): </label>
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

        <h5 className="header">Bìa Phải:</h5>
        <label htmlFor="DDTBiaPhai">Độ dày tấm bìa phải (mm): </label>
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
        <label htmlFor="fixBiaPhai">Tăng/giảm bìa phải (mm): </label>
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

        {/* <input
          type="checkbox"
          name="showLine"
          id=""
          checked={showLine}
          value={showLine}
          onChange={() => {
            setShowLine(!showLine);
          }}
        /> */}
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
