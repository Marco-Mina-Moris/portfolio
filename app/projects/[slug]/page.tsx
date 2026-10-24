import { projects, getProjectBySlug } from "@/lib/projects-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: project.name,
        description: project.description,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: {
            title: `${project.name} — Marco Mina`,
            description: project.description,
            type: "article",
            url: `/projects/${project.slug}`,
            images: [{ url: project.coverImage, alt: `${project.name} app preview` }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.name} — Marco Mina`,
            description: project.description,
            images: [project.coverImage],
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient project={project} />;
}
