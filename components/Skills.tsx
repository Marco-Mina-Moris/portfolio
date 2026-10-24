import { Flame, Layers, Network, Smartphone, Workflow, Wrench, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skills, type SkillIcon } from "@/lib/site-data";

const icons: Record<SkillIcon, LucideIcon> = {
    flutter: Smartphone,
    state: Workflow,
    firebase: Flame,
    architecture: Layers,
    api: Network,
    tools: Wrench,
};

export default function Skills() {
    return (
        <section id="toolkit" className="section">
            <div className="wrap">
                <SectionHeading
                    index="03"
                    eyebrow="Toolkit"
                    title={<>The stack behind <span className="grad">every build.</span></>}
                    description="A modern Flutter toolkit sharpened on client projects, intensive training programs, and teaching it to others."
                />

                <div className="toolkit">
                    {skills.map((skill, i) => {
                        const Icon = icons[skill.icon];
                        return (
                            <Reveal key={skill.name} className="card" delay={(i % 3) * 0.06}>
                                <span className="card__icon"><Icon size={20} /></span>
                                <h3 className="card__title">{skill.name}</h3>
                                <p className="card__text">{skill.description}</p>
                                <div className="tags">
                                    {skill.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
