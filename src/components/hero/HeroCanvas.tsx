import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Constellation Geometry
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    // Architectural color palette: Starlight White, Silver Zinc, and Subtle Precision Blue
    const whiteStar = new THREE.Color(0xffffff);
    const silverStar = new THREE.Color(0xd4d4d8);
    const cobaltStar = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread across a 3D sphere/disc volume
      const radius = 35 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi);
      const z = radius * Math.sin(theta) * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Color distribution: 65% crisp silver/white, 35% deep cobalt blue
      const mixRatio = Math.random();
      const tempColor = new THREE.Color();
      if (mixRatio < 0.65) {
        tempColor.copy(silverStar).lerp(whiteStar, mixRatio / 0.65);
      } else {
        tempColor.copy(silverStar).lerp(cobaltStar, (mixRatio - 0.65) / 0.35);
      }

      colors[i3] = tempColor.r;
      colors[i3 + 1] = tempColor.g;
      colors[i3 + 2] = tempColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material with circular soft point texture
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.35, 'rgba(212,212,216,0.65)');
      gradient.addColorStop(0.7, 'rgba(59,130,246,0.2)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvasTexture);

    const material = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic Architectural Line Connections
    const lineMeshCount = 100;
    const linePositions = new Float32Array(lineMeshCount * 6);
    const lineColors = new Float32Array(lineMeshCount * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 30;
      targetMouseY = -y * 30;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (!prefersReduced) {
        // Subtle global rotation
        particles.rotation.y = elapsedTime * 0.04 + mouseX * 0.01;
        particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.06 + mouseY * 0.01;
        linesMesh.rotation.y = particles.rotation.y;
        linesMesh.rotation.x = particles.rotation.x;

        // Wave deformation of points
        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const origX = originalPositions[i3];
          const origY = originalPositions[i3 + 1];
          const origZ = originalPositions[i3 + 2];

          // Gentle displacement
          posArray[i3 + 1] = origY + Math.sin(elapsedTime * 1.2 + origX * 0.05) * 1.5;
          posArray[i3] = origX + Math.cos(elapsedTime * 1.0 + origZ * 0.05) * 1.0;
        }
        posAttr.needsUpdate = true;

        // Connect a subset of nearest points
        let lineIdx = 0;
        const linePos = lineGeometry.attributes.position.array as Float32Array;
        const lineCol = lineGeometry.attributes.color.array as Float32Array;

        for (let i = 0; i < 60 && lineIdx < lineMeshCount; i++) {
          const p1Idx = (i * 7) % particleCount;
          const p2Idx = ((i * 7) + 5) % particleCount;

          const x1 = posArray[p1Idx * 3];
          const y1 = posArray[p1Idx * 3 + 1];
          const z1 = posArray[p1Idx * 3 + 2];

          const x2 = posArray[p2Idx * 3];
          const y2 = posArray[p2Idx * 3 + 1];
          const z2 = posArray[p2Idx * 3 + 2];

          const distSq = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
          if (distSq < 1100) {
            const ptr = lineIdx * 6;
            linePos[ptr] = x1;
            linePos[ptr + 1] = y1;
            linePos[ptr + 2] = z1;
            linePos[ptr + 3] = x2;
            linePos[ptr + 4] = y2;
            linePos[ptr + 5] = z2;

            lineCol[ptr] = 0.45;
            lineCol[ptr + 1] = 0.55;
            lineCol[ptr + 2] = 0.75;
            lineCol[ptr + 3] = 0.35;
            lineCol[ptr + 4] = 0.45;
            lineCol[ptr + 5] = 0.65;

            lineIdx++;
          }
        }
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;
      }

      camera.position.x = mouseX * 0.15;
      camera.position.y = mouseY * 0.15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-60 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
