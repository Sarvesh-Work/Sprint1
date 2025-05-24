const features = [
  {
    title: "Effortless Note-Taking",
    description:
      "Jot down your thoughts, ideas, or reminders in a clean, minimal editor — built to help you focus without distractions.",
  },
  {
    title: "Organized Notes",
    description: "Stay organized and never lose track of your thoughts again.",
  },
  {
    title: "Edit with Ease",
    description:
      "Need to change something? Just click and update. No clutter, no confusion.",
  },
  {
    title: "Find Notes Fast",
    description:
      "Search by keywords or content to instantly locate what you need — even in a long list.",
  },
  {
    title: "Clean & Minimal Design",
    description:
      "Focus on your content with a distraction-free, user-friendly interface.",
  },
  {
    title: "Delete Notes Effortlessly",
    description:
      "Finished with a note? Remove it with a click and keep your space tidy.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="mt-20 px-2 ">
      <h1 className="gap-2  text-center font-bold text-3xl w-min mx-auto mt-4">
        Features
        <div className="p-[2px] rounded-2xl bg-primary mt-1" />
      </h1>

      <div className="mt-10 pb-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-4 md:gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex hover:bg-primary  cursor-pointer flex-col gap-2 rounded-lg border-2 border-black p-5 transition-transform duration-300 hover:scale-[1.01]"
          >
            <h4 className="text-2xl text-black font-semibold">
              {feature.title}
            </h4>
            <p className="text-[1.1rem] ">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
