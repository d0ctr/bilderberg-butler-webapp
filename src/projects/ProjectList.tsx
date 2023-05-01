import { useState } from 'react';
import { Project } from './Project';

import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

export interface ProjectListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
    const [editedProject, setEditedProject] = useState({});

    const handleEdit = (project: Project) => {
        setEditedProject(project);
    };

    const cancelEditing = () => {
        setEditedProject({});
    };

    const projectsList = projects.map((project: Project) => {
        return (
            <div key={project.id} className='cols-sm'>
                {editedProject === project ? (<ProjectForm project={project} onCancel={cancelEditing} onSave={onSave} />) : (<ProjectCard project={project} onEdit={handleEdit} />)}
            </div>
        );
    });
    return (
        <div className='row'>{projectsList}</div>
    );
}

export default ProjectList;