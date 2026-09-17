```javascript
import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from
"https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";


/* =========================
   SCENE
========================= */

const canvas = document.getElementById("scene");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x101318);


/* =========================
   CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(6, 4, 7);


/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);


/* =========================
   LIGHTING
========================= */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        2
    );

scene.add(ambientLight);


const mainLight =
    new THREE.DirectionalLight(
        0xffffff,
        3
    );

mainLight.position.set(5, 8, 6);

scene.add(mainLight);


const blueLight =
    new THREE.PointLight(
        0x4488ff,
        30,
        20
    );

blueLight.position.set(
    -5,
    3,
    3
);

scene.add(blueLight);


/* =========================
   FLOOR
========================= */

const floorGeometry =
    new THREE.PlaneGeometry(
        30,
        30
    );

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x191d23,
        roughness: 0.8
    });

const floor =
    new THREE.Mesh(
        floorGeometry,
        floorMaterial
    );

floor.rotation.x =
    -Math.PI / 2;

floor.position.y = -1.5;

scene.add(floor);


/* =========================
   WELDING MACHINE
========================= */

const machine =
    new THREE.Group();

scene.add(machine);


/* =========================
   MAIN BODY
========================= */

const bodyGeometry =
    new THREE.BoxGeometry(
        4,
        3.5,
        2.4
    );

const bodyMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x343a40,
        metalness: 0.7,
        roughness: 0.35
    });

const body =
    new THREE.Mesh(
        bodyGeometry,
        bodyMaterial
    );

machine.add(body);


/* =========================
   HANDLE
========================= */

const handleMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.5
    });


const handle1 =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.35,
            1.2,
            0.35
        ),
        handleMaterial
    );

handle1.position.set(
    -1.1,
    2.25,
    0
);

machine.add(handle1);


const handle2 =
    handle1.clone();

handle2.position.set(
    1.1,
    2.25,
    0
);

machine.add(handle2);


const handleTop =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            2.5,
            0.35,
            0.35
        ),
        handleMaterial
    );

handleTop.position.set(
    0,
    2.75,
    0
);

machine.add(handleTop);


/* =========================
   FRONT PANEL
========================= */

const panelGeometry =
    new THREE.BoxGeometry(
        3.4,
        2.2,
        0.15
    );

const panelMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x16191d,
        metalness: 0.4
    });

const frontPanel =
    new THREE.Mesh(
        panelGeometry,
        panelMaterial
    );

frontPanel.position.set(
    0,
    0,
    1.25
);

machine.add(frontPanel);


/* =========================
   DISPLAY
========================= */

const displayGeometry =
    new THREE.BoxGeometry(
        1.4,
        0.55,
        0.12
    );

const displayMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x062d22,
        emissive: 0x00ff88,
        emissiveIntensity: 0.25
    });

const display =
    new THREE.Mesh(
        displayGeometry,
        displayMaterial
    );

display.position.set(
    0,
    0.55,
    1.36
);

machine.add(display);


/* =========================
   KNOB
========================= */

const knobGeometry =
    new THREE.CylinderGeometry(
        0.35,
        0.35,
        0.25,
        32
    );

const knobMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x777777,
        metalness: 0.8,
        roughness: 0.2
    });

const knob =
    new THREE.Mesh(
        knobGeometry,
        knobMaterial
    );

knob.rotation.x =
    Math.PI / 2;

knob.position.set(
    0,
    -0.35,
    1.45
);

machine.add(knob);


/* =========================
   BUTTONS
========================= */

function createButton(
    x,
    color
) {

    const geometry =
        new THREE.CylinderGeometry(
            0.18,
            0.18,
            0.18,
            24
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.2
        });

    const button =
        new THREE.Mesh(
            geometry,
            material
        );

    button.rotation.x =
        Math.PI / 2;

    button.position.set(
        x,
        -0.9,
        1.45
    );

    machine.add(button);

    return button;
}


const powerLED =
    createButton(
        -0.8,
        0xff2222
    );


const weldLED =
    createButton(
        0.8,
        0xffaa00
    );


/* =========================
   WELDING CABLE
========================= */

const cableMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x050505,
        roughness: 0.9
    });

const cable =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            1.4,
            0.12,
            16,
            60,
            Math.PI
        ),
        cableMaterial
    );

cable.rotation.z =
    Math.PI / 2;

cable.position.set(
    -2.2,
    -0.8,
    0
);

machine.add(cable);


/* =========================
   ELECTRODE HOLDER
========================= */

const holder =
    new THREE.Group();


const holderBody =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.18,
            0.28,
            1.5,
            20
        ),
        new THREE.MeshStandardMaterial({
            color: 0x222222,
            metalness: 0.6
        })
    );

holderBody.rotation.z =
    Math.PI / 2;

holderBody.position.set(
    -2.9,
    -0.8,
    0
);

holder.add(holderBody);

machine.add(holder);


/* =========================
   ELECTRODE
========================= */

const rodMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xbfc5cc,
        metalness: 0.9,
        roughness: 0.2
    });

const rod =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.05,
            0.05,
            1.5,
            16
        ),
        rodMaterial
    );

rod.rotation.z =
    Math.PI / 2;

rod.position.set(
    -3.65,
    -0.8,
    0
);

machine.add(rod);


/* =========================
   ORBIT CONTROLS
========================= */

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping = true;

controls.dampingFactor = 0.07;

controls.enableZoom = true;

controls.enableRotate = true;

controls.enablePan = true;

controls.minDistance = 4;

controls.maxDistance = 15;

controls.target.set(
    0,
    0,
    0
);

controls.update();


/* =========================
   POWER SYSTEM
========================= */

let powerOn = false;

let welding = false;


const powerStatus =
    document.getElementById(
        "powerStatus"
    );

const powerButton =
    document.getElementById(
        "powerButton"
    );

const weldButton =
    document.getElementById(
        "weldButton"
    );


powerButton.addEventListener(
    "click",
    function() {

        powerOn = !powerOn;

        if (powerOn) {

            powerStatus.textContent =
                "ON";

            powerStatus.className =
                "on";

            powerButton.textContent =
                "POWER OFF";

            powerLED.material.color.set(
                0x00ff44
            );

            displayMaterial
                .emissiveIntensity = 0.8;

        } else {

            powerStatus.textContent =
                "OFF";

            powerStatus.className =
                "off";

            powerButton.textContent =
                "POWER ON";

            powerLED.material.color.set(
                0xff2222
            );

            displayMaterial
                .emissiveIntensity = 0.25;

            welding = false;

            weldButton.textContent =
                "START WELDING";

            weldLED.material.color.set(
                0xffaa00
            );
        }
    }
);


/* =========================
   WELDING
========================= */

weldButton.addEventListener(
    "click",
    function() {

        if (!powerOn) {

            alert(
                "Please turn ON the welding machine first."
            );

            return;
        }

        welding = !welding;

        if (welding) {

            weldButton.textContent =
                "STOP WELDING";

            weldLED.material.color.set(
                0xff2200
            );

        } else {

            weldButton.textContent =
                "START WELDING";

            weldLED.material.color.set(
                0xffaa00
            );
        }
    }
);


/* =========================
   CURRENT CONTROL
========================= */

const currentSlider =
    document.getElementById(
        "current"
    );

const currentValue =
    document.getElementById(
        "currentValue"
    );


currentSlider.addEventListener(
    "input",
    function() {

        currentValue.textContent =
            currentSlider.value;
    }
);


/* =========================
   RESET VIEW
========================= */

document.getElementById(
    "resetButton"
).addEventListener(
    "click",
    function() {

        camera.position.set(
            6,
            4,
            7
        );

        controls.target.set(
            0,
            0,
            0
        );

        controls.update();
    }
);


/* =========================
   WINDOW RESIZE
========================= */

window.addEventListener(
    "resize",
    function() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);


/* =========================
   ANIMATION
========================= */

function animate() {

    requestAnimationFrame(
        animate
    );

    controls.update();


    if (welding) {

        const pulse =
            0.5 +
            Math.sin(
                Date.now() * 0.01
            ) * 0.5;

        weldLED.material
            .emissiveIntensity =
            pulse * 2;

    } else {

        weldLED.material
            .emissiveIntensity = 0.2;
    }


    renderer.render(
        scene,
        camera
    );
}


animate();
```