import { Github } from "@/img/img";

export default function Footer() {
  return (
    <div className="w-full flex justify-end items-center  mt-10 ">
      <a href="https://github.com/jitendraSingh23" target="_blank" className="px-5 py-1">
        <div className="bg-black h-10 w-10 pr-0.5 rounded-full left-3 bottom-3 flex justify-center items-center cursor-pointer hover:scale-105 transition-transform">
          <Github />
        </div>
      </a>
    </div>
  );
}
