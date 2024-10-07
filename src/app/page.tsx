import Image from "next/image";
import ParticleCanvas from "@/app/background";
import { Instagram } from "lucide-react"
import Link from "next/link";

export default function Home() {
  return (
    <>
        <div className={"w-full h-screen bg-pink flex flex-col items-center justify-start"}>
            <Image
                className={"ml-6"}
                src={"/assets/img/CQFinalLogo.svg"} alt={"CQ Logo"} width={250} height={250}/>
            <div className={"relative"}>
                <h2 className={"font-brookshire text-8xl text-darkbrown text-center"}>Code<br/>Quantum
                </h2>
                <h2 className={"font-brookshire text-8xl text-green1 text-center z-[5] -translate-y-[195px] -translate-x-[3px]"}>Code<br/>Quantum
                </h2>
            </div>
            <div className={"relative mt-[-180px]"}>
                <h2 className={"font-brookshire text-6xl text-white text-center"}>Down the
                    Rabbit Hole</h2>
                <h2 className={"font-brookshire text-6xl text-lightbrown text-center z-[5] -translate-y-[123px] -translate-x-[3px] md:-translate-y-[63px] lg:-translate-y-[63px]"}>Down
                    the Rabbit Hole</h2>
            </div>
            <div className={"relative mt-[-100px] md:mt-[-40px] lg:mt-[-30px]"}>
                <h2 className={"font-brookshire text-4xl text-white text-center"}>Coming Soon!</h2>
                <h2 className={"font-brookshire text-4xl text-lightbrown text-center z-[5] -translate-y-[42.5px] -translate-x-[2px]"}>Coming Soon!</h2>
            </div>
            <div className={"relative mt-[-40px]"}>
                <h2 className={"font-brookshire text-4xl text-white text-center"}>March 22-23 2025</h2>
                <h2 className={"font-brookshire text-4xl text-lightbrown text-center z-[5] -translate-y-[42.5px] -translate-x-[2px]"}>March 22-23 2025</h2>
            </div>
            <Link href={"https://www.instagram.com/cqhacks/"} className={"flex flex-row bg-white stroke-black text-black rounded-md p-1 px-1.5 z-20 mt-[-40px]"}>
                <Instagram/>
                <div className={"ml-2"}>@cqhacks</div>
            </Link>
            <ParticleCanvas/>
        </div>
    </>
  );
}
