import Add from "../../public/icons/sticky-note.png";
import Tag from "../../public/icons/tag.png";
import Search from "../../public/icons/search.png";
import Image from "next/image";

const steps = [
  {
    icon: Add,
    title: "Create a Note",
    description:
      "Click the “Add Note” button and start typing freely – reminders, ideas, or anything you like.",
  },
  {
    icon: Tag,
    title: "Tag & Edit Anytime",
    description:
      "Organize notes with tags for easy filtering. Edit or update whenever inspiration strikes.",
  },
  {
    icon: Search,
    title: "Search & Manage",
    description:
      "Use the search bar to quickly find notes. Delete the ones you no longer need.",
  },
];

const HowItWorkSection = () => {
  return (
    <div className="p-4 flex flex-col items-center mt-12">
      <h1 className="font-bold text-3xl mt-4 text-center">
        How It Works
        <div className="p-[2px] mt-1 rounded-3xl bg-primary w-2/2 mx-auto" />
      </h1>
      <p className="mt-2 text-muted-foreground text-center text-lg font-semibold max-w-xl">
        A simple 3-step process to capture and organize your thoughts.
      </p>

      <div className="mt-10 bg-primary rounded-3xl px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.title}
            className="flex flex-col border-[1.5px] border-black gap-3 items-center text-center bg-white p-6 rounded-2xl shadow-sm"
          >
            <Image src={step.icon} alt={step.title} className="size-20" />
            <h3 className="text-2xl font-bold">{step.title}</h3>
            <p className="text-gray-700 text-[1.1rem]">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorkSection;
