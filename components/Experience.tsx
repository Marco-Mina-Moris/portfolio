import Reveal from "./Reveal";
import { DrawLine } from "./motion";
import SectionHeading from "./SectionHeading";
import { experiences } from "@/lib/site-data";

export default function Experience() {
    return (
        <section id="experience" className="section">
            <div className="wrap">
                <SectionHeading
                    index="04"
                    eyebrow="Experience"
                    title={<>Where I&apos;ve <span className="grad">worked &amp; trained.</span></>}
                    description="From national training programs to client delivery, teaching, and building production apps with an engineering team."
                />

                <DrawLine>
                <ol className="timeline">
                    {experiences.map((exp) => (
                        <li key={`${exp.company}-${exp.period}`}>
                            <Reveal className="xp">
                                <div>
                                    <div className="xp__period">{exp.period}</div>
                                    <div className="xp__loc">{exp.location}</div>
                                    {exp.current && (
                                        <div className="xp__now">
                                            <span className="status"><span className="status__dot" />Current role</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="xp__role">{exp.role}</h3>
                                    <div className="xp__company">{exp.company}</div>
                                    <ul className="xp__list">
                                        {exp.highlights.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                                <div className="tags">
                                    {exp.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ol>
                </DrawLine>
            </div>
        </section>
    );
}
