import Container from "@/components/ui/Container";

import DonateButton from "../_components/DonateButton";

const DonationSection = () => {
  return (
    <section className="flex h-[60vh] items-center">
      <Container className="flex flex-col w-full justify-center px-16 md:px-52">
        <div className="relative">
          <h3 className="text-clamp-md font-bold">
            I MY ME MIND 가
            <br />
            일상에 작게나마 도움이 될 수 있길 바랍니다.
          </h3>
          <p className="text-clamp-xs text-secondary-foreground mt-4">
            I MY ME MIND 프로젝트가
            <br />
            지속적으로 성장할 수 있도록 든든한 후원자가 되어주세요.
          </p>
        </div>
        <DonateButton />
      </Container>
    </section>
  );
};

export default DonationSection;
