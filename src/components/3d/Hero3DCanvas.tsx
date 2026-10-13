"use client";

// [ADDED] Interactive 3D WebGL Canvas for Indrayani Sweet Corner Hero
// Renders realistic 3D Mithai models (Kaju Katli, Motichoor Laddoo, Peda, Gulab Jamun, Box) with interactive orbit, lighting modes, and sweet inspector
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye, RotateCw, Sun, Flame, Moon, Plus } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { PRODUCTS } from "@/data/products";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLighting, setActiveLighting] = useState<"diya" | "studio" | "sunset">("diya");
  const [selectedSweet, setSelectedSweet] = useState<{
    name: string;
    desc: string;
    tags: string[];
    productId: string;
  } | null>({
    name: "Royal Kaju Katli",
    desc: "Crafted from Grade-A cashew paste with genuine silver leaf vark.",
    tags: ["Pure Cashew", "Silver Vark", "Diamond Cut"],
    productId: "kaju-katli-royal",
  });
  const [isRotating, setIsRotating] = useState(true);
  const [isWebGLEnabled, setIsWebGLEnabled] = useState(true);

  const { addToCart } = useShop();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability safely
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setIsWebGLEnabled(false);
        return;
      }
    } catch {
      setIsWebGLEnabled(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1210, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.5, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    mainLight.position.set(4, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const diyaLight = new THREE.PointLight(0xff8822, 2.5, 8);
    diyaLight.position.set(-2, 1.5, 2);
    scene.add(diyaLight);

    const rimLight = new THREE.PointLight(0xd4af37, 1.8, 10);
    rimLight.position.set(3, -1, -2);
    scene.add(rimLight);

    // 3. Central Sweet Display Platter (Etched Brass & Marble Thali)
    const platterGroup = new THREE.Group();
    scene.add(platterGroup);

    // Marble Base
    const marbleGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.25, 48);
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xfcfaf5,
      roughness: 0.25,
      metalness: 0.1,
    });
    const marbleMesh = new THREE.Mesh(marbleGeo, marbleMat);
    marbleMesh.position.y = -1.2;
    marbleMesh.receiveShadow = true;
    platterGroup.add(marbleMesh);

    // Antique Brass Rim
    const brassRimGeo = new THREE.TorusGeometry(3.7, 0.12, 16, 64);
    const brassRimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.3,
    });
    const brassRim = new THREE.Mesh(brassRimGeo, brassRimMat);
    brassRim.rotation.x = Math.PI / 2;
    brassRim.position.y = -1.1;
    platterGroup.add(brassRim);

    // 4. Procedural Mithai Models
    const sweetsGroup = new THREE.Group();
    platterGroup.add(sweetsGroup);

    // A. Kaju Katli (Diamond prisms with Silver Foil)
    const createKajuKatli = (x: number, y: number, z: number, rotY: number) => {
      const shape = new THREE.Shape();
      const w = 0.55;
      const h = 0.75;
      shape.moveTo(0, h / 2);
      shape.lineTo(w / 2, 0);
      shape.lineTo(0, -h / 2);
      shape.lineTo(-w / 2, 0);
      shape.closePath();

      const extrudeSettings = {
        depth: 0.16,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();

      // Top silver vark leaf material (high metalness, reflective shimmer)
      const mat = new THREE.MeshStandardMaterial({
        color: 0xf5f5f7,
        metalness: 0.75,
        roughness: 0.2,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = rotY;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = {
        name: "Royal Kaju Katli",
        desc: "Diamond-cut cashew confection layered with sparkling edible silver leaf vark.",
        tags: ["Pure Cashew", "Silver Vark", "Diamond Cut"],
        productId: "kaju-katli-royal",
      };
      return mesh;
    };

    // Add star arrangement of Kaju Katli
    const kaju1 = createKajuKatli(0, -0.95, 0.4, 0);
    const kaju2 = createKajuKatli(0.7, -0.95, 0.1, 0.6);
    const kaju3 = createKajuKatli(-0.7, -0.95, 0.1, -0.6);
    sweetsGroup.add(kaju1, kaju2, kaju3);

    // B. Desi Ghee Motichoor Laddoo (Saffron Pearl Sphere)
    const createMotichoorLaddoo = (x: number, y: number, z: number, scale: number = 1) => {
      const laddooGroup = new THREE.Group();
      laddooGroup.position.set(x, y, z);
      laddooGroup.scale.set(scale, scale, scale);

      // Core sphere
      const sphereGeo = new THREE.SphereGeometry(0.48, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xe67e22,
        roughness: 0.55,
        metalness: 0.15,
      });
      const core = new THREE.Mesh(sphereGeo, sphereMat);
      core.castShadow = true;
      laddooGroup.add(core);

      // Boondi pearl bumps
      const bumpCount = 45;
      const bumpGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const bumpMat = new THREE.MeshStandardMaterial({
        color: 0xf39c12,
        roughness: 0.4,
        metalness: 0.2,
      });

      for (let i = 0; i < bumpCount; i++) {
        const bump = new THREE.Mesh(bumpGeo, bumpMat);
        const phi = Math.acos(-1 + (2 * i) / bumpCount);
        const theta = Math.sqrt(bumpCount * Math.PI) * phi;
        bump.position.set(
          0.44 * Math.cos(theta) * Math.sin(phi),
          0.44 * Math.sin(theta) * Math.sin(phi),
          0.44 * Math.cos(phi)
        );
        laddooGroup.add(bump);
      }

      // Silver flake garnish
      const flakeGeo = new THREE.PlaneGeometry(0.12, 0.12);
      const flakeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.95,
        roughness: 0.1,
        side: THREE.DoubleSide,
      });
      const flake = new THREE.Mesh(flakeGeo, flakeMat);
      flake.position.set(0, 0.48, 0.1);
      flake.rotation.x = -Math.PI / 4;
      laddooGroup.add(flake);

      laddooGroup.userData = {
        name: "Desi Ghee Motichoor Laddoo",
        desc: "Fine boondi pearls steeped in saffron syrup, cooked in 100% pure cow ghee.",
        tags: ["Pure Cow Ghee", "Bestseller", "Prasad Essential"],
        productId: "motichoor-ladoo-ghee",
      };

      return laddooGroup;
    };

    const laddoo1 = createMotichoorLaddoo(-1.6, -0.65, 0.6, 1.1);
    const laddoo2 = createMotichoorLaddoo(-1.8, -0.68, -0.4, 0.95);
    sweetsGroup.add(laddoo1, laddoo2);

    // C. Pista Kesar Peda (Circular disc with central indentation and pistachios)
    const createPeda = (x: number, y: number, z: number) => {
      const pedaGroup = new THREE.Group();
      pedaGroup.position.set(x, y, z);

      const pedaGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.26, 32);
      const pedaMat = new THREE.MeshStandardMaterial({
        color: 0xedd6ad,
        roughness: 0.6,
        metalness: 0.05,
      });
      const pedaMesh = new THREE.Mesh(pedaGeo, pedaMat);
      pedaMesh.castShadow = true;
      pedaGroup.add(pedaMesh);

      // Central pistachio sliver
      const pistaGeo = new THREE.BoxGeometry(0.16, 0.04, 0.08);
      const pistaMat = new THREE.MeshStandardMaterial({
        color: 0x4e8752,
        roughness: 0.35,
      });
      const pista1 = new THREE.Mesh(pistaGeo, pistaMat);
      pista1.position.set(0.04, 0.15, 0);
      pista1.rotation.y = 0.5;

      const pista2 = new THREE.Mesh(pistaGeo, pistaMat);
      pista2.position.set(-0.06, 0.15, 0.02);
      pista2.rotation.y = -0.4;
      pedaGroup.add(pista1, pista2);

      pedaGroup.userData = {
        name: "Kesar Pista Peda",
        desc: "Slow-reduced mawa, infused with cardamom seeds and crowned with Iranian pistachios.",
        tags: ["Slow-Cooked Mawa", "Pure Ghee", "Cardamom Notes"],
        productId: "pista-kesar-peda",
      };

      return pedaGroup;
    };

    const peda1 = createPeda(1.6, -0.9, 0.6);
    const peda2 = createPeda(1.8, -0.9, -0.3);
    sweetsGroup.add(peda1, peda2);

    // D. Shahi Gulab Jamun (Dark glossy spheres with warm syrup shine)
    const createGulabJamun = (x: number, y: number, z: number) => {
      const jamunGeo = new THREE.SphereGeometry(0.42, 32, 32);
      const jamunMat = new THREE.MeshStandardMaterial({
        color: 0x3d170a,
        roughness: 0.18,
        metalness: 0.1,
      });
      const jamun = new THREE.Mesh(jamunGeo, jamunMat);
      jamun.position.set(x, y, z);
      jamun.castShadow = true;
      jamun.userData = {
        name: "Shahi Gulab Jamun",
        desc: "Golden fried mawa dumplings steeped in aromatic rose and cardamom sugar syrup.",
        tags: ["Juicy", "Rose Water", "Festive Favorite"],
        productId: "gulab-jamun-shahi",
      };
      return jamun;
    };

    const jamun1 = createGulabJamun(0.3, -0.75, -1.2);
    const jamun2 = createGulabJamun(-0.7, -0.78, -1.1);
    sweetsGroup.add(jamun1, jamun2);

    // 5. Ambient Gold & Saffron Particle Field (Sparkles)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = Math.random() * 6 - 1;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      // Gold and saffron colored particles
      if (Math.random() > 0.5) {
        colors[i] = 0.95;
        colors[i + 1] = 0.78;
        colors[i + 2] = 0.25;
      } else {
        colors[i] = 0.9;
        colors[i + 1] = 0.4;
        colors[i + 2] = 0.1;
      }
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. User Interaction / Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sweetsGroup.children, true);

      if (intersects.length > 0) {
        let hitObj: THREE.Object3D | null = intersects[0].object;
        while (hitObj && !hitObj.userData?.name && hitObj.parent !== sweetsGroup) {
          hitObj = hitObj.parent;
        }

        if (hitObj?.userData?.name) {
          setSelectedSweet({
            name: hitObj.userData.name,
            desc: hitObj.userData.desc,
            tags: hitObj.userData.tags || [],
            productId: hitObj.userData.productId || "kaju-katli-royal",
          });
        }
      }
    };

    renderer.domElement.addEventListener("click", handlePointerDown);

    // Mouse drag for rotation
    let isDragging = false;
    let prevMouseX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      platterGroup.rotation.y += deltaX * 0.008;
      prevMouseX = e.clientX;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Lighting updates
    const applyLighting = (mode: "diya" | "studio" | "sunset") => {
      if (mode === "diya") {
        mainLight.color.setHex(0xffeedd);
        mainLight.intensity = 1.8;
        diyaLight.intensity = 3.5;
        diyaLight.color.setHex(0xff7711);
        ambientLight.intensity = 0.8;
      } else if (mode === "studio") {
        mainLight.color.setHex(0xffffff);
        mainLight.intensity = 2.6;
        diyaLight.intensity = 1.2;
        diyaLight.color.setHex(0xffe0b2);
        ambientLight.intensity = 1.2;
      } else if (mode === "sunset") {
        mainLight.color.setHex(0xff8c42);
        mainLight.intensity = 2.0;
        diyaLight.intensity = 2.8;
        diyaLight.color.setHex(0xff5500);
        ambientLight.intensity = 0.9;
      }
    };

    applyLighting(activeLighting);

    // 7. Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        platterGroup.rotation.y += 0.0035;
      }

      // Gentle floating levitation
      sweetsGroup.position.y = Math.sin(elapsed * 1.5) * 0.06;

      // Diya flicker effect
      if (activeLighting === "diya") {
        diyaLight.intensity = 3.2 + Math.sin(elapsed * 8) * 0.35 + Math.cos(elapsed * 13) * 0.15;
      }

      // Particle floating
      particles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("click", handlePointerDown);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating, activeLighting]);

  const handleAddInspectedSweet = () => {
    if (!selectedSweet) return;
    const product = PRODUCTS.find(p => p.id === selectedSweet.productId) || PRODUCTS[0];
    addToCart(product, "500g", 1);
  };

  return (
    <div className="relative w-full h-[520px] md:h-[640px] rounded-3xl overflow-hidden shadow-luxury border border-gold-400/20 bg-gradient-to-b from-[#1C1614] via-[#2A1E1A] to-[#120F0E]">
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {!isWebGLEnabled && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white bg-black/80">
          <p className="text-xs text-gold-300">WebGL accelerated rendering is not supported on this device. Displaying optimized view.</p>
        </div>
      )}

      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-[#120F0E]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold-400/30 text-xs text-gold-200">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
          <span>Interactive 3D Stage • Drag to Orbit</span>
        </div>

        {/* Lighting Selector */}
        <div className="pointer-events-auto flex items-center bg-[#120F0E]/85 backdrop-blur-md p-1 rounded-full border border-gold-400/30 gap-1">
          <button
            onClick={() => setActiveLighting("diya")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeLighting === "diya"
                ? "bg-saffron-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-gold-200"
            }`}
            title="Royal Diya Glow"
          >
            <Flame className="w-3 h-3 text-gold-400" />
            <span className="hidden sm:inline">Diya Glow</span>
          </button>
          <button
            onClick={() => setActiveLighting("studio")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeLighting === "studio"
                ? "bg-gold-500 text-black font-medium shadow-sm"
                : "text-zinc-400 hover:text-gold-200"
            }`}
            title="Studio Lighting"
          >
            <Sun className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">Studio</span>
          </button>
          <button
            onClick={() => setActiveLighting("sunset")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
              activeLighting === "sunset"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-gold-200"
            }`}
            title="Golden Sunset"
          >
            <Moon className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">Sunset</span>
          </button>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-full transition-all ${
              isRotating ? "text-gold-300" : "text-zinc-500"
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sweet Inspector Interactive Card Overlay */}
      {selectedSweet && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-[#161211]/90 backdrop-blur-xl border border-gold-400/40 p-4 rounded-2xl shadow-2xl transition-all duration-300 animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-300">
                  Inspected Mithai
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                {selectedSweet.name}
              </h4>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                {selectedSweet.desc}
              </p>
            </div>
            <button
              onClick={handleAddInspectedSweet}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add (500g)</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/10">
            {selectedSweet.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-white/5 border border-gold-400/20 text-gold-200 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
            <span className="text-[10px] text-zinc-400 ml-auto flex items-center gap-1">
              <Eye className="w-3 h-3 text-gold-400" />
              <span>Click sweet to inspect</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
