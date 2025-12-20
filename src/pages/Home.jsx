import { useEffect, useRef } from "react";
import * as THREE from "three";

function Home() {

  const mountRef = useRef(null);

  useEffect(() => {
  const mount = mountRef.current;
  if (!mount) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const particlesCount = 2000;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

  const material = new THREE.PointsMaterial({
    size: 0.02,
    color: "#4ade80"
  });

  const particlesMesh = new THREE.Points(geometry, material);
  scene.add(particlesMesh);

  camera.position.z = 3;

  let animationId;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    renderer.render(scene, camera);
  };

  animate();

  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", handleResize);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", handleResize);

    // SAFE REMOVE
    if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
      mount.removeChild(renderer.domElement);
    }

    renderer.dispose();
  };
}, []);


  return (
    <div className="min-h-screen relative">

      {/* Three.js Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 -z-10"
      ></div>

      {/* ====== YOUR SAME UI ====== */}
      <div className="absolute inset-[10%] bg-white rounded-2xl shadow-2xl overflow-auto">

        {/* Navbar */}
        <div className="mx-[5%] mt-[3%] mb-[2%] bg-emerald-600 rounded-xl shadow-lg p-4 flex items-center">
          <h1 className="text-xl font-bold text-white">Subtitle Remover</h1>

          <ul className="flex gap-8 font-medium text-white absolute left-1/2 -translate-x-1/2">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Features</li>
            <li className="cursor-pointer">Contact</li>
          </ul>

          <div className="ml-auto flex gap-3">
            <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium">
              Sign In
            </button>
            <button className="bg-yellow-400 text-emerald-900 px-4 py-2 rounded-lg font-semibold">
              Sign Up
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mx-[5%] mb-[5%] gap-6">
          <div className="col-span-2 bg-gray-100 rounded-xl p-6 flex items-center gap-20">
            <img
              src="hero.webp"
              alt="Sample"
              style={{ width: "40%", height: "auto" }}
              className="object-cover rounded-xl shadow"
            />

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold">Remove Subtitles from Video Easily</h2>
              <p className="text-gray-700">
                Effortlessly remove subtitles from video with our AI-powered tool. It erases captions while preserving video quality — fast, simple, and highly effective.
              </p>

              <button className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg w-fit">
                Upload
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
