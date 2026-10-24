import fs from "node:fs";
import path from "node:path";
import SectionHeading from "./SectionHeading";
import CoursesGrid from "./CoursesGrid";
import { courses } from "@/lib/site-data";

export default function Courses() {
    // Resolved at build time: only certificates whose image is in /public are shown.
    const items = courses.map((course) => ({
        ...course,
        certificates: course.certificates.filter((c) => fs.existsSync(path.join(process.cwd(), "public", c.src))),
        issuers: course.certificates.map((c) => c.issuer),
    }));

    return (
        <section id="courses" className="section">
            <div className="wrap">
                <SectionHeading
                    index="05"
                    eyebrow="Courses"
                    title={<>Certified &amp; <span className="grad">always learning.</span></>}
                    description="Focused courses and certifications that deepened my Flutter skills beyond formal training programs."
                />
                <CoursesGrid courses={items} />
            </div>
        </section>
    );
}
