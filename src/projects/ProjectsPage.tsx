import { useState } from 'react';
import { MOCK_PROJECTS } from './MockProject';
import { Project } from './Project';
import ProjectList from './ProjectList';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

    const saveProject = (newProject: Project) => {
        const updatedProjects = projects.map((project) => {
            if (project.id === newProject.id) {
                return newProject;
            }
            return project;
        });
        setProjects(updatedProjects);
    };

    return (
        <>
            <h1>Projects</h1>
            <ProjectList projects={projects} onSave={saveProject} />
        </>
    );
}