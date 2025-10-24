'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Sphere Geometry
    const geometry = new THREE.SphereGeometry(1.5, 64, 64);

    // Create gradient-like material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorStart: { value: new THREE.Color(0x1e1b4b) }, // blue-950
        colorMid: { value: new THREE.Color(0x581c87) }, // purple-950
        colorEnd: { value: new THREE.Color(0x831843) }, // pink-950
        rimColor: { value: new THREE.Color(0xa855f7) }, // purple-500
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 colorStart;
        uniform vec3 colorMid;
        uniform vec3 colorEnd;
        uniform vec3 rimColor;

        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          // Calculate rim lighting
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float rimIntensity = pow(1.0 - dot(viewDirection, vNormal), 3.0);

          // Gradient based on position
          float gradientFactor = (vPosition.y + 1.5) / 3.0;
          vec3 gradient = mix(colorStart, colorMid, gradientFactor);
          gradient = mix(gradient, colorEnd, gradientFactor * 0.5);

          // Add subtle color bands
          float band1 = smoothstep(0.3, 0.4, vPosition.y) * (1.0 - smoothstep(0.4, 0.5, vPosition.y));
          float band2 = smoothstep(-0.1, 0.0, vPosition.y) * (1.0 - smoothstep(0.0, 0.1, vPosition.y));
          float band3 = smoothstep(-0.5, -0.4, vPosition.y) * (1.0 - smoothstep(-0.4, -0.3, vPosition.y));

          vec3 purpleBand = vec3(0.65, 0.33, 0.97) * band1 * 0.3;
          vec3 pinkBand = vec3(0.93, 0.28, 0.59) * band2 * 0.25;
          vec3 orangeBand = vec3(0.98, 0.57, 0.24) * band3 * 0.3;

          // Combine everything
          vec3 color = gradient + purpleBand + pinkBand + orangeBand;

          // Add rim lighting
          color = mix(color, rimColor, rimIntensity * 0.4);

          // Add highlight
          float highlight = pow(max(dot(vNormal, vec3(0.5, 0.5, 1.0)), 0.0), 4.0);
          color += vec3(1.0) * highlight * 0.15;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Point light for rim effect
    const pointLight = new THREE.PointLight(0xa855f7, 1, 100);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Animation
    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      time += 0.001;

      // Very subtle rotation
      sphere.rotation.y += 0.001;
      sphere.rotation.x += 0.0005;

      // Update shader time for any time-based effects
      material.uniforms.time.value = time;

      // Subtle breathing scale
      const breathe = 1 + Math.sin(time * 0.5) * 0.02;
      sphere.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ opacity: 0.5 }}
    />
  );
}
