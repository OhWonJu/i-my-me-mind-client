import Container from "@/components/Container";

import DonateButton from "../_components/DonateButton";

const DonationSection = () => {
  return (
    <section className="flex h-[60vh] items-center">
      <Container className="flex flex-col w-full justify-center">
        <div className="relative md:mx-[15%]">
          <h3 className="text-clamp-md font-bold">
            I MY ME MIND를 통해
            <br />
            일상 속 작은 도움이 되어드리고 싶어요.
          </h3>
          <p className="text-clamp-xs text-secondary-foreground mt-4 mb-20">
            프로젝트가 지속적으로 성장할 수 있도록
            <br />
            든든한 후원자가 되어주세요!
          </p>
        </div>
        <DonateButton />
      </Container>
    </section>
  );
};

export default DonationSection;
