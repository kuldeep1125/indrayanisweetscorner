"use client";

// [ADDED] Interactive 3D Luxury Sweet Box Visualizer
// Renders a partitioned Indian mithai gift box with animated lid and real-time populating sweets
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ProductItem } from "@/data/products";
import { Sparkles, Box, RotateCw, Lock, Unlock } from "lucide-react";

interface SweetBox3DProps {
  size: 4 | 6 | 9;
  selectedSweets: { product: ProductItem; count: number }[];
}

export default function SweetBox3DCanvas({ size, selectedSweets }: SweetBox3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLidOpen, setIsLidOpen] = useState(true);
  const [isRotating, setIsRotating] = useState(true);

  // References to animate lid dynamically
  const lidGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    dirLight.position.set(5, 8, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const goldPoint = new THREE.PointLight(0xd4af37, 1.5, 8);
    goldPoint.position.set(-2, 2, 2);
    scene.add(goldPoint);

    // Box Root
    const boxRoot = new THREE.Group();
    scene.add(boxRoot);

    // Box Dimensions based on size
    const boxW = size === 4 ? 2.6 : size === 6 ? 3.4 : 3.4;
    const boxD = size === 4 ? 2.6 : size === 6 ? 2.4 : 3.4;
    const boxH = 0.7;

    // Outer Box Body (Royal Maroon Velvet)
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x681622,
      roughness: 0.4,
      metalness: 0.15,
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
    });

    const bodyGeo = new THREE.BoxGeometry(boxW, boxH, boxD);
    const bodyMesh = new THREE.Mesh(bodyGeo, boxMat);
    bodyMesh.position.y = -boxH / 2;
    bodyMesh.receiveShadow = true;
    boxRoot.add(bodyMesh);

    // Gold Trim Borders on Box Edges
    const trimTop = new THREE.BoxGeometry(boxW + 0.05, 0.08, boxD + 0.05);
    const trimMesh = new THREE.Mesh(trimTop, goldTrimMat);
    trimMesh.position.y = -0.04;
    boxRoot.add(trimMesh);

    // Inner Compartment Slots & Partitions
    const cols = size === 4 ? 2 : size === 6 ? 3 : 3;
    const rows = size === 4 ? 2 : size === 6 ? 2 : 3;
    const colStep = (boxW - 0.4) / cols;
    const rowStep = (boxD - 0.4) / rows;

    const sweetsGroup = new THREE.Group();
    boxRoot.add(sweetsGroup);

    // Flatten sweets list
    const itemsToPlace: ProductItem[] = [];
    selectedSweets.forEach(entry => {
      for (let i = 0; i < entry.count; i++) {
        itemsToPlace.push(entry.product);
      }
    });

    let currentSlot = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const slotX = (c - (cols - 1) / 2) * colStep;
        const slotZ = (r - (rows - 1) / 2) * rowStep;

        // Paper Liner Cup
        const cupGeo = new THREE.CylinderGeometry(colStep * 0.4, colStep * 0.35, 0.2, 16);
        const cupMat = new THREE.MeshStandardMaterial({
          color: 0xfcf8ee,
          roughness: 0.5,
        });
        const cup = new THREE.Mesh(cupGeo, cupMat);
        cup.position.set(slotX, -0.15, slotZ);
        sweetsGroup.add(cup);

        // Put sweet if selected
        if (currentSlot < itemsToPlace.length) {
          const product = itemsToPlace[currentSlot];
          if (product.modelType === "kaju_katli") {
            const shape = new THREE.Shape();
            const w = 0.32;
            const h = 0.44;
            shape.moveTo(0, h / 2);
            shape.lineTo(w / 2, 0);
            shape.lineTo(0, -h / 2);
            shape.lineTo(-w / 2, 0);
            shape.closePath();

            const geo = new THREE.ExtrudeGeometry(shape, {
              depth: 0.1,
              bevelEnabled: true,
              bevelSize: 0.02,
              bevelThickness: 0.02,
            });
            geo.center();
            const mat = new THREE.MeshStandardMaterial({
              color: 0xf5f5f7,
              metalness: 0.8,
              roughness: 0.2,
            });
            const sweet = new THREE.Mesh(geo, mat);
            sweet.position.set(slotX, 0.04, slotZ);
            sweet.rotation.x = -Math.PI / 2;
            sweetsGroup.add(sweet);
          } else if (product.modelType === "motichoor") {
            const geo = new THREE.SphereGeometry(colStep * 0.35, 16, 16);
            const mat = new THREE.MeshStandardMaterial({
              color: 0xeb7d1e,
              roughness: 0.5,
              metalness: 0.1,
            });
            const sweet = new THREE.Mesh(geo, mat);
            sweet.position.set(slotX, 0.08, slotZ);
            sweetsGroup.add(sweet);
          } else if (product.modelType === "peda") {
            const geo = new THREE.CylinderGeometry(colStep * 0.32, colStep * 0.34, 0.16, 20);
            const mat = new THREE.MeshStandardMaterial({
              color: 0xedd6ad,
              roughness: 0.6,
            });
            const sweet = new THREE.Mesh(geo, mat);
            sweet.position.set(slotX, 0.04, slotZ);
            sweetsGroup.add(sweet);
          } else {
            // Gulab Jamun / Barfi
            const geo = new THREE.SphereGeometry(colStep * 0.32, 16, 16);
            const mat = new THREE.MeshStandardMaterial({
              color: 0x3d170a,
              roughness: 0.2,
            });
            const sweet = new THREE.Mesh(geo, mat);
            sweet.position.set(slotX, 0.06, slotZ);
            sweetsGroup.add(sweet);
          }
        }
        currentSlot++;
      }
    }

    // Box Lid (with Gold Embossed Emblem & Hinged Opening)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.02, -boxD / 2); // Hinged at back
    boxRoot.add(lidGroup);
    lidGroupRef.current = lidGroup;

    const lidMeshGeo = new THREE.BoxGeometry(boxW + 0.08, 0.1, boxD + 0.08);
    const lidMesh = new THREE.Mesh(lidMeshGeo, boxMat);
    lidMesh.position.set(0, 0.05, boxD / 2);
    lidGroup.add(lidMesh);

    // Gold filigree crest on lid
    const crestGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.04, 24);
    const crestMesh = new THREE.Mesh(crestGeo, goldTrimMat);
    crestMesh.position.set(0, 0.12, boxD / 2);
    lidGroup.add(crestMesh);

    // Set initial lid rotation
    lidGroup.rotation.x = isLidOpen ? -Math.PI * 0.55 : 0;

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isRotating) {
        boxRoot.rotation.y = Math.sin(elapsed * 0.4) * 0.45;
      }

      // Smooth lid transition
      if (lidGroupRef.current) {
        const targetRot = isLidOpen ? -Math.PI * 0.6 : 0;
        lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          lidGroupRef.current.rotation.x,
          targetRot,
          0.08
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size, selectedSweets, isLidOpen, isRotating]);

  return (
    <div className="relative w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden border border-gold-400/30 bg-gradient-to-b from-[#1E1715] via-[#2A1E1B] to-[#14100E] shadow-2xl">
      <div ref={containerRef} className="w-full h-full" />

      {/* Control Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gold-400/20 text-xs text-gold-300">
          <Box className="w-3.5 h-3.5 text-gold-400" />
          <span>{size} Compartment Box • 3D Real-time Model</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsLidOpen(!isLidOpen)}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gold-400/20 hover:bg-gold-400/30 text-gold-200 border border-gold-400/40 backdrop-blur-md transition-all"
          >
            {isLidOpen ? (
              <>
                <Lock className="w-3 h-3 text-gold-400" />
                <span>Close Lid</span>
              </>
            ) : (
              <>
                <Unlock className="w-3 h-3 text-gold-400" />
                <span>Open Lid</span>
              </>
            )}
          </button>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-1.5 rounded-full bg-black/60 border border-gold-400/20 text-gold-300 hover:text-white backdrop-blur-md"
            title="Toggle Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 text-[11px] text-zinc-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-saffron-400" />
        <span>Sweets dynamically update as you customize</span>
      </div>
    </div>
  );
}
