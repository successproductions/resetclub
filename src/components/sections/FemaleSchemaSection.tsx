import Image from 'next/image';

const FemaleSchemaSection = () => {
  return (
    <section className="bg-white py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl md:h-[72vh] md:max-h-[780px] md:min-h-[600px]">
        <Image
          src="/images/SHEMA_FEMME.jpeg"
          alt="Schema des trois piliers Reset Club autour du corps feminin"
          width={2141}
          height={1536}
          className="h-auto w-full md:h-full md:object-contain"
          sizes="(max-width: 768px) 100vw, 1152px"
        />
      </div>
    </section>
  );
};

export default FemaleSchemaSection;
