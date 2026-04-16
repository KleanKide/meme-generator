import React from "react";

type Props = {
  children?: React.ReactNode;
};

function SectionFrame({ children }: Props) {
  return (
    <section className="shell">
      <div className="panel overflow-hidden rounded-[2rem] border px-4 py-4 md:px-6 md:py-6">
        {children}
      </div>
    </section>
  );
}

export default SectionFrame;
