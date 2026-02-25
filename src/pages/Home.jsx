import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

function Home() {

    const mountRef = useRef(null);
    const navigate = useNavigate();

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

            <div className="absolute inset-[10%] bg-white rounded-2xl shadow-2xl overflow-auto">

                {/* Navbar */}
                <div className="mx-[5%] mt-[3%] mb-[2%] bg-emerald-600 rounded-xl shadow-lg p-4 flex items-center">
                    <h1 className="text-xl font-bold text-white">Subtitle Adder</h1>

                    <ul className="flex gap-8 font-medium text-white absolute left-1/2 -translate-x-1/2">
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">Features</li>
                        <li className="cursor-pointer">Contact</li>
                    </ul>

                    <div className="ml-auto flex gap-3">
                        <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium">
                            Sign In
                        </button>
                        <button className="bg-black text-white px-4 py-2 rounded-lg font-semibold">
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Content 1 */}
                <div className="mx-[5%] mb-[5%] gap-6">
                    <div className="col-span-2 rounded-xl p-6 flex gap-20">
                        <img
                            src="hero.webp"
                            alt="Subtitle Generator Preview"
                            style={{ width: "40%", height: "auto" }}
                            className="object-cover rounded-xl shadow"
                        />

                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl font-bold">
                                Add Subtitles to Video Easily
                            </h1>

                            <p className="text-gray-700 text-md mt-3">
                                Effortlessly add subtitles to your videos with our AI-powered tool.
                                Automatically generate accurate captions while preserving video
                                quality — fast, simple, and highly effective.
                            </p>

                            <button onClick={() => navigate("/dashboard")} className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg w-fit">
                                Upload Video
                            </button>

                            <img
                                src="hero_img2.jpg"
                                alt="Auto Subtitle Example"
                                style={{ width: "70%", height: "auto" }}
                                className="object-cover rounded-xl shadow"
                            />
                        </div>
                    </div>
                </div>

                {/* Content 2 */}
                <div className="mx-[5%] mb-[5%] gap-6">
                    <div className="col-span-2 rounded-xl p-6 flex gap-20">
                        <img
                            src="hero.webp"
                            alt="Subtitle Editing Interface"
                            style={{ width: "40%", height: "auto" }}
                            className="object-cover rounded-xl shadow"
                        />

                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl font-bold">
                                Customize and Export Captions
                            </h1>

                            <p className="text-gray-700 text-md mt-3">
                                Edit subtitle timing, adjust styles, change fonts, and export
                                captions in multiple formats. Perfect for YouTube, Instagram,
                                online courses, and professional video production.
                            </p>

                            <button className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg w-fit">
                                Generate Subtitles
                            </button>

                            <img
                                src="hero_img2.jpg"
                                alt="Subtitle Export Example"
                                style={{ width: "70%", height: "auto" }}
                                className="object-cover rounded-xl shadow"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;