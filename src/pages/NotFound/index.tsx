import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconHome, IconArrowRight, IconVolume, IconVolumeOff } from '@tabler/icons-react';

// Import audio files
import doSound from '../../assets/audios/do.wav';
import miSound from '../../assets/audios/mi.wav';
import solSound from '../../assets/audios/sol.wav';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    intensity: number;
    randomDuration: number;
}

// Define colors outside component to avoid dependency warnings
const PARTICLE_COLORS = [
    'rgba(58, 139, 255, 0.6)',   // Azul
    'rgba(0, 217, 255, 0.6)',    // Azul cyan
    'rgba(135, 206, 250, 0.6)',  // Azul cielo
    'rgba(147, 112, 219, 0.6)',  // Morado
];

const NotFound = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isMuted, setIsMuted] = useState(false);
    const [clickedDigit, setClickedDigit] = useState<number | null>(null);

    // Audio elements for each digit
    const doAudioRef = useRef<HTMLAudioElement | null>(null);
    const miAudioRef = useRef<HTMLAudioElement | null>(null);
    const solAudioRef = useRef<HTMLAudioElement | null>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);



    useEffect(() => {
        // Initialize audio elements
        doAudioRef.current = new Audio(doSound);
        miAudioRef.current = new Audio(miSound);
        solAudioRef.current = new Audio(solSound);

        // Initialize particles
        const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            intensity: Math.random() * 0.3 + 0.2,
            randomDuration: 3 + Math.random() * 2,
        }));
        setParticles(initialParticles);

        // Animate particles continuously
        const animate = () => {
            setParticles(prev => prev.map(particle => {
                let newX = particle.x + particle.vx;
                let newY = particle.y + particle.vy;
                let newVx = particle.vx;
                let newVy = particle.vy;

                // Bounce off walls
                if (newX <= 0 || newX >= 100) {
                    newVx = -particle.vx;
                    newX = Math.max(0, Math.min(100, newX));
                }
                if (newY <= 0 || newY >= 100) {
                    newVy = -particle.vy;
                    newY = Math.max(0, Math.min(100, newY));
                }

                return {
                    ...particle,
                    x: newX,
                    y: newY,
                    vx: newVx,
                    vy: newVy,
                };
            }));

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const playDigitSound = (digit: number) => {
        if (isMuted) return;

        setClickedDigit(digit);
        setTimeout(() => setClickedDigit(null), 300);

        let audio: HTMLAudioElement | null = null;

        if (digit === 0) {
            audio = doAudioRef.current; // Primer 4 -> Do
        } else if (digit === 1) {
            audio = miAudioRef.current; // 0 -> Mi
        } else if (digit === 2) {
            audio = solAudioRef.current; // Último 4 -> Sol
        }

        if (audio) {
            // eslint-disable-next-line react-hooks/immutability
            audio.currentTime = 0;
            // eslint-disable-next-line react-hooks/immutability
            audio.volume = 0.5;
            audio.play();

            // Subtle particle reaction - gentle bounce and brightness
            setParticles(prev => prev.map(particle => ({
                ...particle,
                vy: particle.vy - 0.3, // Small upward bounce
                intensity: 0.8, // Increase brightness temporarily
            })));

            // Reset intensity after a short time
            setTimeout(() => {
                setParticles(prev => prev.map(particle => ({
                    ...particle,
                    intensity: Math.random() * 0.3 + 0.2,
                })));
            }, 200);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="min-h-screen bg-background-500 text-white font-sans flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-cyan-500 rounded-full blur-[150px]" />
            </div>

            {/* Floating Particles */}
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 ${8 + particle.intensity * 15}px ${particle.color}`,
                            opacity: 0.5 + particle.intensity * 0.3,
                        }}
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1 + particle.intensity * 0.2, 1],
                        }}
                        transition={{
                            y: {
                                duration: particle.randomDuration,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                            scale: {
                                duration: 0.3,
                            },
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Music Controls */}
            <motion.div
                className="absolute top-8 right-8 flex gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <motion.button
                    onClick={toggleMute}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-background-400/50 hover:bg-background-400 backdrop-blur-md text-white p-4 rounded-full transition-all border border-white/10"
                >
                    {isMuted ? <IconVolumeOff size={24} /> : <IconVolume size={24} />}
                </motion.button>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center items-center gap-4 mb-8"
                >
                    {/* Clickable 404 */}
                    {['4', '0', '4'].map((digit, index) => (
                        <motion.button
                            key={index}
                            onClick={() => playDigitSound(index)}
                            whileHover={{ scale: 1.1, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                textShadow: clickedDigit === index
                                    ? '0 0 50px rgba(255, 255, 255, 1)'
                                    : '0 0 30px rgba(255, 255, 255, 0.3)',
                                scale: clickedDigit === index ? 1.15 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className="text-[10rem] md:text-[14rem] font-bold leading-none font-display text-white cursor-pointer select-none"
                        >
                            {digit}
                        </motion.button>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-neutral-5 text-lg mb-8">
                        Click on the numbers to play musical notes!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-[0_0_30px_rgba(58,139,255,0.4)] hover:scale-105"
                    >
                        <IconHome size={20} />
                        Back to Home
                        <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
