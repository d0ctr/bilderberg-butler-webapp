import { Project } from './Project';

function formatDescription(text: string) {
    if (text.length > 60) {
        return `${text.slice(0, 60)}...`
    }
    return text;
}

export interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
}

export default function ProjectCard({ project, onEdit }: ProjectCardProps) {
    const handleEditClick = (project: Project) => {
        onEdit(project);
    };

    return (
        <div key={project.id} className='cols-sm'>
            <div className='card'>
                <img src={project.imageUrl} alt={project.name}/>
                <section className='section dark'>
                    <h5 className='strong'>
                        <strong>{project.name}</strong>
                    </h5>
                    <p>{formatDescription(project.description)}</p>
                    <p>Budget : {project.budget.toLocaleString()}</p>
                </section>
                <button className='bordered' onClick={() => handleEditClick(project)}>
                    <span className='icon-edit'/>
                    Edit
                </button>
            </div>
        </div>
    );
}