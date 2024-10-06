"use client"
import React, { useEffect, useRef } from 'react';
import './ParticleCanvas.css'; // Import your CSS file

class Particle {
    parent: ParticleSystem;
    id: string;
    position = { x: 0, y: 0 };
    diameter = 0;
    life = 0;
    speed = { x: 0, y: 0 };
    color: string;

    constructor(id: string, parent: ParticleSystem) {
        this.parent = parent;
        this.id = id;
        this.color = "#B8860B"; // Assign a random color
        this.init();
    }

    init() {
        const interval = setInterval(() => {
            this.position.x += (this.speed.x * 60) / 1000;
            this.position.y -= (this.speed.y * 60) / 1000;
            this.life -= 1 / 60;

            if (this.life <= 0) {
                clearInterval(interval);
                this.parent.particles.delete(this.id);
            }
        }, 1000 / 60);
    }
}

class ParticleSystem {
    canvas: HTMLCanvasElement;
    size: { x: number; y: number };
    lastId = 0;
    ammount = 0;
    particles = new Map<string, Particle>();
    diameter = { min: 0, max: 0 };
    life = { min: 0, max: 0 };
    speed = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    particleCreationInterval: NodeJS.Timeout | null = null;
    renderInterval: NodeJS.Timeout | null = null;

    constructor(canvas: HTMLCanvasElement, size: { x: number; y: number }) {
        this.canvas = canvas;
        this.size = size;
        canvas.width = size.x;
        canvas.height = size.y;
    }

    static getRandomNumberInInterval(interval: { min: number; max: number }) {
        const min = Math.ceil(interval.min);
        const max = Math.floor(interval.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createParticle() {
        const particle = new Particle(this.lastId.toString(), this);
        particle.position.x = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.x });
        particle.position.y = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.y });
        particle.diameter = ParticleSystem.getRandomNumberInInterval(this.diameter);
        particle.life = ParticleSystem.getRandomNumberInInterval(this.life);
        particle.speed.x = ParticleSystem.getRandomNumberInInterval(this.speed.x);
        particle.speed.y = ParticleSystem.getRandomNumberInInterval(this.speed.y);
        this.particles.set(this.lastId.toString(), particle);
        this.lastId++;
    }

    init() {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;

        this.particles.clear();
        for (let i = 0; i < this.ammount; i++) {
            this.createParticle();
        }

        // Clear previous intervals
        if (this.particleCreationInterval) {
            clearInterval(this.particleCreationInterval);
        }
        if (this.renderInterval) {
            clearInterval(this.renderInterval);
        }

        // Particle creation interval
        this.particleCreationInterval = setInterval(() => {
            if (this.particles.size <= this.ammount) this.createParticle();
        }, 1000 / 60);

        // Rendering interval
        this.renderInterval = setInterval(() => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.position.x, particle.position.y, particle.diameter / 2, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fillStyle = particle.color; // Use the particle's color
                ctx.fill();
            });
        }, 1000 / 60);
    }

    // Clear intervals when the particle system is destroyed
    clearIntervals() {
        if (this.particleCreationInterval) {
            clearInterval(this.particleCreationInterval);
            this.particleCreationInterval = null;
        }
        if (this.renderInterval) {
            clearInterval(this.renderInterval);
            this.renderInterval = null;
        }
    }
}

const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const systemRef = useRef<ParticleSystem | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const system = new ParticleSystem(canvas, { x: window.innerWidth, y: window.innerHeight });
            system.ammount = 150;
            system.diameter = { min: 3, max: 5 };
            system.life = { min: 15, max: 20 };
            system.speed = { x: { min: -10, max: 10 }, y: { min: -10, max: 10 } };
            system.init();
            systemRef.current = system;
        }

        const handleResize = () => {
            if (systemRef.current) {
                systemRef.current.size = { x: window.innerWidth, y: window.innerHeight };
                systemRef.current.init();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            if (systemRef.current) {
                systemRef.current.clearIntervals(); // Clear intervals on unmount
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div id="container">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default ParticleCanvas;
