import Image from 'next/image';
import Marquee from "@/components/Marquee";

const brands = [
  { name: "Apple", src: "/images/svg/apple.svg" },
  { name: "Asus", src: "/images/svg/asus.svg" },
  { name: "Google", src: "/images/svg/google.svg" },
  { name: "Realme", src: "/images/svg/realme.svg" },
  { name: "Vivo", src: "/images/svg/vivo.svg" },
  { name: "Oneplus", src: "/images/svg/oneplus.svg" },
  { name: "Samsung", src: "/images/svg/samsung.svg" },
  { name: "Xiaomi", src: "/images/svg/xiaomi.svg" },
  { name: "Huawei", src: "/images/svg/huawei.svg" },
];

const Brand = ({ src, name }: { src: string; name: string }) => {
  return (
    <div
      className="flex w-24 items-center justify-center py-2 md:w-28 md:py-4"
      title={name}
    >
      <Image 
        src={src} 
        alt={`${name} logo`} 
        width={100}
        height={62}
        className="h-6 w-auto opacity-70 transition-opacity hover:opacity-100 md:h-8" 
      />
    </div>
  );
};

export const Brands = () => {
  return (
    <div className="relative">
      <div className="text-center text-sm font-semibold text-muted-foreground mb-2">WORKS WITH YOUR FAVORITE BRANDS</div>
      <Marquee pauseOnHover>
        {brands.map((brand) => (
          <Brand key={brand.name} {...brand} />
        ))}
      </Marquee>
    </div>
  );
};
