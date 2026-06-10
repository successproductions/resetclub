import Image from 'next/image';

const FemaleSchemaSection = () => {
  return (
    <section className="bg-white py-8 md:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">
        <Image
          src="/images/SHEMA_FEMME.jpeg"
          alt="Schema des trois piliers Reset Club autour du corps feminin"
          width={2141}
          height={1936}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 1152px"
        />
      </div>
    </section>
  );
};

export default FemaleSchemaSection;
